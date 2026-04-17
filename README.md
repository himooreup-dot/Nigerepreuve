# 📚 SujetsNiger — Plateforme d'Examens & Concours

Plateforme multipage permettant aux étudiants nigériens de télécharger des sujets d'examens et de concours avec leurs corrections.

---

## 🗂️ Structure du projet

```
sujets-niger/
├── index.html              ← Page d'accueil
├── css/
│   ├── main.css            ← Styles globaux (navbar, forms, cards...)
│   └── home.css            ← Styles spécifiques à l'accueil
├── js/
│   ├── db.js               ← Base de données localStorage + données par défaut
│   ├── auth.js             ← Module d'authentification
│   ├── main.js             ← Utilitaires globaux
│   └── home.js             ← Scripts de la page d'accueil
├── pages/
│   ├── login.html          ← Page de connexion
│   ├── register.html       ← Page d'inscription
│   ├── sujets.html         ← Bibliothèque de sujets avec filtres
│   ├── recherche.html      ← Moteur de recherche avancé
│   └── dashboard.html      ← Espace utilisateur connecté
└── admin/
    └── dashboard.html      ← Panel d'administration
```

---

## 🚀 Lancement

Ouvrir `index.html` dans un navigateur. **Aucun serveur backend requis** — tout fonctionne avec localStorage.

---

## 🔐 Comptes de démonstration

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| Administrateur | admin@sujetsniger.ne | admin123 |
| Utilisateur | (créer via inscription) | — |

---

## ✨ Fonctionnalités

### Côté public
- **Page d'accueil** avec présentation, statistiques animées et sujets récents
- **Bibliothèque** complète avec filtres (type, niveau, matière, année, pagination)
- **Moteur de recherche** avancé avec chips de recherche rapide, trending
- **Inscription/Connexion** avec validation

### Côté utilisateur connecté
- **Dashboard** personnel avec historique de téléchargements
- **Téléchargement** de sujets et corrections (génère un fichier .txt simulé)
- **Profil** modifiable

### Panel Admin
- **Vue d'ensemble** avec statistiques globales
- **Gestion des sujets** : Ajouter, modifier, supprimer avec modal
  - Champs : type (examen/concours), niveau, matière, année, série, titre, description, URL sujet, URL correction
- **Gestion des utilisateurs** : Voir et supprimer
- **Statistiques** : Top téléchargements, répartition par niveau

---

## 📊 Données par défaut

18 sujets pré-chargés couvrant :
- BAC (Maths, Physique, Français, Anglais, Histoire-Géo)
- BEPC (Maths, Français, SVT, Anglais)
- BEP / CAP
- Concours FP (ENA, Douanes, Police, Gendarmerie)
- Université (UAM)
- Grandes Écoles (ECPN)

---

## 🛠️ Technologies

- HTML5 / CSS3 / JavaScript vanilla
- Google Fonts (Playfair Display + DM Sans)
- localStorage pour persistance des données
- Aucune dépendance externe

---

© 2024 SujetsNiger
