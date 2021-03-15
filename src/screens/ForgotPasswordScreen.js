import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import EnterTheatre from "../components/enter-movie/EnterTheatre";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmailVerificationCode from "../components/auth/EmailVerificationCode";
import NewPassword from "../components/auth/NewPassword";

const ForgotPasswordScreen = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [showVerificationSection, setShowVerificationSection] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#343434" />
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={80}>
            <EnterTheatre img="https://d2jd6aahs7xcv2.cloudfront.net/Icon.jpg" />
            <LoadingSpinner show={showLoadingSpinner} />
            {!showVerificationSection && (
              <EmailVerificationCode
                setShowVerificationSection={setShowVerificationSection}
                setShowLoadingSpinner={setShowLoadingSpinner}
                email={email}
                setEmail={setEmail}
              />
            )}
            {showVerificationSection && (
              <NewPassword
                email={email}
                setShowLoadingSpinner={setShowLoadingSpinner}
              />
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
