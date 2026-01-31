import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
	BackHandler,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";

const SuccessScreen = ({ route, navigation }: any) => {
	const { amount, recipientName, transactionId } = route.params;

	// Prevent going back to PIN screen using hardware back button
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => true
		);
		return () => backHandler.remove();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.iconContainer}>
					<View style={styles.iconBg}>
						<Ionicons name='checkmark' size={60} color={colors.white} />
					</View>
				</View>

				<Text style={styles.successTitle}>Transfer Successful!</Text>
				<Text style={styles.successSub}>
					Your transfer of ₦{Number(amount).toLocaleString()} to {recipientName}{" "}
					has been processed.
				</Text>

				<View style={styles.receiptBrief}>
					<View style={styles.receiptRow}>
						<Text style={styles.receiptLabel}>Transaction ID</Text>
						<Text style={styles.receiptValue}>
							{transactionId || "TRX-882910"}
						</Text>
					</View>
					<View style={styles.receiptRow}>
						<Text style={styles.receiptLabel}>Status</Text>
						<Text style={[styles.receiptValue, { color: "#27AE60" }]}>
							Completed
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.primaryBtn}
					onPress={() => navigation.navigate("MainTabs")}>
					<Text style={styles.primaryBtnText}>Back to Home</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.secondaryBtn}>
					<Ionicons name='share-outline' size={20} color={colors.primary} />
					<Text style={styles.secondaryBtnText}>Share Receipt</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white, padding: 25 },
	content: { flex: 1, justifyContent: "center", alignItems: "center" },
	iconContainer: { marginBottom: 30 },
	iconBg: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#27AE60",
		justifyContent: "center",
		alignItems: "center",
	},
	successTitle: {
		fontSize: 24,
		fontWeight: "800",
		color: colors.darkBlue,
		marginBottom: 10,
	},
	successSub: {
		fontSize: 15,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
		paddingHorizontal: 20,
	},
	receiptBrief: {
		width: "100%",
		backgroundColor: colors.surface,
		borderRadius: 20,
		padding: 20,
		marginTop: 40,
	},
	receiptRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	receiptLabel: { fontSize: 13, color: colors.textSecondary },
	receiptValue: { fontSize: 13, fontWeight: "700", color: colors.darkBlue },
	footer: { width: "100%", paddingBottom: 20 },
	primaryBtn: {
		backgroundColor: colors.primary,
		height: 55,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
	},
	primaryBtnText: { color: colors.white, fontSize: 16, fontWeight: "700" },
	secondaryBtn: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 55,
	},
	secondaryBtnText: {
		color: colors.primary,
		fontSize: 16,
		fontWeight: "700",
		marginLeft: 10,
	},
});

export default SuccessScreen;
