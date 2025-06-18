import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Image } from 'expo-image';

const PlaceImage = require('@/assets/images/E404.jpg')

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Pas de fichier trouver' }} />
      <View style={styles.container}>
      <Image source={PlaceImage} style = {{width : 410,height : 700}} />
      <Link href={{pathname : '/' }}>Tabbar</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'none',
    color: 'blue',
  },
});