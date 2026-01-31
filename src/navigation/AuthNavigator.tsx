import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Screens
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import LoginScreen from "../screens/auth/loginScreen";
import OTPScreen from "../screens/auth/OtpVerificationScreen";
import RegisterScreen from "../screens/auth/registrationScreen";
import ResendOTPScreen from "../screens/auth/resendOtpScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import KycIntroScreen from "../screens/kyc/KycIntroScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import WelcomeScreen from "../screens/onboarding/WelcomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='Splash'
			screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Splash' component={SplashScreen} />
			<Stack.Screen name='Onboarding' component={OnboardingScreen} />
			<Stack.Screen name='Welcome' component={WelcomeScreen} />
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Register' component={RegisterScreen} />
			<Stack.Screen name='OTPVerification' component={OTPScreen} />
			<Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
			<Stack.Screen name='ResendOTP' component={ResendOTPScreen} />
			<Stack.Screen name='KycIntro' component={KycIntroScreen} />
		</Stack.Navigator>
	);
};

export default AuthNavigator;
