import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

// Configuration Firebase - lire depuis les variables d'environnement Expo
const getFirebaseConfig = () => {
  // D'abord, essayer process.env (développement local)
  if (process.env.EXPO_PUBLIC_FIREBASE_API_KEY && !process.env.EXPO_PUBLIC_FIREBASE_API_KEY.includes('YOUR_')) {
    return {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
    };
  }

  // Sinon, essayer Constants.expoConfig.extra (application compilée)
  if (Constants.expoConfig?.extra?.firebase) {
    return Constants.expoConfig.extra.firebase;
  }

  // Valeurs par défaut pour le développement
  return {
    apiKey: "AIzaSyD-Nq3C_xH1wYHuxQL7ZHb15NeBipdDe_w",
    authDomain: "real-estate-app-70f97.firebaseapp.com",
    projectId: "real-estate-app-70f97",
    storageBucket: "real-estate-app-70f97.firebasestorage.app",
    messagingSenderId: "301759169087",
    appId: "1:301759169087:web:1a909b78022e0d25f12e8a"
  };
};

const firebaseConfig = getFirebaseConfig();

// Vérifier que la configuration est correctement définie
if (firebaseConfig.apiKey.includes('YOUR_')) {
  console.error('🔴 ERREUR: Firebase configuration incomplete!');
  console.error('Assurez-vous que le fichier .env existe avec les bonnes valeurs EXPO_PUBLIC_FIREBASE_*');
  console.error('Configuration actuelle:', firebaseConfig);
} else {
  console.log('✅ Firebase configuration loaded successfully');
  console.log('✅ Project ID:', firebaseConfig.projectId);
}

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Auth
export const auth = getAuth(app);

// Initialiser Firestore
export const db = getFirestore(app);

// Initialiser Storage
export const storage = getStorage(app);

export default app;