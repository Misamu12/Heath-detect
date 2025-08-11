import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Copie/importe DISEASE_DATABASE depuis dianostic.tsx
const DISEASE_DATABASE = [
  {
    maladie: "Paludisme",
    score: 0.7,
    symptomes: ["Fièvre élevée (> 39°C)", "Douleurs musculaires légères (courbatures)", "Vomissements répétés", "Raideur de la nuque"],
    premiers_soins: ["Test rapide (RDT)", "Traitement à l'artémisinine", "Hydratation"],
    riskFactors: ["Anémie maternelle", "accouchement prématuré", "faible poids de naissance"]
  },
  {
    maladie: "Mpox (clade I)",
    score: 0.75,
    symptomes: ["Fièvre", "Éruption cutanée", "Ganglions", "Fatigue"],
    premiers_soins: ["Isolement", "Soins cutanés", "Traitement symptomatique"],
    riskFactors: ["Transmission placentaire", "fausses couches", "anomalies congénitales"]
  },
  {
    maladie: "Choléra",
    score: 0.65,
    symptomes: ["Diarrhée sévère", "Vomissements répétés", "Déshydratation"],
    premiers_soins: ["SRO", "Réhydratation IV", "Antibiotiques"],
    riskFactors: ["Déshydratation maternelle sévère", "accouchement prématuré"]
  },
  {
    maladie: "Fièvre hémorragique virale",
    score: 0.85,
    symptomes: ["Fièvre élevée (> 39°C)", "Vomissements répétés", "Saignements anormaux", "Raideur de la nuque"],
    premiers_soins: ["Isolement", "Prise en charge symptomatique", "Transfert vers un centre spécialisé"],
    riskFactors: ["Risque élevé de mortalité maternelle et fœtale"]
  },
  {
    maladie: "Diabète",
    score: 0.6,
    symptomes: ["Soif excessive", "Mictions fréquentes", "Fatigue", "Perte de poids", "Vision floue", "Guérison lente des plaies"],
    premiers_soins: ["Consultation médicale", "Contrôle glycémique", "Alimentation équilibrée", "Médication antidiabétique"],
    riskFactors: ["Risque de prééclampsie", "macrosomie fœtale", "hypoglycémie néonatale"]
  },
  {
    maladie: "SIDA",
    score: 0.7,
    symptomes: ["Fièvre persistante", "Perte de poids", "Fatigue chronique", "Ganglions enflés", "Infections fréquentes", "Transpiration nocturne"],
    premiers_soins: ["Consultation spécialisée", "Traitement antirétroviral (TAR)", "Suivi régulier"],
    riskFactors: ["Transmission mère-enfant", "nécessitant traitement antirétroviral prophylactique"]
  },
  {
    maladie: "Hypertension",
    score: 0.55,
    symptomes: ["Maux de tête", "Vertiges", "Essoufflement", "Saignements de nez", "Fatigue"],
    premiers_soins: ["Contrôle tensionnel", "Modification du mode de vie", "Médicaments antihypertenseurs"],
    riskFactors: ["Prééclampsie", "retard de croissance fœtale", "complications maternelles"]
  },
  {
    maladie: "Asthme",
    score: 0.65,
    symptomes: ["Essoufflement", "Sifflements respiratoires", "Toux sèche", "Oppression thoracique"],
    premiers_soins: ["Inhalateurs bronchodilatateurs", "Éviction des allergènes", "Consultation pneumologique"],
    riskFactors: ["Crises plus fréquentes", "surveillance rapprochée recommandée"]
  },
  {
    maladie: "Arthrite",
    score: 0.6,
    symptomes: ["Douleurs articulaires", "Raideur matinale", "Gonflement des articulations", "Chaleur locale"],
    premiers_soins: ["Anti-inflammatoires", "Kinésithérapie", "Consultation rhumatologique"],
    riskFactors: ["Certaines formes améliorent ou s’aggravent pendant la grossesse"]
  },
  {
    maladie: "Cancer",
    score: 0.5,
    symptomes: ["Perte de poids inexpliquée", "Fatigue persistante", "Douleurs localisées", "Masse palpable", "Saignements anormaux"],
    premiers_soins: ["Consultation oncologique", "Examens complémentaires", "Traitement chirurgical, chimio ou radio"],
    riskFactors: ["Dépend du type", "prise en charge multidisciplinaire obligatoire"]
  },
  {
    maladie: "COVID-19",
    score: 0.75,
    symptomes: ["Fièvre", "Toux sèche", "Essoufflement", "Perte du goût ou de l’odorat", "Fatigue", "Maux de tête"],
    premiers_soins: ["Isolement", "Repos", "Hydratation", "Surveillance médicale"],
    riskFactors: ["Risque accru de complications", "surveillance obstétricale recommandée"]
  }
  // ... (ajoute toutes les maladies ici, même structure que dans dianostic.tsx)
];

export default function Result() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  // Nettoyer les résultats (retour à la page précédente ou état vide)
  const handleClear = () => {
    setShowResults(false);
    setLoading(false);
    router.replace('/dianostic'); // ou router.back() selon ton flow
  };

  // Simulation du chargement lors du diagnostic
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setShowResults(true);
      setLoading(false);
    }, 1500); // 1.5 secondes de loading
    return () => clearTimeout(timer);
  }, [params.symptoms]);

  const selectedSymptoms: string[] = useMemo(() => {
    try {
      return params.symptoms ? JSON.parse(params.symptoms as string) : [];
    } catch {
      return [];
    }
  }, [params.symptoms]);

  // Filtrer les maladies compatibles (au moins un symptôme en commun)
  const diseases = useMemo(() => {
    return DISEASE_DATABASE
      .map(disease => {
        const matchedSymptoms = disease.symptomes.filter(s => selectedSymptoms.includes(s));
        return matchedSymptoms.length > 0
          ? { ...disease, matchedSymptoms, probability: disease.score }
          : null;
      })
      .filter(Boolean)
      .sort((a, b) => (b?.probability ?? 0) - (a?.probability ?? 0));
  }, [selectedSymptoms]);

  // Pour l'accordéon
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = useCallback((name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const renderItem: ListRenderItem<any> = useCallback(({ item }) => {
    const probabilityColor = item.probability >= 0.7 ? '#16a34a' : item.probability >= 0.4 ? '#f59e0b' : '#ef4444';
    const isOpen = !!expanded[item.maladie];

    return (
      <View style={styles.card}>
        <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => toggle(item.maladie)} style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <FontAwesome5 name="stethoscope" size={18} color="#2563eb" />
            <Text style={styles.cardTitle}>{item.maladie}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={[styles.probBadge, { backgroundColor: '#EFF6FF' }]}>
              <MaterialIcons name="insights" size={18} color={probabilityColor} />
              <Text style={[styles.probText, { color: probabilityColor }]}>{Math.round(item.probability * 100)}%</Text>
            </View>
            <MaterialIcons
              name={isOpen ? 'expand-less' : 'expand-more'}
              size={22}
              color="#475569"
              style={{ marginLeft: 6 }}
            />
          </View>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.cardBody}>
            {/* Symptômes */}
            <Section title="Symptômes correspondants" icon={<FontAwesome5 name="notes-medical" size={16} color="#0ea5e9" />}> 
              <Chips data={item.matchedSymptoms} />
            </Section>
            {/* Premiers soins */}
            <Section title="Premiers soins" icon={<FontAwesome5 name="first-aid" size={16} color="#ef4444" />}> 
              {item.premiers_soins.map((tip: string) => (
                <View key={tip} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.rowText}>{tip}</Text>
                </View>
              ))}
            </Section>
            {/* Facteurs de risque */}
            <Section title="Facteurs de risque" icon={<FontAwesome5 name="exclamation-triangle" size={16} color="#f59e0b" />}> 
              <Chips data={item.riskFactors || []} tone="warning" />
            </Section>
          </View>
        )}
      </View>
    );
  }, [expanded, toggle]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTop}> 
        <Text style={styles.headerTitle}>Résultats du diagnostic</Text>
        <Text style={styles.headerSub}>Touchez une carte pour afficher les détails</Text>
      </View>

      {/* Bouton Nettoyer */}
      <TouchableOpacity
        style={{
          backgroundColor: '#ef4444',
          borderRadius: 8,
          padding: 12,
          alignItems: 'center',
          marginHorizontal: 16,
          marginBottom: 10,
        }}
        onPress={handleClear}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Nettoyer</Text>
      </TouchableOpacity>

      {/* Loading */}
      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={{ marginTop: 16, color: '#2563eb', fontSize: 16 }}>Analyse en cours...</Text>
        </View>
      )}

      {/* Résultats */}
      {!loading && showResults && (
        diseases.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#ef4444', marginTop: 40, fontSize: 18 }}>
            Aucune maladie compatible trouvée avec les symptômes sélectionnés.
          </Text>
        ) : (
          <FlatList
            data={diseases}
            keyExtractor={item => item.maladie}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            keyboardShouldPersistTaps="handled"
          />
        )
      )}
    </SafeAreaView>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 14 }}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          {icon}
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
      </View>
      <View style={{ marginTop: 8 }}>{children}</View>
    </View>
  );
}

function Chips({ data, tone = 'default' as 'default' | 'warning' }: { data: string[]; tone?: 'default' | 'warning' }) {
  return (
    <View style={styles.chipsWrap}>
      {data.map((label) => (
        <View
          key={label}
          style={[
            styles.chip,
            tone === 'warning' && { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' },
          ]}
        >
          <Text style={[styles.chipText, tone === 'warning' && { color: '#9A3412' }]}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  headerTop: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  headerSub: { fontSize: 13, color: '#475569', marginTop: 2 },
  listContent: { padding: 16, paddingBottom: 24 },

  card: { backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2, overflow: 'hidden' },
  cardHeader: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F1F5F9', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  probBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  probText: { fontSize: 14, fontWeight: '800' },
  cardBody: { padding: 16 },

  sectionHeader: { paddingVertical: 2 },
  sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0', borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  chipText: { color: '#0F172A', fontSize: 13, fontWeight: '600' },

  rowItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 6 },
  bullet: { width: 6, height: 6, backgroundColor: '#94a3b8', borderRadius: 3, marginTop: 8, marginRight: 10 },
  rowText: { color: '#334155', fontSize: 14, flex: 1, lineHeight: 20 },

  facilityCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F1F5F9' },
  facilityLeft: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  facilityCenter: { flex: 1 },
  facilityName: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  facilityMeta: { fontSize: 12, color: '#64748B', marginTop: 2 },
  facilityAction: { backgroundColor: '#E0E7FF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  facilityActionText: { color: '#3730A3', fontWeight: '700', fontSize: 12 },

  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  infoText: { fontSize: 18, color: '#64748B', textAlign: 'center', paddingHorizontal: 24 },
});