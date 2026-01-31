// import { LogoStatic } from "@/assets";
// import { Ionicons } from "@expo/vector-icons";
// import * as Sharing from "expo-sharing";
// import React, { useRef } from "react";
// import {
// 	Alert,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ViewShot from "react-native-view-shot";
// import { colors } from "../../theme/colors";

// const TransactionDetailsScreen = ({ route, navigation }: any) => {
// 	const { transaction } = route.params;
// 	const isCredit = transaction.flowType === "CREDIT";
// 	const viewShotRef = useRef<any>(null);

// 	/**
// 	 * PRODUCTION MASKING LOGIC
// 	 * Security Rule: Never mask the user's own account (they already know it).
// 	 * Always mask the 'other' party's account to protect privacy.
// 	 */
// 	const maskAccountNumber = (acc: string, shouldMask: boolean = true) => {
// 		if (!acc || acc === "---") return "**********";
// 		const str = String(acc).trim();
// 		if (!shouldMask) return str;

// 		// standard banking mask: show last 4 digits
// 		return str.length > 4 ? `**** **** ${str.slice(-4)}` : str;
// 	};

// 	const getStatusDetails = () => {
// 		const status = transaction.status?.toUpperCase() || "COMPLETED";
// 		switch (status) {
// 			case "PENDING":
// 				return { color: "#F2994A", icon: "time", bgColor: "#FFF8F0" };
// 			case "FAILED":
// 				return { color: "#EB5757", icon: "close-circle", bgColor: "#FFF0F0" };
// 			case "COMPLETED":
// 			case "SUCCESSFUL":
// 			default:
// 				return {
// 					color: "#27AE60", // Standard Success Green
// 					icon: "checkmark-circle",
// 					bgColor: "#EFFFF4",
// 				};
// 		}
// 	};

// 	const statusStyle = getStatusDetails();

// 	const onShareImage = async () => {
// 		try {
// 			const uri = await viewShotRef.current.capture();
// 			if (await Sharing.isAvailableAsync()) {
// 				await Sharing.shareAsync(uri, {
// 					mimeType: "image/png",
// 					dialogTitle: "Share Transaction Receipt",
// 				});
// 			}
// 		} catch (error) {
// 			Alert.alert("Error", "Could not generate receipt image");
// 		}
// 	};

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<View style={styles.header}>
// 				<TouchableOpacity
// 					onPress={() => navigation.goBack()}
// 					style={styles.headerBtn}>
// 					<Ionicons name='close' size={28} color={colors.darkBlue} />
// 				</TouchableOpacity>
// 				<Text style={styles.headerTitle}>Transaction Details</Text>
// 				<TouchableOpacity onPress={onShareImage} style={styles.headerBtn}>
// 					<Ionicons name='share-outline' size={24} color={colors.primary} />
// 				</TouchableOpacity>
// 			</View>

// 			<ScrollView
// 				contentContainerStyle={styles.content}
// 				showsVerticalScrollIndicator={false}>
// 				<ViewShot
// 					ref={viewShotRef}
// 					options={{ format: "png", quality: 1.0 }}
// 					style={styles.viewShotWrapper}>
// 					<View style={styles.receiptCard}>
// 						<View style={styles.topRow}>
// 							<LogoStatic size={80} showName={false} />
// 							<Text style={styles.receiptLabel}>Transaction Receipt</Text>
// 						</View>

// 						<View style={styles.amountContainer}>
// 							<Text style={styles.amountLabel}>
// 								{isCredit ? "Amount Received" : "Amount Sent"}
// 							</Text>
// 							<Text style={styles.amountText}>
// 								₦{Number(transaction.amount || 0).toLocaleString()}
// 							</Text>

// 							<View
// 								style={[
// 									styles.statusBadge,
// 									{ backgroundColor: statusStyle.bgColor },
// 								]}>
// 								<Ionicons
// 									name={statusStyle.icon as any}
// 									size={14}
// 									color={statusStyle.color}
// 								/>
// 								<Text style={[styles.statusText, { color: statusStyle.color }]}>
// 									{transaction.status || "Successful"}
// 								</Text>
// 							</View>

// 							<Text style={styles.dateText}>
// 								{transaction.date
// 									? new Date(transaction.date).toLocaleString("en-NG", {
// 											dateStyle: "medium",
// 											timeStyle: "short",
// 										})
// 									: "---"}
// 							</Text>
// 						</View>

// 						<View style={styles.divider} />

// 						{/* SENDER / FROM SECTION */}
// 						<DetailRow
// 							label={isCredit ? "From" : "Sender"}
// 							value={`${transaction.senderName || "Unknown User"}\n${
// 								transaction.senderBank || "Vellomij Bank"
// 							}\n${maskAccountNumber(transaction.senderAccount, isCredit)}`}
// 						/>

// 						{/* RECIPIENT / TO SECTION */}
// 						<DetailRow
// 							label={isCredit ? "To (You)" : "Recipient"}
// 							value={`${transaction.recipientName || "Unknown User"}\n${
// 								transaction.recipientBank || "Vellomij Bank"
// 							}\n${maskAccountNumber(transaction.recipientAccount, !isCredit)}`}
// 						/>

// 						<DetailRow
// 							label='Transaction Type'
// 							value={transaction.transactionType || "Transfer"}
// 						/>

// 						<DetailRow
// 							label='Description'
// 							value={transaction.description || "No description provided"}
// 						/>

// 						<DetailRow
// 							label='Reference'
// 							value={transaction.id?.split("-")[0].toUpperCase() || "N/A"}
// 						/>

// 						<View style={styles.receiptFooter}>
// 							<Ionicons
// 								name='shield-checkmark'
// 								size={12}
// 								color={colors.textSecondary}
// 							/>
// 							<Text style={styles.footerText}>
// 								{" "}
// 								Officially generated by Vellomij Bank
// 							</Text>
// 						</View>
// 					</View>
// 				</ViewShot>

// 				<TouchableOpacity
// 					style={styles.reportBtn}
// 					onPress={() => Alert.alert("Support", "Connecting to support...")}>
// 					<Text style={styles.reportText}>
// 						Report a problem with this transaction
// 					</Text>
// 				</TouchableOpacity>
// 			</ScrollView>
// 		</SafeAreaView>
// 	);
// };

// const DetailRow = ({ label, value }: { label: string; value: string }) => (
// 	<View style={styles.detailRow}>
// 		<Text style={styles.detailLabel}>{label}</Text>
// 		<Text style={styles.detailValue}>{value}</Text>
// 	</View>
// );

// const styles = StyleSheet.create({
// 	container: { flex: 1, backgroundColor: colors.white },
// 	header: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 		paddingHorizontal: 15,
// 		paddingVertical: 10,
// 	},
// 	headerBtn: { padding: 5 },
// 	headerTitle: { fontSize: 16, fontWeight: "700", color: colors.darkBlue },
// 	content: { padding: 20, alignItems: "center" },
// 	viewShotWrapper: { width: "100%", backgroundColor: colors.white },
// 	receiptCard: {
// 		width: "100%",
// 		backgroundColor: colors.white,
// 		borderRadius: 24,
// 		padding: 24,
// 		borderWidth: 1,
// 		borderColor: colors.border,
// 	},
// 	topRow: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 		marginBottom: 35,
// 		width: "100%",
// 	},
// 	receiptLabel: {
// 		fontSize: 10,
// 		fontWeight: "800",
// 		color: colors.textSecondary,
// 		textTransform: "uppercase",
// 		letterSpacing: 1,
// 	},
// 	amountContainer: { alignItems: "center", marginBottom: 5 },
// 	amountLabel: { fontSize: 13, color: colors.textSecondary, marginBottom: 8 },
// 	amountText: { fontSize: 36, fontWeight: "800", color: colors.darkBlue },
// 	statusBadge: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		paddingHorizontal: 12,
// 		paddingVertical: 4,
// 		borderRadius: 12,
// 		marginTop: 10,
// 	},
// 	statusText: { fontSize: 12, fontWeight: "700", marginLeft: 5 },
// 	dateText: { fontSize: 12, color: colors.textSecondary, marginTop: 10 },
// 	divider: {
// 		width: "100%",
// 		height: 1,
// 		backgroundColor: colors.border,
// 		marginVertical: 25,
// 		borderStyle: "dashed",
// 	},
// 	detailRow: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		width: "100%",
// 		marginBottom: 22,
// 		alignItems: "flex-start",
// 	},
// 	detailLabel: { fontSize: 12, color: colors.textSecondary, flex: 0.35 },
// 	detailValue: {
// 		fontSize: 13,
// 		fontWeight: "600",
// 		color: colors.darkBlue,
// 		textAlign: "right",
// 		flex: 1,
// 		lineHeight: 18,
// 	},
// 	receiptFooter: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		marginTop: 20,
// 		opacity: 0.5,
// 	},
// 	footerText: { fontSize: 10, color: colors.textSecondary },
// 	reportBtn: { marginTop: 30, marginBottom: 20 },
// 	reportText: { color: "#EB5757", fontWeight: "600", fontSize: 13 },
// });

// export default TransactionDetailsScreen;

import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useRef } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	useColorScheme,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";
import { colors } from "../../theme/colors";

const TransactionDetailsScreen = ({ route, navigation }: any) => {
	const { transaction } = route.params;
	const isCredit = transaction.flowType === "CREDIT";
	const viewShotRef = useRef<any>(null);
	const scheme = useColorScheme();
	const isDark = scheme === "dark";

	/* ================== MASKING ================== */
	const maskAccountNumber = (acc: string, shouldMask: boolean = true) => {
		if (!acc || acc === "---") return "**********";
		if (!shouldMask) return acc;
		return acc.length > 4 ? `**** **** ${acc.slice(-4)}` : acc;
	};

	/* ================== STATUS ================== */
	const getStatusDetails = () => {
		const status = transaction.status?.toUpperCase() || "SUCCESSFUL";
		switch (status) {
			case "FAILED":
				return {
					gradient: ["#EB5757", "#B00020"],
					icon: "close-circle",
				};
			case "PENDING":
				return {
					gradient: ["#F2994A", "#F2C94C"],
					icon: "time",
				};
			default:
				return {
					gradient: ["#27AE60", "#219653"],
					icon: "checkmark-circle",
				};
		}
	};

	const statusStyle = getStatusDetails();

	/* ================== SHARE IMAGE ================== */
	const onShareImage = async () => {
		try {
			const uri = await viewShotRef.current.capture();
			await Sharing.shareAsync(uri);
		} catch {
			Alert.alert("Error", "Unable to share receipt");
		}
	};

	/* ================== EXPORT PDF ================== */
	const exportPDF = async () => {
		const html = `
		<html>
			<body style="font-family: Arial; padding: 20px;">
				<h2>Vellomij Bank Transaction Receipt</h2>
				<p><b>Amount:</b> ₦${transaction.amount}</p>
				<p><b>Status:</b> ${transaction.status}</p>
				<p><b>Reference:</b> ${transaction.id}</p>
				<p><b>Date:</b> ${transaction.date}</p>
			</body>
		</html>`;

		const { uri } = await Print.printToFileAsync({ html });
		await Sharing.shareAsync(uri);
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: isDark ? "#0E0E11" : "#F5F7FA" },
			]}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name='close' size={26} color={colors.primary} />
				</TouchableOpacity>

				<Text style={styles.headerTitle}>Transaction Receipt</Text>

				<TouchableOpacity onPress={onShareImage}>
					<Ionicons name='share-outline' size={24} color={colors.primary} />
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.content}>
				<ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
					<View style={[styles.receiptCard, isDark && styles.darkCard]}>
						{/* ===== GRADIENT HEADER ===== */}
						<View
							style={[
								styles.gradientHeader,
								{ backgroundColor: statusStyle.gradient[0] },
							]}>
							<Ionicons name={statusStyle.icon as any} size={40} color='#fff' />
							<Text style={styles.amountText}>
								₦{Number(transaction.amount).toLocaleString()}
							</Text>
							<Text style={styles.statusText}>
								{transaction.status || "Successful"}
							</Text>
						</View>

						{/* ===== WATERMARK ===== */}
						<Text style={styles.watermark}>VELLOMIJ</Text>

						{/* ===== DETAILS ===== */}
						<DetailRow
							label='From'
							value={`${transaction.senderName}\n${maskAccountNumber(
								transaction.senderAccount,
								isCredit,
							)}`}
						/>

						<DetailRow
							label='To'
							value={`${transaction.recipientName}\n${maskAccountNumber(
								transaction.recipientAccount,
								!isCredit,
							)}`}
						/>

						<DetailRow label='Type' value={transaction.transactionType} />
						<DetailRow label='Description' value={transaction.description} />
						<DetailRow
							label='Reference'
							value={transaction.id?.split("-")[0]}
						/>

						{/* ===== QR CODE ===== */}
						<View style={styles.qrWrapper}>
							<QRCode
								value={`https://vellomij.com/verify/${transaction.id}`}
								size={120}
							/>
							<Text style={styles.qrText}>Scan to verify transaction</Text>
						</View>

						<View style={styles.footer}>
							<Text style={styles.footerText}>
								Official receipt — Vellomij Bank
							</Text>
						</View>
					</View>
				</ViewShot>

				<TouchableOpacity style={styles.pdfBtn} onPress={exportPDF}>
					<Text style={styles.pdfText}>Export as PDF</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const DetailRow = ({ label, value }: any) => (
	<View style={styles.detailRow}>
		<Text style={styles.detailLabel}>{label}</Text>
		<Text style={styles.detailValue}>{value}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	headerTitle: { fontWeight: "700", fontSize: 16 },

	content: { padding: 16 },

	receiptCard: {
		borderRadius: 28,
		backgroundColor: "#fff",
		overflow: "hidden",
	},
	darkCard: { backgroundColor: "#1A1A1F" },

	gradientHeader: {
		padding: 24,
		alignItems: "center",
	},

	amountText: {
		fontSize: 34,
		fontWeight: "800",
		color: "#fff",
		marginTop: 10,
	},

	statusText: {
		color: "#fff",
		marginTop: 6,
		fontWeight: "600",
	},

	watermark: {
		position: "absolute",
		fontSize: 80,
		fontWeight: "900",
		color: "rgba(0,0,0,0.03)",
		top: "40%",
		alignSelf: "center",
	},

	detailRow: {
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	detailLabel: {
		fontSize: 12,
		color: "#888",
	},
	detailValue: {
		fontSize: 14,
		fontWeight: "600",
	},

	qrWrapper: {
		alignItems: "center",
		marginVertical: 20,
	},
	qrText: {
		fontSize: 11,
		color: "#777",
		marginTop: 8,
	},

	footer: {
		padding: 16,
		borderTopWidth: 1,
		borderColor: "#eee",
		alignItems: "center",
	},
	footerText: {
		fontSize: 10,
		color: "#888",
	},

	pdfBtn: {
		marginTop: 24,
		alignSelf: "center",
	},
	pdfText: {
		color: colors.primary,
		fontWeight: "700",
	},
});

export default TransactionDetailsScreen;
