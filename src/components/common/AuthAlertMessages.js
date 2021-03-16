const AuthAlertMessages = {
  AuthErrorTitle: "Missing Information",
  AuthErrorMsg: "Please provide the required fields.",
  InvalidPasswordExceptionTitle: "Password Requirements",
  InvalidPasswordExceptionMsg:
    "Passwords must be at least 8 characters and contain uppercase, lowercase, special, and numeric characters.",
  UsernameExistsExceptionTitle: "Email Already Registered",
  UsernameExistsExceptionMsg:
    "This email address is already registered with vTheatre.",
  NotAuthorizedExceptionTitle: "Invalid Credentials",
  NotAuthorizedExceptionMsg: "Email or password was incorrect.",
  InvalidParameterExceptionTitle: "Cannot Be Empty",
  InvalidParameterExceptionMsg: "Please enter your email and password.",
  InvalidVerificationCodeTitle: "Invalid Verification Code",
  InvalidVerificationCodeMsg:
    "The verification code that you provided is incorrect. Please try again.",
  LimitExceededExceptionTitle: "Limit Exceeded",
  LimitExceededExceptionMsg:
    "Your account has been disabled for too many attempts. Please try again after some time or contact us to re-enable your account.",
  PasswordSuccesfullyResetTitle: "Password Succesfully Reset",
  PasswordSuccesfullyResetMsg:
    "You successfully reset your password. Thank you!",
  VerificationCodeSentTitle: "Verification Code Sent!",
  VerificationCodeSentMsg:
    "We sent you a verification code to your email. Please use it to create a new password.",
};

export default AuthAlertMessages;
