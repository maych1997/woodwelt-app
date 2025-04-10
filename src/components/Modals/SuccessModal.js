import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import Ionicons  from 'react-native-vector-icons/Ionicons'

const baseColor = '#FA6E49';

const SuccessModal = ({visible,setIsVisible}) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={visible} animationIn="zoomIn" animationOut="zoomOut">
        <Animatable.View animation="bounceIn" style={styles.modal}>
          <Ionicons name="checkmark-circle" size={80} color={baseColor} />
          <Text style={styles.modalTitle}>Success!</Text>
          <Text style={styles.modalMessage}>Details Updated Successfully!</Text>
          <TouchableOpacity onPress={() => setIsVisible(!visible)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>OK</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    position:'absolute'
  },
  button: {
    backgroundColor: baseColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: baseColor,
    marginTop: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: baseColor,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuccessModal;
