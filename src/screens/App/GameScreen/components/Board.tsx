import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { colors } from '../../../../theme/colors';

interface BoardProps {
  board: number[];
  onCellPress: (cell: number) => void;
}

const emptyBoard = Array(9).fill(0);

const { width } = Dimensions.get('window');
const cellSize = width / 3 - width * 0.07;

const getCellText = (cell: number) => {
  switch (cell) {
    case -1:
      return 'X';
    case 1:
      return 'O';
    default:
      return '';
  }
};

const Board: React.FC<BoardProps> = ({ board = emptyBoard, onCellPress }) => {
  return (
    <View style={styles.grid}>
      {board?.map((cell, index) => (
        <Surface
          key={`${index}`}
          style={[styles.cell, { width: cellSize, height: cellSize }]}
          onTouchEnd={() => onCellPress(index)}
          elevation={1}
        >
          <Text variant="displayLarge" style={styles.cellText}>
            {getCellText(cell)}
          </Text>
        </Surface>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 8,
    backgroundColor: colors.background,
  },
  cellText: {
    color: colors.primary,
    fontSize: 40,
  },
});

export default Board;
