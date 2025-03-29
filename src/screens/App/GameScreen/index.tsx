import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Board from './components/Board';
import { colors } from '../../../theme/colors';
import { useGameActions } from '../../../store/game/useGameActions';
import { useAppSelector } from '../../../store';
import { GameStatus, Player } from '../../../types';

const GameScreen: React.FC = () => {
  const { createNewSession, makeMove } = useGameActions();

  const { sessionId, board, winner, gameStatus, currentPlayer } = useAppSelector(
    (state) => state.game
  );

  const setupNewGame = useCallback(() => {
    createNewSession(true);
  }, []);

  useEffect(() => {
    createNewSession(true);
  }, [createNewSession]);

  const statusText = useMemo(() => {
    if (!sessionId) {
      return 'Lets start a new game!';
    }
    const playerName = currentPlayer === Player.X ? 'Your' : 'AI';
    if (gameStatus === GameStatus.ONGOING) {
      return `${playerName} turn`;
    }
    if (gameStatus === GameStatus.WON) {
      return `${playerName} wins!`;
    }
    if (!gameStatus) {
      return 'Game is still ongoing';
    }
    return `It's a draw!`;
  }, [gameStatus, currentPlayer]);

  const handleCellPress = (index: number) => {
    if (winner || !!board[index]) {
      return;
    }
    const row = Math.floor(index / 3);
    const col = index % 3;
    const value = currentPlayer === Player.X ? 1 : -1;
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
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
      <Text variant="headlineMedium" style={styles.title}>
        Tic Tac Toe
      </Text>
      <Text variant="bodyLarge" style={styles.status}>
        {statusText}
      </Text>
      <Board board={board.flat(1)} onCellPress={handleCellPress} />
      <Text variant="bodyLarge" style={styles.resetButton} onPress={resetGame}>
        Reset Game
      </Text>
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
  },
  status: {
    marginBottom: 24,
    color: colors.text.secondary,
  },
  resetButton: {
    marginTop: 24,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default GameScreen;
