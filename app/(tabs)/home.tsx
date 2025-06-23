

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Analyse des Symptômes</Text>
          <Text style={styles.subtitle}>Votre assistant santé personnel</Text>
        </View>

        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des symptômes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFE0E0' }]}>
              <FontAwesome5 name="stethoscope" size={24} color="#FF4444" />
            </View>
            <Link href="/dianostic" style={styles.menuText} asChild >Dianostic</Link>
            <Text style={styles.menuText}>Dianostic</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E0F4FF' }]}>
              <FontAwesome5 name="book-medical" size={24} color="#4477FF" />
            </View>
            <Link href="/ressource" style={styles.menuText} asChild >Ressources</Link>
            <Text style={styles.menuText}>Ressources</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8FFE0' }]}>
              <FontAwesome5 name="users" size={24} color="#44BB44" />
            </View>
            <Text style={styles.menuText}>Communauté</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFE8F0' }]}>
              <FontAwesome5 name="heartbeat" size={24} color="#FF4488" />
            </View>
            <Text style={styles.menuText}>Urgences</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations importantes</Text>
          <View style={styles.card}>
            <FontAwesome5 name="info-circle" size={20} color="#666" />
            <Text style={styles.cardText}>
              Cette application ne remplace pas une consultation médicale. En cas d'urgence, contactez immédiatement les services d'urgence,
              Si vous vous etes enregistre du genre feminin , vos dianostic prendras aussi compte de ca !!!
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
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
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
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
});