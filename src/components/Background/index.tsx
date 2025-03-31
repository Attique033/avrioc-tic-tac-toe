import { StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';

const Background: React.FC = () => {
  return (
    <LinearGradient
      start={[0, 0.5]}
      end={[1, 1]}
      dither
      style={styles.bgImage}
      colors={colors.bgGradient}
    />
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

export default Background;
