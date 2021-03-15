import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

const LoadingSpinner = ({ show }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={show}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator
              animating
              size="large"
              color="#7E0808"
              style={[styles.centerContainer]}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingSpinner;
