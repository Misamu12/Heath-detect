import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Button } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function signInScreen() {
    
    
    return (
    <View style={styles.container}>
        <Image
            source={ require('../assets/images/icon.png')}
            style={styles.logo}
        />

      <Text style={styles.title}>Hearth-Detect</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          />
        <TouchableOpacity >
          <MaterialIcons 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
      </TouchableOpacity>

        <Link asChild push href="/modal"  >
           <Button title='connexion' onPress={()=>{
            Alert.prompt("Met la donnee : ");
           }} />
        </Link>

      <TouchableOpacity 
        style={styles.registerButton}>
            <Link rel='styleSheet' href="/"
             style = {{
              color: '#4A90E2',
              fontSize: 16,
             }}
            >
                vous avez oublié votre mot de passe ?
            </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems : "center"
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    padding: 15,
    alignItems: 'center',
  },
});