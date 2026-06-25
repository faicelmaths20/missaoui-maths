const DATA = {
  tunisie: {
    label: "Système tunisien",
    home: "systeme-tunisie.html",
    levels: {
      "1ere": { title: "1re année secondaire", description: "Fondements numériques, algébriques et géométriques.", chapters: ["Activités numériques","Calcul algébrique","Équations et inéquations","Fonctions","Géométrie plane","Trigonométrie","Statistiques","Algorithmique"] },
      "2e": { title: "2e année secondaire", description: "Approfondissement progressif des méthodes et du raisonnement.", chapters: ["Calcul dans ℝ","Polynômes","Équations et inéquations","Fonctions de référence","Géométrie analytique","Trigonométrie","Statistiques et probabilités","Algorithmique"] },
      "3e": { title: "3e année secondaire", description: "Préparation aux notions du cycle terminal.", chapters: ["Suites numériques","Limites et continuité","Dérivation","Fonctions usuelles","Nombres complexes","Géométrie dans l’espace","Probabilités","Statistiques"] },
      "4e": { title: "4e année secondaire", description: "Programme du baccalauréat et préparation intensive aux épreuves.", chapters: ["Limites et continuité","Dérivation et étude de fonctions","Fonction logarithme","Fonction exponentielle","Suites numériques","Nombres complexes","Primitives et intégrales","Équations différentielles","Probabilités","Statistiques","Géométrie dans l’espace","Sujets de baccalauréat"] }
    }
  },
  france: {
    label: "Système français",
    home: "systeme-france.html",
    levels: {
      "6e": { title: "Sixième", description: "Construire des bases solides en calcul et en géométrie.", chapters: ["Nombres entiers et décimaux","Fractions","Calcul mental","Proportionnalité","Longueurs et aires","Angles","Symétrie axiale","Solides","Organisation de données"] },
      "5e": { title: "Cinquième", description: "Développer les automatismes et le raisonnement.", chapters: ["Nombres relatifs","Fractions","Calcul littéral","Proportionnalité","Statistiques","Probabilités","Triangles","Symétries","Volumes"] },
      "4e": { title: "Quatrième", description: "Consolider le calcul et les premières notions fonctionnelles.", chapters: ["Nombres relatifs","Puissances","Calcul littéral","Équations","Fonctions","Théorème de Pythagore","Théorème de Thalès","Statistiques et probabilités","Algorithmique"] },
      "3e": { title: "Troisième", description: "Préparation au diplôme national du brevet.", chapters: ["Arithmétique","Calcul littéral","Équations et inéquations","Fonctions affines","Fonctions linéaires","Thalès et trigonométrie","Géométrie dans l’espace","Statistiques","Probabilités","Sujets de brevet"] },
      "seconde": { title: "Seconde", description: "Consolider les acquis du collège et préparer les spécialités.", chapters: ["Nombres et calculs","Intervalles et inégalités","Vecteurs","Équations de droites","Fonctions de référence","Variations et extremums","Statistiques","Probabilités","Échantillonnage","Algorithmique"] },
      "premiere": { title: "Première — spécialité mathématiques", description: "Cours et exercices conformes au programme de spécialité.", chapters: ["Second degré","Suites numériques","Dérivation","Fonction exponentielle","Trigonométrie","Produit scalaire","Probabilités conditionnelles","Variables aléatoires","Géométrie repérée","Algorithmique"] },
      "terminale": { title: "Terminale — spécialité mathématiques", description: "Préparation complète au baccalauréat et aux études supérieures.", chapters: ["Suites","Limites de fonctions","Continuité","Dérivation et convexité","Fonction logarithme","Primitives et intégrales","Équations différentielles","Combinatoire et dénombrement","Probabilités","Géométrie dans l’espace","Algorithmique","Préparation au baccalauréat","Grand Oral"] }
    }
  }
};

function sanitize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const systemKey = params.get("systeme") || "france";
  const levelKey = params.get("niveau") || "terminale";
  const system = DATA[systemKey] || DATA.france;
  const level = system.levels[levelKey] || Object.values(system.levels)[0];

  document.title = `${level.title} | Missaoui Mathématiques`;
  document.getElementById("system-label").textContent = system.label;
  document.getElementById("level-title").textContent = level.title;
  document.getElementById("level-description").textContent = level.description;

  document.getElementById("breadcrumb").innerHTML = `
    <a href="index.html">Accueil</a><span>›</span>
    <a href="${system.home}">${system.label}</a><span>›</span>
    <span>${level.title}</span>`;

  const grid = document.getElementById("chapter-grid");
  const empty = document.getElementById("empty-state");

  function render(filter = "") {
    const chapters = level.chapters.filter(ch => sanitize(ch).includes(sanitize(filter)));
    grid.innerHTML = chapters.map((chapter, i) => `
      <article class="chapter-card">
        <span class="chapter-index">CHAPITRE ${String(i + 1).padStart(2, "0")}</span>
        <h3>${chapter}</h3>
        <p>Cours, méthodes, exercices progressifs, corrections et ressources de révision.</p>
        <a href="#" onclick="alert('Ajoutez ici le lien vers vos documents pour ce chapitre.'); return false;">Consulter les ressources →</a>
      </article>`).join("");
    empty.hidden = chapters.length !== 0;
  }

  render();
  document.getElementById("chapter-search").addEventListener("input", e => render(e.target.value));
});