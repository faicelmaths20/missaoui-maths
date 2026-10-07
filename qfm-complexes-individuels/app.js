'use strict';
const app=document.getElementById('app');
const num=Number(document.body.dataset.niveau);
const valid=Number.isInteger(num)&&num>=1&&num<=LEVELS.length;
let pos=0,answers=Array(20).fill(null),locked=Array(20).fill(false),ended=false;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Render written quotients as stacked fractions, including nested fractions.
// All ordinary text is escaped before insertion into the page.
function math(value, inheritedNodes = []) {
  let source = String(value);
  const nodes = [...inheritedNodes];
  const atom = c => !!c && /[\p{L}\p{N}\p{M}√\uE000-\uF8FF]/u.test(c);
  function closeAt(s,start){let depth=0;for(let i=start;i<s.length;i++){if(s[i]==='(')depth++;else if(s[i]===')'&&--depth===0)return i+1;}return start;}
  function leftStart(s,end){
    let p=end;
    if(s[p-1]===')'){
      let depth=1;p-=1;
      while(p>0&&depth){p--;if(s[p]===')')depth++;else if(s[p]==='(')depth--;}
      // Keep a function name, radical or coefficient with its argument.
      while(p>0&&atom(s[p-1]))p--;
    }else if(s[p-1]==='|'){
      p=s.lastIndexOf('|',p-2);if(p<0)return end;
    }else{while(p>0&&atom(s[p-1]))p--;}
    // A spaced function such as sin u remains a single operand.
    const prefix=s.slice(0,p).match(/(?:sin|cos|tan|cot|Re|Im|arg)\s+$/);
    if(prefix)p-=prefix[0].length;
    return p;
  }
  function rightEnd(s,start){
    let p=start;
    if(s[p]==='−'||s[p]==='-')p++;
    if(s[p]==='(')return closeAt(s,p);
    if(s[p]==='|'){const end=s.indexOf('|',p+1);return end<0?start:end+1;}
    while(atom(s[p]))p++;
    if(s[p]==='(')p=closeAt(s,p);
    else if(/^(sin|cos|tan|cot|Re|Im|arg)$/.test(s.slice(start,p))){
      while(s[p]===' ')p++;
      if(s[p]==='(')p=closeAt(s,p);else while(atom(s[p]))p++;
    }
    return p;
  }
  const ungroup=s=>s[0]==='('&&closeAt(s,0)===s.length?s.slice(1,-1):s;
  // Nodes use private markers so generated HTML is never parsed as input.
  while(source.includes('/')){
    const slash=source.indexOf('/');let endLeft=slash,startRight=slash+1;
    while(source[endLeft-1]===' ')endLeft--;
    while(source[startRight]===' ')startRight++;
    const start=leftStart(source,endLeft),end=rightEnd(source,startRight);
    if(start===endLeft||end===startRight){
      const marker=String.fromCharCode(0xE000+nodes.length);nodes.push('/');
      source=source.slice(0,slash)+marker+source.slice(slash+1);continue;
    }
    const numerator=ungroup(source.slice(start,endLeft));
    const denominator=ungroup(source.slice(startRight,end));
    const top=math(numerator,nodes),bottom=math(denominator,nodes);
    const node=`<span class="fraction"><span class="fraction-top">${top}</span><span class="fraction-bottom">${bottom}</span></span>`;
    const marker=String.fromCharCode(0xE000+nodes.length);nodes.push(node);
    source=source.slice(0,start)+marker+source.slice(end);
  }
  let html=esc(source).replace(/e\^\(([^()]*)\)/g,'e<sup class="math-power">$1</sup>');
  return html.replace(/[\uE000-\uF8FF]/g,c=>nodes[c.charCodeAt(0)-0xE000]);
}

function best(i){try{return Number(localStorage.getItem('qfm-complexes-v2-'+i))||0;}catch{return 0;}}
function totals(){return {done:locked.filter(Boolean).length,score:valid?locked.reduce((s,v,i)=>s+(v&&answers[i]===LEVELS[num-1].questions[i].answer?1:0),0):0};}
function remember(score){try{localStorage.setItem('qfm-complexes-v2-'+num,String(Math.max(best(num),score)));}catch{}}
function resources(){return '<div class="actions"><a class="secondary" href="enonce.pdf">Énoncé PDF</a><a class="secondary" href="corrige.pdf">Corrigé PDF</a></div>';}
function render(){if(!valid){app.textContent='Niveau introuvable.';return;}const level=LEVELS[num-1],q=level.questions[pos],t=totals();document.title=`QFM ${num} · ${level.title} · Faicel Missaoui`;app.innerHTML=`<div class="quiz"><div class="eyebrow">Quiz indépendant · Niveau ${num}</div><h1>${esc(level.title)}</h1>${resources(num)}<div class="top"><span>Niveau ${num} · ${t.done}/20 réponses validées</span><strong>Score : ${t.score}/20</strong></div><progress max="20" value="${t.done}" aria-label="Progression"></progress>${ended?`<section class="card"><div class="eyebrow">Bilan du niveau ${num}</div><h2>Quiz terminé</h2><div class="score">${t.score}<span> / 20</span></div><p>${t.score===20?'Toutes les réponses sont justes. Vérifiez maintenant que vous savez rédiger les solutions de l’exercice.':t.score>=16?'Les bases sont solides. Reprenez les corrections des questions manquées.':'Reprenez le rappel de cours et les corrections, puis refaites ce quiz.'}</p><div class="actions"><button class="primary" id="errors">${t.score===20?'Relire les corrections':'Revoir mes erreurs'}</button><button class="secondary" id="restart">Recommencer</button></div></section>`:`<section class="card"><div class="eyebrow">Question ${pos+1} sur 20</div>${level.context?`<details class="hint"><summary>Données du niveau</summary><p>${math(level.context)}</p></details>`:''}<h2 id="question" tabindex="-1">${math(q.q)}</h2><details class="hint" ${locked[pos]?'hidden':''}><summary>Coup de pouce</summary><p>${math(q.hint)}</p></details><div class="options" role="group" aria-labelledby="question">${q.options.map((o,i)=>`<button class="option ${answers[pos]===i?'selected':''} ${locked[pos]&&i===q.answer?'correct':''} ${locked[pos]&&answers[pos]===i&&i!==q.answer?'wrong':''}" data-choice="${i}" aria-pressed="${answers[pos]===i}" ${locked[pos]?'disabled':''}><span class="letter">${'ABCD'[i]}</span><span>${math(o)}${locked[pos]&&i===q.answer?' · ✓ Bonne réponse':''}${locked[pos]&&answers[pos]===i&&i!==q.answer?' · Votre réponse':''}</span></button>`).join('')}</div>${locked[pos]?`<div class="feedback" role="status"><strong>${answers[pos]===q.answer?'Réponse juste':'À reprendre'}</strong><p>${math(q.explanation)}</p></div>`:''}<div class="actions"><button class="secondary" id="prev" ${pos===0?'disabled':''}>← Précédente</button>${!locked[pos]?`<button class="primary" id="validate" ${answers[pos]===null?'disabled':''}>Valider</button>`:`<button class="primary" id="next">${t.done===20?'Voir le bilan':pos<19?'Suivante →':'Question restante →'}</button>`}</div></section>`}<nav class="nav" aria-label="Questions du quiz">${level.questions.map((x,i)=>`<button data-jump="${i}" class="${!ended&&i===pos?'current':''} ${locked[i]?(answers[i]===x.answer?'good':'bad'):''}" aria-label="Question ${i+1}${locked[i]?(answers[i]===x.answer?', réponse juste':', à reprendre'): ', non validée'}">${i+1}</button>`).join('')}</nav><p class="meta">Les réponses validées sont verrouillées. Un clic sur un numéro permet de relire la question et sa correction.</p></div>`;
app.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{answers[pos]=Number(b.dataset.choice);render();document.getElementById('validate')?.focus();});
app.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{pos=Number(b.dataset.jump);ended=false;render();});
const bind=(id,fn)=>{const el=document.getElementById(id);if(el)el.onclick=fn;};
bind('prev',()=>{if(pos>0)pos--;render();});bind('validate',()=>{if(answers[pos]===null||locked[pos])return;locked[pos]=true;if(totals().done===20)remember(totals().score);render();});bind('next',()=>{if(totals().done===20){ended=true;remember(totals().score);}else{pos=pos<19?pos+1:locked.findIndex(x=>!x);}render();document.getElementById('question')?.focus();});bind('errors',()=>{ended=false;pos=level.questions.findIndex((x,i)=>answers[i]!==x.answer);if(pos<0)pos=0;render();});bind('restart',()=>{answers=Array(20).fill(null);locked=Array(20).fill(false);pos=0;ended=false;render();});}
document.getElementById('share').onclick=async()=>{const url=location.href;const title=valid?`QFM ${num} · ${LEVELS[num-1].title}`:'QFM · 10 quiz sur les complexes';try{if(navigator.share){await navigator.share({title,text:title+' — 20 questions corrigées par niveau. Faicel Missaoui.',url});}else if(navigator.clipboard){await navigator.clipboard.writeText(url);document.getElementById('message').textContent='Lien copié : collez-le dans WhatsApp.';}else{prompt('Copiez ce lien pour le partager :',url);}}catch(e){if(e.name!=='AbortError')document.getElementById('message').textContent='Copiez l’adresse de cette page pour la partager.';}};
render();
