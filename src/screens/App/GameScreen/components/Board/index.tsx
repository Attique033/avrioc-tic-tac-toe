import React, { memo, useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { colors } from '../../../../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';
import { BlurView } from 'expo-blur';

interface BoardProps {
  board: number[];
  onCellPress: (cell: number) => void;
}

const emptyBoard = Array(9).fill(0);

const { width } = Dimensions.get('window');
const cellSize = width / 3 - width * 0.07;

const Board: React.FC<BoardProps> = ({ board = emptyBoard, onCellPress }) => {
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
    <View style={styles.grid}>
      {board?.map((cell, index) => (
        <BlurView
          tint={'light'}
          intensity={80}
          key={`${index}`}
          style={[styles.cell, { width: cellSize, height: cellSize }]}
          onTouchEnd={() => onCellPress(index)}
        >
          {getCellIcon(cell)}
        </BlurView>
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
    overflow: 'hidden',
    margin: 8,
  },
  cellText: {
    color: colors.primary,
    fontSize: 40,
  },
});

export default memo(Board);
