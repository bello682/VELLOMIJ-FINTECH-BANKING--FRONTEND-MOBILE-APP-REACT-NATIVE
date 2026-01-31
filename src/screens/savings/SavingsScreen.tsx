import KYCGuard from "@/src/components/kyc/KYCGuard";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");

const SavingsScreen = () => {
	return (
		<KYCGuard>
			<SafeAreaView style={styles.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}>
					{/* Header */}
					<View style={styles.header}>
						<View>
							<Text style={styles.title}>Savings</Text>
							<Text style={styles.subtitle}>
								You're doing great this month!
							</Text>
						</View>
						<TouchableOpacity style={styles.addBtn}>
							<Ionicons name='add' size={24} color={colors.white} />
						</TouchableOpacity>
					</View>

					{/* Total Savings Card */}
					<View style={styles.totalCard}>
						<Text style={styles.totalLabel}>Total Balance</Text>
						<Text style={styles.totalAmount}>$0.00</Text>
						<View style={styles.statsRow}>
							<View style={styles.statItem}>
								<Ionicons name='trending-up' size={16} color='#4ADE80' />
								<Text style={styles.statText}>+ 4.5% Int.</Text>
							</View>
							<View style={styles.statItem}>
								<Ionicons name='shield-checkmark' size={16} color='#4ADE80' />
								<Text style={styles.statText}>Insured</Text>
							</View>
						</View>
					</View>

					{/* Active Goals Section */}
					<Text style={styles.sectionTitle}>Active Goals</Text>

					{/* Goal Item 1 */}
					<TouchableOpacity style={styles.goalCard}>
						<View style={styles.goalHeader}>
							<View style={[styles.iconBox, { backgroundColor: "#FFE2E2" }]}>
								<Ionicons name='airplane' size={22} color='#FF5A5A' />
							</View>
							<View style={{ flex: 1, marginLeft: 12 }}>
								<Text style={styles.goalName}>Summer Vacation</Text>
								<Text style={styles.goalTarget}>Target: $5,000</Text>
							</View>
							<Text style={styles.goalPercent}>75%</Text>
						</View>
						<View style={styles.progressBarBg}>
							<View
								style={[
									styles.progressBarFill,
									{ width: "75%", backgroundColor: "#FF5A5A" },
								]}
							/>
						</View>
					</TouchableOpacity>

					{/* Goal Item 2 */}
					<TouchableOpacity style={styles.goalCard}>
						<View style={styles.goalHeader}>
							<View style={[styles.iconBox, { backgroundColor: "#E2F3FF" }]}>
								<Ionicons name='car' size={22} color={colors.primary} />
							</View>
							<View style={{ flex: 1, marginLeft: 12 }}>
								<Text style={styles.goalName}>Tesla Model 3</Text>
								<Text style={styles.goalTarget}>Target: $45,000</Text>
							</View>
							<Text style={styles.goalPercent}>12%</Text>
						</View>
						<View style={styles.progressBarBg}>
							<View
								style={[
									styles.progressBarFill,
									{ width: "12%", backgroundColor: colors.primary },
								]}
							/>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		</KYCGuard>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	scrollContent: { padding: 20 },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 25,
	},
	title: { fontSize: 28, fontWeight: "800", color: colors.darkBlue },
	subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
	addBtn: {
		backgroundColor: colors.primary,
		width: 45,
		height: 45,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	totalCard: {
		backgroundColor: colors.darkBlue,
		padding: 25,
		borderRadius: 24,
		marginBottom: 30,
		elevation: 10,
		shadowColor: colors.darkBlue,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 20,
	},
	totalLabel: {
		color: "rgba(255,255,255,0.7)",
		fontSize: 14,
		fontWeight: "600",
	},
	totalAmount: {
		color: colors.white,
		fontSize: 32,
		fontWeight: "bold",
		marginVertical: 8,
	},
	statsRow: { flexDirection: "row", marginTop: 10 },
	statItem: { flexDirection: "row", alignItems: "center", marginRight: 20 },
	statText: {
		color: "#4ADE80",
		fontSize: 12,
		fontWeight: "700",
		marginLeft: 5,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.darkBlue,
		marginBottom: 15,
	},
	goalCard: {
		backgroundColor: colors.surface,
		padding: 16,
		borderRadius: 20,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: colors.border,
	},
	goalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
	iconBox: {
		width: 48,
		height: 48,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
	},
	goalName: { fontSize: 16, fontWeight: "700", color: colors.darkBlue },
	goalTarget: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
	goalPercent: { fontSize: 14, fontWeight: "bold", color: colors.darkBlue },
	progressBarBg: {
		height: 8,
		backgroundColor: "#E0E0E0",
		borderRadius: 4,
		overflow: "hidden",
	},
	progressBarFill: { height: "100%", borderRadius: 4 },
});

export default SavingsScreen;
