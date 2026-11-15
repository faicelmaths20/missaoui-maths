from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageColor
import math, subprocess, io, functools, sys
import numpy as np
from matplotlib.mathtext import math_to_image
from matplotlib.font_manager import FontProperties

ROOT=Path(__file__).resolve().parent
QA=ROOT.parents[1]/'qa'; QA.mkdir(exist_ok=True)
W,H=1280,720
BG='#080f22'; INK='#f5f3eb'; SOFT='#b7c4da'; GOLD='#f4cd7a'; BLUE='#79d8ff'; PINK='#ff91b5'
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
SERIF='/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'
@functools.lru_cache(None)
def font(s,b=False): return ImageFont.truetype(BOLD if b else FONT,s)
def text(im,xy,s,size=25,color=INK,b=False,anchor=None):
    ImageDraw.Draw(im).text(xy,s,font=font(size,b),fill=color,anchor=anchor)
@functools.lru_cache(None)
def equation(s,size=29,color=INK):
    f=io.BytesIO(); math_to_image('$'+s+'$',f,prop=FontProperties(size=size),dpi=110,format='png',color='black')
    mask=Image.open(f).convert('L').point(lambda p:255-p)
    out=Image.new('RGBA',mask.size,ImageColor.getrgb(color)+(255,));out.putalpha(mask)
    return out
def eq(im,xy,s,size=29,color=INK):
    a=equation(s,size,color); im.paste(a,xy,a)
def lines(im,y,ss,size=24,color=SOFT,gap=39):
    for i,s in enumerate(ss): text(im,(58,y+i*gap),s,size,color)
def clamp(x):return max(0,min(1,x))
def ease(x):x=clamp(x);return x*x*(3-2*x)
def fmt(x):return f'{x:.3f}'.replace('.',',')

SCENES=[
 (0,10,'La dérivée','Une pente,\nà la limite.'),
 (10,25,'01  /  DEUX POINTS','Une sécante'),
 (25,43,'02  /  UNE PENTE','Le taux de variation'),
 (43,61,'03  /  LE CALCUL','Pourquoi 2 + h ?'),
 (61,82,'04  /  PAR LA DROITE','h positif tend vers 0'),
 (82,101,'05  /  PAR LA GAUCHE','h négatif tend vers 0'),
 (101,119,'06  /  LA LIMITE','Le nombre dérivé'),
 (119,140,'07  /  LA TANGENTE','Une pente égale à 2')
]
CAPTIONS=[
 (0,10,'Comment mesurer la pente d’une courbe en un point ?'),
 (10,17,'A reste fixe. B se déplace sur la courbe de la fonction carré.'),
 (17,25,'Abscisses sur l’axe horizontal ; images sur l’axe vertical. Ici, a = 1.'),
 (25,34,'La pente de (AB) est la variation verticale divisée par la variation horizontale.'),
 (34,43,'Avec h = 1 : on avance de 1 et on monte de 3. La pente vaut 3.'),
 (43,52,'On développe (1 + h)², puis on factorise le numérateur par h.'),
 (52,61,'Puisque h ≠ 0, on peut simplifier par h : la pente vaut 2 + h.'),
 (61,72,'B se rapproche de A par la droite. La sécante pivote autour de A.'),
 (72,82,'Quand h tend vers 0 par valeurs positives, la pente tend vers 2.'),
 (82,92,'Cette fois, B s’approche par la gauche : h est négatif.'),
 (92,101,'La pente tend encore vers 2. Les deux côtés donnent la même limite.'),
 (101,110,'Si le taux de variation admet une limite réelle, f est dérivable en a.'),
 (110,119,'Cette limite est le nombre dérivé f′(a). Ici, f′(1) = 2.'),
 (119,129,'La tangente passe par A(1 ; 1) et a pour coefficient directeur 2.'),
 (129,140,'On fait tendre h vers 0 ; on ne remplace jamais h par 0 dans le quotient.')
]

# Fixed, equally scaled axes: one unit is 85 pixels on each axis.
GX,GY=795,535; SCALE=85
def pt(x,y):return (GX+SCALE*x,GY-SCALE*y)
def dash(d,a,b,fill,width=2):
    dist=math.dist(a,b)
    for i in range(0,int(dist),12):
        p=i/dist;q=min((i+6)/dist,1)
        d.line((a[0]+(b[0]-a[0])*p,a[1]+(b[1]-a[1])*p,a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q),fill=fill,width=width)

@functools.lru_cache(None)
def plate(i):
    im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im)
    # Subtle blue light, with a quiet margin around all instructional content.
    arr=np.zeros((H,W,3),dtype=np.uint8)
    yy,xx=np.mgrid[:H,:W]; glow=np.exp(-(((xx-1000)/550)**2+((yy-170)/500)**2))
    for c,(base,add) in enumerate([(8,8),(15,15),(34,23)]):arr[:,:,c]=base+add*glow
    im=Image.fromarray(arr); d=ImageDraw.Draw(im)
    text(im,(58,25),'FAICEL MISSAOUI',26,GOLD,True)
    text(im,(58,59),'Professeur agrégé de mathématiques',13,SOFT)
    text(im,(1222,34),'PREMIÈRE SPÉCIALITÉ  /  MATHÉMATIQUES',13,SOFT,anchor='ra')
    d.line((58,91,1222,91),fill='#344054',width=1)
    d.line((58,96,1222,96),fill='#665b40',width=1)
    text(im,(58,126),SCENES[i][2].upper(),17,GOLD,True)
    title=SCENES[i][3].split('\n')
    for j,s in enumerate(title):text(im,(58,168+j*49),s,31 if i==0 else 26,INK,True)
    if i==0:
        lines(im,330,['De la sécante à la tangente.','Voir. Comprendre. Retenir.'],25)
        eq(im,(58,455),r"f'(a)=\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}",25,GOLD)
    elif i==1:
        eq(im,(58,250),r'f(x)=x^2\qquad a=1',28,BLUE)
        lines(im,330,['A(1 ; 1) est fixe.','B(1 + h ; (1 + h)²) est mobile.','La droite (AB) est une sécante.'],23)
        text(im,(58,500),'h ≠ 0 : A et B sont distincts.',24,GOLD,True)
    elif i==2:
        eq(im,(58,250),r'\mathcal{T}(h)=\frac{f(a+h)-f(a)}{h}',28,GOLD)
        lines(im,350,['Au numérateur : variation de f.','Au dénominateur : variation de x.'],23)
        eq(im,(58,454),r'\mathcal{T}(1)=\frac{4-1}{1}=3',30,GOLD)
        text(im,(58,555),'C’est la pente de (AB).',25,INK,True)
    elif i==3:
        eq(im,(58,240),r'\mathcal{T}(h)=\frac{(1+h)^2-1}{h}',26)
        eq(im,(58,335),r'=\frac{2h+h^2}{h}=\frac{h(2+h)}{h}',26)
        eq(im,(58,445),r'=2+h\quad (h\ne 0)',33,GOLD)
        text(im,(58,549),'La simplification exige h ≠ 0.',23,SOFT)
    elif i in (4,5):
        eq(im,(58,242),r'\mathcal{T}(h)=2+h',30,GOLD)
        vals=['1','0,5','0,1','0,01'] if i==4 else ['−0,8','−0,5','−0,1','−0,01']
        slopes=['3','2,5','2,1','2,01'] if i==4 else ['1,2','1,5','1,9','1,99']
        text(im,(90,330),'h',23,BLUE,True);eq(im,(285,325),r'\mathcal{T}(h)',22,GOLD)
        for j,(a,b) in enumerate(zip(vals,slopes)):
            text(im,(90,375+j*42),a,23,BLUE);text(im,(285,375+j*42),b,23,GOLD)
        text(im,(58,564),'Même destination : 2.',27,INK,True)
    elif i==6:
        eq(im,(58,250),r"f'(a)=\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}",24,GOLD)
        lines(im,358,['Si cette limite est un nombre réel,','f est dérivable en a.','La limite se note f′(a).'],23)
        eq(im,(58,505),r"f'(1)=\lim_{h\to 0}(2+h)=2",27,BLUE)
    elif i==7:
        eq(im,(58,245),r'y=f(a)+f\prime(a)(x-a)',25)
        eq(im,(58,328),r'y=1+2(x-1)=2x-1',26,PINK)
        lines(im,420,['Le nombre dérivé est la pente','de la tangente au point A.'],24)
        text(im,(58,534),'h tend vers 0, mais h ≠ 0.',24,GOLD,True)
    # Graph region
    d.rounded_rectangle((635,135,1222,600),radius=24,fill='#0b1930',outline='#29394e',width=1)
    for x in range(-1,5):
        a=pt(x,-.55);b=pt(x,4.4);d.line((*a,*b),fill='#1d2b42',width=1)
    for y in range(0,5):d.line((*pt(-1.5,y),*pt(4.6,y)),fill='#1d2b42',width=1)
    d.line((*pt(-1.5,0),*pt(4.6,0)),fill='#8494ac',width=2)
    d.line((*pt(0,-.55),*pt(0,4.4)),fill='#8494ac',width=2)
    text(im,(GX-9,GY+10),'0',16,SOFT,anchor='rt')
    text(im,(1200,GY+10),'x',18,SOFT);text(im,(GX+12,151),'y',18,SOFT)
    pts=[pt(x,x*x) for x in np.linspace(-1.5,math.sqrt(4.4),400)]
    d.line(pts,fill=BLUE,width=4,joint='curve')
    text(im,(1045,158),'f(x) = x²',23,BLUE,True)
    text(im,(1200,579),'Faicel Missaoui',12,'#5a6a82',anchor='ra')
    return im

def projections(im,point,origin,h,mobile=False):
    """Project the exact points; separate labels with leaders when h is small."""
    d=ImageDraw.Draw(im);ox,oy=origin;A=point(1,1)
    s=23 if mobile else 19
    dash(d,(A[0],oy),A,'#7a8395',2)
    dash(d,(ox,A[1]),A,'#7a8395',2)
    text(im,(A[0],oy+10),'a',s,INK,True,anchor='mt')
    text(im,(ox-13,A[1]+9),'f(a)',s,INK,anchor='rt')
    if h is None:return
    B=point(1+h,(1+h)**2)
    dash(d,(B[0],oy),B,'#4d849f',2)
    dash(d,(ox,B[1]),B,'#4d849f',2)
    # The labels never replace or move the actual tick marks.
    d.line((B[0],oy-5,B[0],oy+5),fill=BLUE,width=2)
    d.line((ox-5,B[1],ox+5,B[1]),fill=BLUE,width=2)
    lx=B[0]
    gap=68 if mobile else 58
    if abs(lx-A[0])<gap:lx=A[0]+(gap if h>0 else -gap)
    ly=oy+39
    d.line((B[0],oy+6,lx,ly-2),fill=BLUE,width=1)
    text(im,(lx,ly),'a+h',s,BLUE,anchor='mt')
    ylabel=B[1]
    if abs(B[1]-A[1])<46:ylabel=A[1]-36 if h>0 else A[1]+53
    d.line((ox-7,B[1],ox-15,ylabel),fill=BLUE,width=1)
    box=d.textbbox((ox-19,ylabel),'f(a+h)',font=font(s),anchor='rm')
    d.rounded_rectangle((box[0]-3,box[1]-2,box[2]+3,box[3]+2),radius=3,fill='#0b1930')
    text(im,(ox-19,ylabel),'f(a+h)',s,BLUE,anchor='rm')

def slopeline(im,m,color,width=3):
    d=ImageDraw.Draw(im);low=max(-1.5,1+(-.55-1)/m) if m>0 else -1.5
    high=min(4.6,1+(4.4-1)/m) if m>0 else 4.6
    d.line((*pt(low,1+m*(low-1)),*pt(high,1+m*(high-1))),fill=color,width=width)

def frame(t):
    i=next((i for i,(a,b,_,_) in enumerate(SCENES) if a<=t<b),7)
    im=plate(i).copy();d=ImageDraw.Draw(im);a,b,_,_=SCENES[i];u=clamp((t-a)/(b-a))
    h=1.
    if i==0:h=.7+.3*math.cos(t*.5)
    if i==1:h=1-.2*ease((u-.3)/.6)
    if i==3:h=1-.5*ease(u)
    if i==4:h=10**(-3*ease(u))
    if i==5:h=-.8*10**(-3*ease(u))
    projections(im,pt,(GX,GY),h if i<6 else None)
    if i in (4,5):slopeline(im,2,'#864f74',2)
    if i<6:
        slopeline(im,2+h,GOLD,3)
        A=pt(1,1);B=pt(1+h,(1+h)**2);C=pt(1+h,1)
        if i in (1,2):
            dash(d,A,C,BLUE,2);dash(d,C,B,PINK,2)
            text(im,((A[0]+C[0])/2,A[1]+26),'h',21,BLUE,True,anchor='mm')
            text(im,(C[0]+16,(B[1]+C[1])/2),'f(a+h) − f(a)',16,PINK,anchor='lm')
        d.ellipse((B[0]-7,B[1]-7,B[0]+7,B[1]+7),fill=BLUE,outline=BG,width=2)
        if abs(h)>.15:text(im,(B[0]+12,B[1]-24),'B',22,BLUE,True)
        else:
            d.line((B[0],B[1]-8,B[0]+30,B[1]-55),fill=BLUE,width=1)
            text(im,(B[0]+34,B[1]-72),'B',21,BLUE,True)
        if i>=3:
            d.rounded_rectangle((995,440,1205,515),radius=12,fill='#15263e')
            text(im,(1010,451),'h = '+fmt(h),19,BLUE)
            eq(im,(1010,483),r'\mathcal{T}(h)='+fmt(2+h).replace(',',r'{,}'),16,GOLD)
    else:
        slopeline(im,2,PINK,4)
        text(im,(1010,330),'Tangente',22,PINK,True)
        text(im,(1010,365),'y = 2x − 1',23,PINK)
    A=pt(1,1);d.ellipse((A[0]-6,A[1]-6,A[0]+6,A[1]+6),fill=INK,outline=BG,width=2)
    text(im,(A[0]-22,A[1]+17),'A',23,INK,True)
    cap=next((s for a,b,s in CAPTIONS if a<=t<b),CAPTIONS[-1][2])
    d.line((58,625,1222,625),fill='#344054',width=1)
    text(im,(640,659),cap,22,INK,anchor='mm')
    text(im,(58,693),f'{i+1:02d} / 08',12,SOFT,anchor='lm')
    d.rounded_rectangle((160,690,1222,693),radius=1,fill='#26344b')
    d.rounded_rectangle((160,690,160+1062*t/140,693),radius=1,fill=GOLD)
    return im

if __name__=='__main__':
    for t in [0,13,30,48,67,79,85,98,108,127,139]:frame(t).save(QA/f'frame-{t:03}.jpg',quality=92)
    frame(0).save(ROOT/'affiche.jpg',quality=95)
    if '--stills' in sys.argv:sys.exit()
    fps=24
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(ROOT/'Derivee_limite_Faicel_Missaoui.mp4')]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    for j in range(140*fps):
        proc.stdin.write(frame(j/fps).tobytes())
        if j%(fps*10)==0:print(f'{j//fps}/140 s',flush=True)
    proc.stdin.close();assert proc.wait()==0
    print('Film créé.',flush=True)
