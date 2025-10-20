#!/usr/bin/env node

/**
 * 🔍 Firebase Configuration Diagnostic Tool
 * Vérifie que la configuration Firebase est correcte
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Firebase Configuration Diagnostic\n');
console.log('=' .repeat(60));

// 1. Vérifier le fichier .env
console.log('\n1️⃣ Vérification du fichier .env');
console.log('-'.repeat(60));

const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Fichier .env non trouvé!');
  console.log('   Créez un fichier .env avec vos credentials Firebase');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n').filter(line => !line.startsWith('#') && line.trim());

console.log(`✅ Fichier .env trouvé (${envLines.length} variables)`);

// 2. Vérifier les variables Firebase
console.log('\n2️⃣ Vérification des variables Firebase');
console.log('-'.repeat(60));

const requiredVars = [
  'EXPO_PUBLIC_FIREBASE_API_KEY',
  'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
  'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'EXPO_PUBLIC_FIREBASE_APP_ID'
];

let missingVars = [];
let invalidVars = [];

requiredVars.forEach(varName => {
  const regex = new RegExp(`^${varName}=(.+)$`, 'm');
  const match = envContent.match(regex);
  
  if (!match) {
    console.log(`❌ ${varName}: MANQUANTE`);
    missingVars.push(varName);
  } else {
    const value = match[1].trim();
    if (value.includes('YOUR_')) {
      console.log(`⚠️  ${varName}: VALEUR PAR DÉFAUT (non remplie)`);
      invalidVars.push(varName);
    } else if (value.length < 10) {
      console.log(`⚠️  ${varName}: VALEUR SEMBLE TROP COURTE`);
      invalidVars.push(varName);
    } else {
      console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
    }
  }
});

// 3. Vérifier firebaseConfig.js
console.log('\n3️⃣ Vérification de firebaseConfig.js');
console.log('-'.repeat(60));

const firebaseConfigPath = path.join(__dirname, 'src', 'services', 'firebaseConfig.js');
if (fs.existsSync(firebaseConfigPath)) {
  console.log('✅ firebaseConfig.js trouvé');
  
  const configContent = fs.readFileSync(firebaseConfigPath, 'utf-8');
  if (configContent.includes('process.env.EXPO_PUBLIC_FIREBASE_API_KEY')) {
    console.log('✅ Lecture correcte des variables d\'environnement');
  } else {
    console.log('⚠️  firebaseConfig.js ne lit pas les variables d\'environnement');
  }
} else {
  console.log('❌ firebaseConfig.js non trouvé!');
}

// 4. Rapport Final
console.log('\n' + '='.repeat(60));
console.log('📋 RAPPORT FINAL');
console.log('='.repeat(60));

if (missingVars.length === 0 && invalidVars.length === 0) {
  console.log('\n✅ CONFIGURATION CORRECTE!\n');
  console.log('Prochaines étapes:');
  console.log('1. Allez à https://console.firebase.google.com');
  console.log('2. Vérifiez que Email/Password est activé dans Authentication');
  console.log('3. Configurez les restrictions de domaine pour localhost');
  console.log('4. Relancez l\'app: npm start -- --web\n');
} else {
  console.log('\n⚠️  PROBLÈMES TROUVÉS:\n');
  
  if (missingVars.length > 0) {
    console.log('Variables manquantes:');
    missingVars.forEach(v => console.log(`  - ${v}`));
  }
  
  if (invalidVars.length > 0) {
    console.log('\nVariables invalides ou non remplies:');
    invalidVars.forEach(v => console.log(`  - ${v}`));
  }
  
  console.log('\n💡 Actions à effectuer:');
  console.log('1. Obtenez les credentials depuis https://console.firebase.google.com');
  console.log('2. Mettez à jour le fichier .env');
  console.log('3. Relancez ce script: node scripts/check-firebase.js\n');
  
  process.exit(1);
}
