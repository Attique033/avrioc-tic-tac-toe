import { useAppSelector } from '../../../../../store';
import { useAuth } from '../../../../../context/AuthContext';
import { IconButton, Modal, Text } from 'react-native-paper';
import { GameStatus, Player } from '../../../../../types';
import { useGameActions } from '../../../../../store/game/useGameActions';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../../../theme/colors';
import Background from '../../../../../components/Background';

const GameResultModal = () => {
  const { winner, status, currentPlayer } = useAppSelector((state) => state.game);
  const { user } = useAuth();

  const { resetGameSession } = useGameActions();

  const visible = useMemo(() => {
    return !!winner || status === GameStatus.DRAW;
  }, [status, winner]);

  const result = useMemo(() => {
    const playerName = currentPlayer === Player.X ? user.name : 'AI';
    if (!!winner) {
      return `${playerName} won 🎉`;
    }
    return `It's a draw! 💪`;
  }, [status, currentPlayer]);

  return (
    <Modal
      visible={visible}
      onDismiss={resetGameSession}
      dismissable
      contentContainerStyle={styles.modalContainer}
    >
      <Background />
      <View style={styles.header}>
        <Text variant="bodyLarge" style={styles.title}>
          Game Result!
        </Text>
        <IconButton icon="close" size={20} iconColor="white" onPress={resetGameSession} />
      </View>
      <Text style={styles.body}>{`Hurray! ${result}`}</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.transparentWhite,
    padding: 20,
    borderRadius: 10,
    margin: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  body: {
    marginVertical: 12,
    textAlign: 'center',
  },
});

export default GameResultModal;
