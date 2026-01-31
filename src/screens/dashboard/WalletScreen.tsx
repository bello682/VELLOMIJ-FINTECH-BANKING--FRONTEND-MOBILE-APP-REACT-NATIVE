import KYCGuard from "@/src/components/kyc/KYCGuard";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	Clipboard,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { showToast } from "../../components/common/toastMessage";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { getWalletDetails } from "../../store/auth/action/dashboard/walletAction";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

const WalletScreen = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useAppSelector((state) => state.loginState);
	const { walletData, loading_now } = useAppSelector(
		(state) => state.walletState
	);
	const { data: dashboardData } = useAppSelector((state) => state.dashboard);

	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		dispatch(getWalletDetails());
	}, [dispatch]);

	const onRefresh = async () => {
		setRefreshing(true);
		await dispatch(getWalletDetails());
		setRefreshing(false);
	};

	const copyToClipboard = (text: string) => {
		Clipboard.setString(text);
		showToast("success", "Account number copied!");
	};

	return (
		<KYCGuard>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>My Wallet</Text>
					<TouchableOpacity
						style={styles.addBtn}
						onPress={() => showToast("info", "Funding feature opening...")}>
						<Ionicons name='add' size={24} color={colors.white} />
					</TouchableOpacity>
				</View>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.content}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}>
					{/* 1. Virtual Card Section */}
					<View style={styles.virtualCard}>
						<View style={styles.cardTop}>
							<Text style={styles.cardType}>Virtual Debit Card</Text>
							<Ionicons
								name='wifi'
								size={22}
								color={colors.white}
								style={{ transform: [{ rotate: "90deg" }] }}
							/>
						</View>

						<Text style={styles.cardNumber}>
							**** **** **** {dashboardData?.accountNumber?.slice(-4) || "8821"}
						</Text>

						<View style={styles.cardBottom}>
							<View>
								<Text style={styles.cardLabel}>BALANCE</Text>
								<Text style={styles.cardValue}>
									₦{dashboardData?.wallet?.balance || "0.00"}
								</Text>
							</View>
							<View style={styles.mastercard}>
								<View
									style={[
										styles.circle,
										{ backgroundColor: "#EB5757", marginRight: -10 },
									]}
								/>
								<View
									style={[
										styles.circle,
										{ backgroundColor: "#F2C94C", opacity: 0.8 },
									]}
								/>
							</View>
						</View>
					</View>

					{/* 2. Funding Information (Added from previous version for production utility) */}
					<Text style={styles.sectionTitle}>Receive Money</Text>
					<View style={styles.fundingInfo}>
						<View style={styles.bankRow}>
							<Text style={styles.bankLabel}>Virtual Account</Text>
							<TouchableOpacity
								onPress={() =>
									copyToClipboard(dashboardData?.accountNumber || "")
								}>
								<Text style={styles.bankValue}>
									{dashboardData?.accountNumber || "---"}{" "}
									<Ionicons name='copy-outline' size={14} />
								</Text>
							</TouchableOpacity>
						</View>
						<Text style={styles.bankSubText}>
							Bank: Wema Bank • Name: {user?.fullName}
						</Text>
					</View>

					{/* 3. Spending Analytics */}
					<Text style={styles.sectionTitle}>Spending Analytics</Text>
					<View style={styles.categoryGrid}>
						<CategoryItem
							icon='cart'
							label='Shopping'
							amount='₦0.00'
							color='#FFEBEE'
							iconColor='#FF5252'
						/>
						<CategoryItem
							icon='fast-food'
							label='Food'
							amount='₦0.00'
							color='#E3F2FD'
							iconColor='#2196F3'
						/>
						<CategoryItem
							icon='bus'
							label='Transport'
							amount='₦0.00'
							color='#E8F5E9'
							iconColor='#4CAF50'
						/>
						<CategoryItem
							icon='bulb'
							label='Utilities'
							amount='₦0.00'
							color='#FFF3E0'
							iconColor='#FF9800'
						/>
					</View>

					{/* 4. Card Settings */}
					<View style={styles.settingsSection}>
						<Text style={styles.sectionTitle}>Security Settings</Text>
						<SettingsToggle
							icon='lock-closed-outline'
							label='Freeze Card'
							value={false}
						/>
						<SettingsToggle
							icon='globe-outline'
							label='International Spend'
							value={true}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</KYCGuard>
	);
};

// Internal Components (Helpers)
const CategoryItem = ({ icon, label, amount, color, iconColor }: any) => (
	<View style={styles.categoryCard}>
		<View style={[styles.iconCircle, { backgroundColor: color }]}>
			<Ionicons name={icon} size={20} color={iconColor} />
		</View>
		<Text style={styles.catLabel}>{label}</Text>
		<Text style={styles.catAmount}>{amount}</Text>
	</View>
);

const SettingsToggle = ({ icon, label, value }: any) => (
	<TouchableOpacity style={styles.settingItem}>
		<Ionicons name={icon} size={22} color={colors.darkBlue} />
		<Text style={styles.settingLabel}>{label}</Text>
		<View
			style={[
				styles.toggle,
				{ backgroundColor: value ? colors.primary : colors.border },
			]}>
			<View
				style={[
					styles.toggleCircle,
					{ alignSelf: value ? "flex-end" : "flex-start" },
				]}
			/>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
	headerTitle: { fontSize: 22, fontWeight: "800", color: colors.darkBlue },
	addBtn: {
		backgroundColor: colors.primary,
		width: 38,
		height: 38,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	content: { padding: 20 },
	virtualCard: {
		height: 210,
		backgroundColor: "#121212", // Deeper black for premium look
		borderRadius: 24,
		padding: 25,
		justifyContent: "space-between",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.4,
		shadowRadius: 15,
		elevation: 10,
	},
	cardTop: { flexDirection: "row", justifyContent: "space-between" },
	cardType: {
		color: colors.white,
		fontSize: 14,
		fontWeight: "500",
		opacity: 0.7,
	},
	cardNumber: {
		color: colors.white,
		fontSize: 24,
		fontWeight: "bold",
		letterSpacing: 3,
		marginVertical: 20,
	},
	cardBottom: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	cardLabel: {
		color: "rgba(255,255,255,0.4)",
		fontSize: 10,
		fontWeight: "700",
		marginBottom: 5,
	},
	cardValue: { color: colors.white, fontSize: 18, fontWeight: "700" },
	mastercard: { flexDirection: "row" },
	circle: { width: 28, height: 28, borderRadius: 14 },
	sectionTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: colors.darkBlue,
		marginTop: 30,
		marginBottom: 15,
	},
	fundingInfo: {
		backgroundColor: colors.surface,
		padding: 18,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.border,
	},
	bankRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	bankLabel: { fontSize: 14, fontWeight: "600", color: colors.darkBlue },
	bankValue: { fontSize: 14, fontWeight: "700", color: colors.primary },
	bankSubText: { fontSize: 12, color: colors.textSecondary, marginTop: 6 },
	categoryGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	categoryCard: {
		width: "48%",
		backgroundColor: colors.surface,
		padding: 15,
		borderRadius: 20,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: colors.border,
	},
	iconCircle: {
		width: 42,
		height: 42,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	catLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: "500" },
	catAmount: {
		fontSize: 16,
		fontWeight: "800",
		color: colors.darkBlue,
		marginTop: 4,
	},
	settingsSection: { marginTop: 10, paddingBottom: 20 },
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
	},
	settingLabel: {
		flex: 1,
		marginLeft: 15,
		fontSize: 15,
		color: colors.darkBlue,
		fontWeight: "500",
	},
	toggle: {
		width: 44,
		height: 24,
		borderRadius: 12,
		padding: 2,
		justifyContent: "center",
	},
	toggleCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: "white",
	},
});

export default WalletScreen;
