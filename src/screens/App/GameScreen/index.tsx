import React from 'react';
import { StyleSheet, View } from 'react-native';
import Board from './components/Board';
import { colors } from '../../../theme/colors';
import Background from '../../../components/Background';
import GameResultModal from './components/GameResultModal';
import TurnSelectionModal from './components/TurnSelectionModal';
import Button from '../../../components/Button';

const GameScreen: React.FC = () => {

  const [showTurnSelectionModal, setShowTurnSelectionModal] = React.useState(true);

  const startGame = () => {
    setShowTurnSelectionModal(true);
  };

  return (
    <View style={styles.container}>
      <Background />
      <Board startNewGame={startGame} />
      <Button text={'Start new game'} onPress={startGame} />
      <GameResultModal />
      <TurnSelectionModal
        visible={showTurnSelectionModal}
        onClose={() => setShowTurnSelectionModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    marginBottom: 24,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 24,
  },
  status: {
    marginBottom: 24,
    color: colors.text.secondary,
  },
  gameAction: {
    marginTop: 24,
    color: colors.primary,
    padding: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default GameScreen;
