import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
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
import { buyDataAction } from "../../store/auth/action/dashboard/walletAction";
import { colors } from "../../theme/colors";

// Production mapping of plans
const DATA_PLANS: any = {
	MTN: [
		{ id: "1", label: "1.5GB - 30 Days", price: 1000 },
		{ id: "2", label: "2GB - 30 Days", price: 1200 },
		{ id: "3", label: "5GB - 30 Days", price: 2500 },
	],
	AIRTEL: [
		{ id: "4", label: "1.5GB - 30 Days", price: 1000 },
		{ id: "5", label: "3GB - 30 Days", price: 1500 },
	],
	GLO: [
		{ id: "6", label: "2.9GB - 30 Days", price: 1000 },
		{ id: "7", label: "5.8GB - 30 Days", price: 2000 },
	],
};

const DataScreen = ({ navigation }: any) => {
	const dispatch = useDispatch();
	const [network, setNetwork] = useState("");
	const [phone, setPhone] = useState("");
	const [selectedPlan, setSelectedPlan] = useState<any>(null);
	const [showPinModal, setShowPinModal] = useState(false);

	const handleContinue = () => {
		if (!network || !phone || !selectedPlan) {
			return Alert.alert("Error", "Please complete all selections");
		}
		setShowPinModal(true);
	};

	const handleFinalSubmit = async (pin: string) => {
		const res: any = await dispatch(
			buyDataAction({
				phoneNumber: phone,
				amount: selectedPlan.price,
				network: network,
				dataPlan: selectedPlan.label,
				pin,
			}) as any
		);

		setShowPinModal(false);
		if (res.success) {
			Alert.alert("Success", res.message, [
				{ text: "Home", onPress: () => navigation.navigate("Home") },
			]);
		} else {
			Alert.alert("Error", res.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name='close' size={28} color={colors.darkBlue} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Buy Data Bundle</Text>
				<View style={{ width: 28 }} />
			</View>

			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
				<Text style={styles.label}>Phone Number</Text>
				<TextInput
					style={styles.input}
					placeholder='08012345678'
					keyboardType='phone-pad'
					onChangeText={setPhone}
				/>

				<Text style={[styles.label, { marginTop: 20 }]}>Select Network</Text>
				<View style={styles.row}>
					{["MTN", "AIRTEL", "GLO", "9MOBILE"].map((net) => (
						<TouchableOpacity
							key={net}
							onPress={() => {
								setNetwork(net);
								setSelectedPlan(null);
							}}
							style={[styles.chip, network === net && styles.activeChip]}>
							<Text
								style={[
									styles.chipText,
									network === net && { color: "white" },
								]}>
								{net}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{network ? (
					<>
						<Text style={[styles.label, { marginTop: 20 }]}>Select Plan</Text>
						{DATA_PLANS[network]?.map((plan: any) => (
							<TouchableOpacity
								key={plan.id}
								style={[
									styles.planCard,
									selectedPlan?.id === plan.id && styles.activePlan,
								]}
								onPress={() => setSelectedPlan(plan)}>
								<Text style={styles.planLabel}>{plan.label}</Text>
								<Text style={styles.planPrice}>₦{plan.price}</Text>
							</TouchableOpacity>
						))}
					</>
				) : (
					<Text style={styles.info}>Please select a network to see plans</Text>
				)}
			</ScrollView>

			<View style={styles.footer}>
				<TouchableOpacity style={styles.btn} onPress={handleContinue}>
					<Text style={styles.btnText}>
						Proceed to Pay ₦{selectedPlan?.price || 0}
					</Text>
				</TouchableOpacity>
			</View>

			{/* PIN MODAL (Standard reuse) */}
			<Modal visible={showPinModal} transparent animationType='slide'>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Enter PIN</Text>
						<TextInput
							secureTextEntry
							maxLength={4}
							keyboardType='number-pad'
							style={styles.pinInput}
							autoFocus
							onChangeText={(val) => val.length === 4 && handleFinalSubmit(val)}
						/>
						<TouchableOpacity onPress={() => setShowPinModal(false)}>
							<Text style={{ color: "red", marginTop: 20 }}>Cancel</Text>
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
	headerTitle: { fontSize: 18, fontWeight: "800" },
	label: { fontSize: 14, fontWeight: "700", marginBottom: 10 },
	input: {
		backgroundColor: colors.surface,
		padding: 16,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.border,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	chip: {
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.border,
	},
	activeChip: { backgroundColor: colors.primary, borderColor: colors.primary },
	chipText: { fontSize: 12, fontWeight: "700" },
	planCard: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 18,
		backgroundColor: colors.surface,
		borderRadius: 12,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: colors.border,
	},
	activePlan: { borderColor: colors.primary, backgroundColor: "#f0f4ff" },
	planLabel: { fontWeight: "600" },
	planPrice: { fontWeight: "800", color: colors.primary },
	info: { textAlign: "center", marginTop: 30, color: colors.textSecondary },
	footer: { padding: 20, borderTopWidth: 1, borderTopColor: colors.border },
	btn: {
		backgroundColor: colors.primary,
		padding: 18,
		borderRadius: 15,
		alignItems: "center",
	},
	btnText: { color: "white", fontWeight: "800" },
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
		width: 80,
		textAlign: "center",
		fontSize: 24,
	},
});

export default DataScreen;
