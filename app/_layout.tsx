import { Stack } from "expo-router";

export default function RootLayout() {
  return (
   <Stack>
      <Stack.Screen name="index" options={{ 
        title: ' ', 
        headerTintColor : "blue" }} />



      <Stack.Screen name="connexion" options={{ 
        title: 'connexion' , 
        headerTintColor : "blue"}} />



      <Stack.Screen name="login" options={{ 
        title: 'login', 
        headerTintColor : "blue" }} />



      <Stack.Screen name="ressource" options={{ 
        title: 'ressource', 
        headerTintColor : "blue" }} />


      <Stack.Screen name="home" options={{ 
         title: 'home',
         headerTintColor : "blue" }} />
         

      <Stack.Screen name="dianostic" options={{ 
        title: 'dianostic' , 
        headerTintColor : "blue"}} />

    </Stack>
);
}
