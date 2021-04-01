import React, { useEffect } from "react";
import { StyleSheet, View, Text, Alert, Platform } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import { TouchableOpacity } from "react-native-gesture-handler";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";
import StripeConfigs from "../../components/common/StripeConfigs";
import moment from "moment";
import AlertMessages from "../../components/common/AlertMessages";
import * as Network from "expo-network";
import HttpHeaders from "../../components/common/HttpHeaders";
import GooglePay from "../../assets/svg/GooglePay";
import * as InAppPurchases from "expo-in-app-purchases";
import { useIsFocused } from "@react-navigation/native";
import StorageConstants from "../../components/common/StorageConstants";
import { useNavigation } from "@react-navigation/native";
import ScreenTitles from "../../components/common/ScreenTitles";

const PurchaseTicket = ({
  movie,
  selectedShowtimeObj,
  selectedDate,
  username,
  verifyTicketResponse,
  setShowLoadingSpinner,
  iapProduct,
}) => {
  const { title, ticketPrice } = movie;
  const currencyCode = "USD";
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === "android") {
        // Use publishable key, android pay mode, and apple merchant ID
        StripeConfigs();
      }
    }
  }, [isFocused]);

  const createGooglePayOptions = () => {
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

  const processIosPayment = async (transactionDetails) => {
    const chosenDate = moment(selectedDate).format("YYYY-MM-DD");

    // Build request object for backend
    const paymentRequest = {
      showtime: selectedShowtimeObj,
      movie: movie,
      chosenDate: chosenDate,
      username: username,
      appleTransactionReceipt: transactionDetails.transactionReceipt,
      appleTransactionId: transactionDetails.transactionId,
    };

    // Call backend to process the payment
    await Api.post(UriConstants.completeIosPayment, paymentRequest, {
      headers: HttpHeaders.headers,
    })
      .then((response) => {
        if (!response.data.confirmed) {
          Alert.alert(
            AlertMessages.AlreadyPurchasedTitle,
            AlertMessages.IosAlreadyPurchasedMsg
          );
        }
      })
      .catch(() => {
        setShowLoadingSpinner(false);
        Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
      });
  };

  // Set iOS In App Purchase listener
  InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
    // Purchase was successful
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      const transactionDetails = {
        transactionReceipt: null,
        transactionId: null,
      };
      results.forEach((purchase) => {
        if (!purchase.acknowledged) {
          // Process transaction here and unlock content...
          transactionDetails.transactionReceipt = purchase.transactionReceipt;
          transactionDetails.transactionId = purchase.orderId;
          processIosPayment(transactionDetails);
          InAppPurchases.finishTransactionAsync(purchase, true);
        }
      });
      setShowLoadingSpinner(false);
      verifyTicketResponse.status = "ACTIVE";
      verifyTicketResponse.exists = true;
      verifyTicketResponse.appleTransactionReceipt =
        transactionDetails.transactionReceipt;
      verifyTicketResponse.appleTransactionId =
        transactionDetails.transactionId;
      navigation.navigate(ScreenTitles.EnterMovie, {
        movie: movie,
        selectedShowtimeObj: selectedShowtimeObj,
        selectedDate: selectedDate.toString(),
        username: username,
        verifyTicketResponse: verifyTicketResponse,
      });
    } else {
      // Else find out what went wrong
      if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
        setShowLoadingSpinner(false);
        Alert.alert(
          AlertMessages.CanceledPaymentTitle,
          AlertMessages.CanceledPaymentMsg
        );
      } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
        setShowLoadingSpinner(false);
        // Process transaction here...
        // Handle this with logged in user
        Alert.alert(
          AlertMessages.PaymentDeferredTitle,
          AlertMessages.PaymentDeferredMsg
        );
      } else {
        setShowLoadingSpinner(false);
        Alert.alert(
          AlertMessages.CanceledPaymentTitle,
          AlertMessages.CanceledPaymentMsg
        );
      }
    }
  });

  // Called from the payment button
  const processPayment = async () => {
    if (username === null || username === StorageConstants.Guest) {
      Alert.alert(AlertMessages.NoAccountTitle, AlertMessages.NoAccountMsg);
      return;
    }
    // Android will use Google Pay
    if (Platform.OS === "android") {
      const networkStatus = await Network.getNetworkStateAsync();
      if (!networkStatus.isConnected) {
        Alert.alert(
          AlertMessages.ConnectivityErrorTitle,
          AlertMessages.ConnectivityErrorMsg
        );
        return;
      }
      setShowLoadingSpinner(true);

      // Check if the device supports native wallet pay and if a payment method exists
      const supportedAndPaymentMethodExists = await Stripe.canMakeNativePayPaymentsAsync();
      if (supportedAndPaymentMethodExists) {
        let options = {};
        let token = {};

        try {
          options = createGooglePayOptions();
          token = await Stripe.paymentRequestWithNativePayAsync(options);

          const chosenDate = moment(selectedDate).format("YYYY-MM-DD");

          // Build request object for backend
          const paymentRequest = {
            tokenId: token.tokenId,
            currency: currencyCode,
            description: title + " Movie Ticket",
            showtime: selectedShowtimeObj,
            movie: movie,
            chosenDate: chosenDate,
            username: username,
          };

          // Call backend to process the payment
          await Api.post(UriConstants.processAndroidPayment, paymentRequest, {
            headers: HttpHeaders.headers,
          })
            .then(async (response) => {
              if (!response.data.confirmed) {
                setShowLoadingSpinner(false);
                Alert.alert(
                  AlertMessages.AlreadyPurchasedTitle,
                  AlertMessages.GoogleAlreadyPurchasedMsg
                );
                return;
              } else {
                // Close payment
                await Stripe.completeNativePayRequestAsync();

                Alert.alert(
                  AlertMessages.SuccessfulPaymentTitle,
                  AlertMessages.SuccessfulPaymentMsg
                );
                setShowLoadingSpinner(false);
                verifyTicketResponse.status = "ACTIVE";
                verifyTicketResponse.exists = true;
                navigation.navigate(ScreenTitles.EnterMovie, {
                  movie: movie,
                  selectedShowtimeObj: selectedShowtimeObj,
                  selectedDate: selectedDate.toString(),
                  username: username,
                  verifyTicketResponse: verifyTicketResponse,
                });
              }
            })
            .catch(() => {
              setShowLoadingSpinner(false);
              Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
            });
        } catch (error) {
          Stripe.cancelNativePayRequestAsync();
          setShowLoadingSpinner(false);
          Alert.alert(
            AlertMessages.CanceledPaymentTitle,
            AlertMessages.CanceledPaymentMsg
          );
        }
      } else {
        setShowLoadingSpinner(false);
        Alert.alert(
          AlertMessages.PaymentMethodNotSupportedTitle,
          AlertMessages.PaymentMethodNotSupportedMsg
        );
      }

      // IOS will use In-App Purchases
    } else if (Platform.OS === "ios") {
      if (iapProduct !== undefined) {
        setShowLoadingSpinner(true);
        InAppPurchases.purchaseItemAsync(iapProduct[0].productId);
      } else {
        Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
      }
    }
  };

  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.headerText}>Buy a Ticket!</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text style={styles.ticketTypeText}>Total</Text>
          {Platform.OS === "android" && (
            <Text style={styles.ticketPrice}>${ticketPrice}.00</Text>
          )}
          {Platform.OS === "ios" && iapProduct !== undefined && (
            <Text style={styles.ticketPrice}>{iapProduct[0].price}</Text>
          )}
        </View>
      </View>
      {Platform.OS === "android" && (
        <TouchableOpacity onPress={processPayment} style={styles.googlePayBtn}>
          <GooglePay />
        </TouchableOpacity>
      )}

      {Platform.OS === "ios" && (
        <TouchableOpacity onPress={processPayment} style={styles.applePayBtn}>
          <Text style={styles.buttonText}>Proceed to checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flexDirection: "column",
    backgroundColor: "#272727",
    marginTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  ticketTypeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  ticketPrice: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PurchaseTicket;
