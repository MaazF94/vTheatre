import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";

const PurchaseTicket = ({ hasTickets, setHasTickets, movie }) => {
  const [adultTicketText, setAdultTicketText] = useState("0");
  const [seniorTicketText, setSeniorTicketText] = useState("0");
  const [childTicketText, setChildTicketText] = useState("0");
  const [totalAmount, setTotalAmount] = useState(0);

  const { title } = movie;
  const currencyCode = 'USD';

  useEffect(() => {
    calculateTotalAmount();
  }, [adultTicketText, seniorTicketText, childTicketText]);

  async function callStripe() {
    Stripe.setOptionsAsync({
      publishableKey:
        "pk_test_51HtEwcIm0DJNvqedevdJiTTpIkl4rXlh7fqf2Xrm6iLyeD8BNTlaZTMtMBVCBw8Sut6DCVAZFByQm8wC56VEGYxl00JfVfkF09", // Your key
      androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
    });

    const supportedAndPaymentMethodExists = await Stripe.canMakeNativePayPaymentsAsync();

    if (supportedAndPaymentMethodExists) {
      const options = {
        total_price: totalAmount.toString(),
        currency_code: currencyCode,
        line_items: [
          {
            currency_code: currencyCode,
            description: title + " Adult Movie Ticket(s)",
            total_price: totalAmount.toString(),
            unit_price: "10.00",
            quantity: adultTicketText,
          },
          {
            currency_code: currencyCode,
            description: title + " Senior Movie Ticket(s)",
            total_price: totalAmount.toString(),
            unit_price: "8.00",
            quantity: seniorTicketText,
          },
          {
            currency_code: currencyCode,
            description: title + " Child Movie Ticket(s)",
            total_price: totalAmount.toString(),
            unit_price: "6.00",
            quantity: childTicketText,
          },
        ],
      };

      try {
        const token = await Stripe.paymentRequestWithNativePayAsync(options);

        const paymentRequest = {
          "tokenId": token.tokenId,
          "currency": currencyCode,
          "amount": totalAmount,
          "description": title + " Movie Ticket(s)"
        }
        const processedPayment = await Api.post(UriConstants.completePayment, paymentRequest)
        console.log("processed: " + processedPayment);

        Stripe.completeNativePayRequestAsync();

        Alert.alert(
          "Successful Payment",
          "Your payment was processed. The ticket confirmation code was sent to your email. Enjoy!"
        );

        setHasTickets(!hasTickets);
      } catch (error) {
        Stripe.cancelNativePayRequestAsync();

        Alert.alert(
          "Canceled Payment",
          "An error occurred, your payment was not processed."
        );
      }
    } else {
      Alert.alert(
        "Payment method not supported",
        "You must have apple or google pay set up on your device."
      );
    }
  }

  function cleanNonNumericChars(text, ticketType) {
    if (!text || typeof text !== "string") {
      if (ticketType === "adultTicketText") {
        setAdultTicketText("0");
      } else if (ticketType === "seniorTicketText") {
        setSeniorTicketText("0");
      } else if (ticketType === "childTicketText") {
        setChildTicketText("0");
      }
      return "";
    }
    // Remove non numeric
    text = text.replace(/[^\d]/g, "");

    // Remove leading zeros
    text = text.replace(/^(-)?0+(?=\d)/, "$1"); //?=\d is a positive lookahead, which matches any digit 0-9

    if (ticketType === "adultTicketText") {
      setAdultTicketText(text);
    } else if (ticketType === "seniorTicketText") {
      setSeniorTicketText(text);
    } else if (ticketType === "childTicketText") {
      setChildTicketText(text);
    }

    return text;
  }

  function calculateTotalAmount() {
    const adultTickets = 10 * parseInt(adultTicketText);
    const seniorTickets = 8 * parseInt(seniorTicketText);
    const childTickets = 6 * parseInt(childTicketText);

    setTotalAmount(adultTickets + seniorTickets + childTickets);
  }

  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.headerText}>Enjoy the showing!</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View style={styles.ticketContainer}>
          <Text style={styles.ticketTypeText}>Adult</Text>
          <Text style={styles.priceText}>$10.00</Text>
          <TextInput
            style={styles.textInput}
            textAlign={"center"}
            value={adultTicketText}
            keyboardType={"numeric"}
            onChangeText={(text) =>
              cleanNonNumericChars(text, "adultTicketText")
            }
          />
        </View>
        <View style={styles.ticketContainer}>
          <Text style={styles.ticketTypeText}>Senior</Text>
          <Text style={styles.priceText}>$8.00</Text>
          <TextInput
            style={styles.textInput}
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
            style={styles.textInput}
            textAlign={"center"}
            value={childTicketText}
            keyboardType={"numeric"}
            onChangeText={(text) =>
              cleanNonNumericChars(text, "childTicketText")
            }
          />
        </View>
      </View>
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
  textInput: {
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
