import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import { Text } from 'react-native';

function CenteredHeaderTitle({ title }: { title: string }) {
  return (
    <Text style={{
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      color: 'blue',
      flex: 1,
    }}>
      {title}
    </Text>
  );
}

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerTintColor: "blue",
        headerShadowVisible: false,
        headerTitle: (props) => <CenteredHeaderTitle title={props.children} />,
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Accueil',
          headerTitle: 'Accueil',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          )
        }} 
      />

      <Tabs.Screen 
        name="profil" 
        options={{
          title: 'Profil',
          headerTitle: 'Profil',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }} 
      />

      <Tabs.Screen 
        name="diagnostic" 
        options={{
          title: 'Diagnostic',
          headerTitle: 'Diagnostic',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="medical-services" size={24} color={color} />
          ),
        }} 
      />

      <Tabs.Screen 
        name="ressource" 
        options={{
          title: 'Ressources',
          headerTitle: 'Ressources',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="book" size={24} color={color} />
          )
        }} 
      />

      <Tabs.Screen 
        name="result" 
        options={{
          title: 'Résultat',
          headerTitle: 'Résultat',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="assessment" size={24} color={color} />
          )
        }} 
      />
    </Tabs>
  );
}