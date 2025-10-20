import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

/**
 * Inscription utilisateur
 */
export const registerUser = async (email, password, name, phone = '') => {
  try {
    // Créer l'utilisateur dans Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Mettre à jour le profil avec le nom
    await updateProfile(user, {
      displayName: name
    });

    // Créer un document utilisateur dans Firestore
    const userData = {
      uid: user.uid,
      email: user.email,
      name: name,
      phone: phone,
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
      isVerified: false,
      bio: '',
      location: '',
      favorites: [],
      listings: []
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    return {
      uid: user.uid,
      email: user.email,
      displayName: name,
      ...userData
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Connexion utilisateur
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Récupérer les données utilisateur depuis Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists()) {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        ...userDoc.data()
      };
    }

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Déconnexion
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Réinitialiser le mot de passe
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Email de réinitialisation envoyé'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Obtenir l'utilisateur actuel
 */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              ...userDoc.data()
            });
          } else {
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName
            });
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

/**
 * Mettre à jour le profil utilisateur
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...updates,
      updatedAt: new Date()
    }, { merge: true });

    return {
      success: true,
      message: 'Profil mis à jour'
    };
  } catch (error) {
    console.error('Profile update error:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Obtenir les informations de l'utilisateur
 */
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    throw new Error('Utilisateur non trouvé');
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

/**
 * Mapper les codes d'erreur Firebase
 */
const getErrorMessage = (code) => {
  const errors = {
    'auth/email-already-in-use': 'Cet email est déjà utilisé',
    'auth/invalid-email': 'Email invalide',
    'auth/operation-not-allowed': 'Opération non autorisée',
    'auth/weak-password': 'Le mot de passe est trop faible',
    'auth/user-disabled': 'Cet utilisateur a été désactivé',
    'auth/user-not-found': 'Utilisateur non trouvé',
    'auth/wrong-password': 'Mot de passe incorrect',
    'auth/invalid-credential': 'Identifiants invalides',
    'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard'
  };

  return errors[code] || 'Une erreur s\'est produite. Veuillez réessayer.';
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getCurrentUser,
  updateUserProfile,
  getUserProfile
};