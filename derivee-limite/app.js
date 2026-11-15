'use strict';
const $=id=>document.getElementById(id),video=$('video'),play=$('play');
const filmFormats={portrait:{file:'Derivee_limite_Faicel_Missaoui_mobile.mp4?v=4',poster:'affiche-mobile.jpg?v=4'},landscape:{file:'Derivee_limite_Faicel_Missaoui.mp4?v=4',poster:'affiche.jpg?v=4'}};
function selectFilmFormat(format,initial=false){
 const media=filmFormats[format],time=initial?0:video.currentTime,playing=!initial&&!video.paused;
 video.pause();$('screen').classList.toggle('portrait',format==='portrait');$('screen').classList.toggle('landscape',format==='landscape');
 video.poster=media.poster;video.src=media.file;$('download-film').href=media.file;$('film-format').value=format;
 video.addEventListener('loadedmetadata',()=>{video.currentTime=Math.min(time,video.duration||140);video.playbackRate=Number($('speed').value);if(playing)video.play().catch(()=>{});},{once:true});
 video.load();
}
$('film-format').addEventListener('change',e=>selectFilmFormat(e.target.value));
function closeExpandedFilm(){document.body.classList.remove('film-expanded');if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});}
$('fullscreen').addEventListener('click',()=>{document.body.classList.add('film-expanded');if(video.webkitEnterFullscreen){video.webkitEnterFullscreen();}else if(video.requestFullscreen){video.requestFullscreen().catch(()=>{});}});
$('exit-fullscreen').addEventListener('click',closeExpandedFilm);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeExpandedFilm();});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement)document.body.classList.remove('film-expanded');});
video.addEventListener('webkitendfullscreen',closeExpandedFilm);
function toggleFilm(){if(video.paused){if(video.ended)video.currentTime=0;video.play().catch(()=>{play.textContent='▶ Lire avec les commandes vidéo';});}else video.pause();}
play.addEventListener('click',toggleFilm);
video.addEventListener('play',()=>play.textContent='Ⅱ Pause');
video.addEventListener('pause',()=>play.textContent='▶ Reprendre');
video.addEventListener('ended',()=>play.textContent='↻ Revoir le film');
$('speed').addEventListener('change',e=>video.playbackRate=Number(e.target.value));
const chapters=[...document.querySelectorAll('[data-time]')];
chapters.forEach(b=>b.addEventListener('click',()=>{video.currentTime=Number(b.dataset.time);video.play().catch(()=>{});}));
video.addEventListener('timeupdate',()=>{let k=0;chapters.forEach((b,i)=>{if(video.currentTime>=Number(b.dataset.time))k=i;});chapters.forEach((b,i)=>{b.classList.toggle('active',i===k);if(i===k)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});});
chapters[0].classList.add('active');
const ns='http://www.w3.org/2000/svg',grid=$('grid');
function svgEl(tag,attrs,parent=grid){const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));parent.appendChild(e);return e;}
const px=x=>160+80*x,py=y=>400-80*y;
for(let x=-1;x<=5;x++){svgEl('line',{x1:px(x),y1:30,x2:px(x),y2:460,stroke:x===0?'#8595ac':'#20304a','stroke-width':x===0?1.5:1});}
for(let y=0;y<=4;y++){svgEl('line',{x1:30,y1:py(y),x2:610,y2:py(y),stroke:y===0?'#8595ac':'#20304a','stroke-width':y===0?1.5:1});}
svgEl('text',{x:595,y:429,fill:'#b7c4da','font-size':20}).textContent='x';svgEl('text',{x:174,y:46,fill:'#b7c4da','font-size':20}).textContent='y';
let curve='';for(let x=-1.6;x<=2.3;x+=.012){curve+=(curve?'L':'M')+px(x)+','+py(x*x);}$('curve').setAttribute('d',curve);
function line(m){return `M${px(-2)},${py(1-3*m)}L${px(6)},${py(1+5*m)}`;}
$('tangent').setAttribute('d',line(2));
const projectionLayer=$('axis-projections');
function projections(h){
 projectionLayer.replaceChildren();
 const p=(tag,attrs)=>svgEl(tag,attrs,projectionLayer);
 const dashed=(x1,y1,x2,y2,c)=>p('line',{x1,y1,x2,y2,stroke:c,'stroke-width':1.5,'stroke-dasharray':'5 5'});
 const label=(x,y,t,c,anchor='middle')=>{p('text',{x,y,fill:c,'font-size':20,'text-anchor':anchor,'paint-order':'stroke',stroke:'#0b1930','stroke-width':4,'stroke-linejoin':'round'}).textContent=t;};
 dashed(240,400,240,320,'#8a96aa');dashed(160,320,240,320,'#8a96aa');
 label(240,425,'a','#f5f3eb');label(147,343,'f(a)','#f5f3eb','end');label(148,423,'0','#b7c4da','end');
 if(h===0)return;
 const x=px(1+h),y=py((1+h)**2),c='#79d8ff';
 dashed(x,400,x,y,c);dashed(160,y,x,y,c);
 let lx=Math.abs(x-240)<60?240+Math.sign(h)*60:x;
 let ly=Math.abs(y-320)<48?(h>0?288:375):y;
 p('line',{x1:x,y1:405,x2:lx,y2:439,stroke:c});
 p('line',{x1:155,y1:y,x2:142,y2:ly,stroke:c});
 label(lx,461,'a+h',c);label(140,ly+6,'f(a+h)',c,'end');
}
let animation=0;
const format=v=>v.toFixed(3).replace('.',',').replace('-','−');
function stop(){cancelAnimationFrame(animation);animation=0;$('animate').textContent='Animer h vers 0';}
function draw(h){
 projections(h);
 $('h').value=h;$('h-value').textContent='h = '+format(h);$('h').setAttribute('aria-valuetext',format(h));
 const zero=h===0;for(const id of ['secant','triangle','pointB','labelB'])$(id).style.display=zero?'none':'';
 $('simplified').textContent=zero?' : non défini':' = 2 + h';$('slope-value').textContent=zero?'Non définie':format(2+h);
 if(zero){$('note').textContent='À h = 0, A et B se confondent. Le quotient est non défini. La tangente de pente 2 est obtenue par la limite, pas en divisant par zéro.';}
 else{
  $('secant').setAttribute('d',line(2+h));let bx=px(1+h),by=py((1+h)**2);
  $('pointB').setAttribute('cx',bx);$('pointB').setAttribute('cy',by);
  $('labelB').setAttribute('x',bx+13);$('labelB').setAttribute('y',by-16);
  $('triangle').setAttribute('d',`M240,320L${bx},320L${bx},${by}`);
  $('note').textContent=Math.abs(h)<.02?'La pente est très proche de 2. Tant que h ≠ 0, le quotient est défini et (AB) reste une sécante.':h>0?'B est à droite de A. Faites diminuer h vers 0 : la pente 2 + h se rapproche de 2.':'B est à gauche de A. Faites augmenter h vers 0 : la pente 2 + h se rapproche de 2.';
 }
 $('graph-desc').textContent=zero?'h vaut zéro : la sécante est non définie. La tangente a pour pente 2.':`Pour h égal à ${format(h)}, la pente de la sécante est ${format(2+h)}. La tangente a pour pente 2.`;
}
$('h').addEventListener('input',e=>{stop();draw(Number(e.target.value));});
document.querySelectorAll('[data-h]').forEach(b=>b.addEventListener('click',()=>{stop();draw(Number(b.dataset.h));}));
$('show-tangent').addEventListener('change',e=>$('tangent').style.display=e.target.checked?'':'none');
$('animate').addEventListener('click',()=>{if(animation){stop();return;}let h=Number($('h').value);if(Math.abs(h)<.02)h=h<0?-1:1;const initial=h,start=performance.now();$('animate').textContent='Ⅱ Arrêter';function tick(now){const t=Math.min((now-start)/8500,1),value=Math.sign(initial)*Math.exp(Math.log(Math.abs(initial))*(1-t)+Math.log(.001)*t);draw(value);if(t<1)animation=requestAnimationFrame(tick);else{stop();draw(Math.sign(initial)*.001);}}animation=requestAnimationFrame(tick);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});draw(1);
selectFilmFormat(window.matchMedia('(max-width:750px)').matches?'portrait':'landscape',true);

// Licensed YouTube stream: no extraction, local copy or hidden player.
let musicPlayer=null,musicEnabled=false,musicReady=false,musicRequested=false;
const musicStatus=$('music-status');
function musicPlay(){
 if(musicEnabled&&musicReady){musicPlayer.seekTo(video.currentTime,true);musicPlayer.playVideo();}
}
window.onYouTubeIframeAPIReady=()=>{
 musicPlayer=new YT.Player('youtube-player',{
  width:360,height:220,videoId:'Y4cwADrASCg',host:'https://www.youtube-nocookie.com',
  playerVars:{playsinline:1,rel:0,origin:location.origin},events:{
   onReady:()=>{musicReady=true;musicPlayer.setVolume(28);musicStatus.textContent='Lecteur prêt. Lancez le film avec la musique.';},
   onStateChange:e=>{if(e.data===1){musicStatus.textContent='Musique activée · Vangelis';if(video.paused&&musicRequested)video.play().catch(()=>{});}},
   onAutoplayBlocked:()=>{musicStatus.textContent='Touchez ▶ dans le lecteur YouTube pour démarrer la musique.';},
   onError:()=>{musicStatus.textContent='La lecture intégrée est indisponible ici. Utilisez le lien « Écouter sur YouTube ».';$('play-with-music').disabled=true;}
  }
 });
};
$('enable-music').addEventListener('click',()=>{
 musicEnabled=!musicEnabled;
 $('music-panel').hidden=!musicEnabled;
 $('enable-music').setAttribute('aria-expanded',String(musicEnabled));
 $('enable-music').textContent=musicEnabled?'♫ Désactiver la musique':'♫ Activer la musique';
 if(!musicEnabled){musicRequested=false;if(musicReady)musicPlayer.pauseVideo();return;}
 if(!document.getElementById('youtube-api')){
  const script=document.createElement('script');script.id='youtube-api';script.src='https://www.youtube.com/iframe_api';
  script.onerror=()=>{musicStatus.textContent='Le lecteur musical ne peut pas se charger. Utilisez le lien YouTube.';};document.head.appendChild(script);
 }
});
$('play-with-music').addEventListener('click',()=>{
 musicRequested=true;if(video.ended)video.currentTime=0;musicPlay();
 video.play().catch(()=>{musicStatus.textContent='Touchez ▶ sur le film pour démarrer.';});
 if(!musicReady)musicStatus.textContent='Le film démarre. Touchez ▶ dans le lecteur musical dès son chargement.';
});
video.addEventListener('play',()=>{if(musicRequested)musicPlay();});
video.addEventListener('pause',()=>{if(musicReady&&musicEnabled)musicPlayer.pauseVideo();});
video.addEventListener('ended',()=>{if(musicReady)musicPlayer.pauseVideo();});
video.addEventListener('seeked',()=>{if(musicReady&&musicEnabled)musicPlayer.seekTo(video.currentTime,true);});
