function ouvrirProf(){const code=prompt('Code professeur :');if(code==='maths2026'){window.location.href='auth.html'}else if(code!==null){alert('Code incorrect')}}
// Sauvegarde simple des clics/progressions dans le navigateur de l'élève
function validerChapitre(nom){localStorage.setItem('chapitre_'+nom,'validé');alert('Chapitre validé !')}