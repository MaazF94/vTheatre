import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, Platform, Image } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";
import StripeConfigs from "../common/StripeConfigs";
import moment from "moment";
import AlertMessages from "../common/AlertMessages";
import * as Network from "expo-network";
import HttpHeaders from "../common/HttpHeaders";
import GooglePay from "../../assets/svg/GooglePay";
import { ApplePayButton } from "react-native-rn-apple-pay-button";

const PurchaseTicket = ({
  selectedShowtimeObj,
  hasTickets,
  setHasTickets,
  movie,
  selectedDate,
  setLoadingAnimation,
}) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [paymentSource, setPaymentSource] = useState("");
  const { title, ticketPrice } = movie;
  const currencyCode = "USD";

  useEffect(() => {
    // Use publishable key, android pay mode, and apple merchant ID
    StripeConfigs();
    choosePaymentSource();
  }, []);

  const createAndroidPayOptions = () => {
    let line_items = [];

    line_items.push({
      currency_code: currencyCode,
      description: title + " Movie Ticket",
      total_price: ticketPrice.toString(),
      unit_price: ticketPrice.toString(),
      quantity: "1",
    });

    // finalize the payment request object
    const options = {
      total_price: ticketPrice.toString(),
      currency_code: currencyCode,
      line_items,
    };
    return options;
  };

  const createApplePayOptions = () => {
    const items = [
      {
        label: title + " Movie Ticket",
        amount: ticketPrice.toString(),
      },
      {
        label: "vTheatre, LLC",
        amount: ticketPrice.toString(),
      },
    ];
    return items;
  };

  const checkValidEmailAddress = () => {
    let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(emailAddress);
  };

  // Called from the process payment button
  const callStripe = async () => {
    // Check valid email
    const emailValidation = checkValidEmailAddress();
    if (!emailValidation) {
      Alert.alert(
        AlertMessages.InvalidEmailAddressTitle,
        AlertMessages.InvalidEmailAddressMsg
      );
      return;
    }

    const networkStatus = await Network.getNetworkStateAsync();
    if (!networkStatus.isConnected) {
      Alert.alert(
        AlertMessages.ConnectivityErrorTitle,
        AlertMessages.ConnectivityErrorMsg
      );
      return;
    }

    // Check if the device supports native wallet pay and if a payment method exists
    const supportedAndPaymentMethodExists = await Stripe.canMakeNativePayPaymentsAsync();

    if (supportedAndPaymentMethodExists) {
      try {
        let options = {};
        let items = [];
        let token = {};

        // Build options depending on OS
        if (Platform.OS === "android") {
          options = createAndroidPayOptions();
          token = await Stripe.paymentRequestWithNativePayAsync(options);
        } else if (Platform.OS === "ios") {
          items = createApplePayOptions();
          token = await Stripe.paymentRequestWithNativePayAsync(options, items);
        }

        const emailFormattedDate = moment(selectedDate).format(
          "dddd, MMMM DD, YYYY"
        );

        const ticketFormattedDate = moment(selectedDate).format("YYYY-MM-DD");

        // Build request object for backend
        const paymentRequest = {
          tokenId: token.tokenId,
          currency: currencyCode,
          description: title + " Movie Ticket",
          emailAddress: emailAddress,
          showtime: selectedShowtimeObj,
          movie: movie,
          emailFormattedDate: emailFormattedDate,
          ticketFormattedDate: ticketFormattedDate,
        };

        setLoadingAnimation(true);

        // Call backend to process the payment
        await Api.post(UriConstants.completePayment, paymentRequest, {
          headers: HttpHeaders.headers,
        });

        setLoadingAnimation(false);

        // Close payment
        await Stripe.completeNativePayRequestAsync();

        Alert.alert(
          AlertMessages.SuccessfulPaymentTitle,
          AlertMessages.SuccessfulPaymentMsg
        );

        setHasTickets(!hasTickets);
      } catch (error) {
        Stripe.cancelNativePayRequestAsync();

        Alert.alert(
          AlertMessages.CanceledPaymentTitle,
          AlertMessages.CanceledPaymentMsg
        );
      }
    } else {
      Alert.alert(
        AlertMessages.PaymentMethodNotSupportedTitle,
        AlertMessages.PaymentMethodNotSupportedMsg
      );
    }
  };

  const choosePaymentSource = () => {
    if (Platform.OS === "android") {
      return setPaymentSource("Google Pay");
    } else if (Platform.OS === "ios") {
      return setPaymentSource("Apple Pay");
    }
  };

  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.headerText}>Enjoy the showing!</Text>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.textInput}
          width="90%"
          backgroundColor="#ffffff"
          placeholderTextColor="#827D7D"
          placeholder="Email Address"
          onChangeText={(value) => setEmailAddress(value)}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text style={styles.ticketTypeText}>Total</Text>
          <Text style={styles.ticketPrice}>${ticketPrice}.00</Text>
        </View>
      </View>
      {paymentSource === "Google Pay" && (
        <TouchableOpacity onPress={callStripe} style={styles.googlePayBtn}>
          <GooglePay />
        </TouchableOpacity>
      )}

      {paymentSource === "Apple Pay" && (
        <View style={styles.applePayBtn}>
          <ApplePayButton
            buttonStyle="white"
            cornerRadius={5}
            type="buy"
            width={145}
            height={33}
            onPress={callStripe}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flexDirection: "column",
    backgroundColor: "#272727",
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  textInput: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    height: 45,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  ticketTypeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
  googlePayBtn: {
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
    width: 145,
  },
  applePayBtn: {
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  ticketPrice: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PurchaseTicket;
