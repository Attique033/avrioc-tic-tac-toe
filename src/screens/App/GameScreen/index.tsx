import React, { useCallback, useMemo } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Board from './components/Board';
import { colors } from '../../../theme/colors';
import { useGameActions } from '../../../store/game/useGameActions';
import { useAppSelector } from '../../../store';
import { GameStatus, Player } from '../../../types';
import Icon from 'react-native-vector-icons/Feather';
import { Images } from '../../../assets/images';
import { useAuth } from '../../../context/AuthContext';

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
      <ImageBackground source={Images.GameBackground} style={styles.bgImage} resizeMode="cover" />
      <ImageBackground style={styles.bgOverlay} resizeMode="cover" />
      <Text variant="headlineMedium" style={styles.title}>
        Tic Tac Toe
      </Text>
      <Text variant="bodyLarge" style={styles.status}>
        {statusText}
      </Text>
      <Board board={board.flat(1)} onCellPress={handleCellPress} />
      <TouchableOpacity onPress={resetGame} style={styles.gameAction}>
        <Icon
          name={sessionId && !winner ? 'rotate-cw' : 'play-circle'}
          size={50}
          color={colors.primary}
        />
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
  },
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
    backgroundColor: colors.transparentBlack,
  },
  title: {
    marginBottom: 24,
    color: colors.primary,
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
    backgroundColor: colors.transparentWhite,
  },
});

export default GameScreen;
