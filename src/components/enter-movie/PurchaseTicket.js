import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import { TouchableOpacity } from "react-native-gesture-handler";

const PurchaseTicket = ({ hasTickets, setHasTickets }) => {
  async function callStripe() {
    Stripe.setOptionsAsync({
      publishableKey:
        "pk_test_51HtEwcIm0DJNvqedevdJiTTpIkl4rXlh7fqf2Xrm6iLyeD8BNTlaZTMtMBVCBw8Sut6DCVAZFByQm8wC56VEGYxl00JfVfkF09", // Your key
      androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
    });

    const supported = await Stripe.deviceSupportsNativePayAsync();
    Alert.alert("supported: " + supported);
    const supportedAndPaymentMethodExists = await Stripe.canMakeNativePayPaymentsAsync();
    Alert.alert("exists: " + supportedAndPaymentMethodExists);

    const options = {
      total_price: "10.00",
      currency_code: "USD",
      line_items: [
        {
          currency_code: "USD",
          description: "Movie Ticket",
          total_price: "10.00",
          unit_price: "10.00",
          quantity: "1",
        },
      ],
    };

    const token = await Stripe.paymentRequestWithNativePayAsync(options);
    Alert.alert("Token created: " + token);
  }

  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.text}>Enjoy the showing!</Text>
      <TouchableOpacity onPress={callStripe} style={styles.payBtn}>
        <Text style={styles.buttonText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flexDirection: "column",
    backgroundColor: "#272727",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  payBtn: {
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default PurchaseTicket;
