const LEVELS = [
  {
    "title": "Calcul algébrique et conjugué",
    "questions": [
      {
        "q": "La partie imaginaire de −5 + 7i est…",
        "options": [
          "7i",
          "−7",
          "7",
          "−5"
        ],
        "answer": 2,
        "hint": "Repérer le coefficient de i.",
        "explanation": "Im(x + iy) = y est un réel : ici 7."
      },
      {
        "q": "Le conjugué de 4 − 3i est…",
        "options": [
          "4 + 3i",
          "−4 + 3i",
          "3 + 4i",
          "−4 − 3i"
        ],
        "answer": 0,
        "hint": "Seul le signe de la partie imaginaire change.",
        "explanation": "La conjugaison conserve 4 et remplace −3i par +3i."
      },
      {
        "q": "i²⁰³¹ vaut…",
        "options": [
          "1",
          "i",
          "−i",
          "−1"
        ],
        "answer": 2,
        "hint": "Chercher le reste de 2031 dans la division par 4.",
        "explanation": "2031 = 4 × 507 + 3, donc i²⁰³¹ = i³ = −i."
      },
      {
        "q": "(3 + 2i) + (−1 + 4i) vaut…",
        "options": [
          "4 + 6i",
          "2 + 8i",
          "2 − 2i",
          "2 + 6i"
        ],
        "answer": 3,
        "hint": "Regrouper les parties de même nature.",
        "explanation": "3 − 1 = 2 et 2 + 4 = 6."
      },
      {
        "q": "(3 + 2i)(1 − i) vaut…",
        "options": [
          "5 + i",
          "5 − i",
          "1 − i",
          "3 − 2i"
        ],
        "answer": 1,
        "hint": "Développer puis remplacer i² par −1.",
        "explanation": "3 − 3i + 2i − 2i² = 5 − i."
      },
      {
        "q": "(3 − 2i)(3 + 2i) vaut…",
        "options": [
          "−13",
          "13i",
          "5",
          "13"
        ],
        "answer": 3,
        "hint": "Utiliser un produit par le conjugué.",
        "explanation": "Le produit vaut 3² + 2² = 13."
      },
      {
        "q": "1/(3 + i) vaut…",
        "options": [
          "(3 − i)/8",
          "3 − i",
          "(3 − i)/10",
          "(3 + i)/10"
        ],
        "answer": 2,
        "hint": "Multiplier numérateur et dénominateur par 3 − i.",
        "explanation": "Le dénominateur devient 3² + 1 = 10."
      },
      {
        "q": "Le module de −5 + 12i vaut…",
        "options": [
          "169",
          "17",
          "7",
          "13"
        ],
        "answer": 3,
        "hint": "Le module est une racine carrée.",
        "explanation": "√(25 + 144) = 13."
      },
      {
        "q": "Si z + z̄ = −8, Re(z) vaut…",
        "options": [
          "0",
          "−4",
          "−8",
          "4"
        ],
        "answer": 1,
        "hint": "Écrire z + z̄ = 2 Re(z).",
        "explanation": "2 Re(z) = −8, donc Re(z) = −4."
      },
      {
        "q": "Si z − z̄ = −6i, Im(z) vaut…",
        "options": [
          "−6",
          "−3i",
          "3",
          "−3"
        ],
        "answer": 3,
        "hint": "Écrire z − z̄ = 2i Im(z).",
        "explanation": "En divisant par 2i, on trouve −3."
      },
      {
        "q": "Quel nombre est imaginaire pur ?",
        "options": [
          "1 − 7i",
          "7 + i",
          "−7",
          "−7i"
        ],
        "answer": 3,
        "hint": "Sa partie réelle doit être nulle.",
        "explanation": "−7i a une partie réelle nulle."
      },
      {
        "q": "Quel nombre est réel ?",
        "options": [
          "i(2 + i)",
          "2i",
          "(2 + i) + (2 − i)",
          "(2 + i) − (2 − i)"
        ],
        "answer": 2,
        "hint": "Chercher l'annulation des termes en i.",
        "explanation": "La somme vaut 4 ; les autres nombres ont une partie imaginaire non nulle."
      },
      {
        "q": "Résoudre z + 2z̄ = 9 + 4i.",
        "options": [
          "z = 9 − 4i",
          "z = 3 − 4i",
          "z = 3 − 2i",
          "z = 3 + 4i"
        ],
        "answer": 1,
        "hint": "Poser z = x + iy.",
        "explanation": "Le membre de gauche vaut 3x − iy : x = 3 et y = −4."
      },
      {
        "q": "Les conditions z + z̄ = −2 et zz̄ = 5 donnent…",
        "options": [
          "z = 1 ± 2i",
          "z = −1 ± i",
          "z = −1 ± 2i",
          "z = −2 ± i"
        ],
        "answer": 2,
        "hint": "Déterminer d'abord la partie réelle.",
        "explanation": "x = −1 et x² + y² = 5 donnent y² = 4."
      },
      {
        "q": "Le conjugué de 2z − iw est…",
        "options": [
          "2z + iw",
          "2z̄ − iw̄",
          "−2z̄ + iw̄",
          "2z̄ + iw̄"
        ],
        "answer": 3,
        "hint": "Conjuguer aussi le coefficient −i.",
        "explanation": "Le conjugué de −i est i ; la conjugaison respecte somme et produit."
      },
      {
        "q": "Pour z ≠ 0, z/z̄ a pour module…",
        "options": [
          "|z|",
          "|z|²",
          "0",
          "1"
        ],
        "answer": 3,
        "hint": "Comparer les modules de z et de son conjugué.",
        "explanation": "|z/z̄| = |z|/|z̄| = 1."
      },
      {
        "q": "L'équation z − z̄ = 1 + 2i admet…",
        "options": [
          "Une infinité de solutions",
          "Aucune solution",
          "Deux solutions",
          "Une solution"
        ],
        "answer": 1,
        "hint": "Quelle est la partie réelle du membre de gauche ?",
        "explanation": "z − z̄ est imaginaire pur, mais 1 + 2i ne l'est pas."
      },
      {
        "q": "Pour z = 2i et w = −2i, |z + w| vaut…",
        "options": [
          "4",
          "0",
          "−4",
          "2"
        ],
        "answer": 1,
        "hint": "Calculer la somme avant son module.",
        "explanation": "z + w = 0, donc le module vaut 0."
      },
      {
        "q": "Si |z|² = 25 et Re(z) = 3, alors Im(z) vaut…",
        "options": [
          "4 ou −4",
          "5 ou −5",
          "16 ou −16",
          "4 seulement"
        ],
        "answer": 0,
        "hint": "Poser z = 3 + iy.",
        "explanation": "9 + y² = 25 donne y = ±4."
      },
      {
        "q": "Pour z = 1 − 2i, z² vaut…",
        "options": [
          "−3 − 4i",
          "−3 + 4i",
          "1 − 4i",
          "5 − 4i"
        ],
        "answer": 0,
        "hint": "Utiliser (a + b)².",
        "explanation": "1 − 4i + 4i² = −3 − 4i."
      }
    ],
    "context": ""
  },
  {
    "title": "Modules, arguments et puissances",
    "questions": [
      {
        "q": "Un argument de −√3 + i est…",
        "options": [
          "π/6",
          "−5π/6",
          "−π/6",
          "5π/6"
        ],
        "answer": 3,
        "hint": "Identifier le quadrant.",
        "explanation": "Le module vaut 2, le cosinus −√3/2 et le sinus 1/2 : angle 5π/6."
      },
      {
        "q": "Une forme exponentielle de −2 − 2i est…",
        "options": [
          "2√2 e^(3iπ/4)",
          "2√2 e^(−iπ/4)",
          "2 e^(−3iπ/4)",
          "2√2 e^(−3iπ/4)"
        ],
        "answer": 3,
        "hint": "Déterminer le module puis le quadrant.",
        "explanation": "Le module est √8 = 2√2 et un argument est −3π/4."
      },
      {
        "q": "Le module de −4e^(iπ/7) vaut…",
        "options": [
          "1",
          "4",
          "16",
          "−4"
        ],
        "answer": 1,
        "hint": "Le module d'un produit est le produit des modules.",
        "explanation": "|−4| = 4 et l'exponentielle a pour module 1."
      },
      {
        "q": "Un argument de −4e^(iπ/7) est…",
        "options": [
          "−π/7",
          "8π/7",
          "6π/7",
          "π/7"
        ],
        "answer": 1,
        "hint": "Le signe moins ajoute π.",
        "explanation": "π/7 + π = 8π/7 modulo 2π."
      },
      {
        "q": "(3e^(iπ/4))(2e^(iπ/4)) vaut…",
        "options": [
          "6",
          "−6i",
          "5i",
          "6i"
        ],
        "answer": 3,
        "hint": "Additionner les arguments.",
        "explanation": "Le module vaut 6 et l'argument π/2."
      },
      {
        "q": "(6e^(iπ/6))/(3e^(−iπ/3)) vaut…",
        "options": [
          "2",
          "i/2",
          "2i",
          "−2i"
        ],
        "answer": 2,
        "hint": "Soustraire l'argument du dénominateur.",
        "explanation": "Le module est 2 et l'argument π/6 + π/3 = π/2."
      },
      {
        "q": "(1 − i)⁶ vaut…",
        "options": [
          "−8",
          "−8i",
          "8i",
          "8"
        ],
        "answer": 2,
        "hint": "1 − i = √2 e^(−iπ/4).",
        "explanation": "La puissance vaut 8e^(−3iπ/2) = 8i."
      },
      {
        "q": "(√3 + i)³ vaut…",
        "options": [
          "8i",
          "−8",
          "8",
          "4i"
        ],
        "answer": 0,
        "hint": "Le nombre a pour argument π/6.",
        "explanation": "(2e^(iπ/6))³ = 8e^(iπ/2)."
      },
      {
        "q": "Si arg(z) ≡ π/5, un argument de z²/z̄ est…",
        "options": [
          "−π/5",
          "2π/5",
          "3π/5",
          "π/5"
        ],
        "answer": 2,
        "hint": "Conjuguer change le signe de l'argument.",
        "explanation": "2π/5 − (−π/5) = 3π/5."
      },
      {
        "q": "Si z ≠ 0 et arg(z) ≡ −π/3, un argument de −z est…",
        "options": [
          "−π/3",
          "π/3",
          "2π/3",
          "−2π/3"
        ],
        "answer": 2,
        "hint": "Multiplier par −1 ajoute π.",
        "explanation": "−π/3 + π = 2π/3."
      },
      {
        "q": "Le nombre e^(iπ/2) + e^(−iπ/2) possède…",
        "options": [
          "Un argument π/2",
          "Un argument 0",
          "Aucun argument",
          "Un argument π"
        ],
        "answer": 2,
        "hint": "Calculer les deux termes.",
        "explanation": "i + (−i) = 0 ; zéro n'a pas d'argument."
      },
      {
        "q": "|1 − e^(it)| vaut, pour tout réel t…",
        "options": [
          "2sin(t/2)",
          "1",
          "2|cos(t/2)|",
          "2|sin(t/2)|"
        ],
        "answer": 3,
        "hint": "Factoriser par e^(it/2).",
        "explanation": "1 − e^(it) = −2i sin(t/2)e^(it/2), d'où la valeur absolue."
      },
      {
        "q": "Pour 0 < t < 2π, un argument de 1 − e^(it) est…",
        "options": [
          "t/2 − π/2",
          "−t/2",
          "t/2",
          "t/2 + π/2"
        ],
        "answer": 0,
        "hint": "Le sinus de t/2 est strictement positif.",
        "explanation": "Dans −2i sin(t/2)e^(it/2), le facteur −i apporte −π/2."
      },
      {
        "q": "|1 + e^(2iπ/3)| vaut…",
        "options": [
          "√3",
          "2",
          "1",
          "0"
        ],
        "answer": 2,
        "hint": "Utiliser le cosinus de la moitié de l'angle.",
        "explanation": "2|cos(π/3)| = 1."
      },
      {
        "q": "Un argument de 1 + e^(4iπ/3) est…",
        "options": [
          "−2π/3",
          "2π/3",
          "−π/3",
          "π/3"
        ],
        "answer": 2,
        "hint": "Ne pas lire l'argument avant de vérifier le signe du facteur.",
        "explanation": "La somme vaut 1/2 − i√3/2 ; un argument est −π/3."
      },
      {
        "q": "cos(5π/12) vaut…",
        "options": [
          "−1/2",
          "(√6 + √2)/4",
          "(√6 − √2)/4",
          "√3/2"
        ],
        "answer": 2,
        "hint": "Écrire 5π/12 = π/4 + π/6.",
        "explanation": "La formule d'addition donne (√6 − √2)/4."
      },
      {
        "q": "sin(5π/12) vaut…",
        "options": [
          "1/2",
          "(√6 + √2)/4",
          "−√2/2",
          "(√6 − √2)/4"
        ],
        "answer": 1,
        "hint": "Utiliser le sinus d'une somme.",
        "explanation": "sin(π/4 + π/6) = (√6 + √2)/4."
      },
      {
        "q": "Pour u = e^(iπ/4) et n entier naturel, uⁿ est réel si et seulement si…",
        "options": [
          "n est multiple de 3",
          "n est multiple de 8",
          "n est multiple de 4",
          "n est impair"
        ],
        "answer": 2,
        "hint": "Un réel non nul a un argument nul modulo π.",
        "explanation": "nπ/4 appartient à πℤ exactement lorsque n est multiple de 4."
      },
      {
        "q": "Pour u = e^(iπ/4) et n entier naturel, uⁿ = 1 si et seulement si…",
        "options": [
          "n est multiple de 8",
          "n est multiple de 6",
          "n est pair",
          "n est multiple de 4"
        ],
        "answer": 0,
        "hint": "Cette fois, utiliser une congruence modulo 2π.",
        "explanation": "nπ/4 appartient à 2πℤ exactement lorsque n est multiple de 8."
      },
      {
        "q": "Pour z ≠ 0, les arguments de z et 2z sont…",
        "options": [
          "Opposés modulo 2π",
          "Décalés de π",
          "Toujours nuls",
          "Égaux modulo 2π"
        ],
        "answer": 3,
        "hint": "Le facteur 2 est réel strictement positif.",
        "explanation": "Multiplier par un réel positif conserve la direction."
      }
    ],
    "context": "Les congruences d’arguments sont prises modulo 2π, sauf mention contraire. Les puissances n sont à exposant entier naturel."
  },
  {
    "title": "Euler et linéarisation",
    "questions": [
      {
        "q": "e^(2ix) + e^(−2ix) vaut…",
        "options": [
          "2 cos(2x)",
          "2i sin(2x)",
          "2 sin(2x)",
          "cos(2x)"
        ],
        "answer": 0,
        "hint": "Additionner deux exponentielles conjuguées.",
        "explanation": "La formule d'Euler donne deux fois le cosinus."
      },
      {
        "q": "e^(3ix) − e^(−3ix) vaut…",
        "options": [
          "2i sin(3x)",
          "2 sin(3x)",
          "i cos(3x)",
          "2 cos(3x)"
        ],
        "answer": 0,
        "hint": "Soustraire les deux écritures trigonométriques.",
        "explanation": "Les cosinus s'annulent et les sinus s'ajoutent."
      },
      {
        "q": "Une linéarisation de sin²(2x) est…",
        "options": [
          "sin(4x)/2",
          "(1 − cos(4x))/2",
          "(1 + cos(4x))/2",
          "1 − cos(4x)"
        ],
        "answer": 1,
        "hint": "Appliquer l'angle double à 2x.",
        "explanation": "sin²u = (1 − cos(2u))/2 avec u = 2x."
      },
      {
        "q": "Une linéarisation de cos²(3x) est…",
        "options": [
          "1 + cos(6x)",
          "cos(6x)/2",
          "(1 − cos(6x))/2",
          "(1 + cos(6x))/2"
        ],
        "answer": 3,
        "hint": "Utiliser la formule de cos²u.",
        "explanation": "cos²u = (1 + cos(2u))/2."
      },
      {
        "q": "2 sin(2x) cos(2x) vaut…",
        "options": [
          "cos(4x)",
          "2 sin(4x)",
          "sin(2x)",
          "sin(4x)"
        ],
        "answer": 3,
        "hint": "Reconnaître la duplication du sinus.",
        "explanation": "2 sin u cos u = sin(2u)."
      },
      {
        "q": "cos(5x) cos(x) vaut…",
        "options": [
          "cos(6x)",
          "(cos(6x) − cos(4x))/2",
          "cos(5x²)",
          "(cos(6x) + cos(4x))/2"
        ],
        "answer": 3,
        "hint": "Additionner les formules de cos(a+b) et cos(a−b).",
        "explanation": "2 cos a cos b = cos(a+b) + cos(a−b)."
      },
      {
        "q": "sin(3x) cos(x) vaut…",
        "options": [
          "cos(2x)/2",
          "(sin(4x) − sin(2x))/2",
          "(sin(4x) + sin(2x))/2",
          "sin(4x)"
        ],
        "answer": 2,
        "hint": "Utiliser la transformation d'un produit en somme.",
        "explanation": "2 sin a cos b = sin(a+b) + sin(a−b)."
      },
      {
        "q": "sin(3x) sin(x) vaut…",
        "options": [
          "sin(4x)/2",
          "(cos(2x) − cos(4x))/2",
          "(cos(2x) + cos(4x))/2",
          "(cos(4x) − cos(2x))/2"
        ],
        "answer": 1,
        "hint": "Soustraire les formules du cosinus.",
        "explanation": "2 sin a sin b = cos(a−b) − cos(a+b)."
      },
      {
        "q": "cos³(2x) vaut…",
        "options": [
          "(3cos(2x) + cos(6x))/4",
          "cos(6x)",
          "(3cos(2x) − cos(6x))/4",
          "(cos(2x) + 3cos(6x))/4"
        ],
        "answer": 0,
        "hint": "Utiliser cos(3u) = 4cos³u − 3cos u.",
        "explanation": "Isoler cos³u puis poser u = 2x."
      },
      {
        "q": "sin³(2x) vaut…",
        "options": [
          "(3sin(2x) + sin(6x))/4",
          "(sin(2x) − 3sin(6x))/4",
          "sin(6x)",
          "(3sin(2x) − sin(6x))/4"
        ],
        "answer": 3,
        "hint": "Utiliser la formule du sinus triple.",
        "explanation": "sin(3u) = 3sin u − 4sin³u."
      },
      {
        "q": "Une linéarisation de sin⁴x est…",
        "options": [
          "(3 + 4cos(2x) + cos(4x))/8",
          "(1 − cos(4x))/8",
          "(3 − 4cos(2x) + cos(4x))/8",
          "(3 − cos(4x))/8"
        ],
        "answer": 2,
        "hint": "Élever au carré la formule de sin²x.",
        "explanation": "(1 − 2cos(2x) + cos²(2x))/4 donne le résultat annoncé."
      },
      {
        "q": "La valeur moyenne de sin⁴x sur [0,π] est…",
        "options": [
          "3/8",
          "3π/8",
          "1/2",
          "1/8"
        ],
        "answer": 0,
        "hint": "Dans une linéarisation, les cosinus ont ici une intégrale nulle.",
        "explanation": "L'intégrale vaut 3π/8 ; la division par la longueur π donne 3/8."
      },
      {
        "q": "L'intégrale de sin⁴x sur [0,π/2] vaut…",
        "options": [
          "π/16",
          "3π/16",
          "3π/8",
          "π/8"
        ],
        "answer": 1,
        "hint": "Utiliser la linéarisation précédente.",
        "explanation": "Les primitives des cosinus s'annulent aux bornes ; il reste (3/8)(π/2)."
      },
      {
        "q": "Résoudre cos(2x) = 0 dans [0,π[.",
        "options": [
          "π/4 seulement",
          "π/4 et 3π/4",
          "π/2 seulement",
          "0 et π/2"
        ],
        "answer": 1,
        "hint": "2x appartient à [0,2π[.",
        "explanation": "2x = π/2 ou 3π/2."
      },
      {
        "q": "Combien cos(6x) = 0 a-t-elle de solutions dans [0,2π[ ?",
        "options": [
          "12",
          "3",
          "6",
          "24"
        ],
        "answer": 0,
        "hint": "Le cosinus s'annule deux fois par période.",
        "explanation": "6x parcourt six périodes, d'où 12 solutions distinctes."
      },
      {
        "q": "4cos³x − 3cos x vaut…",
        "options": [
          "cos(3x)",
          "cos³(3x)",
          "sin(3x)",
          "cos(4x)"
        ],
        "answer": 0,
        "hint": "Identifier la formule de Moivre au cube.",
        "explanation": "La partie réelle de (cos x + i sin x)³ donne cos(3x)."
      },
      {
        "q": "La partie imaginaire de (cos x + i sin x)⁵ est…",
        "options": [
          "sin(5x)",
          "sin⁵x",
          "5sin x",
          "cos(5x)"
        ],
        "answer": 0,
        "hint": "Appliquer Moivre avant de lire la partie imaginaire.",
        "explanation": "La puissance vaut cos(5x) + i sin(5x)."
      },
      {
        "q": "Quelle expression est linéarisée ?",
        "options": [
          "(1 + cos(8x))/2",
          "cos²(4x)",
          "cos³x",
          "sin x cos x"
        ],
        "answer": 0,
        "hint": "Une linéarisation ne conserve ni produit ni puissance de sinus ou cosinus.",
        "explanation": "La première expression est une somme d'une constante et d'un cosinus."
      },
      {
        "q": "Pour vérifier une identité, tester deux valeurs de x…",
        "options": [
          "Est inutile dans tous les cas",
          "Peut la réfuter, mais ne la démontre pas",
          "Remplace une preuve par Euler",
          "La démontre toujours"
        ],
        "answer": 1,
        "hint": "Distinguer contre-exemple et preuve universelle.",
        "explanation": "Une valeur qui échoue réfute l'identité ; quelques succès ne prouvent pas tous les cas."
      },
      {
        "q": "cos²x − sin²x vaut…",
        "options": [
          "sin(2x)",
          "1",
          "cos(2x)",
          "cos²(2x)"
        ],
        "answer": 2,
        "hint": "Utiliser la formule de duplication.",
        "explanation": "cos(2x) = cos²x − sin²x."
      }
    ],
    "context": "Angles en radians. Les deux questions d’intégration peuvent être différées jusqu’au cours sur les primitives."
  },
  {
    "title": "Équations du second degré",
    "questions": [
      {
        "q": "Les racines carrées de 5 + 12i sont…",
        "options": [
          "2 + 3i et −2 − 3i",
          "3 − 2i et −3 + 2i",
          "3 + 2i et −3 − 2i",
          "5 + 6i et −5 − 6i"
        ],
        "answer": 2,
        "hint": "Poser w = x + iy et contrôler le signe de xy.",
        "explanation": "(3 + 2i)² = 5 + 12i ; les deux racines non nulles sont opposées."
      },
      {
        "q": "Les racines carrées de −8 + 6i sont…",
        "options": [
          "1 + 3i et −1 − 3i",
          "3 + i et −3 − i",
          "1 − 3i et −1 + 3i",
          "2 + i et −2 − i"
        ],
        "answer": 0,
        "hint": "Le module de −8 + 6i vaut 10.",
        "explanation": "x² = 1, y² = 9 et xy = 3 donnent ±(1 + 3i)."
      },
      {
        "q": "Les racines carrées de −16 sont…",
        "options": [
          "−4 seulement",
          "4i et −4i",
          "4 et −4",
          "8i et −8i"
        ],
        "answer": 1,
        "hint": "Le carré de i vaut −1.",
        "explanation": "(±4i)² = −16."
      },
      {
        "q": "Combien z² = 0 a-t-elle de solutions distinctes ?",
        "options": [
          "2",
          "1",
          "0",
          "4"
        ],
        "answer": 1,
        "hint": "Une racine double n'est pas deux nombres différents.",
        "explanation": "L'unique solution est z = 0."
      },
      {
        "q": "Le discriminant de z² − (4+i)z + 3+3i est…",
        "options": [
          "−4i",
          "3 + 4i",
          "3 − 4i",
          "16 + i"
        ],
        "answer": 2,
        "hint": "Calculer b² − 4ac.",
        "explanation": "(4+i)² − 4(3+3i) = 15+8i−12−12i = 3−4i."
      },
      {
        "q": "Une racine carrée de 3 − 4i est…",
        "options": [
          "−2 + i√3",
          "2 + i",
          "1 − 2i",
          "2 − i"
        ],
        "answer": 3,
        "hint": "Élever chaque candidat au carré.",
        "explanation": "(2 − i)² = 4 − 4i − 1 = 3 − 4i."
      },
      {
        "q": "Les solutions de z² − (4+i)z + 3+3i = 0 sont…",
        "options": [
          "3 et 1+i",
          "3 et 1−i",
          "1 et 3+i",
          "2 et 2+i"
        ],
        "answer": 0,
        "hint": "Utiliser δ = 2 − i ou vérifier somme et produit.",
        "explanation": "(4+i ± (2−i))/2 donne 3 et 1+i."
      },
      {
        "q": "La somme des racines de 2z² − (6+2i)z + i = 0 vaut…",
        "options": [
          "6+2i",
          "i/2",
          "−3−i",
          "3+i"
        ],
        "answer": 3,
        "hint": "La somme vaut −b/a.",
        "explanation": "(6+2i)/2 = 3+i."
      },
      {
        "q": "Pour 2z² − (6+2i)z + i = 0, le produit des racines vaut…",
        "options": [
          "i/2",
          "i",
          "−i/2",
          "2i"
        ],
        "answer": 0,
        "hint": "Le produit vaut c/a.",
        "explanation": "Ici c = i et a = 2."
      },
      {
        "q": "Les solutions de (z−2)² = −9 sont…",
        "options": [
          "2 ± 3i",
          "2 ± 3",
          "2 ± 9i",
          "−2 ± 3i"
        ],
        "answer": 0,
        "hint": "Isoler z − 2.",
        "explanation": "z − 2 = ±3i."
      },
      {
        "q": "Pour m réel, les racines de (z−m)² + 4 = 0 sont…",
        "options": [
          "m ± 2",
          "m ± 2i",
          "−m ± 2i",
          "m ± 4i"
        ],
        "answer": 1,
        "hint": "Résoudre le carré égal à −4.",
        "explanation": "z − m = ±2i."
      },
      {
        "q": "Le module de m+2i, pour m réel, vaut…",
        "options": [
          "m²+4",
          "√(m²+4)",
          "√(m²−4)",
          "m+2"
        ],
        "answer": 1,
        "hint": "Utiliser les coordonnées réelles.",
        "explanation": "|m+2i|² = m² + 2²."
      },
      {
        "q": "Pour quels m réels a-t-on |m+2i| = √13 ?",
        "options": [
          "m = ±9",
          "m = 3 seulement",
          "m = ±√13",
          "m = ±3"
        ],
        "answer": 3,
        "hint": "Élever les deux membres positifs au carré.",
        "explanation": "m² + 4 = 13 donne m² = 9."
      },
      {
        "q": "Les points d'affixes m+2i, m réel, parcourent…",
        "options": [
          "L'axe réel",
          "La droite y=2",
          "Le cercle de rayon 2",
          "La droite x=2"
        ],
        "answer": 1,
        "hint": "La partie imaginaire est constante.",
        "explanation": "L'abscisse m est quelconque et l'ordonnée vaut 2."
      },
      {
        "q": "La distance entre les images de m+2i et m−2i vaut…",
        "options": [
          "2|m|",
          "2",
          "4m",
          "4"
        ],
        "answer": 3,
        "hint": "Calculer le module de la différence.",
        "explanation": "|(m+2i)−(m−2i)| = |4i| = 4."
      },
      {
        "q": "Une équation du second degré de discriminant nul possède…",
        "options": [
          "Deux racines distinctes",
          "Une infinité de racines",
          "Une racine double",
          "Aucune racine complexe"
        ],
        "answer": 2,
        "hint": "Les deux signes dans la formule donnent-ils des valeurs différentes ?",
        "explanation": "δ = 0 fait coïncider les deux expressions −b/(2a)."
      },
      {
        "q": "Si P a des coefficients réels et P(2+i)=0, alors…",
        "options": [
          "P(i)=0 nécessairement",
          "P(2−i)=0",
          "P(2)=0 nécessairement",
          "P(−2+i)=0 nécessairement"
        ],
        "answer": 1,
        "hint": "Conjuguer l'égalité.",
        "explanation": "P(2−i) = conjugué de P(2+i) = 0."
      },
      {
        "q": "Les racines de z² − 4iz − 3 = 0 sont…",
        "options": [
          "1 et 3",
          "−i et −3i",
          "i et 3i",
          "2i et −2i"
        ],
        "answer": 2,
        "hint": "Chercher deux racines de somme 4i et de produit −3.",
        "explanation": "(z−i)(z−3i) = z²−4iz−3."
      },
      {
        "q": "Le polynôme de racines 2+i et 2−i, unitaire de degré 2, est…",
        "options": [
          "z²−5",
          "z²−4z+3",
          "z²+4z+5",
          "z²−4z+5"
        ],
        "answer": 3,
        "hint": "Calculer somme et produit.",
        "explanation": "La somme est 4, le produit 5."
      },
      {
        "q": "Une vérification par somme et produit suffit pour deux racines proposées si…",
        "options": [
          "Le polynôme est quadratique et son coefficient dominant est pris en compte",
          "On ignore le coefficient dominant",
          "On vérifie seulement la somme",
          "Le polynôme est quelconque"
        ],
        "answer": 0,
        "hint": "Utiliser a(z−r₁)(z−r₂).",
        "explanation": "Le développement retrouve le polynôme lorsque somme = −b/a et produit = c/a."
      }
    ],
    "context": "Dans les questions sur la somme et le produit, l’équation est 2z² − (6+2i)z + i = 0. Le paramètre m est réel."
  },
  {
    "title": "Racines nièmes",
    "questions": [
      {
        "q": "Combien z⁸ = 1 a-t-elle de racines distinctes ?",
        "options": [
          "4",
          "8",
          "1",
          "16"
        ],
        "answer": 1,
        "hint": "Le second membre est non nul.",
        "explanation": "Une équation zⁿ=a non nul possède n racines complexes distinctes."
      },
      {
        "q": "Le module des solutions de z³ = 27i est…",
        "options": [
          "9",
          "3",
          "√3",
          "27"
        ],
        "answer": 1,
        "hint": "Prendre les modules.",
        "explanation": "r³ = 27 impose r = 3."
      },
      {
        "q": "Les solutions de z⁴ = 81 sont…",
        "options": [
          "3, 3i, −3, −3i",
          "3e^(iπ/4) seulement",
          "3 et −3 seulement",
          "9, 9i, −9, −9i"
        ],
        "answer": 0,
        "hint": "Le module est 3 et les arguments sont espacés de π/2.",
        "explanation": "Les arguments sont 0, π/2, π et 3π/2."
      },
      {
        "q": "Une racine de z³ = −27 est…",
        "options": [
          "27e^(iπ/3)",
          "3e^(iπ/3)",
          "3e^(2iπ/3)",
          "3e^(iπ/6)"
        ],
        "answer": 1,
        "hint": "Multiplier l'argument par 3 et élever le module au cube.",
        "explanation": "Le cube vaut 27e^(iπ)=−27."
      },
      {
        "q": "Les solutions de z³ = −27 sont…",
        "options": [
          "−3 et ±3i",
          "−3 et 3/2 ± 3i√3/2",
          "−3 seulement",
          "3 et −3/2 ± 3i√3/2"
        ],
        "answer": 1,
        "hint": "Prendre les arguments π/3, π et 5π/3.",
        "explanation": "Le module 3 donne les trois valeurs indiquées."
      },
      {
        "q": "Les images des racines de z⁴ = 81 forment…",
        "options": [
          "Un rectangle non carré",
          "Une droite",
          "Un carré de centre O",
          "Un triangle"
        ],
        "answer": 2,
        "hint": "Quatre angles régulièrement espacés sur un cercle.",
        "explanation": "L'écart angulaire est π/2 et tous les modules valent 3."
      },
      {
        "q": "Le côté de ce carré mesure…",
        "options": [
          "3√2",
          "9",
          "6",
          "3"
        ],
        "answer": 0,
        "hint": "Calculer la distance entre 3 et 3i.",
        "explanation": "|3−3i|=3√2."
      },
      {
        "q": "L'aire de ce carré vaut…",
        "options": [
          "9",
          "6",
          "36",
          "18"
        ],
        "answer": 3,
        "hint": "Élever le côté au carré.",
        "explanation": "(3√2)² = 18."
      },
      {
        "q": "La somme des racines de z⁴ = 81 vaut…",
        "options": [
          "81",
          "0",
          "12",
          "3"
        ],
        "answer": 1,
        "hint": "Regrouper les racines opposées.",
        "explanation": "3 + 3i − 3 − 3i = 0."
      },
      {
        "q": "Le produit des racines de z⁴ = 81 vaut…",
        "options": [
          "0",
          "−81",
          "−9",
          "81"
        ],
        "answer": 1,
        "hint": "Multiplier les quatre racines ou utiliser le terme constant.",
        "explanation": "3×3i×(−3)×(−3i)=−81."
      },
      {
        "q": "Pour ω=e^(2iπ/3), ω³ vaut…",
        "options": [
          "−1",
          "1",
          "i",
          "3"
        ],
        "answer": 1,
        "hint": "Utiliser Moivre.",
        "explanation": "ω³=e^(2iπ)=1."
      },
      {
        "q": "Pour ce ω, 1+ω+ω² vaut…",
        "options": [
          "1",
          "3",
          "−1",
          "0"
        ],
        "answer": 3,
        "hint": "Utiliser une somme géométrique avec ω≠1.",
        "explanation": "(1−ω³)/(1−ω)=0."
      },
      {
        "q": "Pour ce ω, le conjugué de ω vaut…",
        "options": [
          "1",
          "ω²",
          "ω",
          "−ω"
        ],
        "answer": 1,
        "hint": "Un nombre de module 1 a pour conjugué son inverse.",
        "explanation": "ω⁻¹=ω² car ω³=1."
      },
      {
        "q": "Pour ce ω, ω+ω² vaut…",
        "options": [
          "i√3",
          "0",
          "1",
          "−1"
        ],
        "answer": 3,
        "hint": "Utiliser la somme précédente.",
        "explanation": "1+ω+ω²=0 donne ω+ω²=−1."
      },
      {
        "q": "Le nombre e^(iπ/6) est une racine sixième de…",
        "options": [
          "i",
          "−1",
          "−i",
          "1"
        ],
        "answer": 1,
        "hint": "Élever à la puissance 6.",
        "explanation": "e^(iπ)=−1."
      },
      {
        "q": "Les racines réelles de z⁴ = 16 sont…",
        "options": [
          "2 seulement",
          "−4 et 4",
          "−2 et 2",
          "Aucune"
        ],
        "answer": 2,
        "hint": "Résoudre sur l'axe réel.",
        "explanation": "Les deux réels de quatrième puissance 16 sont ±2."
      },
      {
        "q": "Combien z⁴ = 16 a-t-elle de racines imaginaires pures ?",
        "options": [
          "4",
          "0",
          "1",
          "2"
        ],
        "answer": 3,
        "hint": "Tester z=iy avec y réel.",
        "explanation": "(iy)⁴=y⁴=16 donne y=±2."
      },
      {
        "q": "L'écart angulaire entre racines consécutives de z⁹=1 est…",
        "options": [
          "9π",
          "π/18",
          "π/9",
          "2π/9"
        ],
        "answer": 3,
        "hint": "Partager un tour complet en neuf.",
        "explanation": "Les arguments successifs diffèrent de 2π/9."
      },
      {
        "q": "Pour lister sans doublon les racines de z⁵=a≠0, on prend…",
        "options": [
          "k=0,1,2,3,4",
          "k=1 seulement",
          "Tous les k réels",
          "k=0,1,2,3,4,5"
        ],
        "answer": 0,
        "hint": "Il faut exactement cinq représentants.",
        "explanation": "k=5 redonne la racine de k=0 ; les cinq premières suffisent."
      },
      {
        "q": "Le nombre de racines distinctes de z⁹=0 est…",
        "options": [
          "0",
          "3",
          "1",
          "9"
        ],
        "answer": 2,
        "hint": "Séparer le cas a=0.",
        "explanation": "La seule solution est z=0."
      }
    ],
    "context": "Pour les questions utilisant ω, on pose ω = e^(2iπ/3). Le carré évoqué a pour sommets les racines de z⁴ = 81."
  },
  {
    "title": "Polynômes et factorisation",
    "questions": [
      {
        "q": "Pour P(z)=z³−2z²+z−2, P(2) vaut…",
        "options": [
          "2",
          "0",
          "−2",
          "4"
        ],
        "answer": 1,
        "hint": "Remplacer z par 2.",
        "explanation": "8−8+2−2=0."
      },
      {
        "q": "La factorisation de ce P est…",
        "options": [
          "(z−1)(z²+2)",
          "(z−2)(z²+1)",
          "(z+2)(z²+1)",
          "(z−2)(z²−1)"
        ],
        "answer": 1,
        "hint": "Regrouper z³−2z² et z−2.",
        "explanation": "z²(z−2)+(z−2)=(z−2)(z²+1)."
      },
      {
        "q": "Les racines de ce P sont…",
        "options": [
          "2 seulement",
          "2, i, −i",
          "2, 1, −1",
          "−2, i, −i"
        ],
        "answer": 1,
        "hint": "Annuler chaque facteur.",
        "explanation": "z−2=0 ou z²+1=0."
      },
      {
        "q": "Les images de 2, i et −i forment…",
        "options": [
          "Un triangle rectangle",
          "Un triangle isocèle non équilatéral",
          "Trois points alignés",
          "Un triangle équilatéral"
        ],
        "answer": 1,
        "hint": "Comparer les trois distances.",
        "explanation": "Les distances de 2 à ±i valent √5 et celle de i à −i vaut 2 ; aucun carré n'est somme des deux autres."
      },
      {
        "q": "La somme des racines de P vaut…",
        "options": [
          "0",
          "1",
          "−2",
          "2"
        ],
        "answer": 3,
        "hint": "Additionner les trois valeurs.",
        "explanation": "2+i−i=2."
      },
      {
        "q": "Le produit des racines de P vaut…",
        "options": [
          "2i",
          "2",
          "0",
          "−2"
        ],
        "answer": 1,
        "hint": "Le produit i(−i) vaut 1.",
        "explanation": "2×i×(−i)=2."
      },
      {
        "q": "Le changement d'inconnue adapté à z⁴+5z²+4=0 est…",
        "options": [
          "u=z²",
          "u=z⁴",
          "u=|z|",
          "u=z̄"
        ],
        "answer": 0,
        "hint": "Identifier les puissances paires.",
        "explanation": "z⁴=(z²)² donne u²+5u+4=0."
      },
      {
        "q": "Les racines de u²+5u+4 sont…",
        "options": [
          "1 et −4",
          "−1 et −4",
          "−1 et 4",
          "1 et 4"
        ],
        "answer": 1,
        "hint": "Chercher deux nombres de somme −5 et de produit 4.",
        "explanation": "(u+1)(u+4)=0."
      },
      {
        "q": "Les solutions de z⁴+5z²+4=0 sont…",
        "options": [
          "i et −i seulement",
          "1, −1, 2, −2",
          "1, −1, 2i, −2i",
          "i, −i, 2i, −2i"
        ],
        "answer": 3,
        "hint": "Revenir de u à z.",
        "explanation": "z²=−1 ou z²=−4 donne les quatre solutions."
      },
      {
        "q": "Ces quatre images sont…",
        "options": [
          "Alignées sur l'axe imaginaire",
          "Alignées sur l'axe réel",
          "Les sommets d'un carré",
          "Sur un même cercle de centre O"
        ],
        "answer": 0,
        "hint": "Observer les parties réelles.",
        "explanation": "Toutes sont nulles, et les modules sont 1 ou 2."
      },
      {
        "q": "Combien z⁴−1=0 a-t-elle de racines distinctes ?",
        "options": [
          "1",
          "4",
          "2",
          "8"
        ],
        "answer": 1,
        "hint": "Factoriser en deux facteurs quadratiques.",
        "explanation": "(z²−1)(z²+1)=0 donne ±1 et ±i."
      },
      {
        "q": "Une factorisation de z⁴−1 est…",
        "options": [
          "(z−1)⁴",
          "(z−1)(z+1)(z−i)²",
          "(z−1)(z+1)(z−i)(z+i)",
          "(z²+1)²"
        ],
        "answer": 2,
        "hint": "Chaque facteur correspond à une racine.",
        "explanation": "Le produit vaut (z²−1)(z²+1)=z⁴−1."
      },
      {
        "q": "Le polynôme unitaire de racines −1, 2i, −2i est…",
        "options": [
          "z³+4",
          "z³−z²+4z−4",
          "z³+z²+4z+4",
          "z³+z²−4z−4"
        ],
        "answer": 2,
        "hint": "Écrire (z+1)(z²+4).",
        "explanation": "Le développement donne z³+z²+4z+4."
      },
      {
        "q": "Si un polynôme réel a la racine 3−2i, il possède aussi…",
        "options": [
          "−3+2i nécessairement",
          "3+2i",
          "2+3i nécessairement",
          "−3−2i nécessairement"
        ],
        "answer": 1,
        "hint": "Utiliser la conjugaison.",
        "explanation": "Les racines non réelles d'un polynôme réel viennent par paires conjuguées."
      },
      {
        "q": "Si z²=4i, le module de z vaut…",
        "options": [
          "2",
          "16",
          "4",
          "√2"
        ],
        "answer": 0,
        "hint": "Prendre les modules puis une racine carrée positive.",
        "explanation": "|z|²=4 donne |z|=2."
      },
      {
        "q": "Les solutions de z²=4i sont…",
        "options": [
          "2i et −2i",
          "2 et −2",
          "2(1+i) et −2(1+i)",
          "√2(1+i) et −√2(1+i)"
        ],
        "answer": 3,
        "hint": "Prendre la moitié de l'argument π/2.",
        "explanation": "2e^(iπ/4)=√2(1+i), avec sa valeur opposée."
      },
      {
        "q": "Le remplacement u=z² donne u=0 ou u=−1. Combien de solutions z distinctes ?",
        "options": [
          "4",
          "1",
          "3",
          "2"
        ],
        "answer": 2,
        "hint": "Le cas u=0 n'a qu'une racine distincte.",
        "explanation": "z=0, i, −i sont les trois solutions."
      },
      {
        "q": "Résoudre z(z²+9)=0.",
        "options": [
          "3i et −3i seulement",
          "0, 3i, −3i",
          "0, 3, −3",
          "0 seulement"
        ],
        "answer": 1,
        "hint": "Ne pas diviser d'emblée par z.",
        "explanation": "Un produit nul donne z=0 ou z²=−9."
      },
      {
        "q": "Si P(z)=(z−a)Q(z), alors P(a) vaut…",
        "options": [
          "1",
          "Q(a)",
          "0",
          "a"
        ],
        "answer": 2,
        "hint": "Remplacer z par a.",
        "explanation": "Le facteur a−a annule le produit."
      },
      {
        "q": "Pour démontrer une factorisation proposée, on peut…",
        "options": [
          "Comparer seulement les degrés",
          "Développer puis identifier tous les coefficients",
          "Comparer seulement une racine",
          "Tester seulement z=0"
        ],
        "answer": 1,
        "hint": "Une identité polynomiale porte sur tous les coefficients.",
        "explanation": "Le développement complet prouve l'égalité ; les autres contrôles seuls ne suffisent pas."
      }
    ],
    "context": "Pour les premières questions, P(z)=z³−2z²+z−2. Les changements d’inconnue doivent ensuite être résolus en z."
  },
  {
    "title": "Lieux géométriques",
    "questions": [
      {
        "q": "Dans ce quiz, w=(z−2)/(z+2). La valeur interdite est…",
        "options": [
          "2",
          "−2",
          "0",
          "2i"
        ],
        "answer": 1,
        "hint": "Annuler le dénominateur.",
        "explanation": "z+2=0 donne z=−2."
      },
      {
        "q": "Pour ce quotient, w(2) vaut…",
        "options": [
          "0",
          "−1",
          "1",
          "Il n'est pas défini"
        ],
        "answer": 0,
        "hint": "Vérifier le numérateur et le dénominateur.",
        "explanation": "0/4=0."
      },
      {
        "q": "Pour z=x+iy≠−2, Im(w) vaut…",
        "options": [
          "2y/((x+2)²+y²)",
          "4y/((x+2)²+y²)",
          "4x/((x+2)²+y²)",
          "−4y/((x+2)²+y²)"
        ],
        "answer": 1,
        "hint": "Multiplier par x+2−iy.",
        "explanation": "Le numérateur devient x²+y²−4+4iy."
      },
      {
        "q": "Le lieu w réel est…",
        "options": [
          "L'axe réel privé du point d'affixe −2",
          "L'axe imaginaire",
          "Le cercle de rayon 2",
          "L'axe réel privé de 2"
        ],
        "answer": 0,
        "hint": "Annuler la partie imaginaire.",
        "explanation": "Le dénominateur est positif et Im(w)=0 équivaut à y=0 ; −2 reste exclu."
      },
      {
        "q": "Le lieu w imaginaire pur, éventuellement nul, est…",
        "options": [
          "Le cercle de rayon 2 privé de −2 et de 2",
          "Le cercle de centre O et de rayon 2, privé de −2",
          "Le cercle unité privé de −2",
          "L'axe imaginaire"
        ],
        "answer": 1,
        "hint": "Annuler la partie réelle.",
        "explanation": "x²+y²−4=0 et z≠−2 ; le point 2 donne w=0 et reste admis."
      },
      {
        "q": "Le lieu |w|=1 est…",
        "options": [
          "L'axe réel",
          "Le cercle de rayon 2",
          "La droite x=2",
          "L'axe imaginaire"
        ],
        "answer": 3,
        "hint": "Traduire en égalité de distances aux points −2 et 2.",
        "explanation": "La médiatrice du segment horizontal est x=0."
      },
      {
        "q": "La condition arg(w)≡π/2 modulo 2π décrit…",
        "options": [
          "L'axe imaginaire positif",
          "Le demi-cercle inférieur de rayon 2",
          "Le demi-cercle supérieur de rayon 2 sans ses extrémités",
          "Le cercle entier de rayon 2"
        ],
        "answer": 2,
        "hint": "Il faut une partie réelle nulle et une partie imaginaire positive.",
        "explanation": "On obtient x²+y²=4 et y>0."
      },
      {
        "q": "La condition arg(w)≡−π/2 modulo 2π impose…",
        "options": [
          "x²+y²=4 et y<0",
          "x=0",
          "x²+y²=4 et y>0",
          "y=0"
        ],
        "answer": 0,
        "hint": "Le signe de Im(w) est celui de y.",
        "explanation": "L'argument −π/2 correspond à une partie imaginaire strictement négative."
      },
      {
        "q": "Le point d'affixe 2 est exclu d'une condition sur arg(w) parce que…",
        "options": [
          "Le dénominateur s'annule",
          "Il n'est pas sur le cercle",
          "w=0 n'a pas d'argument",
          "Son module est négatif"
        ],
        "answer": 2,
        "hint": "Distinguer quotient nul et quotient non défini.",
        "explanation": "w(2)=0 est défini, mais son argument ne l'est pas."
      },
      {
        "q": "Avec A(−2), B(2), |w| représente…",
        "options": [
          "AM+BM",
          "AM×BM",
          "AM/BM",
          "BM/AM"
        ],
        "answer": 3,
        "hint": "Le module d'une différence est une distance.",
        "explanation": "|z−2|=BM et |z+2|=AM."
      },
      {
        "q": "Le lieu |w|=2 a pour équation…",
        "options": [
          "(x−10/3)²+y²=64/9",
          "(x+10/3)²+y²=64/9",
          "x²+y²=4",
          "(x+10/3)²+y²=16/9"
        ],
        "answer": 1,
        "hint": "Développer |z−2|²=4|z+2|².",
        "explanation": "On obtient 3x²+3y²+20x+12=0, puis on complète le carré."
      },
      {
        "q": "Le centre de ce cercle a pour affixe…",
        "options": [
          "−2",
          "10/3",
          "−10/3",
          "−10i/3"
        ],
        "answer": 2,
        "hint": "Lire le signe dans la forme réduite.",
        "explanation": "(x+10/3)²=(x−(−10/3))²."
      },
      {
        "q": "Son rayon est…",
        "options": [
          "64/9",
          "4/3",
          "8/3",
          "10/3"
        ],
        "answer": 2,
        "hint": "Prendre la racine carrée positive du second membre.",
        "explanation": "√(64/9)=8/3."
      },
      {
        "q": "Le point A(−2) appartient-il à ce cercle ?",
        "options": [
          "Oui, le quotient y vaut 2",
          "Oui, car il est exclu du domaine",
          "Oui, le quotient y vaut 0",
          "Non, sa distance au centre vaut 4/3"
        ],
        "answer": 3,
        "hint": "Comparer sa distance au centre au rayon.",
        "explanation": "|−2+10/3|=4/3≠8/3."
      },
      {
        "q": "Avec A(−2), B(2), C(2i), (c−a)/(b−a) vaut…",
        "options": [
          "i",
          "1+i",
          "(1+i)/2",
          "(1−i)/2"
        ],
        "answer": 2,
        "hint": "Calculer les deux différences.",
        "explanation": "(2+2i)/4=(1+i)/2."
      },
      {
        "q": "Une mesure de l'angle orienté des vecteurs AB et AC est…",
        "options": [
          "π",
          "−π/4",
          "π/2",
          "π/4"
        ],
        "answer": 3,
        "hint": "Prendre un argument du quotient précédent.",
        "explanation": "(1+i)/2 a pour argument π/4."
      },
      {
        "q": "Avec D(−2i), (d−c)/(b−a) vaut…",
        "options": [
          "1",
          "−1",
          "−i",
          "i"
        ],
        "answer": 2,
        "hint": "Diviser −4i par 4.",
        "explanation": "Le quotient vaut −i."
      },
      {
        "q": "Les droites (AB) et (CD) sont…",
        "options": [
          "Parallèles distinctes",
          "Perpendiculaires",
          "Confondues",
          "Non sécantes"
        ],
        "answer": 1,
        "hint": "Le quotient des vecteurs directeurs est imaginaire pur non nul.",
        "explanation": "Un argument ±π/2 donne l'orthogonalité."
      },
      {
        "q": "A(−2), C(2i), B(2), D(−2i), dans cet ordre, forment…",
        "options": [
          "Un carré de côté 4",
          "Un triangle",
          "Un rectangle non carré",
          "Un carré de côté 2√2"
        ],
        "answer": 3,
        "hint": "Comparer les angles au centre et les distances.",
        "explanation": "Quatre quarts de tour sur le cercle de rayon 2 donnent le carré."
      },
      {
        "q": "L'aire de ce carré est…",
        "options": [
          "16",
          "4",
          "2√2",
          "8"
        ],
        "answer": 3,
        "hint": "Élever la longueur du côté au carré.",
        "explanation": "(2√2)²=8."
      }
    ],
    "context": "Dans tout ce quiz : A(−2), B(2), C(2i), D(−2i) et w=(z−2)/(z+2), défini pour z≠−2."
  },
  {
    "title": "Translations, homothéties et rotations",
    "questions": [
      {
        "q": "L'écriture z′=z−3+i décrit…",
        "options": [
          "Une rotation d'angle π/2",
          "Une réflexion",
          "Une homothétie de rapport −3",
          "Une translation de vecteur d'affixe −3+i"
        ],
        "answer": 3,
        "hint": "Observer que z′−z est constant.",
        "explanation": "L'incrément −3+i est le vecteur de translation."
      },
      {
        "q": "Le centre de z′=−z+6i a pour affixe…",
        "options": [
          "−3i",
          "3i",
          "6i",
          "3"
        ],
        "answer": 1,
        "hint": "Résoudre z′=z.",
        "explanation": "2z=6i donne z=3i."
      },
      {
        "q": "L'angle de la rotation z′=−iz est…",
        "options": [
          "0 modulo 2π",
          "π/2 modulo 2π",
          "π modulo 2π",
          "−π/2 modulo 2π"
        ],
        "answer": 3,
        "hint": "Écrire −i sous forme exponentielle.",
        "explanation": "−i=e^(−iπ/2)."
      },
      {
        "q": "Une homothétie de rapport −3 multiplie les distances par…",
        "options": [
          "1/3",
          "3",
          "9",
          "−3"
        ],
        "answer": 1,
        "hint": "Une distance ne devient pas négative.",
        "explanation": "Le facteur de distance est la valeur absolue du rapport."
      },
      {
        "q": "Pour R(z)=−iz+1+2i, le centre a pour affixe…",
        "options": [
          "(3−i)/2",
          "(3+i)/2",
          "1+2i",
          "(1+3i)/2"
        ],
        "answer": 1,
        "hint": "Résoudre (1+i)ω=1+2i.",
        "explanation": "(1+2i)/(1+i)=(3+i)/2."
      },
      {
        "q": "L'angle de cette R est…",
        "options": [
          "π/4",
          "−π/2",
          "π",
          "π/2"
        ],
        "answer": 1,
        "hint": "Lire l'argument du coefficient de z.",
        "explanation": "Le coefficient est −i."
      },
      {
        "q": "R(1) vaut…",
        "options": [
          "1+i",
          "1−i",
          "2+i",
          "1+3i"
        ],
        "answer": 0,
        "hint": "Remplacer z par 1.",
        "explanation": "−i+1+2i=1+i."
      },
      {
        "q": "R(2) vaut…",
        "options": [
          "1",
          "1+4i",
          "−1",
          "2"
        ],
        "answer": 0,
        "hint": "Remplacer z par 2.",
        "explanation": "−2i+1+2i=1."
      },
      {
        "q": "L'image de l'axe réel par R est…",
        "options": [
          "La droite x=1",
          "La droite y=1",
          "L'axe réel",
          "Le cercle unité"
        ],
        "answer": 0,
        "hint": "Écrire R(x) pour x réel.",
        "explanation": "R(x)=1+i(2−x) ; l'ordonnée parcourt ℝ."
      },
      {
        "q": "L'image du cercle |z−1|=3 par R est…",
        "options": [
          "|z′−1|=3",
          "|z′−(1+i)|=9",
          "|z′−(1+i)|=3",
          "|z′−(1−i)|=3"
        ],
        "answer": 2,
        "hint": "Transformer le centre et conserver le rayon.",
        "explanation": "R(1)=1+i et R est une rotation."
      },
      {
        "q": "Pour T(z)=z+2−i, (T∘R)(z) vaut…",
        "options": [
          "z+3+i",
          "−iz+3+3i",
          "−iz+3+i",
          "−iz+i"
        ],
        "answer": 2,
        "hint": "Appliquer R puis ajouter 2−i.",
        "explanation": "−iz+1+2i+2−i=−iz+3+i."
      },
      {
        "q": "Pour ce T, (R∘T)(z) vaut…",
        "options": [
          "−iz",
          "−iz+3+i",
          "−iz+2",
          "iz"
        ],
        "answer": 0,
        "hint": "Développer −i(z+2−i)+1+2i.",
        "explanation": "Le terme constant −2i−1+1+2i s'annule."
      },
      {
        "q": "Ces deux compositions sont…",
        "options": [
          "Deux réflexions",
          "Égales",
          "Deux translations",
          "Différentes"
        ],
        "answer": 3,
        "hint": "Comparer leurs termes constants.",
        "explanation": "Les termes constants sont 3+i et 0."
      },
      {
        "q": "Le centre de z′=−iz+3+i est…",
        "options": [
          "2−i",
          "3+i",
          "2+i",
          "1−2i"
        ],
        "answer": 0,
        "hint": "Diviser 3+i par 1+i.",
        "explanation": "(3+i)(1−i)/2=2−i."
      },
      {
        "q": "L'inverse de R(z)=−iz+1+2i est…",
        "options": [
          "R⁻¹(z)=z−1−2i",
          "R⁻¹(z)=−iz−1−2i",
          "R⁻¹(z)=iz+2−i",
          "R⁻¹(z)=iz−2+i"
        ],
        "answer": 2,
        "hint": "Isoler l'antécédent.",
        "explanation": "z=i(w−1−2i)=iw+2−i."
      },
      {
        "q": "L'homothétie H de centre ω et de rapport 3 s'écrit…",
        "options": [
          "H(z)−ω=3(z−ω)",
          "H(z)=z+3ω",
          "H(z)−ω=−3(z−ω)",
          "H(z)=3z pour tout ω"
        ],
        "answer": 0,
        "hint": "Utiliser l'écriture centrée.",
        "explanation": "Elle multiplie le vecteur ΩM par 3."
      },
      {
        "q": "Pour S(z)−ω=3i(z−ω), le rapport est…",
        "options": [
          "√3",
          "3",
          "−3",
          "9"
        ],
        "answer": 1,
        "hint": "Prendre le module du coefficient.",
        "explanation": "|3i|=3."
      },
      {
        "q": "Un angle de S est…",
        "options": [
          "π/2",
          "−π/2",
          "π",
          "0"
        ],
        "answer": 0,
        "hint": "Prendre un argument de 3i.",
        "explanation": "3i=3e^(iπ/2)."
      },
      {
        "q": "S∘S est une homothétie de rapport…",
        "options": [
          "3",
          "−9",
          "−3",
          "9"
        ],
        "answer": 1,
        "hint": "Élever le coefficient centré au carré.",
        "explanation": "(3i)²=−9."
      },
      {
        "q": "L'image par S d'un cercle de rayon 2 est un cercle de rayon…",
        "options": [
          "18",
          "4",
          "6",
          "2"
        ],
        "answer": 2,
        "hint": "Multiplier les distances par le rapport.",
        "explanation": "3×2=6."
      }
    ],
    "context": "R(z)=−iz+1+2i et T(z)=z+2−i. Pour les dernières questions, S(z)−ω=3i(z−ω)."
  },
  {
    "title": "Similitudes et conjugaison",
    "questions": [
      {
        "q": "La similitude directe s vérifiant s(0)=2 et s(1)=4+2i s'écrit…",
        "options": [
          "s(z)=(2−2i)z+2",
          "s(z)=(2+2i)z+2",
          "s(z)=2z+2+2i",
          "s(z)=2iz+2"
        ],
        "answer": 1,
        "hint": "Dans az+b, calculer b puis a.",
        "explanation": "b=2 et a=s(1)−s(0)=2+2i."
      },
      {
        "q": "Le rapport de s(z)=(2+2i)z+2 vaut…",
        "options": [
          "4",
          "8",
          "2√2",
          "2"
        ],
        "answer": 2,
        "hint": "Calculer |2+2i|.",
        "explanation": "√(4+4)=2√2."
      },
      {
        "q": "Un angle de s est…",
        "options": [
          "π/4",
          "π",
          "−π/4",
          "π/2"
        ],
        "answer": 0,
        "hint": "Le coefficient est dans le premier quadrant.",
        "explanation": "Ses parties réelle et imaginaire sont égales et positives."
      },
      {
        "q": "Le centre de s a pour affixe…",
        "options": [
          "−2+4i",
          "(2+4i)/5",
          "(−2−4i)/5",
          "(−2+4i)/5"
        ],
        "answer": 3,
        "hint": "Résoudre (1−(2+2i))ω=2.",
        "explanation": "ω=2/(−1−2i)=(−2+4i)/5."
      },
      {
        "q": "La quatrième itérée de s est…",
        "options": [
          "Une rotation d'angle π/4",
          "Une homothétie de rapport −64",
          "Une translation non nulle",
          "Une homothétie de rapport 64"
        ],
        "answer": 1,
        "hint": "Élever 2+2i à la puissance 4 dans l'écriture centrée.",
        "explanation": "(2√2)⁴e^(iπ)=−64."
      },
      {
        "q": "Le coefficient −8+6i correspond à un rapport…",
        "options": [
          "10",
          "2",
          "14",
          "100"
        ],
        "answer": 0,
        "hint": "Calculer son module.",
        "explanation": "√(64+36)=10."
      },
      {
        "q": "Pour a≠0, z′=az̄+b définit…",
        "options": [
          "Toujours une translation",
          "Toujours une homothétie",
          "Toujours une rotation",
          "Une similitude indirecte"
        ],
        "answer": 3,
        "hint": "La conjugaison inverse l'orientation.",
        "explanation": "La multiplication non nulle et la translation ne changent pas ce caractère indirect."
      },
      {
        "q": "Pour g(z)=−iz̄ et z=x+iy, g(z) vaut…",
        "options": [
          "−y+ix",
          "−y−ix",
          "y+ix",
          "x−iy"
        ],
        "answer": 1,
        "hint": "Développer −i(x−iy).",
        "explanation": "−ix+i²y=−y−ix."
      },
      {
        "q": "Les points fixes de cette g forment…",
        "options": [
          "Seulement O",
          "L'axe réel",
          "La droite y=x",
          "La droite y=−x"
        ],
        "answer": 3,
        "hint": "Résoudre x=−y et y=−x.",
        "explanation": "Les deux équations sont équivalentes à y=−x."
      },
      {
        "q": "g est…",
        "options": [
          "Une homothétie",
          "La rotation d'angle −π/2",
          "La réflexion d'axe y=−x",
          "Une translation"
        ],
        "answer": 2,
        "hint": "Une réflexion inverse l'orientation et fixe son axe.",
        "explanation": "L'application (x,y)↦(−y,−x) est la réflexion indiquée."
      },
      {
        "q": "g∘g est…",
        "options": [
          "Une homothétie de rapport 2",
          "L'identité",
          "Une translation non nulle",
          "La symétrie centrale de centre O"
        ],
        "answer": 1,
        "hint": "Conjuguer aussi le coefficient −i.",
        "explanation": "−i conjugué(−iz̄)=−i(iz)=z."
      },
      {
        "q": "Pour h(z)=z̄+3−2i, les coordonnées de h(z) sont…",
        "options": [
          "(x+3,−y−2)",
          "(x+3,y−2)",
          "(3−x,y−2)",
          "(x,−y−2)"
        ],
        "answer": 0,
        "hint": "Conjuguer puis ajouter le terme constant.",
        "explanation": "La partie réelle devient x+3 et l'imaginaire −y−2."
      },
      {
        "q": "Cette h possède…",
        "options": [
          "Un seul point fixe",
          "Aucun point fixe",
          "Tous les points fixes",
          "Une droite de points fixes"
        ],
        "answer": 1,
        "hint": "Regarder l'équation sur x.",
        "explanation": "Un point fixe imposerait x=x+3, impossible."
      },
      {
        "q": "h∘h est…",
        "options": [
          "La translation de vecteur d'affixe 6",
          "La rotation d'angle π",
          "L'identité",
          "La translation de vecteur d'affixe −4i"
        ],
        "answer": 0,
        "hint": "Composer en conjuguant le terme constant.",
        "explanation": "h(h(z))=z+3+2i+3−2i=z+6."
      },
      {
        "q": "L'axe de la symétrie glissée h est…",
        "options": [
          "x=3",
          "y=−2",
          "y=−1",
          "y=1"
        ],
        "answer": 2,
        "hint": "Une réflexion d'axe y=c s'écrit z̄+2ic.",
        "explanation": "z̄−2i est la réflexion d'axe y=−1."
      },
      {
        "q": "Le vecteur de glissement de h a pour affixe…",
        "options": [
          "6",
          "−2i",
          "3",
          "3−2i"
        ],
        "answer": 2,
        "hint": "Séparer réflexion et translation parallèle à l'axe.",
        "explanation": "h=(z↦z+3)∘(z↦z̄−2i)."
      },
      {
        "q": "Le point fixe de k(z)=3z̄+2 est…",
        "options": [
          "1",
          "−1",
          "−1+i",
          "−2"
        ],
        "answer": 1,
        "hint": "Résoudre les deux équations réelles.",
        "explanation": "x=3x+2 et y=−3y donnent x=−1, y=0."
      },
      {
        "q": "Le rapport de k vaut…",
        "options": [
          "−3",
          "9",
          "1/3",
          "3"
        ],
        "answer": 3,
        "hint": "Le facteur de distance est |3|.",
        "explanation": "La conjugaison conserve les distances et le facteur 3 les triple."
      },
      {
        "q": "k∘k s'écrit…",
        "options": [
          "9z+8",
          "9z+2",
          "3z+4",
          "z+8"
        ],
        "answer": 0,
        "hint": "Conjuguer avant de multiplier.",
        "explanation": "3(3z+2)+2=9z+8."
      },
      {
        "q": "Pour f(z)=az̄+b, |a|=1, si a b̄+b≠0, alors f…",
        "options": [
          "Est une réflexion",
          "Est nécessairement une rotation",
          "N'a aucun point fixe",
          "Possède un point fixe unique"
        ],
        "answer": 2,
        "hint": "Étudier f².",
        "explanation": "f²(z)=z+a b̄+b est une translation non nulle ; un point fixe de f serait aussi fixe par f², impossible."
      }
    ],
    "context": "s(z)=(2+2i)z+2 ; g(z)=−iz̄ ; h(z)=z̄+3−2i ; k(z)=3z̄+2."
  },
  {
    "title": "Synthèse et suites complexes",
    "questions": [
      {
        "q": "Dans ce quiz, F(z)=e^(2i|z|)z. F(0) vaut…",
        "options": [
          "L'expression n'est pas définie",
          "1",
          "0",
          "i"
        ],
        "answer": 2,
        "hint": "Substituer z=0 avant toute division.",
        "explanation": "e⁰×0=0."
      },
      {
        "q": "Pour tout z, |F(z)| vaut…",
        "options": [
          "|z|²",
          "2|z|",
          "1",
          "|z|"
        ],
        "answer": 3,
        "hint": "Le facteur exponentiel a un argument réel.",
        "explanation": "|e^(2i|z|)|=1."
      },
      {
        "q": "Sur un cercle de rayon r>0, F coïncide avec…",
        "options": [
          "Une rotation d'angle r",
          "Une homothétie de rapport 2",
          "Une réflexion",
          "Une rotation de centre O et d'angle 2r"
        ],
        "answer": 3,
        "hint": "Sur le cercle, |z| est constant.",
        "explanation": "F(z)=e^(2ir)z."
      },
      {
        "q": "Les rayons strictement positifs de points fixes sont…",
        "options": [
          "(2k+1)π/2, k entier ≥0",
          "2kπ, k entier ≥1",
          "kπ, k entier ≥1",
          "Tous les réels positifs"
        ],
        "answer": 2,
        "hint": "Résoudre e^(2ir)=1.",
        "explanation": "2r=2kπ, donc r=kπ avec k≥1."
      },
      {
        "q": "F(π/4) vaut…",
        "options": [
          "iπ/4",
          "π/4",
          "−π/4",
          "−iπ/4"
        ],
        "answer": 0,
        "hint": "L'angle ajouté est 2×π/4.",
        "explanation": "e^(iπ/2)=i."
      },
      {
        "q": "F(π/2) vaut…",
        "options": [
          "−iπ/2",
          "π/2",
          "iπ/2",
          "−π/2"
        ],
        "answer": 3,
        "hint": "L'angle ajouté vaut π.",
        "explanation": "e^(iπ)=−1."
      },
      {
        "q": "La distance entre F(π/4) et F(π/2) vaut…",
        "options": [
          "3π/4",
          "π√5/4",
          "π/4",
          "π/2"
        ],
        "answer": 1,
        "hint": "Calculer le module de −π/2−iπ/4.",
        "explanation": "La somme des carrés est 5π²/16."
      },
      {
        "q": "F est-elle une isométrie du plan ?",
        "options": [
          "Non, certaines distances changent",
          "Oui, c'est une rotation d'angle constant",
          "Oui, car |F(z)|=|z|",
          "Oui, car F(0)=0"
        ],
        "answer": 0,
        "hint": "Comparer les deux points précédents avant et après transformation.",
        "explanation": "La distance initiale π/4 devient π√5/4."
      },
      {
        "q": "Une solution non nulle de z³=F(z) a pour module…",
        "options": [
          "2",
          "0",
          "1",
          "π"
        ],
        "answer": 2,
        "hint": "Prendre les modules.",
        "explanation": "r³=r avec r>0 donne r=1."
      },
      {
        "q": "Les solutions de z³=F(z) sont…",
        "options": [
          "0, 1, −1",
          "0, e^i, −e^i",
          "0, e^(i/2), −e^(i/2)",
          "e^i et −e^i seulement"
        ],
        "answer": 1,
        "hint": "Traiter 0 puis résoudre z²=e^(2i).",
        "explanation": "Pour r=1, la division par z donne z²=e^(2i), donc z=±e^i ; 0 convient aussi."
      },
      {
        "q": "Pour z=re^(iπ/4), le plus petit r>0 tel que F(z)=z̄ vaut…",
        "options": [
          "π/2",
          "3π/4",
          "π/4",
          "π"
        ],
        "answer": 1,
        "hint": "Comparer les arguments modulo 2π.",
        "explanation": "2r+π/4≡−π/4, donc r=−π/4+kπ ; le premier positif est 3π/4."
      },
      {
        "q": "Dans [π,2π], le rayon précédent vaut…",
        "options": [
          "7π/4",
          "3π/2",
          "2π",
          "5π/4"
        ],
        "answer": 0,
        "hint": "Chercher le seul entier k adapté à r=−π/4+kπ.",
        "explanation": "k=2 donne 7π/4 ; k=1 et k=3 sortent de l'intervalle."
      },
      {
        "q": "Soit v₀=2e^(iθ), vₙ₊₁=vₙ+|vₙ|, 0<θ<π/2. La partie imaginaire est…",
        "options": [
          "2ⁿsinθ",
          "2sinθ pour tout n",
          "sinθ pour tout n",
          "0"
        ],
        "answer": 1,
        "hint": "L'incrément est réel.",
        "explanation": "Im(vₙ₊₁)=Im(vₙ)=Im(v₀)=2sinθ."
      },
      {
        "q": "La partie réelle de cette suite est…",
        "options": [
          "Constante",
          "Toujours négative",
          "Strictement croissante",
          "Strictement décroissante"
        ],
        "answer": 2,
        "hint": "À chaque étape, que lui ajoute-t-on ?",
        "explanation": "|vₙ|>0 car la partie imaginaire reste positive."
      },
      {
        "q": "Son argument uₙ dans ]0,π/2[ vaut…",
        "options": [
          "2ⁿθ",
          "2θ/2ⁿ",
          "θ/2ⁿ",
          "θ/(n+1)"
        ],
        "answer": 2,
        "hint": "Le coefficient initial 2 change le module, pas l'argument.",
        "explanation": "La factorisation 1+e^(iu) divise l'argument par 2 à chaque étape."
      },
      {
        "q": "Le module de vₙ vaut…",
        "options": [
          "sinθ/sin(θ/2ⁿ)",
          "2ⁿsinθ",
          "2sinθ/sin(θ/2ⁿ)",
          "2sin(θ/2ⁿ)/sinθ"
        ],
        "answer": 2,
        "hint": "Utiliser la partie imaginaire invariante.",
        "explanation": "|vₙ|sin uₙ=2sinθ."
      },
      {
        "q": "Pour θ=π/3, |v₁| vaut…",
        "options": [
          "2√3",
          "3",
          "√3",
          "4"
        ],
        "answer": 0,
        "hint": "|v₁|=2|v₀|cos(θ/2).",
        "explanation": "4cos(π/6)=2√3."
      },
      {
        "q": "La limite de |vₙ| est…",
        "options": [
          "2",
          "2sinθ",
          "0",
          "+∞"
        ],
        "answer": 3,
        "hint": "Le dénominateur sin(θ/2ⁿ) tend vers 0 par valeurs positives.",
        "explanation": "Le numérateur est constant et strictement positif."
      },
      {
        "q": "La limite de vₙ/2ⁿ vaut…",
        "options": [
          "θ/(2sinθ)",
          "2sinθ/θ",
          "0",
          "sinθ/θ"
        ],
        "answer": 1,
        "hint": "Écrire uₙ=θ/2ⁿ et utiliser uₙ/sin uₙ→1.",
        "explanation": "vₙ/2ⁿ=(2sinθ/θ)(uₙ/sin uₙ)e^(iuₙ) tend vers 2sinθ/θ."
      },
      {
        "q": "Pour n≥1, la somme de |vₖ| de k=0 à n−1 vaut…",
        "options": [
          "vₙ−v₀",
          "vₙ+v₀",
          "|vₙ|−|v₀|",
          "n|vₙ|"
        ],
        "answer": 0,
        "hint": "Sommer vₖ₊₁−vₖ=|vₖ|.",
        "explanation": "Les termes intermédiaires se simplifient : c'est une somme télescopique."
      }
    ],
    "context": "F(z)=e^(2i|z|)z. Pour la suite : v₀=2e^(iθ), vₙ₊₁=vₙ+|vₙ|, avec 0<θ<π/2."
  }
];
