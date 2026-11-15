"""Portrait cut: larger plot and type for a 3:4 phone viewport."""
from render_film import *

PW,PH=720,960
def ppoint(x,y): return (225+100*x,748-100*y)

def centered_eq(im,y,s,size=31,color=GOLD):
    a=equation(s,size,color); assert a.width<680,(s,a.size)
    im.paste(a,((PW-a.width)//2,y),a)

def wrap_text(s,size=30,width=650):
    result=[];line=''
    for word in s.split():
        trial=(line+' '+word).strip()
        if font(size).getlength(trial)>width:
            result.append(line);line=word
        else:line=trial
    if line:result.append(line)
    return result

@functools.lru_cache(None)
def phone_plate(i):
    im=Image.new('RGB',(PW,PH),BG);d=ImageDraw.Draw(im)
    text(im,(32,18),'FAICEL MISSAOUI',30,GOLD,True)
    text(im,(32,59),'Professeur agrégé de mathématiques',17,SOFT)
    text(im,(688,29),f'{i+1:02} / 08',18,SOFT,anchor='ra')
    d.line((32,88,688,88),fill='#3e4b5d',width=1)
    title='La dérivée, une pente à la limite' if i==0 else SCENES[i][3]
    text(im,(32,103),title,26,INK,True)
    if i==0:
        centered_eq(im,164,r"f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}",31)
        text(im,(360,265),'De la sécante à la tangente.',29,SOFT,anchor='mm')
    elif i==1:
        centered_eq(im,158,r'f(x)=x^2\qquad a=1',35,BLUE)
        text(im,(360,235),'A(1 ; 1) est fixe.',27,INK,anchor='mm')
        text(im,(360,278),'B(1 + h ; (1 + h)²) est mobile.',27,BLUE,anchor='mm')
    elif i==2:
        centered_eq(im,150,r'\mathcal{T}(h)=\frac{f(a+h)-f(a)}{h}',35)
        centered_eq(im,240,r'\mathcal{T}(1)=\frac{4-1}{1}=3',27)
    elif i==3:
        centered_eq(im,149,r'\mathcal{T}(h)=\frac{(1+h)^2-1}{h}',31)
        centered_eq(im,236,r'=\frac{2h+h^2}{h}=2+h\quad(h\ne0)',28)
    elif i in (4,5):
        centered_eq(im,162,r'\mathcal{T}(h)=2+h',39)
        text(im,(360,265),'Par valeurs positives' if i==4 else 'Par valeurs négatives',29,SOFT,anchor='mm')
    elif i==6:
        centered_eq(im,158,r"f'(1)=\lim_{h\to0}\mathcal{T}(h)=2",34,BLUE)
        text(im,(360,267),'Une même limite réelle des deux côtés.',27,INK,anchor='mm')
    elif i==7:
        centered_eq(im,160,r"y=f(a)+f'(a)(x-a)",30,INK)
        centered_eq(im,243,r'y=2x-1',34,PINK)
    d.rounded_rectangle((20,315,700,812),radius=18,fill='#0b1930',outline='#33435a',width=1)
    for x in [-1,0,1,2,3,4]:d.line((*ppoint(x,-.4),*ppoint(x,4.1)),fill='#24334a',width=1)
    for y in range(5):d.line((*ppoint(-1.7,y),*ppoint(4.5,y)),fill='#24334a',width=1)
    d.line((*ppoint(-1.7,0),*ppoint(4.5,0)),fill='#899bb5',width=2)
    d.line((*ppoint(0,-.4),*ppoint(0,4.1)),fill='#899bb5',width=2)
    for x in [-1,1,2,3,4]:text(im,(ppoint(x,0)[0],765),str(x),23,SOFT,anchor='mt')
    for y in range(1,5):text(im,(212,ppoint(0,y)[1]),str(y),23,SOFT,anchor='rm')
    text(im,(211,762),'0',23,SOFT,anchor='rt')
    text(im,(672,765),'x',24,SOFT);text(im,(239,329),'y',24,SOFT)
    pts=[ppoint(x,x*x) for x in np.linspace(-1.7,math.sqrt(4.1),400)]
    d.line(pts,fill=BLUE,width=5,joint='curve')
    text(im,(490,339),'f(x) = x²',29,BLUE,True)
    return im

def phone_line(im,m,color,width=4):
    low=max(-1.7,1+(-.4-1)/m);high=min(4.5,1+(4.1-1)/m)
    ImageDraw.Draw(im).line((*ppoint(low,1+m*(low-1)),*ppoint(high,1+m*(high-1))),fill=color,width=width)

def phone_frame(t):
    i=next((i for i,(a,b,_,_) in enumerate(SCENES) if a<=t<b),7)
    im=phone_plate(i).copy();d=ImageDraw.Draw(im)
    a,b,_,_=SCENES[i];u=clamp((t-a)/(b-a));h=1.
    if i==0:h=.7+.3*math.cos(t*.5)
    if i==1:h=1-.2*ease((u-.3)/.6)
    if i==3:h=1-.5*ease(u)
    if i==4:h=10**(-3*ease(u))
    if i==5:h=-.8*10**(-3*ease(u))
    A=ppoint(1,1)
    if i in (4,5):phone_line(im,2,'#a3658a',2)
    if i<6:
        phone_line(im,2+h,GOLD)
        B=ppoint(1+h,(1+h)**2);C=ppoint(1+h,1)
        if i in (1,2):
            dash(d,A,C,BLUE,2);dash(d,C,B,PINK,2)
            text(im,((A[0]+C[0])/2,A[1]+28),'h',28,BLUE,True,anchor='mm')
            text(im,(C[0]+18,(B[1]+C[1])/2),'f(a+h) − f(a)',23,PINK,anchor='lm')
        d.ellipse((B[0]-8,B[1]-8,B[0]+8,B[1]+8),fill=BLUE,outline=BG,width=2)
        if abs(h)>.15:text(im,(B[0]+14,B[1]-30),'B',28,BLUE,True)
        else:
            d.line((B[0],B[1]-10,B[0]+32,B[1]-64),fill=BLUE,width=2)
            text(im,(B[0]+37,B[1]-88),'B',28,BLUE,True)
        if i>=3:
            d.rounded_rectangle((459,627,680,727),radius=12,fill='#15263e')
            text(im,(473,640),'h = '+fmt(h),27,BLUE)
            eq(im,(473,682),r'\mathcal{T}(h)='+fmt(2+h).replace(',',r'{,}'),23,GOLD)
    else:
        phone_line(im,2,PINK,5)
        text(im,(471,505),'Tangente',29,PINK,True)
        text(im,(471,552),'pente : 2',28,PINK)
    d.ellipse((A[0]-7,A[1]-7,A[0]+7,A[1]+7),fill=INK,outline=BG,width=2)
    text(im,(A[0]-28,A[1]+18),'A',28,INK,True)
    cap=next((s for a,b,s in CAPTIONS if a<=t<b),CAPTIONS[-1][2])
    rows=wrap_text(cap);assert len(rows)<=3,(t,rows)
    for j,s in enumerate(rows):text(im,(360,833+j*34),s,29,INK,anchor='mt')
    d.line((32,945,688,945),fill='#293b56',width=3)
    d.line((32,945,32+656*t/140,945),fill=GOLD,width=3)
    return im

if __name__=='__main__':
    for t in [0,13,30,48,67,79,85,98,108,127,139]:phone_frame(t).save(QA/f'phone-{t:03}.jpg',quality=95)
    phone_frame(0).save(ROOT/'affiche-mobile.jpg',quality=95)
    if '--stills' in sys.argv:sys.exit()
    fps=24
    proc=subprocess.Popen(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{PW}x{PH}','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart',str(ROOT/'Derivee_limite_Faicel_Missaoui_mobile.mp4')],stdin=subprocess.PIPE)
    for j in range(140*fps):
        proc.stdin.write(phone_frame(j/fps).tobytes())
        if j%(fps*20)==0:print(f'Portrait {j//fps}/140 s',flush=True)
    proc.stdin.close();assert proc.wait()==0
