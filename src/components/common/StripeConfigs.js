import { PaymentsStripe as Stripe } from "expo-payments-stripe";

const StripeConfigs = () => {
  Stripe.setOptionsAsync({
    publishableKey:
      "pk_test_51HtEwcIm0DJNvqedevdJiTTpIkl4rXlh7fqf2Xrm6iLyeD8BNTlaZTMtMBVCBw8Sut6DCVAZFByQm8wC56VEGYxl00JfVfkF09", // Your key
    // publishableKey:
    //   "pk_live_51HtEwcIm0DJNvqedVFYjSP1U0gzmjqRl6hyyOVAnfKOEOEsCS7bDkceD8yD6NXLTi9G3J1lIbnf6ORHEqLYOTr3O00ZdTRjJLB", // Your key
    androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
    merchantId: "merchant.com.vtheatre",
  });
};

export default StripeConfigs;
