import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  // États pour les champs du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // États pour la visibilité des mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // États pour les erreurs de validation
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });

  // Options pour le sexe
  const genderOptions = [
    { id: 'male', label: 'Masculin' },
    { id: 'female', label: 'Feminin' }
  ];

  // Fonction de validation du formulaire
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
      terms: ''
    };

    // Validation du prénom
    if (!firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
      isValid = false;
    }

    // Validation du nom
    if (!lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
      isValid = false;
    }

    // Validation de l'email
    if (!email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format d\'email invalide';
      isValid = false;
    }

    // Validation du sexe
    if (!gender) {
      newErrors.gender = 'Veuillez sélectionner votre sexe';
      isValid = false;
    }

    // Validation du mot de passe
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      isValid = false;
    }

    // Validation de la confirmation du mot de passe
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    // Validation des conditions d'utilisation
    if (!acceptTerms) {
      newErrors.terms = 'Vous devez accepter les conditions d\'utilisation';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Fonction de soumission du formulaire
  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Inscription réussie',
        `Bienvenue ${firstName} ${lastName}! Votre compte a été créé avec succès.`,
        [{ text: 'OK' }]
      );
    }
  };


  const show = () =>{
    console.log(lastName);
    console.log(firstName);
    console.log(email);
    console.log(gender);
  }
  
  
  



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView 
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.profileImageContainer}>
              <Image 
                source={ require('../assets/images/icon.png')} 
                style={styles.profileImage} 
              />
            </View>
            
            {/* En-tête */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Créer un compte</Text>
              <Text style={styles.headerSubtitle}>
                Veuillez remplir les informations ci-dessous pour vous inscrire
              </Text>
            </View>

            {/* Formulaire d'inscription */}
            <View style={styles.formContainer}>
              {/* Prénom */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Prénom</Text>
                <View style={[
                  styles.inputContainer,
                  errors.firstName ? styles.inputError : null
                ]}>
                  <Feather name="user" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre prénom"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                {errors.firstName ? (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                ) : null}
              </View>

              {/* Nom */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nom</Text>
                <View style={[
                  styles.inputContainer,
                  errors.lastName ? styles.inputError : null
                ]}>
                  <Feather name="user" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre nom"
                    value={lastName}
                    onChangeText={setLastName}
                    
                  />
                </View>
                {errors.lastName ? (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                ) : null}
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={[
                  styles.inputContainer,
                  errors.email ? styles.inputError : null
                ]}>
                  <Feather name="mail" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              {/* Sexe */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Genre</Text>
                <View style={styles.genderContainer}>
                  {genderOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.genderOption,
                        gender === option.id && styles.genderOptionSelected
                      ]}
                      onPress={() => setGender(option.id)}
                    >
                      <Text
                        style={[
                          styles.genderOptionText,
                          gender === option.id && styles.genderOptionTextSelected
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.gender ? (
                  <Text style={styles.errorText}>{errors.gender}</Text>
                ) : null}
              </View>

              {/* Mot de passe */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Mot de passe</Text>
                <View style={[
                  styles.inputContainer,
                  errors.password ? styles.inputError : null
                ]}>
                  <Feather name="lock" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre mot de passe"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    style={styles.visibilityIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#718096"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              {/* Confirmer mot de passe */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirmer mot de passe</Text>
                <View style={[
                  styles.inputContainer,
                  errors.confirmPassword ? styles.inputError : null
                ]}>
                  <Feather name="lock" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmez votre mot de passe"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.visibilityIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Feather
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#718096"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                ) : null}
              </View>

              {/* Conditions d'utilisation */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                >
                  {acceptTerms ? (
                    <MaterialIcons name="check-box" size={24} color="#4299E1" />
                  ) : (
                    <MaterialIcons name="check-box-outline-blank" size={24} color="#CBD5E0" />
                  )}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  J'accepte les{' '}
                  <Text style={styles.termsLink}>conditions d'utilisation</Text> et la{' '}
                  <Text style={styles.termsLink}>politique de confidentialité</Text>
                </Text>
              </View>
              {errors.terms ? (
                <Text style={[styles.errorText, { marginLeft: 32 }]}>{errors.terms}</Text>
              ) : null}

              {/* Bouton d'inscription */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    Alert.alert(firstName + "\n" + lastName + "\n" + email + "\n" + gender + "\n" + password )
                }}
              >
                <Text style={styles.submitButtonText}>S'inscrire</Text>
              </TouchableOpacity>

              {/* Lien vers la connexion */}
              <View style={styles.loginLinkContainer}>
                <Text style={styles.loginText}>
                  Vous avez déjà un compte ?{' '}
                  <Text  style={styles.loginLink}>Se connecter</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4299E1',
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    height: 50,
  },
  inputError: {
    borderColor: '#E53E3E',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#2D3748',
  },
  visibilityIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#E53E3E',
    marginTop: 4,
    marginLeft: 4,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: '#F7FAFC',
  },
  genderOptionSelected: {
    borderColor: '#4299E1',
    backgroundColor: '#EBF8FF',
  },
  genderOptionText: {
    fontSize: 14,
    color: '#718096',
  },
  genderOptionTextSelected: {
    color: '#4299E1',
    fontWeight: '500',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
  },
  checkbox: {
    marginRight: 8,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  termsLink: {
    color: '#4299E1',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4299E1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#4A5568',
  },
  loginLink: {
    color: '#4299E1',
    fontWeight: '500',
  },
});