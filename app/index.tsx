import { Link } from "expo-router";
import { Text, View } from "react-native";

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
      <Link rel="stylesheet" href="/dianostic" >sans lieux</Link>
      <Link href={"/home"} >Acceuil</Link>
      ,
      <Link rel="stylesheet" href="/ressource" >ressource</Link>
    </View>
  );
}
 