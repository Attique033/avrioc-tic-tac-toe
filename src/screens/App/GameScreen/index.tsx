import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Board from './components/Board';
import { colors } from '../../../theme/colors';
import { useGameActions } from '../../../store/game/useGameActions';
import { useAppSelector } from '../../../store';
import { GameStatus, Player } from '../../../types';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../../context/AuthContext';
import { BlurView } from 'expo-blur';
import BackgroundImage from '../../../components/BackgroundImage';

const GameScreen: React.FC = () => {
  const { createNewSession, makeMove } = useGameActions();

  const { sessionId, board, winner, status, currentPlayer } = useAppSelector((state) => state.game);
  const { user } = useAuth();

  const setupNewGame = useCallback(() => {
    createNewSession(false);
  }, []);

  const statusText = useMemo(() => {
    if (!sessionId) {
      return 'Lets start a new game!';
    }
    const playerName = currentPlayer === Player.O ? user.name : 'AI';
    if (status === GameStatus.ONGOING) {
      return `${playerName}'s turn`;
    }
    if (!!winner) {
      return `${winner} wins!`;
    }
    if (!status) {
      return 'Game is still ongoing';
    }
    return `It's a draw!`;
  }, [status, currentPlayer]);

  const handleCellPress = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (winner || !!board[row][col]) {
      return;
    }
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? -1 : cell))
    );

    makeMove({
      board: newBoard,
      sessionId: sessionId,
    });
  };

  const resetGame = () => {
    setupNewGame();
  };

  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Text variant="titleLarge" style={styles.title}>
        Tic Tac Toe
      </Text>
      <Text variant="bodyLarge" style={styles.status}>
        {statusText}
      </Text>
      <Board board={board.flat(1)} onCellPress={handleCellPress} />
      <TouchableOpacity onPress={resetGame}>
        <BlurView tint={'light'} intensity={80} style={styles.gameAction}>
          <Icon
            name={sessionId && !winner ? 'rotate-cw' : 'play-circle'}
            size={50}
            color={colors.primary}
          />
        </BlurView>
      </TouchableOpacity>
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
