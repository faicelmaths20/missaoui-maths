'use strict';
const $=id=>document.getElementById(id),video=$('video'),play=$('play');
const filmFormats={portrait:{file:'Derivee_limite_Faicel_Missaoui_mobile.mp4?v=2',poster:'affiche-mobile.jpg?v=2'},landscape:{file:'Derivee_limite_Faicel_Missaoui.mp4?v=2',poster:'affiche.jpg?v=2'}};
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
for(let x=-1;x<=5;x++){svgEl('line',{x1:px(x),y1:30,x2:px(x),y2:460,stroke:x===0?'#8595ac':'#20304a','stroke-width':x===0?1.5:1});if(x!==0)svgEl('text',{x:px(x),y:423,fill:'#b7c4da','font-size':16,'text-anchor':'middle'}).textContent=x;}
for(let y=0;y<=4;y++){svgEl('line',{x1:30,y1:py(y),x2:610,y2:py(y),stroke:y===0?'#8595ac':'#20304a','stroke-width':y===0?1.5:1});svgEl('text',{x:145,y:py(y)+5,fill:'#b7c4da','font-size':16,'text-anchor':'end'}).textContent=y;}
svgEl('text',{x:595,y:429,fill:'#b7c4da','font-size':20}).textContent='x';svgEl('text',{x:174,y:46,fill:'#b7c4da','font-size':20}).textContent='y';
let curve='';for(let x=-1.6;x<=2.3;x+=.012){curve+=(curve?'L':'M')+px(x)+','+py(x*x);}$('curve').setAttribute('d',curve);
function line(m){return `M${px(-2)},${py(1-3*m)}L${px(6)},${py(1+5*m)}`;}
$('tangent').setAttribute('d',line(2));
let animation=0;
const format=v=>v.toFixed(3).replace('.',',').replace('-','−');
function stop(){cancelAnimationFrame(animation);animation=0;$('animate').textContent='Animer h vers 0';}
function draw(h){
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
