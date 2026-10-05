#!/usr/bin/env python3
"""Rendu exact des figures et des formules, sans dépendance extérieure."""
from pathlib import Path
from functools import lru_cache
import argparse, bisect, io, json, math, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from matplotlib.mathtext import MathTextParser
from matplotlib.font_manager import FontProperties

ROOT = Path(__file__).resolve().parent
W, H, FPS = 720, 1280, 15
NAVY, INK, BLUE, TEAL = '#17324d', '#20394f', '#2767af', '#087f72'
BG, MUTED, LINE, GOLD, RED = '#f3f6fa', '#566a7e', '#dbe4ed', '#bd8b2f', '#b43a47'
SANS = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
SERIF = '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'
CHAPTERS = [
    (12, 'Quelle limite ?', 'Une suite définie de proche en proche'),
    (17, 'Un point fixe', 'Une intersection avec la droite y = x'),
    (29, 'Construire les termes', 'Sur la courbe, puis sur la diagonale'),
    (14, 'Conjecturer', 'Le dessin donne une idée, pas une preuve'),
    (22, 'Définir et encadrer', 'Un intervalle stable pour cette suite'),
    (22, 'Prouver la croissance', 'La récurrence relie deux termes consécutifs'),
    (20, 'Justifier la convergence', 'La limite existe avant de la calculer'),
    (20, 'Passer à la limite', 'C’est ici que la continuité intervient'),
    (22, 'Déterminer la limite', 'Vérifier les solutions de l’équation'),
    (24, 'Le piège à éviter', 'Un point fixe unique ne suffit pas'),
    (20, 'La méthode à retenir', 'Trois vérifications avant le calcul'),
]
STARTS=[0]
for duration, _, _ in CHAPTERS:
    STARTS.append(STARTS[-1]+duration)
DURATION=STARTS[-1]
PARSER=MathTextParser('agg')

@lru_cache(None)
def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else SANS, size)

def txt(im, text, xy, size=32, color=INK, bold=False, anchor=None):
    ImageDraw.Draw(im).text(xy, text, font=font(size,bold), fill=color, anchor=anchor)

def wrap(im, text, xy, size=32, color=INK, bold=False, width=584, gap=11):
    draw=ImageDraw.Draw(im); x,y=xy; lines=[]
    for para in text.split('\n'):
        line=''
        for word in para.split():
            trial=(line+' '+word).strip()
            if draw.textlength(trial,font=font(size,bold)) > width and line:
                lines.append(line); line=word
            else: line=trial
        lines.append(line)
    for line in lines:
        txt(im,line,(x,y),size,color,bold); y+=size+gap
    return y

@lru_cache(None)
def formula_image(s, size=48, color=INK):
    parsed=PARSER.parse('$'+s+'$',dpi=100,prop=FontProperties(size=size*72/100, math_fontfamily='dejavusans'))
    mask=Image.fromarray(np.asarray(parsed.image).astype(np.uint8),'L')
    box=mask.getbbox()
    if box: mask=mask.crop(box)
    rgba=Image.new('RGBA',mask.size,color); rgba.putalpha(mask)
    return rgba

def eq(im,s,y,size=48,color=INK,x=None,maxwidth=584):
    f=formula_image(s,size,color)
    if f.width>maxwidth:
        f=f.resize((maxwidth,round(f.height*maxwidth/f.width)),Image.Resampling.LANCZOS)
    if x is None: x=(W-f.width)//2
    im.paste(f,(int(x),int(y)),f)
    return f.height

def card(im, top, bottom, fill='white', outline=LINE):
    ImageDraw.Draw(im).rounded_rectangle((36,top,684,bottom),radius=24,fill=fill,outline=outline,width=2)

def base(i):
    im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,96),fill=NAVY)
    txt(im,'Faicel Missaoui',(36,23),27,'white',True)
    txt(im,'TERMINALE SPÉCIALITÉ',(36,64),17,'#d5e6f3')
    d.rounded_rectangle((607,25,681,67),radius=12,fill='#294b67')
    txt(im,f'{i+1:02}/11',(644,46),20,'white',True,anchor='mm')
    y=wrap(im,CHAPTERS[i][1],(40,126),43,NAVY,True,width=640,gap=4)
    wrap(im,CHAPTERS[i][2],(40,y+13),26,MUTED,width=640,gap=5)
    d.line((40,1168,680,1168),fill=LINE,width=2)
    for n in range(11):
        a=40+n*59
        d.rounded_rectangle((a,1190,a+50,1196),radius=3,fill=TEAL if n<=i else LINE)
    txt(im,'Observer · Démontrer · Calculer',(W//2,1225),23,MUTED,anchor='mm')
    return im

def plot(im, bounds=(92,395,650,953), maxv=2.45, f=lambda x:math.sqrt(x+2), fixed=2):
    d=ImageDraw.Draw(im); left,top,right,bottom=bounds
    def p(x,y): return (left+(right-left)*x/maxv,bottom-(bottom-top)*y/maxv)
    for t in [0.5,1,1.5,2]:
        if t>=maxv: continue
        a,b=p(t,0),p(t,maxv); d.line((a,b),fill='#e6edf3',width=1)
        a,b=p(0,t),p(maxv,t); d.line((a,b),fill='#e6edf3',width=1)
        if t in (1,2):
            txt(im,str(int(t)),(p(t,0)[0],bottom+22),26,MUTED,anchor='mm')
            txt(im,str(int(t)),(left-27,p(0,t)[1]),26,MUTED,anchor='mm')
    d.line((p(0,maxv),p(0,0),p(maxv,0)),fill=INK,width=3)
    d.polygon([(left,top-10),(left-7,top+6),(left+7,top+6)],fill=INK)
    d.polygon([(right+10,bottom),(right-6,bottom-7),(right-6,bottom+7)],fill=INK)
    txt(im,'0',(left-22,bottom+18),25,MUTED,anchor='mm')
    txt(im,'x',(right+8,bottom+38),28,INK,anchor='mm')
    txt(im,'y',(left-28,top-10),28,INK,anchor='mm')
    d.line((p(0,0),p(maxv,maxv)),fill=GOLD,width=4)
    pts=[p(x,f(x)) for x in np.linspace(0,maxv,240)]
    d.line(pts,fill=BLUE,width=5)
    txt(im,'y = x',p(1.24,.97),26,GOLD,True)
    eq(im,r'C_f',p(.42,1.9)[1],31,BLUE,x=p(.42,1.9)[0],maxwidth=110)
    a=p(fixed,fixed); d.ellipse((a[0]-8,a[1]-8,a[0]+8,a[1]+8),fill=RED)
    txt(im,'(2 ; 2)',(a[0]-128,a[1]-42),27,RED,True)
    return p

def dashed(d,a,b,color=TEAL,width=3,dash=12):
    dist=math.hypot(b[0]-a[0],b[1]-a[1])
    if not dist:return
    for x in np.arange(0,dist,2*dash):
        t=x/dist; v=min(x+dash,dist)/dist
        d.line(((a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t),(a[0]+(b[0]-a[0])*v,a[1]+(b[1]-a[1])*v)),fill=color,width=width)

def arrow(d,a,b,color=TEAL,width=5):
    d.line((a,b),fill=color,width=width)
    length=math.hypot(b[0]-a[0],b[1]-a[1])
    if length<22:return
    vx=(b[0]-a[0])/length;vy=(b[1]-a[1])/length
    end=(a[0]+.62*(b[0]-a[0]),a[1]+.62*(b[1]-a[1]))
    d.polygon([end,(end[0]-13*vx+6*vy,end[1]-13*vy-6*vx),(end[0]-13*vx-6*vy,end[1]-13*vy+6*vx)],fill=color)

def terms(count=7):
    us=[0.]
    for _ in range(count): us.append(math.sqrt(us[-1]+2))
    return us

STATIC={}
def background(i):
    if i in STATIC:return STATIC[i]
    im=base(i)
    if i==0:
        card(im,285,530)
        txt(im,'La suite que nous allons étudier',(W//2,315),28,MUTED,anchor='mt')
        eq(im,r'u_0=0',373,55)
        eq(im,r'u_{n+1}=\sqrt{u_n+2}',455,56)
        card(im,573,808,fill='#e7f4ef',outline='#bedccd')
        wrap(im,'Les termes se rapprochent-ils\nd’un même nombre ?',(65,611),32,TEAL,True)
        wrap(im,'Si oui, comment trouver\net justifier cette limite ?',(65,726),29,INK)
        txt(im,'Le théorème du point fixe',(W//2,890),36,NAVY,True,anchor='mt')
        wrap(im,'Une animation pour comprendre\nle graphique et la démonstration.',(63,968),29,MUTED)
    elif i==1:
        eq(im,r'f(\ell)=\ell',282,58,TEAL)
        plot(im)
        card(im,1020,1135,fill='#e7f4ef',outline='#bedccd')
        wrap(im,'Au point (ℓ ; ℓ), la courbe\net la diagonale se rencontrent.',(61,1040),29,TEAL)
    elif i==2:
        eq(im,r'u_{n+1}=f(u_n),\quad f(x)=\sqrt{x+2}',279,40)
        plot(im,bounds=(92,373,650,931))
    elif i==3:
        card(im,285,900)
        txt(im,'Les premières valeurs',(66,313),31,NAVY,True)
        d=ImageDraw.Draw(im);left,top,right,bottom=98,426,646,756
        def p(n,y):return(left+(right-left)*n/6,bottom-(bottom-top)*y/2.2)
        d.line((p(0,2.2),p(0,0),p(6,0)),fill=INK,width=3)
        dashed(d,p(0,2),p(6,2),GOLD,3)
        txt(im,'2',(left-29,p(0,2)[1]),27,GOLD,True,anchor='mm')
        txt(im,'n',(right+4,bottom+30),27,MUTED)
        us=terms(6)
        for n,u in enumerate(us):
            a=p(n,u);d.ellipse((a[0]-7,a[1]-7,a[0]+7,a[1]+7),fill=TEAL)
            txt(im,str(n),(a[0],bottom+27),25,MUTED,anchor='mm')
        eq(im,r'u_1\approx 1{,}414\quad u_2\approx 1{,}848',800,33)
        card(im,940,1136,fill='#fff4dc',outline='#e6d4a4')
        wrap(im,'Le graphique suggère la limite 2.\nIl reste à prouver que la suite\nconverge.',(62,973),30,INK)
    elif i==4:
        card(im,285,540)
        txt(im,'Initialisation',(64,310),32,NAVY,True)
        eq(im,r'u_0=0\in[0\,;\,2]',373,49)
        wrap(im,'Le premier terme est bien défini.',(64,465),29,MUTED)
        card(im,572,894)
        txt(im,'Hérédité : si 0 ≤ uₙ ≤ 2',(64,603),32,NAVY,True)
        eq(im,r'2\leq u_n+2\leq4',678,46)
        eq(im,r'\sqrt{2}\leq\sqrt{u_n+2}\leq2',758,46,TEAL)
        wrap(im,'Le terme suivant existe et reste dans [0 ; 2].',(64,832),28,MUTED)
        card(im,926,1139,fill='#e7f4ef',outline='#bedccd')
        txt(im,'Par récurrence, pour tout n ∈ ℕ :',(64,950),29,TEAL,True)
        eq(im,r'0\leq u_n\leq2',1017,52,TEAL)
        txt(im,'[0 ; 2] est stable par f.',(W//2,1098),27,TEAL,anchor='mm')
    elif i==5:
        card(im,285,482)
        wrap(im,'f est croissante sur [0 ; 2].',(64,310),32,NAVY,True)
        eq(im,r'u_0=0\leq\sqrt{2}=u_1',394,47)
        card(im,520,911)
        txt(im,'Supposons uₙ ≤ uₙ₊₁.',(64,555),34,NAVY,True)
        wrap(im,'La croissance de f donne :',(64,629),31,MUTED)
        eq(im,r'f(u_n)\leq f(u_{n+1})',697,50)
        eq(im,r'u_{n+1}\leq u_{n+2}',797,54,TEAL)
        card(im,954,1137,fill='#e7f4ef',outline='#bedccd')
        wrap(im,'Par récurrence, (uₙ)\nest croissante.',(64,995),37,TEAL,True)
    elif i==6:
        card(im,285,649,fill='#e7f4ef',outline='#bedccd')
        wrap(im,'(uₙ) est croissante\net majorée par 2.',(64,321),38,TEAL,True)
        wrap(im,'Le théorème de convergence\nmonotone assure :',(64,445),30,INK)
        eq(im,r'u_n\longrightarrow\ell\in[0\,;\,2]',557,51,TEAL)
        card(im,688,983)
        wrap(im,'f est continue sur [0 ; 2].',(64,724),34,NAVY,True)
        wrap(im,'Comme ℓ ∈ [0 ; 2],\nf est donc continue en ℓ.',(64,800),32,INK)
        wrap(im,'On n’a pas besoin de connaître\nla valeur de ℓ pour le vérifier.',(64,913),27,MUTED)
        txt(im,'La limite existe ; reste à l’identifier.',(W//2,1068),28,TEAL,True,anchor='mm')
    elif i==7:
        card(im,285,581)
        txt(im,'L’égalité vraie pour tout n',(W//2,320),31,NAVY,True,anchor='mt')
        eq(im,r'u_{n+1}=f(u_n)',402,62)
        eq(im,r'\downarrow\qquad\quad\downarrow',496,48,GOLD)
        card(im,618,825,fill='#e7f4ef',outline='#bedccd')
        eq(im,r'\ell=f(\ell)',663,65,TEAL)
        txt(im,'ℓ est un point fixe de f.',(W//2,773),31,TEAL,True,anchor='mm')
        wrap(im,'À gauche : uₙ₊₁ tend aussi vers ℓ.\nDécaler l’indice ne change pas la limite.',(55,866),29,INK,width=612)
        wrap(im,'À droite : f(uₙ) tend vers f(ℓ)\npar continuité de f en ℓ.',(55,1001),29,INK,width=612)
    elif i==8:
        card(im,285,600)
        eq(im,r'\ell=\sqrt{\ell+2}\quad\mathrm{et}\quad\ell\geq0',328,47)
        eq(im,r'\ell^2-\ell-2=0',419,50)
        eq(im,r'(\ell-2)(\ell+1)=0',503,50)
        card(im,638,882,fill='#fff1f1',outline='#ecc8cb')
        wrap(im,'−1 est à rejeter :',(64,670),33,RED,True)
        eq(im,r'f(-1)=1\neq-1',738,48,RED)
        wrap(im,'Une solution après élévation au carré\nn’est pas forcément un point fixe.',(64,815),27,INK)
        card(im,921,1138,fill='#e7f4ef',outline='#bedccd')
        txt(im,'La seule valeur compatible est 2.',(W//2,959),29,TEAL,True,anchor='mt')
        eq(im,r'\lim_{n\to+\infty}u_n=2',1022,57,TEAL)
    elif i==9:
        card(im,285,496)
        eq(im,r'f(x)=1-x,\quad u_0=0',324,46)
        eq(im,r'\ell=1-\ell\;\Longrightarrow\;\ell=\frac{1}{2}',410,46,TEAL)
        txt(im,'Un unique point fixe…',(W//2,547),33,NAVY,True,anchor='mm')
        txt(im,'…mais les termes alternent !',(W//2,866),33,RED,True,anchor='mm')
        card(im,920,1138,fill='#fff1f1',outline='#ecc8cb')
        wrap(im,'0, 1, 0, 1, 0, 1, …',(64,949),40,RED,True)
        wrap(im,'Cette suite ne converge pas.\nRésoudre f(ℓ) = ℓ ne prouve\npas la convergence.',(64,1012),30,INK)
    elif i==10:
        for j,(title,body) in enumerate([
            ('1  La suite est-elle bien définie ?', 'Vérifier que la récurrence a un sens.'),
            ('2  La suite converge-t-elle ?', 'Justifier une limite réelle ℓ.'),
            ('3  f est-elle continue en ℓ ?', 'Un intervalle contenant ℓ peut aider.'),
        ]):
            top=285+j*183;card(im,top,top+154)
            wrap(im,title,(59,top+24),29,NAVY,True,width=604)
            wrap(im,body,(59,top+83),26,MUTED,width=604)
        card(im,862,1138,fill='#e7f4ef',outline='#bedccd')
        eq(im,r'\ell=f(\ell)',896,54,TEAL)
        wrap(im,'Résoudre, puis vérifier les solutions.\nLe théorème identifie une limite\ndont l’existence a été prouvée.',(61,978),29,TEAL,width=600)
    STATIC[i]=im
    return im

def frame(t):
    i=min(len(CHAPTERS)-1,bisect.bisect_right(STARTS,t)-1);local=t-STARTS[i]
    im=background(i).copy();d=ImageDraw.Draw(im)
    if i==2:
        p=lambda x,y:(92+558*x/2.45,931-558*y/2.45)
        us=terms(4); segments=[]
        for n in range(4):
            segments.append((p(us[n],0 if n==0 else us[n]),p(us[n],us[n+1])))
            segments.append((p(us[n],us[n+1]),p(us[n+1],us[n+1])))
        progress=max(0,min(8,(local-1)/3.1));full=int(progress)
        for n,(a,b) in enumerate(segments):
            if n<full: arrow(d,a,b,TEAL,5)
            elif n==full and full<8:
                q=progress-full;end=(a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q)
                arrow(d,a,end,TEAL,6)
        n=min(3,int(max(0,progress)/2));stage=int(progress)%2
        text='Monter sur la courbe : lire f(uₙ).' if stage==0 and progress<8 else 'Aller vers y = x : reporter la valeur.'
        if progress>=8:text='Recommencer à partir du terme obtenu.'
        txt(im,text,(W//2,1004),26,TEAL,True,anchor='mm')
        done=min(4,int((progress+0.00001)/2))
        for k in range(1,done+1):
            value=f'{us[k]:.3f}'.replace('.',',')
            txt(im,f'u{"₀₁₂₃₄"[k]} ≈ {value}',(58+(k-1)%2*326,1050+((k-1)//2)*44),27,INK)
        txt(im,'u₀ = 0',(108,967),24,TEAL)
    elif i==9:
        left,right,top,bottom=92,642,600,792
        d.line(((left,top-10),(left,bottom),(right,bottom)),fill=INK,width=3)
        txt(im,'1',(left-29,top),27,MUTED,anchor='mm')
        txt(im,'0',(left-29,bottom),27,MUTED,anchor='mm')
        shown=min(7,int(max(0,local-2)/2.2))
        for n in range(shown+1):
            x=left+(right-left)*n/7;y=top if n%2 else bottom
            if n>0:
                prev=(left+(right-left)*(n-1)/7,top if (n-1)%2 else bottom)
                d.line((prev,(x,y)),fill='#d7a6ac',width=3)
            d.ellipse((x-7,y-7,x+7,y+7),fill=RED)
            txt(im,str(n),(x,bottom+32),25,MUTED,anchor='mm')
    return im

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--preview',action='store_true');args=ap.parse_args()
    (ROOT/'qa').mkdir(exist_ok=True)
    samples=[6,20,37,48,56,64,82,104,124,145,166,193,210]
    for t in samples:frame(t).save(ROOT/'qa'/f'frame_{t:03}.png')
    frame(56).save(ROOT/'poster.jpg',quality=90)
    thumbs=[]
    for t in samples:
        im=frame(t);im.thumbnail((216,384));thumbs.append(im)
    sheet=Image.new('RGB',(216*4,414*4),'#dbe4ed');d=ImageDraw.Draw(sheet)
    for k,im in enumerate(thumbs):
        x=(k%4)*216;y=(k//4)*414;sheet.paste(im,(x,y));d.text((x+10,y+387),f'{samples[k]} s',font=font(17),fill=INK)
    sheet.save(ROOT/'qa'/'contact_sheet.jpg',quality=92)
    metadata={'width':W,'height':H,'fps':FPS,'duration':DURATION,'chapters':[{'start':STARTS[n],'title':c[1]} for n,c in enumerate(CHAPTERS)]}
    (ROOT/'chapters.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+'\n')
    if args.preview:print(json.dumps(metadata,ensure_ascii=False));return
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','29','-pix_fmt','yuv420p','-movflags','+faststart','-metadata','title=Théorème du point fixe — Faicel Missaoui','-metadata','artist=Faicel Missaoui','-metadata','comment=Terminale spécialité — Animation pédagogique sous-titrée',str(ROOT/'Point_fixe_Faicel_Missaoui.mp4')]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    for k in range(DURATION*FPS):
        proc.stdin.write(frame(k/FPS).tobytes())
        if k%(FPS*30)==0:print(f'Rendered {k//FPS}/{DURATION} s',flush=True)
    proc.stdin.close()
    if proc.wait()!=0:raise RuntimeError('Échec de ffmpeg')
    print(json.dumps({'file':str(ROOT/'Point_fixe_Faicel_Missaoui.mp4'),'bytes':(ROOT/'Point_fixe_Faicel_Missaoui.mp4').stat().st_size,'duration':DURATION}))

if __name__=='__main__':main()
