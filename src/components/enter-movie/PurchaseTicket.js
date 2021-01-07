import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, Platform } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";
import StripeConfigs from "../common/StripeConfigs";
import moment from "moment";
import AlertMessages from "../common/AlertMessages";

const PurchaseTicket = ({
  selectedShowtimeObj,
  hasTickets,
  setHasTickets,
  movie,
  selectedDate,
}) => {
  const [adultTicketText, setAdultTicketText] = useState("1");
  // const [seniorTicketText, setSeniorTicketText] = useState("0");
  // const [childTicketText, setChildTicketText] = useState("0");
  // const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(10);
  const [emailAddress, setEmailAddress] = useState("");
  const { title } = movie;
  const currencyCode = "USD";

  // useEffect(() => {
  //   calculateTotalAmount();
  // }, [adultTicketText, seniorTicketText, childTicketText]);

  const createAndroidPayOptions = () => {
    let line_items = [];

    if (parseInt(adultTicketText) > 0) {
      line_items.push({
        currency_code: currencyCode,
        description: title + " Adult Movie Ticket",
        total_price: totalAmount.toString(),
        unit_price: "10.00",
        quantity: adultTicketText,
      });
    }
    // if (parseInt(seniorTicketText) > 0) {
    //   line_items.push({
    //     currency_code: currencyCode,
    //     description: title + " Senior Movie Ticket(s)",
    //     total_price: totalAmount.toString(),
    //     unit_price: "8.00",
    //     quantity: seniorTicketText,
    //   });
    // }
    // if (parseInt(childTicketText) > 0) {
    //   line_items.push({
    //     currency_code: currencyCode,
    //     description: title + " Child Movie Ticket(s)",
    //     total_price: totalAmount.toString(),
    //     unit_price: "6.00",
    //     quantity: childTicketText,
    //   });
    // }

    // finalize the payment request object
    const options = {
      total_price: totalAmount.toString(),
      currency_code: currencyCode,
      line_items,
    };
    return options;
  };

  const createApplePayOptions = () => {
    const items = [
      {
        label: title + " Movie Ticket",
        amount: totalAmount.toString(),
      },
      {
        label: "vTheatre, LLC",
        amount: totalAmount.toString(),
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

    // Use publishable key, android pay mode, and apple merchant ID
    StripeConfigs();

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

        const formattedDate = moment(selectedDate).format(
          "dddd, MMMM DD, YYYY"
        );

        // Build request object for backend
        const paymentRequest = {
          tokenId: token.tokenId,
          currency: currencyCode,
          amount: totalAmount,
          description: title + " Movie Ticket",
          emailAddress: emailAddress,
          showtime: selectedShowtimeObj,
          movie: movie,
          chosenMovieDate: formattedDate,
        };

        // Call backend to process the payment
        await Api.post(UriConstants.completePayment, paymentRequest);

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

  // function cleanNonNumericChars(text, ticketType) {
  //   if (!text || typeof text !== "string") {
  //     if (ticketType === "adultTicketText") {
  //       setAdultTicketText("0");
  //     } else if (ticketType === "seniorTicketText") {
  //       setSeniorTicketText("0");
  //     } else if (ticketType === "childTicketText") {
  //       setChildTicketText("0");
  //     }
  //     return "";
  //   }
  //   // Remove non numeric
  //   text = text.replace(/[^\d]/g, "");

  //   // Remove leading zeros
  //   text = text.replace(/^(-)?0+(?=\d)/, "$1"); //?=\d is a positive lookahead, which matches any digit 0-9

  //   if (ticketType === "adultTicketText") {
  //     setAdultTicketText(text);
  //   } else if (ticketType === "seniorTicketText") {
  //     setSeniorTicketText(text);
  //   } else if (ticketType === "childTicketText") {
  //     setChildTicketText(text);
  //   }

  //   return text;
  // }

  // function calculateTotalAmount() {
  //   const adultTickets = 10 * parseInt(adultTicketText);
  //   const seniorTickets = 8 * parseInt(seniorTicketText);
  //   const childTickets = 6 * parseInt(childTicketText);

  //   setTotalAmount(adultTickets + seniorTickets + childTickets);
  // }

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
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      > */}
        {/* <View style={styles.ticketContainer}>
          <Text style={styles.ticketTypeText}>Adult</Text>
          <Text style={styles.priceText}>$10.00</Text>
          <TextInput
            style={styles.ticketInput}
            textAlign={"center"}
            // value={adultTicketText}
            value="1"
            disabled
            keyboardType={"numeric"}
            onChangeText={(text) =>
              cleanNonNumericChars(text, "adultTicketText")
            }
          />
        </View> */}
        {/* <View style={styles.ticketContainer}>
          <Text style={styles.ticketTypeText}>Senior</Text>
          <Text style={styles.priceText}>$8.00</Text>
          <TextInput
            style={styles.ticketInput}
            textAlign={"center"}
            value={seniorTicketText}
            keyboardType={"numeric"}
            onChangeText={(text) =>
              cleanNonNumericChars(text, "seniorTicketText")
            }
          />
        </View>
        <View style={styles.ticketContainer}>
          <Text style={styles.ticketTypeText}>Child</Text>
          <Text style={styles.priceText}>$6.00</Text>
          <TextInput
            style={styles.ticketInput}
            textAlign={"center"}
            value={childTicketText}
            keyboardType={"numeric"}
            onChangeText={(text) =>
              cleanNonNumericChars(text, "childTicketText")
            }
          />
        </View> */}
      {/* </View> */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text style={styles.ticketTypeText}>Total</Text>
          <Text style={styles.totalAmount}>${totalAmount}.00</Text>
        </View>
      </View>
      <TouchableOpacity
        disabled={totalAmount === 0}
        onPress={callStripe}
        style={styles.payBtn}
      >
        <Text style={styles.buttonText}>Proceed to checkout</Text>
      </TouchableOpacity>
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
  ticketContainer: {
    flexDirection: "column",
    alignItems: "center",
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
  priceText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
  },
  ticketInput: {
    backgroundColor: "white",
    paddingVertical: 0,
    marginTop: 5,
    height: 30,
    width: 40,
  },
  payBtn: {
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  totalText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
  totalAmount: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PurchaseTicket;
