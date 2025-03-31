import React, { memo, useCallback } from 'react';
import { BlurView } from 'expo-blur';
import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';
import { Player } from '../../../../../types';
import { useGameActions } from '../../../../../store/game/useGameActions';
import { useAppSelector } from '../../../../../store';

type CellProps = {
  cell: number;
  index: number;
  startNewGame: () => void;
}

const { width } = Dimensions.get('window');
const cellSize = width / 3 - width * 0.07;

const Cell: React.FC<CellProps> = ({ cell, index, startNewGame }) => {

  const { makeMove } = useGameActions();

  const { sessionId, board, winner, currentPlayer } = useAppSelector((state) => state.game);

  const onCellPress = (index: number) => {

    if (!sessionId) {
      return startNewGame();
    }

    if (currentPlayer === Player.X) {
      return;
    }

    const row = Math.floor(index / 3);
    const col = index % 3;
    if (winner || !!board[row][col]) {
      return;
    }
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? -1 : cell)),
    );

    makeMove({
      board: newBoard,
      sessionId: sessionId,
    });
  };

  const getCellIcon = useCallback((cell: number) => {
    let iconName = '';
    let color = colors.primary as string;
    if (cell === -1) {
      iconName = 'x';
    } else if (cell === 1) {
      iconName = 'circle';
      color = colors.secondary;
    }
    return <Icon name={iconName} size={cellSize * 0.65} color={color} />;
  }, []);

  return (
    <BlurView
      tint={'light'}
      intensity={80}
      key={`${index}`}
      style={[styles.cell, { width: cellSize, height: cellSize }]}
      onTouchEnd={() => onCellPress(index)}
    >
      {getCellIcon(cell)}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 8,
  },
  cellText: {
    color: colors.primary,
    fontSize: 40,
  },
});

export default memo(Cell);
