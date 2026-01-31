import { getTransactionHistory } from "@/src/store/auth/action/dashboard/walletAction";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	RefreshControl,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { getUserDashboard } from "../../store/auth/action/dashboard/dashboardAction";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

const DashboardScreen = () => {
	const navigation = useNavigation<any>();
	const dispatch = useDispatch<AppDispatch>();

	// 1. Redux State
	const { user } = useAppSelector((state) => state.loginState);
	const { data, loading_now } = useAppSelector((state) => state.dashboard);
	const { transactions, loading_now: isLoading } = useAppSelector(
		(state) => state.walletState
	);
	// const loginState = useAppSelector((state) => state.loginState);
	// console.log("DEBUG LOGIN STATE:", JSON.stringify(loginState, null, 2));

	// 2. Local UI State
	const [showBalance, setShowBalance] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// 3. Fetch Data on Mount
	useEffect(() => {
		dispatch(getUserDashboard());
		dispatch(getTransactionHistory());
	}, [dispatch]);

	// 4. Pull to Refresh Logic
	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await dispatch(getUserDashboard());
		await dispatch(getTransactionHistory());
		setRefreshing(false);
	}, [dispatch]);

	const kycStatus = data?.user?.verificationStatus || "pending"; // default to 'complete' if undefined

	const handleAction = (screenName: string, isRestricted: boolean) => {
		if (isRestricted && kycStatus !== "verified") {
			Alert.alert(
				"Verification Required",
				"Please complete your KYC to access this feature.",
				[
					{ text: "Later", style: "cancel" },
					{
						text: "Verify Now",
						onPress: () => navigation.navigate("KycIntro"),
					},
				]
			);
			return;
		}
		navigation.navigate(screenName);
	};

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<StatusBar barStyle='dark-content' />

			{/* Header Section */}
			<View style={styles.header}>
				<View>
					<Text style={styles.greeting}>Welcome back,</Text>
					<Text style={styles.userName}>{data?.user?.fullName || "User"}</Text>
				</View>
				<TouchableOpacity
					style={styles.notifBtn}
					onPress={() => navigation.navigate("Notifications")}>
					<Ionicons
						name='notifications-outline'
						size={24}
						color={colors.darkBlue}
					/>
					<View style={styles.notifBadge} />
				</TouchableOpacity>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollBody}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={colors.primary}
					/>
				}>
				{/* KYC Banner */}
				{kycStatus !== "verified" && (
					<TouchableOpacity
						style={styles.kycBanner}
						onPress={() => navigation.navigate("KycIntro")}>
						<View style={styles.kycIconCircle}>
							<Ionicons
								name='shield-checkmark'
								size={20}
								color={colors.primary}
							/>
						</View>
						<View style={{ flex: 1, marginLeft: 12 }}>
							<Text style={styles.kycTitle}>Complete Verification</Text>
							<Text style={styles.kycSubtitle}>
								Increase your transaction limits now
							</Text>
						</View>
						<Ionicons
							name='chevron-forward'
							size={18}
							color={colors.textSecondary}
						/>
					</TouchableOpacity>
				)}

				{/* Main Balance Card */}
				<View style={styles.balanceCard}>
					<View style={styles.cardHeader}>
						<View style={styles.cardHeaderLeft}>
							<Ionicons
								name='wallet-outline'
								size={16}
								color='rgba(255,255,255,0.8)'
							/>
							<Text style={styles.cardLabel}> Total Balance</Text>
						</View>
						<TouchableOpacity
							onPress={() => setShowBalance(!showBalance)}
							hitSlop={10}>
							<Ionicons
								name={showBalance ? "eye-outline" : "eye-off-outline"}
								size={22}
								color={colors.white}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.balanceContainer}>
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit // This shrinks the text if it's too long
							style={styles.currencySymbol}>
							₦
						</Text>
						<Text style={styles.balanceAmount}>
							{!showBalance
								? data?.user?.balance?.toLocaleString() || "0.00"
								: "****"}
						</Text>
					</View>

					<View style={styles.cardFooter}>
						<View>
							<Text style={styles.footerLabel}>Account Number</Text>
							<Text style={styles.accountNumber}>
								{data?.user?.accountNumber || "---"}
							</Text>
						</View>
						<View style={styles.chip}>
							<Text style={styles.bankName}>FintechPro</Text>
						</View>
					</View>
				</View>

				{/* Quick Actions Grid */}
				<View style={styles.actionRow}>
					<ActionItem
						icon='paper-plane-outline'
						label='Send'
						color='#F0F6FF'
						iconColor='#2F80ED'
						onPress={() => handleAction("Transfer", true)}
					/>
					<ActionItem
						icon='add-circle-outline'
						label='Fund'
						color='#EFFFF4'
						iconColor='#27AE60'
						onPress={() => handleAction("Wallet", true)}
					/>
					<ActionItem
						icon='receipt-outline'
						label='Bills'
						color='#FFF4E8'
						iconColor='#F2994A'
						onPress={() => handleAction("Bills", true)}
					/>
					<ActionItem
						icon='grid-outline'
						label='More'
						color='#F4F5F7'
						iconColor={colors.darkBlue}
						onPress={() => {}}
					/>
				</View>

				{/* Recent Transactions Header */}
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Recent Transactions</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
						<Text style={styles.seeAll}>See All</Text>
					</TouchableOpacity>
				</View>

				{/* Transaction List or Loading State */}
				{(loading_now || isLoading) && !refreshing ? (
					<ActivityIndicator
						size='small'
						color={colors.primary}
						style={{ marginTop: 20 }}
					/>
				) : transactions && transactions.length > 0 ? (
					// We slice(0, 5) to only show recent ones on Dashboard
					transactions.slice(0, 5).map((item: any, index: number) => {
						// 1. Log with stringify to see ALL nested data
						// console.log(`TRANSACTION ${index}:`, JSON.stringify(item, null, 2));

						// 2. You MUST return the component because we are now using { }
						return (
							<TransactionItem
								key={item.id || index}
								title={
									item.participant || item.transactionType || "Transaction"
								}
								{...item}
							/>
						);
					})
				) : (
					<View style={styles.emptyState}>
						<Ionicons name='receipt-outline' size={40} color={colors.border} />
						<Text style={styles.emptyStateText}>
							No recent transactions yet
						</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

// Sub-components (Optimized for production)
const ActionItem = ({ icon, label, color, iconColor, onPress }: any) => (
	<View style={styles.actionItemContainer}>
		<TouchableOpacity
			style={[styles.actionBtn, { backgroundColor: color }]}
			onPress={onPress}>
			<Ionicons name={icon} size={24} color={iconColor} />
		</TouchableOpacity>
		<Text style={styles.actionLabel}>{label}</Text>
	</View>
);

const TransactionItem = ({
	title,
	date,
	amount,
	transactionType,
	flowType,
	description,
	account,
}: any) => {
	// Determine if it's a "Credit" (money in) or "Debit" (money out)
	// Adjusting based on your data: DEPOSIT is usually a credit
	const isCredit = transactionType === "DEPOSIT" || flowType === "CREDIT";

	// Format Date: "Jan 14, 08:53 PM"
	const formatDate = (dateString: string) => {
		try {
			const d = new Date(dateString);
			return (
				d.toLocaleDateString("en-GB", {
					day: "2-digit",
					month: "short",
				}) +
				", " +
				d.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				})
			);
		} catch (e) {
			return dateString;
		}
	};

	return (
		<View style={styles.tranItem}>
			{/* Icon indicating flow */}
			<View
				style={[
					styles.tranIconBg,
					{ backgroundColor: isCredit ? "#EFFFF4" : "#FFF0F0" },
				]}>
				<Ionicons
					name={isCredit ? "arrow-down" : "arrow-up"}
					size={20}
					color={isCredit ? "#27AE60" : "#EB5757"}
				/>
			</View>

			<View style={styles.tranInfo}>
				<Text style={styles.tranName} numberOfLines={1}>
					{title}
				</Text>
				{/* Extra info: Show account or description */}
				<Text style={styles.tranDetails} numberOfLines={1}>
					{description || account || "No details"}
				</Text>
				<Text style={styles.tranDate}>{formatDate(date)}</Text>
			</View>

			<View style={{ alignItems: "flex-end" }}>
				<Text
					style={[
						styles.tranAmount,
						{ color: isCredit ? "#27AE60" : colors.darkBlue },
					]}>
					{isCredit ? "+" : "-"}₦{Number(amount).toLocaleString()}
				</Text>
				{/* Small badge for type */}
				<Text style={styles.typeBadge}>{transactionType}</Text>
			</View>
		</View>
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
	greeting: { fontSize: 13, color: colors.textSecondary, fontWeight: "500" },
	userName: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.darkBlue,
		marginTop: 2,
	},
	notifBtn: { backgroundColor: colors.surface, padding: 10, borderRadius: 15 },
	notifBadge: {
		position: "absolute",
		top: 10,
		right: 12,
		width: 10,
		height: 10,
		backgroundColor: colors.error,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: "white",
	},
	scrollBody: { paddingHorizontal: 20, paddingBottom: 30 },
	kycBanner: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FDF4F4",
		padding: 14,
		borderRadius: 18,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: "#FFE0E0",
	},
	kycIconCircle: {
		width: 38,
		height: 38,
		borderRadius: 12,
		backgroundColor: colors.white,
		justifyContent: "center",
		alignItems: "center",
	},
	kycTitle: { fontSize: 14, fontWeight: "700", color: "#B3261E" },
	kycSubtitle: { fontSize: 11, color: "#606268", marginTop: 2 },
	balanceCard: {
		backgroundColor: colors.primary,
		borderRadius: 28,
		padding: 22,
		height: 190,
		elevation: 10,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 15,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	cardHeaderLeft: { flexDirection: "row", alignItems: "center" },
	cardLabel: {
		color: "rgba(255,255,255,0.8)",
		fontSize: 13,
		fontWeight: "500",
	},
	balanceContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 15,
	},
	currencySymbol: {
		color: colors.white,
		fontSize: 20,
		fontWeight: "600",
		marginRight: 5,
		marginTop: 5,
	},
	balanceAmount: { color: colors.white, fontSize: 34, fontWeight: "800" },
	cardFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		marginTop: "auto",
	},
	footerLabel: {
		color: "rgba(255,255,255,0.6)",
		fontSize: 11,
		marginBottom: 2,
	},
	accountNumber: {
		color: colors.white,
		fontSize: 15,
		fontWeight: "600",
		letterSpacing: 1,
	},
	chip: {
		backgroundColor: "rgba(255,255,255,0.2)",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	bankName: { color: colors.white, fontSize: 11, fontWeight: "700" },
	actionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 25,
	},
	actionItemContainer: { alignItems: "center" },
	actionBtn: {
		width: 60,
		height: 60,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	actionLabel: { fontSize: 12, fontWeight: "600", color: colors.darkBlue },
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 35,
		marginBottom: 15,
	},
	sectionTitle: { fontSize: 18, fontWeight: "800", color: colors.darkBlue },
	seeAll: { color: colors.primary, fontWeight: "700", fontSize: 13 },

	/* --- Transaction Item Styles --- */
	tranItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	tranIconBg: {
		width: 48, // Slightly larger
		height: 48,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 15,
	},
	tranInfo: {
		flex: 1,
	},
	tranName: {
		fontSize: 15,
		fontWeight: "700",
		color: colors.darkBlue,
	},
	tranDetails: {
		fontSize: 12,
		color: colors.textSecondary,
		marginVertical: 2,
	},
	tranDate: {
		fontSize: 11,
		color: "#999",
	},
	tranAmount: {
		fontSize: 16,
		fontWeight: "800",
	},
	typeBadge: {
		fontSize: 9,
		fontWeight: "bold",
		color: colors.textSecondary,
		backgroundColor: colors.surface,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
		marginTop: 4,
		textTransform: "capitalize",
	},
	emptyState: { alignItems: "center", marginTop: 30 },
	emptyStateText: { color: colors.textSecondary, fontSize: 14 },
});

export default DashboardScreen;
