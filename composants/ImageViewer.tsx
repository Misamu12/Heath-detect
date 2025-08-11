import { Image } from 'expo-image';
import { ImageSourcePropType, ImageStyle, StyleSheet } from 'react-native';

type Props = {
  imgSource: ImageSourcePropType;
  style?: ImageStyle;
};

export default function ImageViewer({ imgSource, style }: Props) {
  return <Image source={imgSource} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
