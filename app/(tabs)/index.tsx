import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color : 'blue' , fontSize : 20}}>Page de redirectionement</Text>
      <Link rel="stylelsheet" href="/dianostic" >le dianostic</Link>
      <Link href={"/home"} >Acceuil</Link>
      <Link rel="stylesheet" href="/ressource" >ressource</Link>
      <Link asChild push href="/modal"  >
        <Button title='MODAL' />
      </Link>
      
    </View>
  );
}
 