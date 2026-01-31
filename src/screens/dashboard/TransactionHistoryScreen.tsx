// import { Ionicons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
// 	ActivityIndicator,
// 	FlatList,
// 	RefreshControl,
// 	StyleSheet,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch } from "react-redux";
// import { useAppSelector } from "../../hooks/useTypedSelector";
// import { getTransactionHistory } from "../../store/auth/action/dashboard/walletAction";
// import { AppDispatch } from "../../store/auth/store";
// import { colors } from "../../theme/colors";

// const TransactionHistoryScreen = ({ navigation }: any) => {
// 	const dispatch = useDispatch<AppDispatch>();

// 	// Selecting from walletState as per your current setup
// 	const { transactions, loading_now } = useAppSelector(
// 		(state) => state.walletState
// 	);

// 	const [search, setSearch] = useState("");
// 	const [filter, setFilter] = useState("All"); // All, Credit, Debit
// 	const [refreshing, setRefreshing] = useState(false);

// 	// Initial Data Fetch
// 	useEffect(() => {
// 		dispatch(getTransactionHistory());
// 	}, [dispatch]);

// 	// Pull to Refresh Function
// 	const onRefresh = async () => {
// 		setRefreshing(true);
// 		await dispatch(getTransactionHistory());
// 		setRefreshing(false);
// 	};

// 	// Optimized Filter Logic matching Backend "flowType" (DEBIT/CREDIT)
// 	const filteredData = (transactions || []).filter((item: any) => {
// 		const matchesSearch =
// 			item.participant?.toLowerCase().includes(search.toLowerCase()) ||
// 			item.description?.toLowerCase().includes(search.toLowerCase());

// 		if (filter === "All") return matchesSearch;
// 		// Compare against DEBIT or CREDIT
// 		return matchesSearch && item.flowType === filter.toUpperCase();
// 	});

// 	const renderItem = ({ item }: any) => {
// 		const isCredit = item.flowType === "CREDIT";

// 		return (
// 			<TouchableOpacity
// 				style={styles.transactionCard}
// 				onPress={() =>
// 					navigation.navigate("TransactionDetails", { transaction: item })
// 				}>
// 				{/* Icon based on Flow (Credit/Debit) */}
// 				<View
// 					style={[
// 						styles.iconContainer,
// 						{ backgroundColor: isCredit ? "#EFFFF4" : "#FFF0F0" },
// 					]}>
// 					<Ionicons
// 						name={isCredit ? "arrow-down" : "arrow-up"}
// 						size={20}
// 						color={isCredit ? "#27AE60" : "#EB5757"}
// 					/>
// 				</View>

// 				{/* Transaction Details */}
// 				<View style={styles.details}>
// 					<Text style={styles.title} numberOfLines={1}>
// 						{item.participant}
// 					</Text>
// 					<Text style={styles.desc} numberOfLines={1}>
// 						{item.description}
// 					</Text>
// 					<Text style={styles.date}>
// 						{new Date(item.date).toLocaleDateString("en-NG", {
// 							day: "numeric",
// 							month: "short",
// 							year: "numeric",
// 						})}
// 					</Text>
// 				</View>

// 				{/* Amount & Status Badge */}
// 				<View style={{ alignItems: "flex-end" }}>
// 					<Text
// 						style={[
// 							styles.amount,
// 							{ color: isCredit ? "#27AE60" : colors.darkBlue },
// 						]}>
// 						{isCredit ? "+" : "-"}₦{Number(item.amount).toLocaleString()}
// 					</Text>
// 					<View style={styles.categoryBadge}>
// 						<Text style={styles.categoryText}>
// 							{item.category || "General"}
// 						</Text>
// 					</View>
// 				</View>
// 			</TouchableOpacity>
// 		);
// 	};

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			{/* Header Section */}
// 			<View style={styles.header}>
// 				<TouchableOpacity
// 					onPress={() => navigation.goBack()}
// 					style={styles.backBtn}>
// 					<Ionicons name='chevron-back' size={24} color={colors.darkBlue} />
// 				</TouchableOpacity>
// 				<Text style={styles.headerTitle}>Transaction History</Text>
// 				<View style={{ width: 40 }} />
// 			</View>

// 			{/* Search Input Area */}
// 			<View style={styles.searchContainer}>
// 				<Ionicons
// 					name='search-outline'
// 					size={20}
// 					color={colors.textSecondary}
// 				/>
// 				<TextInput
// 					placeholder='Search name or description...'
// 					style={styles.searchInput}
// 					value={search}
// 					onChangeText={setSearch}
// 					placeholderTextColor={colors.textSecondary}
// 				/>
// 				{search.length > 0 && (
// 					<TouchableOpacity onPress={() => setSearch("")}>
// 						<Ionicons
// 							name='close-circle'
// 							size={18}
// 							color={colors.textSecondary}
// 						/>
// 					</TouchableOpacity>
// 				)}
// 			</View>

// 			{/* Filter Selection Chips */}
// 			<View style={styles.filterRow}>
// 				{["All", "Credit", "Debit"].map((type) => (
// 					<TouchableOpacity
// 						key={type}
// 						style={[styles.chip, filter === type && styles.activeChip]}
// 						onPress={() => setFilter(type)}>
// 						<Text
// 							style={[
// 								styles.chipText,
// 								filter === type && styles.activeChipText,
// 							]}>
// 							{type}
// 						</Text>
// 					</TouchableOpacity>
// 				))}
// 			</View>

// 			{/* Main Content Area */}
// 			{loading_now && !refreshing ? (
// 				<View style={styles.loaderContainer}>
// 					<ActivityIndicator color={colors.primary} size='large' />
// 					<Text style={styles.loaderText}>Updating your ledger...</Text>
// 				</View>
// 			) : (
// 				<FlatList
// 					data={filteredData}
// 					keyExtractor={(item) => item.id.toString()}
// 					renderItem={renderItem}
// 					contentContainerStyle={styles.listContent}
// 					showsVerticalScrollIndicator={false}
// 					refreshControl={
// 						<RefreshControl
// 							refreshing={refreshing}
// 							onRefresh={onRefresh}
// 							tintColor={colors.primary}
// 							colors={[colors.primary]} // Android primary color
// 						/>
// 					}
// 					ListEmptyComponent={
// 						<View style={styles.emptyState}>
// 							<Ionicons
// 								name='receipt-outline'
// 								size={80}
// 								color={colors.border}
// 							/>
// 							<Text style={styles.emptyText}>No transactions found</Text>
// 							<Text style={styles.emptySubText}>
// 								Your incoming and outgoing transfers will appear here once they
// 								occur.
// 							</Text>
// 						</View>
// 					}
// 				/>
// 			)}
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: { flex: 1, backgroundColor: colors.white },
// 	header: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 		paddingHorizontal: 15,
// 		paddingVertical: 10,
// 	},
// 	backBtn: { width: 40, height: 40, justifyContent: "center" },
// 	headerTitle: { fontSize: 18, fontWeight: "800", color: colors.darkBlue },
// 	searchContainer: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		backgroundColor: colors.surface,
// 		marginHorizontal: 20,
// 		paddingHorizontal: 15,
// 		borderRadius: 15,
// 		height: 50,
// 		borderWidth: 1,
// 		borderColor: colors.border,
// 	},
// 	searchInput: {
// 		flex: 1,
// 		marginLeft: 10,
// 		fontSize: 14,
// 		color: colors.darkBlue,
// 	},
// 	filterRow: {
// 		flexDirection: "row",
// 		paddingHorizontal: 20,
// 		marginTop: 20,
// 		marginBottom: 10,
// 	},
// 	chip: {
// 		paddingHorizontal: 22,
// 		paddingVertical: 10,
// 		borderRadius: 25,
// 		backgroundColor: colors.white,
// 		marginRight: 10,
// 		borderWidth: 1,
// 		borderColor: colors.border,
// 	},
// 	activeChip: {
// 		backgroundColor: colors.darkBlue,
// 		borderColor: colors.darkBlue,
// 	},
// 	chipText: { color: colors.textSecondary, fontWeight: "700", fontSize: 13 },
// 	activeChipText: { color: colors.white },
// 	listContent: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10 },
// 	transactionCard: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		paddingVertical: 15,
// 		borderBottomWidth: 1,
// 		borderBottomColor: colors.border + "40",
// 	},
// 	iconContainer: {
// 		width: 48,
// 		height: 48,
// 		borderRadius: 16,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	details: { flex: 1, marginLeft: 15, marginRight: 10 },
// 	title: { fontSize: 15, fontWeight: "700", color: colors.darkBlue },
// 	desc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
// 	date: {
// 		fontSize: 11,
// 		color: colors.textSecondary,
// 		marginTop: 4,
// 		fontWeight: "500",
// 	},
// 	amount: { fontSize: 16, fontWeight: "800" },
// 	categoryBadge: {
// 		backgroundColor: colors.surface,
// 		paddingHorizontal: 8,
// 		paddingVertical: 3,
// 		borderRadius: 6,
// 		marginTop: 6,
// 	},
// 	categoryText: {
// 		fontSize: 10,
// 		color: colors.primary,
// 		fontWeight: "800",
// 		textTransform: "uppercase",
// 	},
// 	loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
// 	loaderText: { marginTop: 12, color: colors.textSecondary, fontSize: 14 },
// 	emptyState: { alignItems: "center", marginTop: 80, paddingHorizontal: 40 },
// 	emptyText: {
// 		color: colors.darkBlue,
// 		marginTop: 15,
// 		fontSize: 18,
// 		fontWeight: "700",
// 	},
// 	emptySubText: {
// 		color: colors.textSecondary,
// 		marginTop: 8,
// 		fontSize: 14,
// 		textAlign: "center",
// 		lineHeight: 20,
// 	},
// });

// export default TransactionHistoryScreen;

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { getTransactionHistory } from "../../store/auth/action/dashboard/walletAction";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

const TransactionHistoryScreen = ({ navigation }: any) => {
	const dispatch = useDispatch<AppDispatch>();

	const { transactions, loading_now } = useAppSelector(
		(state) => state.walletState
	);

	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		dispatch(getTransactionHistory());
	}, [dispatch]);

	const onRefresh = async () => {
		setRefreshing(true);
		await dispatch(getTransactionHistory());
		setRefreshing(false);
	};

	const filteredData = (transactions || []).filter((item: any) => {
		const matchesSearch =
			item.participant?.toLowerCase().includes(search.toLowerCase()) ||
			item.description?.toLowerCase().includes(search.toLowerCase());

		if (filter === "All") return matchesSearch;
		return matchesSearch && item.flowType === filter.toUpperCase();
	});

	const renderItem = ({ item }: any) => {
		// LOGIC: CREDIT = Green (In), DEBIT = Red (Out)
		const isCredit = item.flowType === "CREDIT";
		const isTransfer = item.category?.toLowerCase() === "transfer";

		// Define dynamic colors
		const statusColor = isCredit ? "#27AE60" : "#EB5757";
		const statusBg = isCredit ? "#EFFFF4" : "#FFF0F0";

		return (
			<TouchableOpacity
				style={styles.transactionCard}
				onPress={() =>
					navigation.navigate("TransactionDetails", { transaction: item })
				}>
				{/* Icon Container */}
				<View style={[styles.iconContainer, { backgroundColor: statusBg }]}>
					<Ionicons
						name={isCredit ? "arrow-down" : "arrow-up"}
						size={20}
						color={statusColor}
					/>
				</View>

				{/* Transaction Details */}
				<View style={styles.details}>
					<Text style={styles.title} numberOfLines={1}>
						{item.participant || "Unknown"}
					</Text>
					<Text style={styles.desc} numberOfLines={1}>
						{item.description}
					</Text>
					<Text style={styles.date}>
						{new Date(item.date).toLocaleDateString("en-NG", {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
					</Text>
				</View>

				{/* Amount & Type Badge */}
				<View style={{ alignItems: "flex-end" }}>
					<Text style={[styles.amount, { color: statusColor }]}>
						{isCredit ? "+" : "-"}₦{Number(item.amount).toLocaleString()}
					</Text>

					{/* Badge: Distinct color for Transfers vs other Debits */}
					<View
						style={[
							styles.categoryBadge,
							{
								backgroundColor: isTransfer
									? colors.darkBlue + "15"
									: colors.surface,
							},
						]}>
						<Text
							style={[
								styles.categoryText,
								{ color: isTransfer ? colors.darkBlue : colors.primary },
							]}>
							{item.category || "General"}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backBtn}>
					<Ionicons name='chevron-back' size={24} color={colors.darkBlue} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Transaction History</Text>
				<View style={{ width: 40 }} />
			</View>

			{/* Search Input */}
			<View style={styles.searchContainer}>
				<Ionicons
					name='search-outline'
					size={20}
					color={colors.textSecondary}
				/>
				<TextInput
					placeholder='Search name or description...'
					style={styles.searchInput}
					value={search}
					onChangeText={setSearch}
					placeholderTextColor={colors.textSecondary}
				/>
				{search.length > 0 && (
					<TouchableOpacity onPress={() => setSearch("")}>
						<Ionicons
							name='close-circle'
							size={18}
							color={colors.textSecondary}
						/>
					</TouchableOpacity>
				)}
			</View>

			{/* Filter Selection Chips */}
			<View style={styles.filterRow}>
				{["All", "Credit", "Debit"].map((type) => (
					<TouchableOpacity
						key={type}
						style={[styles.chip, filter === type && styles.activeChip]}
						onPress={() => setFilter(type)}>
						<Text
							style={[
								styles.chipText,
								filter === type && styles.activeChipText,
							]}>
							{type}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* List Section */}
			{loading_now && !refreshing ? (
				<View style={styles.loaderContainer}>
					<ActivityIndicator color={colors.primary} size='large' />
					<Text style={styles.loaderText}>Fetching records...</Text>
				</View>
			) : (
				<FlatList
					data={filteredData}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor={colors.primary}
						/>
					}
					ListEmptyComponent={
						<View style={styles.emptyState}>
							<Ionicons
								name='receipt-outline'
								size={80}
								color={colors.border}
							/>
							<Text style={styles.emptyText}>No transactions found</Text>
							<Text style={styles.emptySubText}>
								Your transaction records will appear here as they occur.
							</Text>
						</View>
					}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	backBtn: { width: 40, height: 40, justifyContent: "center" },
	headerTitle: { fontSize: 18, fontWeight: "800", color: colors.darkBlue },
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		marginHorizontal: 20,
		paddingHorizontal: 15,
		borderRadius: 15,
		height: 50,
		borderWidth: 1,
		borderColor: colors.border,
	},
	searchInput: {
		flex: 1,
		marginLeft: 10,
		fontSize: 14,
		color: colors.darkBlue,
	},
	filterRow: {
		flexDirection: "row",
		paddingHorizontal: 20,
		marginTop: 20,
		marginBottom: 10,
	},
	chip: {
		paddingHorizontal: 22,
		paddingVertical: 10,
		borderRadius: 25,
		backgroundColor: colors.white,
		marginRight: 10,
		borderWidth: 1,
		borderColor: colors.border,
	},
	activeChip: {
		backgroundColor: colors.darkBlue,
		borderColor: colors.darkBlue,
	},
	chipText: { color: colors.textSecondary, fontWeight: "700", fontSize: 13 },
	activeChipText: { color: colors.white },
	listContent: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10 },
	transactionCard: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: colors.border + "30",
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	details: { flex: 1, marginLeft: 15, marginRight: 10 },
	title: { fontSize: 15, fontWeight: "700", color: colors.darkBlue },
	desc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
	date: {
		fontSize: 11,
		color: colors.textSecondary,
		marginTop: 4,
		fontWeight: "500",
	},
	amount: { fontSize: 16, fontWeight: "800" },
	categoryBadge: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 6,
		marginTop: 6,
		borderWidth: 0.5,
		borderColor: colors.border,
	},
	categoryText: { fontSize: 10, fontWeight: "800", textTransform: "uppercase" },
	loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
	loaderText: { marginTop: 12, color: colors.textSecondary, fontSize: 14 },
	emptyState: { alignItems: "center", marginTop: 80, paddingHorizontal: 40 },
	emptyText: {
		color: colors.darkBlue,
		marginTop: 15,
		fontSize: 18,
		fontWeight: "700",
	},
	emptySubText: {
		color: colors.textSecondary,
		marginTop: 8,
		fontSize: 14,
		textAlign: "center",
	},
});

export default TransactionHistoryScreen;
