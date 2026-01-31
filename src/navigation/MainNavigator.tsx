// import { Ionicons } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import React from "react";
// import { Platform } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { colors } from "../theme/colors";

// // Import your screens

// import DashboardScreen from "../screens/dashboard/DashboardScreen";
// import WalletScreen from "../screens/dashboard/WalletScreen";
// import ProfileScreen from "../screens/profile/ProfileScreen";
// import SavingsScreen from "../screens/savings/SavingsScreen";
// import TransferScreen from "../screens/transfers/TransferScreen";

// const Tab = createBottomTabNavigator();

// const MainNavigator = () => {
// 	const insets = useSafeAreaInsets(); // This gets the bottom "Safe Area" height

// 	return (
// 		<Tab.Navigator
// 			screenOptions={({ route }) => ({
// 				headerShown: false,
// 				tabBarShowLabel: true,
// 				tabBarActiveTintColor: colors.primary,
// 				// tabBarHideOnKeyboard: true,
// 				tabBarInactiveTintColor: colors.textSecondary,
// 				tabBarStyle: {
// 					backgroundColor: colors.white,
// 					borderTopWidth: 1,
// 					borderTopColor: colors.border,
// 					// 1. Force more height so the icons are away from the edge
// 					height: Platform.OS === "ios" ? 90 : 80,

// 					// 2. Ensure enough padding so buttons don't clash with system nav
// 					paddingBottom: Platform.OS === "ios" ? insets.bottom : 15,
// 					paddingTop: 10,
// 					// 3. Optional: Add a shadow to make it "float" slightly
// 					elevation: 5,
// 					shadowColor: "#000",
// 					shadowOffset: { width: 0, height: -2 },
// 					shadowOpacity: 0.1,
// 					shadowRadius: 4,
// 				},
// 				tabBarLabelStyle: {
// 					fontSize: 12,
// 					fontWeight: "600",
// 					marginBottom: 5,
// 				},
// 				tabBarIcon: ({ focused, color, size }) => {
// 					let iconName;

// 					if (route.name === "Home")
// 						iconName = focused ? "home" : "home-outline";
// 					else if (route.name === "Wallet")
// 						iconName = focused ? "wallet" : "wallet-outline";
// 					else if (route.name === "Transfer")
// 						iconName = focused ? "swap-horizontal" : "swap-horizontal-outline";
// 					else if (route.name === "Savings")
// 						iconName = focused ? "trending-up" : "trending-up-outline";
// 					else if (route.name === "Profile")
// 						iconName = focused ? "person" : "person-outline";

// 					return <Ionicons name={iconName as any} size={24} color={color} />;
// 				},
// 			})}>
// 			<Tab.Screen name='Home' component={DashboardScreen} />
// 			<Tab.Screen name='Wallet' component={WalletScreen} />
// 			<Tab.Screen name='Transfer' component={TransferScreen} />
// 			<Tab.Screen name='Savings' component={SavingsScreen} />
// 			<Tab.Screen name='Profile' component={ProfileScreen} />
// 		</Tab.Navigator>
// 	);
// };

// export default MainNavigator;

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"; // 1. Add this
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

// Import screens
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import NotificationsScreen from "../screens/dashboard/NotificationsScreen";
import TransactionDetailsScreen from "../screens/dashboard/TransactionDetailsScreen";
import TransactionHistoryScreen from "../screens/dashboard/TransactionHistoryScreen";
import WalletScreen from "../screens/dashboard/WalletScreen";
import DocumentUpload from "../screens/kyc/DocumentUploadScreen";
import FacialVerification from "../screens/kyc/FacialVerificationScreen";
import KycIntroScreen from "../screens/kyc/KycIntroScreen"; // 2. Import KYC screens
import AirtimeScreen from "../screens/payments/AirtimeScreen";
import BillScreen from "../screens/payments/BillsScreen";
import DataScreen from "../screens/payments/DataScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SavingsScreen from "../screens/savings/SavingsScreen";
import DeleteAccountScreen from "../screens/settings/DeleteAccountScreen";
import SetPinScreen from "../screens/settings/SetPinScreen";
import ChatSupportScreen from "../screens/support/ChatSupportScreen";
import HelpCenterScreen from "../screens/support/HelpCenterScreen";
import ConfirmTransferScreen from "../screens/transfers/TransferConfirmScreen";
import TransferScreen from "../screens/transfers/TransferScreen";
import SuccessScreen from "../screens/transfers/TransferSuccessScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // 3. Create Stack

// Move your Tab Logic into a separate component
const TabNavigator = () => {
	const insets = useSafeAreaInsets();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: true,
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.textSecondary,
				tabBarStyle: {
					backgroundColor: colors.white,
					borderTopWidth: 1,
					borderTopColor: colors.border,
					height: Platform.OS === "ios" ? 90 : 80,
					paddingBottom: Platform.OS === "ios" ? insets.bottom : 15,
					paddingTop: 10,
				},
				tabBarIcon: ({ focused, color }) => {
					let iconName;
					if (route.name === "Home")
						iconName = focused ? "home" : "home-outline";
					else if (route.name === "Wallet")
						iconName = focused ? "wallet" : "wallet-outline";
					else if (route.name === "Transfer")
						iconName = focused ? "swap-horizontal" : "swap-horizontal-outline";
					else if (route.name === "Savings")
						iconName = focused ? "trending-up" : "trending-up-outline";
					else if (route.name === "Profile")
						iconName = focused ? "person" : "person-outline";

					return <Ionicons name={iconName as any} size={24} color={color} />;
				},
			})}>
			<Tab.Screen name='Home' component={DashboardScreen} />
			<Tab.Screen name='Wallet' component={WalletScreen} />
			<Tab.Screen name='Transfer' component={TransferScreen} />
			<Tab.Screen name='Savings' component={SavingsScreen} />
			<Tab.Screen name='Profile' component={ProfileScreen} />
		</Tab.Navigator>
	);
};

// 4. Final Export: A Stack that holds the Tabs + KYC
const MainNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* This is your main bottom tab app , This holds your Home, Wallet, Transfer tabs*/}
			<Stack.Screen name='MainTabs' component={TabNavigator} />

			{/* These are screens you can jump to from the Dashboard that don't have bottom tabs */}
			{/* KYC Screens */}
			<Stack.Screen name='KycIntro' component={KycIntroScreen} />
			<Stack.Screen name='DocumentUpload' component={DocumentUpload} />
			<Stack.Screen
				name='FacialVerification'
				component={FacialVerification}
				options={{ title: "Facial Check" }}
			/>

			{/* Security & Settings */}
			<Stack.Screen name='SetPin' component={SetPinScreen} />
			<Stack.Screen
				name='DeleteAccount'
				component={DeleteAccountScreen}
				options={{
					headerShown: true,
					title: "Delete Account",
					headerStyle: { backgroundColor: "#fff" },
					headerTintColor: colors.darkBlue,
				}}
			/>

			{/* Transactions */}
			<Stack.Screen
				name='TransactionHistory'
				component={TransactionHistoryScreen}
			/>
			<Stack.Screen
				name='TransactionDetails'
				component={TransactionDetailsScreen}
			/>
			{/* Transfer Flow Screens */}
			<Stack.Screen name='Transfer' component={TransferScreen} />
			<Stack.Screen name='ConfirmTransfer' component={ConfirmTransferScreen} />
			<Stack.Screen
				name='SuccessScreen'
				component={SuccessScreen}
				options={{ gestureEnabled: false }}
			/>

			{/* Support Integration */}
			<Stack.Screen name='HelpCenterScreen' component={HelpCenterScreen} />
			<Stack.Screen name='ChatSupportScreen' component={ChatSupportScreen} />

			{/* Payment & Bills Flow */}
			<Stack.Screen name='Airtime' component={AirtimeScreen} />
			<Stack.Screen name='Bills' component={BillScreen} />
			<Stack.Screen name='Data' component={DataScreen} />

			<Stack.Screen name='Notifications' component={NotificationsScreen} />
		</Stack.Navigator>
	);
};

export default MainNavigator;
