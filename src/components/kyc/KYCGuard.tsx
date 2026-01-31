import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../hooks/useTypedSelector";

interface KYCGuardProps {
	children: React.ReactNode;
}

const KYCGuard = ({ children }: KYCGuardProps) => {
	const navigation = useNavigation<any>();
	const isFocused = useIsFocused(); // Only show alert if user is actually looking at this screen

	const { data: dashboardData } = useAppSelector((state) => state.dashboard);
	const kyc_status = dashboardData?.user?.verificationStatus || "pending";

	useEffect(() => {
		// Only trigger the alert if the screen is focused and user is not verified
		if (isFocused && kyc_status !== "verified") {
			Alert.alert(
				"Verification Required",
				"Please complete your KYC to access transfer features and secure your account.",
				[
					{
						text: "Later",
						onPress: () => {
							if (navigation.canGoBack()) {
								navigation.goBack();
							} else {
								navigation.navigate("Home");
							}
						},
					},
					{
						text: "Verify Now",
						onPress: () => navigation.navigate("KycIntro"),
					},
				],
				{ cancelable: false }
			);
		}
	}, [kyc_status, isFocused, navigation]);

	return (
		<View style={{ flex: 1 }}>
			{/* Always render the children so the screen isn't empty */}
			{children}

			{/* If not verified, show a semi-transparent overlay to "lock" the UI visually */}
			{kyc_status !== "verified" && <View style={styles.overlay} />}
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.3)", // Dims the background slightly
		zIndex: 1000,
	},
});

export default KYCGuard;
