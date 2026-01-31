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
import { buyAirtimeAction } from "../../store/auth/action/dashboard/walletAction";
import { colors } from "../../theme/colors";

const NETWORKS = [
	{ id: "MTN", name: "MTN", color: "#FFCC00" },
	{ id: "AIRTEL", name: "Airtel", color: "#FF0000" },
	{ id: "GLO", name: "Glo", color: "#008000" },
	{ id: "9MOBILE", name: "9Mobile", color: "#005733" },
];

const AirtimeScreen = ({ navigation }: any) => {
	const dispatch = useDispatch();
	const [selectedNetwork, setSelectedNetwork] = useState("");
	const [phone, setPhone] = useState("");
	const [amount, setAmount] = useState("");
	const [pin, setPin] = useState("");
	const [showPinModal, setShowPinModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleOpenPinModal = () => {
		if (!selectedNetwork || !phone || !amount) {
			return Alert.alert("Error", "Please fill all fields");
		}
		setShowPinModal(true);
	};

	const handleFinalSubmit = async (enteredPin: string) => {
		setLoading(true);
		const result: any = await dispatch(
			buyAirtimeAction({
				phoneNumber: phone,
				amount: parseFloat(amount),
				network: selectedNetwork,
				pin: enteredPin,
			}) as any
		);
		setLoading(false);
		setShowPinModal(false);
		setPin("");

		if (result.success) {
			Alert.alert("Success", result.message, [
				{ text: "Done", onPress: () => navigation.navigate("Home") },
			]);
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
				<Text style={styles.headerTitle}>Buy Airtime</Text>
				<View style={{ width: 24 }} />
			</View>

			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.label}>Select Network</Text>
				<View style={styles.networkGrid}>
					{NETWORKS.map((net) => (
						<TouchableOpacity
							key={net.id}
							style={[
								styles.networkCard,
								selectedNetwork === net.id && {
									borderColor: net.color,
									borderWidth: 2,
								},
							]}
							onPress={() => setSelectedNetwork(net.id)}>
							<View
								style={[styles.netCircle, { backgroundColor: net.color }]}
							/>
							<Text style={styles.netName}>{net.name}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Phone Number</Text>
					<TextInput
						style={styles.input}
						placeholder='08012345678'
						keyboardType='phone-pad'
						value={phone}
						onChangeText={setPhone}
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Amount</Text>
					<TextInput
						style={styles.input}
						placeholder='Min ₦50'
						keyboardType='numeric'
						value={amount}
						onChangeText={setAmount}
					/>
				</View>

				<TouchableOpacity style={styles.mainBtn} onPress={handleOpenPinModal}>
					<Text style={styles.mainBtnText}>Continue</Text>
				</TouchableOpacity>
			</ScrollView>

			{/* PIN MODAL (Simplified Version of your SetPin logic) */}
			<Modal visible={showPinModal} transparent animationType='slide'>
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
						<TouchableOpacity onPress={() => setShowPinModal(false)}>
							<Text style={{ color: "red", marginTop: 20 }}>Cancel</Text>
						</TouchableOpacity>
						{loading && (
							<ActivityIndicator
								style={{ marginTop: 10 }}
								color={colors.primary}
							/>
						)}
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
		marginBottom: 15,
	},
	networkGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	networkCard: {
		width: "48%",
		backgroundColor: colors.surface,
		padding: 15,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 15,
		borderWidth: 1,
		borderColor: colors.border,
	},
	netCircle: { width: 40, height: 40, borderRadius: 20, marginBottom: 10 },
	netName: { fontWeight: "700", fontSize: 13 },
	inputGroup: { marginBottom: 20 },
	input: {
		backgroundColor: colors.surface,
		padding: 15,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.border,
		fontSize: 16,
	},
	mainBtn: {
		backgroundColor: colors.primary,
		padding: 18,
		borderRadius: 15,
		alignItems: "center",
		marginTop: 20,
	},
	mainBtnText: { color: colors.white, fontWeight: "800", fontSize: 16 },
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "80%",
		backgroundColor: "white",
		padding: 30,
		borderRadius: 20,
		alignItems: "center",
	},
	modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 20 },
	pinInput: {
		borderBottomWidth: 2,
		borderColor: colors.primary,
		width: 100,
		textAlign: "center",
		fontSize: 24,
		letterSpacing: 10,
	},
});

export default AirtimeScreen;
