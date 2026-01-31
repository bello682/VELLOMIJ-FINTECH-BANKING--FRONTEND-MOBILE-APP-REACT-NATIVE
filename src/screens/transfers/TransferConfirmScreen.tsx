import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { sendMoney } from "../../store/auth/action/dashboard/transferAction";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

const ConfirmTransferScreen = ({ route, navigation }: any) => {
	const { amount, accountNumber, recipientName, bank, description } =
		route.params;
	const dispatch = useDispatch<AppDispatch>();
	const { loading_send, error } = useAppSelector(
		(state) => state.transferState
	);
	const { user } = useAppSelector((state) => state.loginState); // Adjust based on your actual slice name
	// const loginState = useAppSelector((state) => state.loginState);
	// console.log("DEBUG LOGIN STATE:", JSON.stringify(loginState, null, 2));

	const [pin, setPin] = useState("");

	const handleKeyPress = (val: string) => {
		if (pin.length < 4) setPin((prev) => prev + val);
	};

	const handleBackspace = () => {
		setPin((prev) => prev.slice(0, -1));
	};

	const handleConfirm = async () => {
		if (pin.length !== 4) return;

		const result = await (dispatch(
			sendMoney({
				accountNumber,
				amount: parseFloat(amount),
				pin,
				recipientName,
				description,
			})
		) as any);

		if (result && result.success) {
			navigation.replace("SuccessScreen", {
				amount,
				recipientName,
				transactionId: result.transactionId,
				description,
			});
		} else {
			setPin("");
			const errorMessage = result?.message || "Transaction failed";

			// If backend says PIN isn't set, show the redirect alert
			if (
				errorMessage.toLowerCase().includes("pin not set") ||
				errorMessage.toLowerCase().includes("no pin")
			) {
				Alert.alert(
					"Set Transaction PIN",
					"You need to create a transaction PIN before you can send money.",
					[
						{ text: "Later", style: "cancel" },
						{
							text: "Set PIN Now",
							onPress: () => navigation.navigate("SetPin"),
						},
					]
				);
			} else {
				setPin("");
				const errorMessage = result?.message || "Transaction failed";
				const errorLower = errorMessage.toLowerCase();

				// 1. Silent return for session expiry
				if (errorLower.includes("expired") || errorLower.includes("token"))
					return;

				// 2. Updated check to match your specific backend error message
				const userNeedsToSetPin =
					errorLower.includes("pin not set") ||
					errorLower.includes("no pin") ||
					errorLower.includes("set a transaction pin"); // Added this to match backend

				Alert.alert("Transaction Failed", errorMessage, [
					{ text: "Try Again", style: "cancel" },
					...(userNeedsToSetPin
						? [
								{
									text: "Set PIN Now",
									onPress: () => navigation.navigate("SetPin"),
								},
						  ]
						: []),
				]);
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name='arrow-back' size={24} color={colors.darkBlue} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Confirm Transfer</Text>
				<View style={{ width: 24 }} />
			</View>

			<View style={styles.summaryCard}>
				<Text style={styles.amountLabel}>You are sending</Text>
				<Text style={styles.amountText}>
					₦{Number(amount).toLocaleString()}
				</Text>

				<View style={styles.divider} />

				<View style={styles.row}>
					<Text style={styles.label}>Recipient</Text>
					<Text style={styles.value}>{recipientName}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Bank</Text>
					<Text style={styles.value}>{bank}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Account</Text>
					<Text style={styles.value}>{accountNumber}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Description</Text>
					<Text style={styles.value} numberOfLines={1}>
						{description || "No description"}
					</Text>
				</View>
			</View>

			<View style={styles.pinSection}>
				<Text style={styles.pinInstruction}>Enter your 4-digit PIN</Text>
				<View style={styles.pinDotsRow}>
					{[1, 2, 3, 4].map((_, i) => (
						<View
							key={i}
							style={[styles.dot, pin.length > i && styles.activeDot]}
						/>
					))}
				</View>

				{/* Custom Numeric Pad */}
				<View style={styles.keypad}>
					{["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"].map(
						(key, i) => (
							<TouchableOpacity
								key={i}
								style={styles.key}
								onPress={() =>
									key === "back"
										? handleBackspace()
										: key !== "" && handleKeyPress(key)
								}>
								{key === "back" ? (
									<Ionicons
										name='backspace-outline'
										size={24}
										color={colors.darkBlue}
									/>
								) : (
									<Text style={styles.keyText}>{key}</Text>
								)}
							</TouchableOpacity>
						)
					)}
				</View>

				<TouchableOpacity
					style={[
						styles.confirmBtn,
						(pin.length < 4 || loading_send) && styles.disabledBtn,
					]}
					onPress={handleConfirm}
					disabled={pin.length < 4 || loading_send}>
					{loading_send ? (
						<ActivityIndicator color='#FFF' />
					) : (
						<Text style={styles.confirmBtnText}>Confirm & Send</Text>
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
	headerTitle: { fontSize: 18, fontWeight: "700", color: colors.darkBlue },
	summaryCard: {
		margin: 20,
		padding: 20,
		backgroundColor: colors.surface,
		borderRadius: 20,
		alignItems: "center",
	},
	amountLabel: { fontSize: 13, color: colors.textSecondary },
	amountText: {
		fontSize: 28,
		fontWeight: "800",
		color: colors.darkBlue,
		marginTop: 5,
	},
	divider: {
		width: "100%",
		height: 1,
		backgroundColor: colors.border,
		marginVertical: 20,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 15,
	},
	label: { fontSize: 13, color: colors.textSecondary },
	value: {
		fontSize: 14,
		fontWeight: "700",
		color: colors.darkBlue,
		textAlign: "right",
		flex: 1,
		marginLeft: 20,
	},
	pinSection: { flex: 1, paddingHorizontal: 30, alignItems: "center" },
	pinInstruction: {
		fontSize: 15,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: 20,
	},
	pinDotsRow: { flexDirection: "row", marginBottom: 40 },
	dot: {
		width: 15,
		height: 15,
		borderRadius: 7.5,
		borderWidth: 2,
		borderColor: colors.border,
		marginHorizontal: 10,
	},
	activeDot: { backgroundColor: colors.primary, borderColor: colors.primary },
	keypad: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		width: "100%",
	},
	key: {
		width: "33%",
		height: 70,
		justifyContent: "center",
		alignItems: "center",
	},
	keyText: { fontSize: 24, fontWeight: "700", color: colors.darkBlue },
	confirmBtn: {
		backgroundColor: colors.primary,
		width: "100%",
		height: 55,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	disabledBtn: { backgroundColor: colors.border },
	confirmBtnText: { color: colors.white, fontSize: 16, fontWeight: "700" },
});

export default ConfirmTransferScreen;
