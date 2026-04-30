# 📚 Guide d'utilisation — Missaoui Maths

## 🗂️ Structure du site

```
missaoui-maths/
├── index.html              ← Page d'accueil (2 systèmes)
├── systeme-tunisie.html    ← Niveaux Tunisie
├── systeme-france.html     ← Niveaux France
├── niveau.html             ← Liste des cours par niveau
├── admin.html              ← VOTRE espace admin (dépôt de cours)
├── manifest.json           ← Configuration PWA (app installable)
├── service-worker.js       ← Mode hors ligne
└── [vos cours .html ou .pdf que vous ajoutez]
```

---

## 🚀 Comment ça fonctionne ?

### Pour les élèves :
1. Ils arrivent sur **index.html** → choisissent leur **système** (🇹🇳 ou 🇫🇷)
2. Ils choisissent leur **niveau** (Bac Math, Première Spé, etc.)
3. Ils voient la **liste des cours** disponibles pour ce niveau
4. Ils cliquent sur un cours → on leur demande le **code d'accès**
5. Si le code est correct, ils accèdent au cours

### Pour vous (le professeur) :
1. Vous allez sur **admin.html**
2. Mot de passe : **`ADMIN27`** (modifiable dans le code)
3. Vous **uploadez votre fichier** (HTML ou PDF) dans le dossier du site
4. Vous **ajoutez le cours** dans l'admin avec :
   - Le système (Tunisie / France)
   - Le niveau (Bac Math, Première, etc.)
   - Le titre et la description
   - Le **code d'accès** que vous donnez à vos élèves
   - Le **nom du fichier**
5. Le cours apparaît automatiquement aux élèves !

---

## 🔐 Codes d'accès

| Espace | Code |
|---|---|
| **Admin (vous)** | `ADMIN27` |
| **Cours élèves** | Vous définissez vous-même (ex: `MATH27`, `BAC2026`...) |

**💡 Astuce :** Vous pouvez utiliser :
- **Le même code pour tous vos cours** (plus simple)
- **Un code différent par classe ou par niveau** (plus sécurisé)
- **Un code temporaire** que vous changez chaque trimestre

---

## 📝 Ajouter un cours — Étape par étape

### Étape 1 : Préparer le fichier
- **HTML interactif** : votre cours en un seul fichier `.html` (les cours créés précédemment sur stats et probas conviennent)
- **PDF** : un document `.pdf` classique

### Étape 2 : Uploader le fichier
Trois options selon votre hébergement :

**Option A — GitHub Pages** (recommandé, gratuit) :
1. Allez sur votre dépôt `faicelmaths20.github.io/missaoui-maths`
2. Cliquez **Add file → Upload files**
3. Glissez-déposez votre `.html` ou `.pdf`
4. Cliquez **Commit changes**

**Option B — Hébergeur web** (OVH, etc.) :
1. Connectez-vous à votre FTP (FileZilla, etc.)
2. Uploadez le fichier dans le même dossier que `index.html`

**Option C — Test local** :
1. Mettez tous les fichiers dans un même dossier
2. Ouvrez `index.html` dans votre navigateur

### Étape 3 : Ajouter le cours dans l'admin
1. Ouvrez **admin.html**, mot de passe `ADMIN27`
2. Cliquez **➕ Ajouter un cours**
3. Remplissez :
   - **Système** : 🇹🇳 Tunisie ou 🇫🇷 France
   - **Niveau** : choisissez dans la liste
   - **Titre** : ex. *Statistiques Doubles*
   - **Description** : courte phrase descriptive
   - **Type** : HTML interactif ou PDF
   - **Code d'accès** : ex. `BAC2026`
   - **Nom du fichier** : ex. `cours_statistiques.html`
4. Cliquez **✓ Ajouter le cours**
5. ✅ C'est terminé ! Les élèves peuvent maintenant y accéder.

---

## 💾 Sauvegarder votre travail

Les cours que vous ajoutez sont stockés dans le **navigateur** (localStorage). Pour ne pas les perdre :

1. Allez dans l'admin → onglet **💾 Sauvegarde**
2. Cliquez **📥 Télécharger la sauvegarde**
3. Conservez le fichier `.json`

**Pour restaurer** sur un autre appareil ou après suppression :
1. Onglet **💾 Sauvegarde**
2. **Cliquez ou glissez** votre fichier `.json` dans la zone de dépôt
3. ✅ Tous vos cours sont restaurés !

> ⚠️ **Important** : Faites une sauvegarde **régulièrement** (chaque ajout de cours important).

---

## 📊 Statistiques

Onglet **📊 Statistiques** dans l'admin vous montre :
- Le nombre de visites par page
- Quels niveaux/cours sont les plus consultés
- Un graphique en barres

> ℹ️ Les stats sont **locales par appareil**. Pour des stats globales (tous les élèves combinés), il faut intégrer un service externe comme [Plausible](https://plausible.io) ou [Umami](https://umami.is).

---

## 📱 PWA — Installation comme une app

Le site est une **PWA** (Progressive Web App). Vos élèves peuvent l'installer :

**Sur Android (Chrome) :**
- Ouvrir le site → Menu (⋮) → **Installer l'application**

**Sur iPhone (Safari) :**
- Ouvrir le site → Bouton Partager → **Sur l'écran d'accueil**

**Sur PC (Chrome/Edge) :**
- Cliquer sur l'icône d'installation à droite de la barre d'URL

**Avantages :**
- Icône sur l'écran d'accueil
- Mode plein écran (sans la barre du navigateur)
- ✅ Fonctionne **hors ligne** (les pages déjà visitées sont en cache)

---

## 🎨 Personnalisation

### Changer le mot de passe admin
Dans `admin.html`, ligne ~770, changez :
```javascript
const ADMIN_PWD = "ADMIN27";  // ← Mettez votre mot de passe
```

### Ajouter un niveau
Dans `systeme-tunisie.html` ou `systeme-france.html`, modifiez le tableau `levels` :
```javascript
const levels = [
  { id: 'bac-math', icon: '🎓', title: 'Bac Math', subtitle: '...', color: '#C7385F' },
  // Ajoutez vos niveaux ici
];
```

Et faites pareil dans `admin.html` dans `LEVELS` et dans `niveau.html` dans `SYSTEMS`.

---

## 🆘 Problèmes courants

**« Mes cours ont disparu »**
→ Vous avez vidé le cache du navigateur. Restaurez via la sauvegarde JSON.

**« Le code ne marche pas »**
→ Vérifiez les majuscules. Le système met automatiquement en majuscules mais le test est sensible.

**« Le cours ne s'ouvre pas »**
→ Vérifiez que le nom de fichier est exact (avec l'extension `.html` ou `.pdf`) et qu'il est bien uploadé dans le même dossier.

**« Les statistiques sont à zéro »**
→ Normal sur un nouvel appareil. Les stats sont par appareil/navigateur.

---

## 📞 Support

Pour toute question, contactez-moi : Faicel Missaoui

---

© Faicel Missaoui — Missaoui Maths
