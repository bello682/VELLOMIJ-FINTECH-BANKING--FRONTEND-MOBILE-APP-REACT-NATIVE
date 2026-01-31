import { useAppSelector } from "@/src/hooks/useTypedSelector";
import { AppDispatch } from "@/src/store/auth/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Alert,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import LoadingOverlay from "../../components/common/AppLoader";
import { deleteUserAccount } from "../../store/auth/action/deleteUserAction";
import { colors } from "../../theme/colors";

// TypeScript State Interface
interface RootState {
	auth: { user: { id: string; fullName: string } };
	bankInfo: { balance: number }; // Assuming you have a bankInfo reducer
	deleteUserState: { loading_now: boolean };
}

const DeleteAccountScreen = ({ navigation }: any) => {
	const dispatch = useDispatch<AppDispatch>();

	// Selectors with Types
	const { user } = useAppSelector((state) => state.loginState);
	// const { balance } = useAppSelector((state) => state.bankInfo);
	const balance = user.bankInfo?.balance ?? 0;
	const { loading_now } = useAppSelector((state) => state.deleteUserState);

	const [hasConsented, setHasConsented] = useState(false);

	const validateAndDelete = () => {
		// 1. Check for remaining funds (Fintech Standard)
		if (balance > 0) {
			Alert.alert(
				"Withdraw Funds First",
				`You still have ₦${balance.toLocaleString()} in your account. Please withdraw or transfer your balance before deleting your account.`,
				[{ text: "Go to Wallet", onPress: () => navigation.navigate("Wallet") }]
			);
			return;
		}

		if (!hasConsented) {
			Alert.alert(
				"Action Required",
				"Please acknowledge the terms by checking the box."
			);
			return;
		}

		// 2. Final Confirmation
		Alert.alert(
			"Final Warning",
			"This will permanently erase your transaction history, KYC documents, and account access. Are you absolutely sure?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete Permanently",
					style: "destructive",
					onPress: handleFinalDelete,
				},
			]
		);
	};

	const handleFinalDelete = async () => {
		const success = await dispatch(deleteUserAccount(user.id) as any);
		if (success) {
			// Reset the navigation stack to prevent "going back" to a deleted account
			navigation.reset({
				index: 0,
				routes: [{ name: "Login" }],
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<LoadingOverlay
				visible={loading_now}
				message='Permanently closing account...'
			/>

			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
					<Ionicons name='arrow-back' size={24} color={colors.darkBlue} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Account Privacy</Text>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollBody}
				showsVerticalScrollIndicator={false}>
				<View style={styles.iconContainer}>
					<View style={styles.warningCircle}>
						<Ionicons name='trash-outline' size={40} color='#FF3B30' />
					</View>
				</View>

				<Text style={styles.title}>Delete Account?</Text>
				<Text style={styles.subtitle}>
					We're sorry to see you go. Deleting your account is permanent and
					cannot be undone.
				</Text>

				<View style={styles.infoSection}>
					<Text style={styles.sectionHeading}>What you should know:</Text>

					<View style={styles.bulletItem}>
						<Ionicons name='remove-circle' size={18} color='#FF3B30' />
						<Text style={styles.bulletText}>
							All your KYC data (BVN, ID Image) will be wiped.
						</Text>
					</View>
					<View style={styles.bulletItem}>
						<Ionicons name='remove-circle' size={18} color='#FF3B30' />
						<Text style={styles.bulletText}>
							Your transaction history (receipts) will be inaccessible.
						</Text>
					</View>
					<View style={styles.bulletItem}>
						<Ionicons name='remove-circle' size={18} color='#FF3B30' />
						<Text style={styles.bulletText}>
							Any pending support tickets will be closed immediately.
						</Text>
					</View>
				</View>

				<TouchableOpacity
					style={styles.consentBox}
					activeOpacity={0.7}
					onPress={() => setHasConsented(!hasConsented)}>
					<Ionicons
						name={hasConsented ? "checkbox" : "square-outline"}
						size={24}
						color={hasConsented ? colors.primary : "#999"}
					/>
					<Text style={styles.consentText}>
						I confirm that I have read the terms and I understand that my data
						will be permanently deleted.
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.actionBtn, !hasConsented && styles.disabledBtn]}
					onPress={validateAndDelete}
					disabled={loading_now}>
					<Text style={styles.actionBtnText}>Delete My Account</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.stayBtn}
					onPress={() => navigation.goBack()}>
					<Text style={styles.stayBtnText}>Keep My Account</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#FFFFFF" },
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginLeft: 15,
		color: colors.darkBlue,
	},
	scrollBody: { paddingHorizontal: 25, paddingBottom: 40 },
	iconContainer: { alignItems: "center", marginTop: 20 },
	warningCircle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#FFF5F5",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "800",
		color: colors.darkBlue,
		textAlign: "center",
		marginTop: 20,
	},
	subtitle: {
		fontSize: 15,
		color: "#666",
		textAlign: "center",
		marginTop: 10,
		lineHeight: 22,
	},
	infoSection: {
		marginTop: 35,
		backgroundColor: "#F9FAFB",
		padding: 20,
		borderRadius: 16,
	},
	sectionHeading: {
		fontSize: 14,
		fontWeight: "700",
		color: colors.darkBlue,
		marginBottom: 15,
	},
	bulletItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 12,
	},
	bulletText: {
		fontSize: 14,
		color: "#4B5563",
		marginLeft: 10,
		flex: 1,
		lineHeight: 20,
	},
	consentBox: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 30,
		paddingRight: 10,
	},
	consentText: {
		fontSize: 13,
		color: "#374151",
		marginLeft: 12,
		lineHeight: 18,
	},
	actionBtn: {
		backgroundColor: "#FF3B30",
		height: 58,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
		...Platform.select({
			ios: {
				shadowColor: "#FF3B30",
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.2,
				shadowRadius: 8,
			},
			android: { elevation: 4 },
		}),
	},
	disabledBtn: { backgroundColor: "#FFBABA" },
	actionBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
	stayBtn: {
		marginTop: 20,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	stayBtnText: { color: colors.primary, fontWeight: "600", fontSize: 15 },
});

export default DeleteAccountScreen;
