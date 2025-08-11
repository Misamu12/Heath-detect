import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const DISEASE_DATABASE = [
  {
    maladie: "Paludisme",
    score: 0.7,
    probabilite_mortalite: "6–35% selon le foyer",
    symptomes: ["Fièvre élevée (> 39°C)", "Douleurs musculaires légères (courbatures)", "Vomissements répétés", "Raideur de la nuque"],
    premiers_soins: ["Test rapide (RDT)", "Traitement à l'artémisinine", "Hydratation"],
    enceinte: true,
    riskFactors: "Anémie maternelle, accouchement prématuré, faible poids de naissance"
  },
  {
    maladie: "Mpox (clade I)",
    score: 0.75,
    probabilite_mortalite: "≈4.9%",
    symptomes: ["Fièvre", "Éruption cutanée", "Ganglions", "Fatigue"],
    premiers_soins: ["Isolement", "Soins cutanés", "Traitement symptomatique"],
    enceinte: true,
    riskFactors: "Transmission placentaire, fausses couches, anomalies congénitales"
  },
  {
    maladie: "Choléra",
    score: 0.65,
    probabilite_mortalite: "≈2%",
    symptomes: ["Diarrhée sévère", "Vomissements répétés", "Déshydratation"],
    premiers_soins: ["SRO", "Réhydratation IV", "Antibiotiques"],
    enceinte: true,
    riskFactors: "Déshydratation maternelle sévère, accouchement prématuré"
  },
  {
    maladie: "Fièvre hémorragique virale",
    score: 0.85,
    probabilite_mortalite: "10% à 62%",
    symptomes: ["Fièvre élevée (> 39°C)", "Vomissements répétés", "Saignements anormaux", "Raideur de la nuque"],
    premiers_soins: ["Isolement", "Prise en charge symptomatique", "Transfert vers un centre spécialisé"],
    enceinte: true,
    riskFactors: "Risque élevé de mortalité maternelle et fœtale"
  },
  {
    maladie: "Diabète",
    score: 0.6,
    probabilite_mortalite: "Variable selon le contrôle glycémique",
    symptomes: ["Soif excessive", "Mictions fréquentes", "Fatigue", "Perte de poids", "Vision floue", "Guérison lente des plaies"],
    premiers_soins: ["Consultation médicale", "Contrôle glycémique", "Alimentation équilibrée", "Médication antidiabétique"],
    enceinte: true,
    riskFactors: "Risque de prééclampsie, macrosomie fœtale, hypoglycémie néonatale"
  },
  {
    maladie: "SIDA",
    score: 0.7,
    probabilite_mortalite: "Variable selon le stade et traitement",
    symptomes: ["Fièvre persistante", "Perte de poids", "Fatigue chronique", "Ganglions enflés", "Infections fréquentes", "Transpiration nocturne"],
    premiers_soins: ["Consultation spécialisée", "Traitement antirétroviral (TAR)", "Suivi régulier"],
    enceinte: true,
    risques_specs: "Transmission mère-enfant, nécessitant traitement antirétroviral prophylactique"
  },
  {
    maladie: "Hypertension",
    score: 0.55,
    probabilite_mortalite: "Facteur de risque cardiovasculaire majeur",
    symptomes: ["Maux de tête", "Vertiges", "Essoufflement", "Saignements de nez", "Fatigue"],
    premiers_soins: ["Contrôle tensionnel", "Modification du mode de vie", "Médicaments antihypertenseurs"],
    enceinte: true,
    riskFactors: "Prééclampsie, retard de croissance fœtale, complications maternelles"
  },
  {
    maladie: "Asthme",
    score: 0.65,
    probabilite_mortalite: "Faible avec traitement adapté",
    symptomes: ["Essoufflement", "Sifflements respiratoires", "Toux sèche", "Oppression thoracique"],
    premiers_soins: ["Inhalateurs bronchodilatateurs", "Éviction des allergènes", "Consultation pneumologique"],
    enceinte: true,
    riskFactors: "Crises plus fréquentes, surveillance rapprochée recommandée"
  },
  {
    maladie: "Arthrite",
    score: 0.6,
    probabilite_mortalite: "Variable selon forme et prise en charge",
    symptomes: ["Douleurs articulaires", "Raideur matinale", "Gonflement des articulations", "Chaleur locale"],
    premiers_soins: ["Anti-inflammatoires", "Kinésithérapie", "Consultation rhumatologique"],
    enceinte: false,
    riskFactors: "Certaines formes améliorent ou s’aggravent pendant la grossesse"
  },
  {
    maladie: "Cancer",
    score: 0.5,
    probabilite_mortalite: "Très variable selon type et stade",
    symptomes: ["Perte de poids inexpliquée", "Fatigue persistante", "Douleurs localisées", "Masse palpable", "Saignements anormaux"],
    premiers_soins: ["Consultation oncologique", "Examens complémentaires", "Traitement chirurgical, chimio ou radio"],
    enceinte: true,
    riskFactors: "Dépend du type; prise en charge multidisciplinaire obligatoire"
  },
  {
    maladie: "COVID-19",
    score: 0.75,
    probabilite_mortalite: "Variable selon comorbidités",
    symptomes: ["Fièvre", "Toux sèche", "Essoufflement", "Perte du goût ou de l’odorat", "Fatigue", "Maux de tête"],
    premiers_soins: ["Isolement", "Repos", "Hydratation", "Surveillance médicale"],
    enceinte: true,
    riskFactors: "Risque accru de complications, surveillance obstétricale recommandée"
  }
];

// Récupère tous les symptômes utilisés dans DISEASE_DATABASE
const ALL_DISEASE_SYMPTOMS = Array.from(
  new Set(DISEASE_DATABASE.flatMap(d => d.symptomes))
);

// Filtre les catégories pour ne garder que les symptômes utilisés
const FILTERED_SYMPTOM_CATEGORIES = Object.fromEntries(
  Object.entries(SYMPTOM_CATEGORIES).map(([cat, symptoms]) => [
    cat,
    symptoms.filter(s => ALL_DISEASE_SYMPTOMS.includes(s)),
  ]).filter(([_, symptoms]) => symptoms.length > 0)
);

export default function SymptomsScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Symptômes légers à modérés");
  const router = useRouter();

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
      // Affiche une alerte si aucun symptôme n'est sélectionné
      Alert.alert("Erreur", "Veuillez sélectionner au moins un symptôme avant de continuer.");
      return;
    }

    // Redirige vers la page résultat avec les symptômes sélectionnés
    router.push({
      pathname: '/result',
      params: { symptoms: JSON.stringify(selectedSymptoms) }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sélection des Symptômes</Text>
      <Text style={styles.subtitle}>
        Sélectionnez vos symptômes pour identifier les maladies potentielles. 
        Cet outil est fourni à titre informatif uniquement et ne remplace pas l'avis médical professionnel.
      </Text>

      {Object.entries(FILTERED_SYMPTOM_CATEGORIES).map(([category, symptoms]) => (
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

      <TouchableOpacity
        onPress={handleNext}
        style={[
          styles.nextButton,
          selectedSymptoms.length === 0 && { backgroundColor: '#cccccc' }
        ]}
        disabled={selectedSymptoms.length === 0}
      >
        <Text style={styles.nextButtonText}>Continuer</Text>
        <MaterialIcons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
}

// ... Styles inchangés (pas repris ici pour éviter la répétition)

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