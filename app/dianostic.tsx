import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';  
import { Link } from 'expo-router';

const SYMPTOM_CATEGORIES = {
  "Symptômes légers à modérés": [
    "Fatigue passagère", "Éternuements", "Nez qui coule (rhinorrhée)", 
    "Légère toux", "Maux de tête légers", "Démangeaisons cutanées",
    "Congestion nasale", "Douleurs musculaires légères (courbatures)",
    "Brûlures d'estomac occasionnelles", "Ballonnements", "Flatulences",
    "Étourdissements légers", "Acné ou petites éruptions cutanées",
    "Yeux qui piquent (allergies)", "Sensation de gorge irritée"
  ],
  "Symptômes modérés": [
    "Fièvre légère (37,5°C - 38,5°C)", "Toux persistante", "Douleurs articulaires",
    "Nausées", "Vomissements occasionnels", "Diarrhée légère",
    "Constipation prolongée", "Douleurs abdominales modérées",
    "Bourdonnements d'oreille (acouphènes)", "Vertiges modérés",
    "Sueurs nocturnes occasionnelles", "Perte d'appétit temporaire",
    "Saignements de nez (épistaxis) légers", "Urticaire ou eczéma",
    "Essoufflement à l'effort (léger)"
  ],
  "Symptômes sérieux": [
    "Fièvre élevée (> 39°C)", "Douleurs thoraciques", "Essoufflement au repos",
    "Saignements anormaux", "Vomissements répétés", "Diarrhée sévère",
    "Douleurs abdominales intenses", "Perte de poids inexpliquée",
    "Jaunisse (ictère)", "Gonflement des membres (œdème)",
    "Confusion ou désorientation", "Raideur de la nuque",
    "Paralysie partielle ou faiblesse musculaire soudaine",
    "Troubles de la vision soudains", "Palpitations cardiaques prolongées"
  ],
  "Symptômes graves": [
    "Douleur thoracique irradiant dans le bras", "Difficulté à parler ou à comprendre",
    "Perte de connaissance", "Convulsions", "Hémorragie importante",
    "Difficulté respiratoire aiguë", "Déformation soudaine d'un membre",
    "Brûlures graves ou électrocution"
  ]
};

export default function SymptomsScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Symptômes légers à modérés");

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleNext = () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Veuillez sélectionner au moins un symptôme');
      return;
    }
    toast.success(`${selectedSymptoms.length} symptôme(s) sélectionné(s)`);
    // Navigation vers la prochaine étape ici
  };

  const ptx = ()=> {
    alert("Vous etes malades")
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sélection des Symptômes</Text>
      <Text style={styles.subtitle}>
        Sélectionnez vos symptômes pour identifier les maladies potentielles. 
        Cet outil est fourni à titre informatif uniquement et ne remplace pas l'avis médical professionnel.
      </Text>

      {Object.entries(SYMPTOM_CATEGORIES).map(([category, symptoms]) => (
        <View key={category} style={styles.categoryContainer}>
          <TouchableOpacity 
            style={styles.categoryHeader}
            onPress={() => toggleCategory(category)}
          >
            <Text style={styles.categoryTitle}>{category}</Text>
            <MaterialIcons 
              name={expandedCategory === category ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
              size={24} 
              color="#333"
            />
          </TouchableOpacity>

          {expandedCategory === category && (
            <View style={styles.symptomsContainer}>
              {symptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={[
                    styles.symptomButton,
                    selectedSymptoms.includes(symptom) && styles.selectedSymptom
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[
                    styles.symptomText,
                    selectedSymptoms.includes(symptom) && styles.selectedSymptomText
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.nextButton} >
        <Link href={'/dianostic'} > 
          <Pressable>
          <Text style={styles.nextButtonText}>Continuer</Text>
          </Pressable>
        </Link>
        <MaterialIcons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  categoryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  symptomsContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomButton: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  selectedSymptom: {
    backgroundColor: '#ff4444',
    borderColor: '#ff4444',
  },
  symptomText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  selectedSymptomText: {
    color: 'white',
  },
  nextButton: {
    backgroundColor: '#4444ff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
});