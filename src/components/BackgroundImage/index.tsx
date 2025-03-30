import { ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { Images } from '../../assets/images';
import { BlurView } from 'expo-blur';

const BackgroundImage: React.FC = () => {
  return (
    <>
      <ImageBackground source={Images.GameBackground} style={styles.bgImage} resizeMode="cover" />
      <BlurView tint={'dark'} intensity={70} style={styles.bgOverlay} />
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BackgroundImage;
