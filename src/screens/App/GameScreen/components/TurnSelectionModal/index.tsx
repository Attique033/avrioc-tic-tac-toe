import { Modal, Text } from 'react-native-paper';
import { useGameActions } from '../../../../../store/game/useGameActions';
import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../../../theme/colors';
import Background from '../../../../../components/Background';
import Button from '../../../../../components/Button';

interface TurnSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

const TurnSelectionModal: React.FC<TurnSelectionModalProps> = ({ visible, onClose }) => {
  const { createNewSession } = useGameActions();

  const handlePlayFirst = useCallback((userFirst = false) => {
    createNewSession(userFirst);
    onClose();
  }, [createNewSession, onClose]);

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      dismissable={false}
      contentContainerStyle={styles.modalContainer}
    >
      <Background />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>
          Would you like to play first?
        </Text>
      </View>
      <View style={styles.selectionRow}>
        <Button
          text={'No'}
          onPress={() => handlePlayFirst()}
        />
        <Button text={'Yes'} onPress={() => handlePlayFirst(true)} />
      </View>
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
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default memo(TurnSelectionModal);
