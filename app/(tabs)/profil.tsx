import ImageViewer from '@/composants/ImageViewer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const PlaceholderImage = require('@/assets/images/icon.png');

// Données de l'utilisateur (normalement récupérées depuis une API)
const userData = {
  id: '123456',
  photo: 'assets/images/PATgilet1P.jpg',
  nom: 'Patrick',
  prenom: 'Misamu',
  age: 19,
  sexe: 'Homme',
  email: 'patrickmisamu@gmail.com',
  telephone: '+243 83 12 34 56 78',
  adresse: 'Av.KODJO Quartier H 36 , Ngalieme Kinshasa, RDC',
  derniere_visite: '09 octobre 2025'
};

export default function App() {
  const router = useRouter();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('Tu n\'as pas soumis de photo.');
    }
  };
  const userInfo = userData;
  const [profileImage, setProfileImage] = useState(PlaceholderImage);

  // Simule la sélection d'une photo (remplace par ta logique réelle)
  const handleChoosePhoto = () => {
    setProfileImage({ uri: userInfo.photo });
  };

  const handleUsePhoto = () => {

    // Ici tu peux ajouter la logique pour sauvegarder la photo sélectionnée
    alert('Photo de profil enregistrée !');
  };

  const handleLogout = () => {
    // Ajoute ici la logique de déconnexion si besoin
    router.replace('/sign-in');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4A5568" />

        {/* Bouton Déconnexion en haut à droite */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialIcons name="logout" size={22} color="#2563eb" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollContent}>
          {/* Section photo de profil */}
          <View style={styles.profileImageContainer}>
            <View style={styles.roundImageWrapper}>
              <ImageViewer imgSource={profileImage} style={styles.roundImage} />
            </View>
            
          </View>

          {/* Section infos principales */}
          <View style={styles.mainInfoSection}>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>{userInfo.prenom} {userInfo.nom}</Text>
            </View>

            <View style={styles.badgesRow}>
              <View style={styles.badge}>
                <Ionicons name="calendar-outline" size={16} color="#4299E1" />
                <Text style={styles.badgeText}>{userInfo.age} ans</Text>
              </View>

              <View style={styles.badge}>
                <Ionicons name={userInfo.sexe === 'Femme' ? "female" : "male"} size={16} color="#4299E1" />
                <Text style={styles.badgeText}>{userInfo.sexe}</Text>
              </View>
            </View>
          </View>

          {/* Section coordonnées */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Coordonnées</Text>

            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color="#4299E1" />
              <Text style={styles.infoText}>{userInfo.email}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color="#4299E1" />
              <Text style={styles.infoText}>{userInfo.age} ans</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name={userInfo.sexe === 'Femme' ? "female" : "male"} size={20} color="#4299E1" />
              <Text style={styles.infoText}>{userInfo.sexe}</Text>
            </View>
          </View>

          {/* Section dernière visite */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Dernière visite</Text>
            <View style={styles.infoRow}>
              <Ionicons name="fitness" size={20} color="#4299E1" />
              <Text style={styles.infoText}>{userInfo.derniere_visite}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A5568',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#4A5568',
    marginBottom: 50,
  },
  roundImageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
    marginBottom: 10,
  },
  roundImage: {
    width: 132,
    height: 132,
    borderRadius: 66,
  },
  mainInfoSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 16,
    marginTop: -60,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  badgeText: {
    fontSize: 14,
    color: '#2D3748',
    marginLeft: 6,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#4A5568',
    marginLeft: 10,
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end', // à droite
    marginTop: 18,
    marginRight: 18,
    marginBottom: -10,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: {
    color: '#2563eb',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 15,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 12,
  },
});