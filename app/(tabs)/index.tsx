import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  // Fonction de déconnexion (à adapter selon votre logique)
  const handleLogout = () => {
    // Ajoutez ici la logique de déconnexion (clear token, etc...)
    router.replace('/sign-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        {/* Icône de l'application à gauche */}
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.appIcon}
        />
        {/* Bouton Déconnexion à droite */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialIcons name="logout" size={22} color="#2563eb" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Analyse des Symptômes</Text>
          <Text style={styles.subtitle}>Votre assistant santé personnel</Text>
        </View>

        <View style={styles.menuGrid}>
          <View style={styles.menuItem} >
            <View style={[styles.iconContainer, { backgroundColor: '#FFE0E0' }]}>
              <FontAwesome5 name="stethoscope" size={24} color="#FF4444" />
            </View>
            <Text style={styles.menuText}>Diagnostic</Text>
            <Text style={styles.menuSub}>Analyse basée sur vos symptômes</Text>
          </View>

          <View style={styles.menuItem} >
            <View style={[styles.iconContainer, { backgroundColor: '#E0F4FF' }]}>
              <FontAwesome5 name="chart-pie" size={24} color="#4477FF" />
            </View>
            <Text style={styles.menuText}>Résultats</Text>
            <Text style={styles.menuSub}>Voir un exemple de résultat</Text>
          </View>

          <View style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8FFE0' }]}>
              <FontAwesome5 name="book-medical" size={24} color="#44BB44" />
            </View>
            <Text style={styles.menuText}>Ressources</Text>
            <Text style={styles.menuSub}>Guides et manuels médicaux</Text>
          </View>

          <View style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFE8F0' }]}>
              <FontAwesome5 name="users" size={24} color="#FF4488" />
            </View>
            <Text style={styles.menuText}>Communauté</Text>
            <Text style={styles.menuSub}>Forum et entraide</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations importantes</Text>
          <View style={styles.card}>
            <MaterialIcons name="info" size={20} color="#666" />
            <Text style={styles.cardText}>
              Cette application ne remplace pas une consultation médicale mais plutot 
              Cette application est conçue pour vous aider à mieux comprendre vos symptômes 
              et à vous orienter vers les ressources appropriées. En cas d'urgence, contactez 
              immédiatement les services d'urgence.
              lingwala : {'\n'}
              ngaliema : {'\n'}
              
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  menuSub: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginHorizontal: 18,
    marginBottom: -10,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
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

});