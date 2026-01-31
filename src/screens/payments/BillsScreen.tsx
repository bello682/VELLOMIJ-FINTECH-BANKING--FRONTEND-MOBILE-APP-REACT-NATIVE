import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { buyElectricityAction } from "../../store/auth/action/dashboard/walletAction";
import { colors } from "../../theme/colors";

const PROVIDERS = [
	{ id: "IKEDC", name: "Ikeja Electric" },
	{ id: "EKEDC", name: "Eko Electric" },
	{ id: "KEDCO", name: "Kano Electric" },
	{ id: "PHED", name: "Port Harcourt" },
];

const BillScreen = ({ navigation }: any) => {
	const dispatch = useDispatch();
	const [provider, setProvider] = useState("");
	const [meterNumber, setMeterNumber] = useState("");
	const [amount, setAmount] = useState("");
	const [showPinModal, setShowPinModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleProcess = () => {
		if (!provider || !meterNumber || !amount) {
			return Alert.alert("Error", "Please fill all fields");
		}
		setShowPinModal(true);
	};

	const handleFinalSubmit = async (pin: string) => {
		setLoading(true);
		const result: any = await dispatch(
			buyElectricityAction({
				meterNumber,
				amount: parseFloat(amount),
				provider,
				pin,
			}) as any
		);

		setLoading(false);
		setShowPinModal(false);

		if (result.success) {
			// result.data.token is the simulated 16-digit token from your backend
			Alert.alert(
				"Purchase Successful",
				`Token: ${result.data.token}\n\nThis token has also been sent to your notifications.`,
				[{ text: "Back to Home", onPress: () => navigation.navigate("Home") }]
			);
		} else {
			Alert.alert("Failed", result.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name='arrow-back' size={24} color={colors.darkBlue} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Electricity</Text>
				<View style={{ width: 24 }} />
			</View>

			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.label}>Select Provider</Text>
				<View style={styles.providerList}>
					{PROVIDERS.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={[
								styles.providerItem,
								provider === item.id && styles.activeProvider,
							]}
							onPress={() => setProvider(item.id)}>
							<Text
								style={[
									styles.providerText,
									provider === item.id && { color: colors.white },
								]}>
								{item.name}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Meter Number</Text>
					<TextInput
						style={styles.input}
						placeholder='Enter 11-13 digit meter number'
						keyboardType='numeric'
						value={meterNumber}
						onChangeText={setMeterNumber}
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Amount (₦)</Text>
					<TextInput
						style={styles.input}
						placeholder='0.00'
						keyboardType='numeric'
						value={amount}
						onChangeText={setAmount}
					/>
				</View>

				<TouchableOpacity style={styles.submitBtn} onPress={handleProcess}>
					<Text style={styles.submitBtnText}>Verify & Pay</Text>
				</TouchableOpacity>
			</ScrollView>

			{/* PIN MODAL */}
			<Modal visible={showPinModal} transparent animationType='fade'>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Enter Transaction PIN</Text>
						<TextInput
							secureTextEntry
							maxLength={4}
							keyboardType='number-pad'
							style={styles.pinInput}
							autoFocus
							onChangeText={(val) => {
								if (val.length === 4) handleFinalSubmit(val);
							}}
						/>
						{loading && (
							<ActivityIndicator
								color={colors.primary}
								style={{ marginTop: 15 }}
							/>
						)}
						<TouchableOpacity onPress={() => setShowPinModal(false)}>
							<Text style={styles.cancelText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		alignItems: "center",
	},
	headerTitle: { fontSize: 18, fontWeight: "800", color: colors.darkBlue },
	content: { padding: 20 },
	label: {
		fontSize: 14,
		fontWeight: "700",
		color: colors.darkBlue,
		marginBottom: 12,
	},
	providerList: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginBottom: 25,
	},
	providerItem: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.surface,
	},
	activeProvider: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
	providerText: { fontSize: 13, fontWeight: "600", color: colors.darkBlue },
	inputGroup: { marginBottom: 20 },
	input: {
		backgroundColor: colors.surface,
		padding: 15,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.border,
		fontSize: 16,
	},
	submitBtn: {
		backgroundColor: colors.primary,
		padding: 18,
		borderRadius: 15,
		alignItems: "center",
		marginTop: 10,
	},
	submitBtnText: { color: colors.white, fontWeight: "800", fontSize: 16 },
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.6)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "85%",
		backgroundColor: "white",
		padding: 30,
		borderRadius: 20,
		alignItems: "center",
	},
	modalTitle: { fontSize: 17, fontWeight: "700", marginBottom: 20 },
	pinInput: {
		borderBottomWidth: 2,
		borderColor: colors.primary,
		width: 120,
		textAlign: "center",
		fontSize: 28,
		letterSpacing: 10,
	},
	cancelText: { color: "red", marginTop: 20, fontWeight: "600" },
});

export default BillScreen;
