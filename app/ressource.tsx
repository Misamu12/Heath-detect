import React, { useState } from 'react';
import { StyleSheet , Text , View , ScrollView , Image , TouchableOpacity , TextInput , StatusBar , FlatList , Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // For 2 columns with padding

// Données des maladies avec leurs ressources
const diseasesData = [
  {
    id: '1',
    name: 'Diabète',
    description: 'Maladie chronique caractérisée par un excès de sucre dans le sang',
    image: 'https://api.a0.dev/assets/image?text=Diabète&aspect=1:1&seed=123',
    categories: ['Vidéo', 'Documentation', 'Conseils'],
    resources: 8
  },
  {
    id: '2',
    name: 'Hypertension',
    description: 'Tension artérielle anormalement élevée dans les artères',
    image: 'https://api.a0.dev/assets/image?text=Hypertension&aspect=1:1&seed=456',
    categories: ['Documentation', 'Articles'],
    resources: 5
  },
  {
    id: '3',
    name: 'Asthme',
    description: 'Maladie inflammatoire chronique des voies respiratoires',
    image: 'https://api.a0.dev/assets/image?text=Asthme&aspect=1:1&seed=789',
    categories: ['Vidéo', 'Exercices', 'Documentation'],
    resources: 12
  },
  {
    id: '4',
    name: 'Arthrite',
    description: 'Inflammation des articulations accompagnée de douleur et raideur',
    image: 'https://api.a0.dev/assets/image?text=Arthrite&aspect=1:1&seed=101',
    categories: ['Vidéo', 'Thérapies'],
    resources: 7
  },
  {
    id: '5',
    name: 'Alzheimer',
    description: 'Maladie neurodégénérative caractérisée par une perte progressive de la mémoire',
    image: 'https://api.a0.dev/assets/image?text=Alzheimer&aspect=1:1&seed=112',
    categories: ['Documentation', 'Vidéo', 'Recherches'],
    resources: 9
  },
  {
    id: '6',
    name: 'Cancer',
    description: 'Groupe de maladies impliquant une croissance cellulaire anormale',
    image: 'https://api.a0.dev/assets/image?text=Cancer&aspect=1:1&seed=131',
    categories: ['Vidéo', 'Documentation', 'Témoignages'],
    resources: 15
  },
  {
    id: '7',
    name: 'Dépression',
    description: 'Trouble mental caractérisé par une humeur dépressive persistante',
    image: 'https://api.a0.dev/assets/image?text=Dépression&aspect=1:1&seed=415',
    categories: ['Conseils', 'Vidéo', 'Thérapies'],
    resources: 11
  },
  {
    id: '8',
    name: 'COVID-19',
    description: 'Maladie infectieuse causée par le coronavirus SARS-CoV-2',
    image: 'https://api.a0.dev/assets/image?text=COVID-19&aspect=1:1&seed=516',
    categories: ['Vidéo', 'Documentation', 'Statistiques'],
    resources: 18
  }
];

// Catégories disponibles pour le filtre
const categories = [
  { id: 'all', name: 'Tous', icon: 'apps' },
  { id: 'video', name: 'Vidéos', icon: 'videocam' },
  { id: 'docs', name: 'Documentation', icon: 'description' },
  { id: 'testimonials', name: 'Témoignages', icon: 'people' },
  { id: 'exercises', name: 'Exercices', icon: 'fitness-center' }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Fonction pour filtrer les maladies selon la recherche et la catégorie
  const getFilteredDiseases = () => {
    return diseasesData.filter(disease => {
      const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           disease.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             disease.categories.some(category => 
                               category.toLowerCase().includes(selectedCategory.toLowerCase()));
      
      return matchesSearch && matchesCategory;
    });
  };

  // Rendu d'une card de maladie
  const renderDiseaseCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.resourcesContainer}>
          <Text style={styles.resourcesText}>
            {item.resources} ressources
          </Text>
          {item.categories.includes('Vidéo') && (
            <View style={styles.resourceBadge}>
              <Ionicons name="videocam" size={12} color="#FF3B30" />
            </View>
          )}
          {item.categories.includes('Documentation') && (
            <View style={styles.resourceBadge}>
              <MaterialIcons name="description" size={12} color="#007AFF" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Rendu d'une catégorie
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem, 
        selectedCategory === item.id && styles.categoryItemSelected
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <MaterialIcons 
        name={item.icon} 
        size={20} 
        color={selectedCategory === item.id ? '#FFFFFF' : '#4A5568'} 
      />
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextSelected
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const filteredDiseases = getFilteredDiseases();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Ressources Médicales</Text>
            <Text style={styles.subtitle}>
              Explorez les informations sur différentes maladies
            </Text>
          </View>
          <View style={styles.profileIcon}>
            <FontAwesome5 name="user-md" size={22} color="#4299E1" />
          </View>
        </View>
        
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une maladie..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Catégories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
          />
        </View>
        
        {/* Liste des maladies */}
        <View style={styles.diseasesSection}>
          <Text style={styles.sectionTitle}>
            Ressources disponibles 
            <Text style={styles.itemCount}> ({filteredDiseases.length})</Text>
          </Text>
          
          {filteredDiseases.length > 0 ? (
            <FlatList
              data={filteredDiseases}
              renderItem={renderDiseaseCard}
              keyExtractor={item => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.cardsContainer}
            />
          ) : (
            <View style={styles.emptyResult}>
              <Ionicons name="alert-circle-outline" size={40} color="#A0AEC0" />
              <Text style={styles.emptyResultText}>
                Aucun résultat trouvé pour votre recherche
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    height: 46,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#4A5568',
  },
  categoriesSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  categoriesList: {
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  categoryItemSelected: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: 'white',
  },
  diseasesSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemCount: {
    fontSize: 14,
    color: '#718096',
    fontWeight: 'normal',
  },
  cardsContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: cardWidth,
    marginHorizontal: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 8,
    height: 30,
  },
  resourcesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  resourcesText: {
    fontSize: 12,
    color: '#A0AEC0',
    marginRight: 8,
  },
  resourceBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  emptyResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyResultText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginTop: 12,
    maxWidth: '80%',
  }
});