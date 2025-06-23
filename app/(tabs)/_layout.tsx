import { Stack } from "expo-router";

export default function RootLayout() {
  return (
   <Stack>
      <Stack.Screen name="index" options={{ 
        title: ' ', 
        headerTintColor : "blue",
         headerShadowVisible: false,
         headerShown : false }} />


      <Stack.Screen name="ressource" options={{ 
        title: ' ',
        headerTintColor : "blue" ,
        headerShown : true }} />


      <Stack.Screen name="home" options={{ 
         title: 'home',
         headerTintColor : "blue" }} />
         

      <Stack.Screen name="dianostic" options={{ 
        title: 'dianostic' , 
        headerTintColor : "blue"}} />

        {/** Ajouter une page resultat  */}

    </Stack>
);
}
