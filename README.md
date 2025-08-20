# HealthDetect

**HealthDetect** est une application mobile développée avec **React Native** et **Expo**, permettant aux utilisateurs de détecter des maladies à partir de leurs symptômes. L’application offre également des conseils de santé, un suivi historique des diagnostics, et la possibilité de consulter des professionnels de santé associés à chaque maladie.

---

## Fonctionnalités principales

* 🔹 **Identification des maladies** : Détection basée sur les symptômes saisis par l’utilisateur.
* 🔹 **Base de données des maladies** : Inclut des maladies courantes telles que diabète, hypertension, asthme, grossesse, cancer, SIDA, dépression, COVID-19.
* 🔹 **Conseils santé personnalisés** : Suggestions sur l’alimentation, l’exercice et l’environnement.
* 🔹 **Historique des diagnostics** : Suivi des précédentes recherches et diagnostics.
* 🔹 **Consultation de docteurs** : Chaque maladie est associée à un ou plusieurs professionnels de santé pour consultation.
* 🔹 **Interface simple et intuitive** avec navigation fluide grâce à `expo-router`.

---

## Technologies utilisées

* **Frontend** : React Native, Expo, TypeScript
* **Gestion de données** : Firebase
* **Navigation** : Expo Router
* **Validation formulaire** : Formik + Yup
* **UI/Design** : Tailwind via NativeWind (ou style classique selon version)
* **Icônes & éléments graphiques** : @expo/vector-icons

---

## Installation

1. Cloner le dépôt :

```bash
git clone <URL_DU_DEPOT>
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer l’application :

```bash
expo start
```

---

## Structure du projet

```
/HealthDetect
│
├─ /assets       # Images, icônes et ressources graphiques
├─ /components   # Composants réutilisables
├─ /screens      # Écrans de l’application
├─ /services     # Connexion Firebase et logique métier
├─ /navigation   # Gestion de la navigation (expo-router)
└─ App.tsx       # Point d’entrée de l’application
```

---

## Contribution

Les contributions sont les bienvenues !

* Fork le projet
* Créer une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`)
* Committez vos changements (`git commit -m 'Ajout: nouvelle fonctionnalité'`)
* Poussez vers la branche (`git push origin feature/ma-fonctionnalité`)
* Ouvrir une Pull Request

---

## Avenir / améliorations possibles

* Ajout de maladies supplémentaires
* Système de notifications pour le suivi santé
* Intégration d’API médicales pour des conseils plus précis
* Interface design améliorée et thèmes sombres/clairs

---

## Licence

Ce projet est sous licence **MIT**.

---

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```
