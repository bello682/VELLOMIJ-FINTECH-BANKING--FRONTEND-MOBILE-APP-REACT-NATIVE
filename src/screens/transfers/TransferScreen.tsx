import KYCGuard from "@/src/components/kyc/KYCGuard";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
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
import { useAppSelector } from "../../hooks/useTypedSelector";
import { fetchBanksFromPaystack } from "../../services/bankService";
import {
	resetTransfer,
	verifyAccountNumber,
} from "../../store/auth/action/dashboard/transferAction";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BANK_OPTIONS = [
	{
		id: "1",
		name: "Send to Bank Account",
		icon: "business-outline",
		desc: "Transfer to any bank instantly",
	},
	{
		id: "2",
		name: "Send to @Tag",
		icon: "at-outline",
		desc: "Free transfers to app users",
	},
	{
		id: "3",
		name: "Pay Bills",
		icon: "receipt-outline",
		desc: "Electricity, Water, Internet",
	},
];

const TransferScreen = ({ navigation }: any) => {
	const dispatch = useDispatch<AppDispatch>();
	const { verifiedName, loading_verify, error } = useAppSelector(
		(state) => state.transferState
	);
	const { data: dashboardData } = useAppSelector((state) => state.dashboard);

	// console.log(
	// 	"DEBUG DASBOARD STATE TRANSFER:",
	// 	JSON.stringify(dashboardData, null, 2)
	// );

	// const kyc_status = dashboardData?.user?.verificationStatus || "pending";

	const [bankList, setBankList] = useState<any[]>([]);
	const [filteredBanks, setFilteredBanks] = useState<any[]>([]);
	const [searchBank, setSearchBank] = useState("");

	const [isBankModalVisible, setIsBankModalVisible] = useState(false);
	const [selectedBank, setSelectedBank] = useState<any>(null);

	const [step, setStep] = useState(1);
	const [accountNumber, setAccountNumber] = useState("");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");

	// 1. FETCH ACTUAL BANKS ON MOUNT
	useEffect(() => {
		const loadBanks = async () => {
			const banks = await fetchBanksFromPaystack();
			setBankList(banks);
			setFilteredBanks(banks);
		};
		loadBanks();
	}, []);

	// 2. SEARCH FILTER FOR BANKS
	useEffect(() => {
		const filtered = bankList.filter((b) =>
			b.name.toLowerCase().includes(searchBank.toLowerCase())
		);
		setFilteredBanks(filtered);
	}, [searchBank, bankList]);

	// 3. AUTO-VERIFY
	useEffect(() => {
		if (accountNumber.length === 10 && selectedBank) {
			dispatch(verifyAccountNumber(accountNumber, selectedBank.code));
		} else if (accountNumber.length < 10 && verifiedName) {
			dispatch(resetTransfer());
		}
	}, [accountNumber, selectedBank]);

	const handleActionPress = (id: string) => {
		if (id === "1") setIsBankModalVisible(true);
	};

	const handleGoBack = () => {
		if (step === 2) {
			setStep(1);
			dispatch(resetTransfer());
			setAccountNumber("");
			setAmount("");
			setDescription("");
			setSelectedBank(null);
		} else {
			navigation.goBack();
		}
	};

	const renderHeader = () => (
		<View style={styles.header}>
			<TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
				<Ionicons name='arrow-back' size={24} color={colors.darkBlue} />
			</TouchableOpacity>
			<Text style={styles.title}>
				{step === 1 ? "Transfer" : "Enter Details"}
			</Text>
			{/* Restored Transaction History Icon */}
			<TouchableOpacity
				onPress={() => navigation.navigate("TransactionHistory")}
				style={styles.historyBtn}>
				<Ionicons name='time-outline' size={24} color={colors.darkBlue} />
			</TouchableOpacity>
		</View>
	);

	if (step === 2) {
		return (
			<KYCGuard>
				<SafeAreaView style={styles.container}>
					{renderHeader()}
					<ScrollView contentContainerStyle={{ padding: 20 }}>
						<View style={styles.selectedBankCard}>
							<Ionicons name='business' size={20} color={colors.primary} />
							<Text style={styles.bankLabelHeader}>{selectedBank?.name}</Text>
							<TouchableOpacity onPress={() => setIsBankModalVisible(true)}>
								<Text
									style={{
										color: colors.primary,
										fontSize: 12,
										fontWeight: "700",
									}}>
									CHANGE
								</Text>
							</TouchableOpacity>
						</View>

						<Text style={styles.inputLabel}>Account Number</Text>
						<View
							style={[
								styles.inputWrapper,
								error ? { borderColor: "#EB5757" } : null,
							]}>
							<TextInput
								style={styles.inputField}
								placeholder='0123456789'
								keyboardType='number-pad'
								maxLength={10}
								value={accountNumber}
								onChangeText={setAccountNumber}
							/>
							{loading_verify && (
								<ActivityIndicator color={colors.primary} size='small' />
							)}
						</View>

						{verifiedName && (
							<View style={styles.verifiedBox}>
								<View style={styles.verifiedBadge}>
									<Ionicons name='checkmark-circle' size={14} color='#27AE60' />
									<Text style={styles.verifiedLabel}>
										ACCOUNT NAME VERIFIED
									</Text>
								</View>
								<Text style={styles.verifiedNameText}>{verifiedName}</Text>
							</View>
						)}

						{error && (
							<View style={styles.errorBox}>
								<Ionicons name='alert-circle' size={16} color='#EB5757' />
								<Text style={styles.errorText}>{error}</Text>
							</View>
						)}

						<Text style={[styles.inputLabel, { marginTop: 25 }]}>Amount</Text>
						<View style={styles.inputWrapper}>
							<Text style={styles.currencyPrefix}>₦</Text>
							<TextInput
								style={styles.inputField}
								placeholder='0.00'
								keyboardType='decimal-pad'
								value={amount}
								onChangeText={setAmount}
							/>
						</View>
						<Text style={styles.balanceInfo}>
							Available Balance: ₦
							{Number(dashboardData?.wallet?.balance || 0).toLocaleString()}
						</Text>

						<Text style={[styles.inputLabel, { marginTop: 25 }]}>
							Description
						</Text>
						<View style={styles.inputWrapper}>
							<TextInput
								style={styles.inputField}
								placeholder='What is this for?'
								value={description}
								onChangeText={setDescription}
							/>
						</View>

						<TouchableOpacity
							style={[
								styles.mainBtn,
								(!verifiedName || !amount) && styles.btnDisabled,
							]}
							disabled={!verifiedName || !amount}
							onPress={() =>
								navigation.navigate("ConfirmTransfer", {
									amount,
									accountNumber,
									recipientName: verifiedName,
									bank: selectedBank.name,
									bankCode: selectedBank.code,
									description,
								})
							}>
							<Text style={styles.btnText}>Continue</Text>
						</TouchableOpacity>
					</ScrollView>
				</SafeAreaView>
			</KYCGuard>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			{renderHeader()}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.actionSection}>
					<Text style={styles.sectionTitle}>Transfer Methods</Text>
					{BANK_OPTIONS.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={styles.actionCard}
							onPress={() => handleActionPress(item.id)}>
							<View style={styles.actionIconBg}>
								<Ionicons
									name={item.icon as any}
									size={24}
									color={colors.primary}
								/>
							</View>
							<View style={styles.actionTextContent}>
								<Text style={styles.actionName}>{item.name}</Text>
								<Text style={styles.actionDesc}>{item.desc}</Text>
							</View>
							<Ionicons
								name='chevron-forward'
								size={20}
								color={colors.border}
							/>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			<Modal visible={isBankModalVisible} animationType='slide' transparent>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<View style={styles.modalHandle} />
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Select Bank</Text>
							<TouchableOpacity onPress={() => setIsBankModalVisible(false)}>
								<Ionicons
									name='close-circle'
									size={28}
									color={colors.textSecondary}
								/>
							</TouchableOpacity>
						</View>

						<TextInput
							placeholder='Search Bank Name...'
							style={styles.bankSearchInput}
							value={searchBank}
							onChangeText={setSearchBank}
						/>

						<FlatList
							data={filteredBanks}
							keyExtractor={(item, index) => `${item.code}-${index}`}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.bankOption}
									onPress={() => {
										setSelectedBank(item);
										setIsBankModalVisible(false);
										setStep(2);
									}}>
									<View style={styles.bankIconPlaceholder}>
										<Ionicons
											name='business'
											size={20}
											color={colors.primary}
										/>
									</View>
									<Text style={styles.bankLabel}>{item.name}</Text>
								</TouchableOpacity>
							)}
						/>
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
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	backBtn: { padding: 5 },
	historyBtn: { padding: 5 }, // Added padding for better touch area
	title: { fontSize: 24, fontWeight: "800", color: colors.darkBlue },
	actionSection: { marginTop: 30, paddingHorizontal: 20 },
	actionCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.white,
		padding: 16,
		borderRadius: 20,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: colors.border,
	},
	actionIconBg: {
		width: 48,
		height: 48,
		borderRadius: 14,
		backgroundColor: colors.surface,
		justifyContent: "center",
		alignItems: "center",
	},
	actionTextContent: { flex: 1, marginLeft: 15 },
	actionName: { fontSize: 16, fontWeight: "700", color: colors.darkBlue },
	actionDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.darkBlue,
		marginBottom: 15,
	},
	inputLabel: {
		fontSize: 14,
		color: colors.textSecondary,
		marginBottom: 8,
		fontWeight: "600",
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		borderRadius: 15,
		paddingHorizontal: 15,
		height: 55,
		borderWidth: 1,
		borderColor: colors.border,
	},
	inputField: {
		flex: 1,
		fontSize: 16,
		fontWeight: "700",
		color: colors.darkBlue,
	},
	currencyPrefix: {
		fontSize: 18,
		fontWeight: "700",
		marginRight: 5,
		color: colors.darkBlue,
	},
	verifiedBox: {
		marginTop: 12,
		backgroundColor: "#F0FFF5",
		padding: 15,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#D1FADF",
	},
	verifiedBadge: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	verifiedLabel: {
		fontSize: 10,
		fontWeight: "800",
		color: "#27AE60",
		marginLeft: 5,
	},
	verifiedNameText: {
		fontSize: 16,
		fontWeight: "700",
		color: colors.darkBlue,
		textTransform: "uppercase",
	},
	errorBox: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		marginLeft: 5,
	},
	errorText: {
		color: "#EB5757",
		fontSize: 13,
		marginLeft: 8,
		fontWeight: "500",
	},
	balanceInfo: { marginTop: 10, fontSize: 12, color: colors.textSecondary },
	mainBtn: {
		backgroundColor: colors.primary,
		height: 55,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	btnDisabled: { backgroundColor: colors.border },
	btnText: { color: colors.white, fontSize: 16, fontWeight: "700" },
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: colors.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
		height: SCREEN_HEIGHT * 0.7,
	},
	modalHandle: {
		width: 40,
		height: 5,
		backgroundColor: colors.border,
		borderRadius: 10,
		alignSelf: "center",
		marginBottom: 10,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	modalTitle: { fontSize: 20, fontWeight: "800", color: colors.darkBlue },
	bankOption: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: colors.surface,
	},
	bankIconPlaceholder: {
		width: 40,
		height: 40,
		borderRadius: 10,
		backgroundColor: colors.surface,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 15,
	},
	bankLabel: {
		flex: 1,
		fontSize: 16,
		fontWeight: "600",
		color: colors.darkBlue,
	},
	selectedBankCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		padding: 15,
		borderRadius: 15,
		marginBottom: 20,
	},
	bankLabelHeader: {
		flex: 1,
		fontSize: 14,
		fontWeight: "700",
		color: colors.darkBlue,
		marginLeft: 10,
	},
	bankSearchInput: {
		backgroundColor: colors.surface,
		padding: 12,
		borderRadius: 10,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: colors.border,
	},
});

export default TransferScreen;
