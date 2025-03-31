import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../../../store';
import Cell from '../Cell';

type BoardProps = {
  startNewGame: () => void;
}

const Board: React.FC<BoardProps> = ({ startNewGame }) => {

  const { board } = useAppSelector((state) => state.game);

  return (
    <View style={styles.grid}>
      {board.flat(1)?.map((cell, index) => (
        <Cell cell={cell} index={index} startNewGame={startNewGame} />
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
});

export default memo(Board);
