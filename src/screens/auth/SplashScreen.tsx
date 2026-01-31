import { Logo3D } from "@/assets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { colors } from "../../theme/colors";

const SplashScreen = () => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const { user } = useAppSelector((state) => state.loginState);

	// useEffect(() => {
	// 	const checkUserStatus = setTimeout(async ()  => {
	// 		// 1. Check if they've seen onboarding before
	//         const hasSeen = await AsyncStorage.getItem("hasSeenOnboarding");

	// 		if (user?.token) {
	// 			// User is already logged in, skip the auth flow
	// 			navigation.replace("Main");
	// 		} else if (hasSeen) {
	// 			navigation.replace("Login");
	// 		} else {

	// 			navigation.replace("Onboarding");
	// 		}
	// 	}, 2000);

	// 	return () => clearTimeout(checkUserStatus);
	// }, [user]);

	useEffect(() => {
		const checkUserStatus = async () => {
			// 1. Check if they've seen onboarding before
			const hasSeen = await AsyncStorage.getItem("hasSeenOnboarding");

			// 2. Wait for the splash delay (2 seconds)
			setTimeout(() => {
				if (user?.token) {
					// User is already logged in, skip the auth flow
					navigation.replace("Main");
				} else if (hasSeen === "true") {
					navigation.navigate("Login"); // Go straight to login if they've seen onboarding before or they are existing user
				} else {
					// New user, show them the intro
					navigation.navigate("Onboarding"); // First time ever
				}
			}, 2000);
		};

		checkUserStatus();
	}, [user]);

	return (
		<View style={styles.container}>
			<StatusBar barStyle='dark-content' />
			{/* <Image source={AppImages.logo} style={styles.logo} resizeMode='contain' /> */}
			<Logo3D size={220} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		justifyContent: "center",
		alignItems: "center",
	},
	logo: { width: 150, height: 150 },
});

export default SplashScreen;
