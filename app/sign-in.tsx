import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from './auth-context';

export default function signInScreen() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = () => {
    if (!isFormValid) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    // Ajoute ici ta logique de vérification
    setIsLoggedIn(true);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/icon.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Health-Detect</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#4A90E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Adresse email"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#4A90E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.loginButton,
          !isFormValid && styles.loginButtonDisabled
        ]}
        onPress={handleLogin}
        disabled={!isFormValid}
        activeOpacity={isFormValid ? 0.7 : 1}
      >
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/create-account')}>
        <Text style={styles.registerText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: '#fff',
    shadowColor: '#4A90E2',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5EDFB',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 320,
    shadowColor: '#2563eb',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#22223b',
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    width: 320,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#2563eb',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  loginButtonDisabled: {
    backgroundColor: '#b6c3d6',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  registerButton: {
    padding: 12,
    alignItems: 'center',
  },
  registerText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 15,
  },
});