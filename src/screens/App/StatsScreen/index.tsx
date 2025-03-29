import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuthActions } from '../../../store/auth/useAuthActions';
import { colors } from '../../../theme/colors';
import BackgroundImage from '../../../components/BackgroundImage';

const StatsScreen: React.FC = () => {
  const { logoutUser } = useAuthActions();
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Button mode={'text'} onPress={logoutUser}>
        Logout
      </Button>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
