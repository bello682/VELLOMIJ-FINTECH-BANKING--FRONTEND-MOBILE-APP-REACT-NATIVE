import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";

const KycIntroScreen = ({ navigation }: any) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.header}>
					<View style={styles.iconCircle}>
						<Ionicons
							name='shield-checkmark'
							size={40}
							color={colors.primary}
						/>
					</View>
					<Text style={styles.title}>Verify your identity</Text>
					<Text style={styles.subtitle}>
						To protect your account and follow regulations, we need a few more
						details.
					</Text>
				</View>

				<View style={styles.stepsContainer}>
					<View style={styles.stepItem}>
						<Ionicons
							name='document-text-outline'
							size={24}
							color={colors.primary}
						/>
						<View style={styles.stepText}>
							<Text style={styles.stepTitle}>Personal Information</Text>
							<Text style={styles.stepDesc}>
								Provide your BVN and employment details.
							</Text>
						</View>
					</View>

					<View style={styles.stepItem}>
						<Ionicons name='camera-outline' size={24} color={colors.primary} />
						<View style={styles.stepText}>
							<Text style={styles.stepTitle}>Document Upload</Text>
							<Text style={styles.stepDesc}>
								Take a clear photo of your Government ID.
							</Text>
						</View>
					</View>
				</View>

				<TouchableOpacity
					style={styles.primaryBtn}
					onPress={() => navigation.navigate("DocumentUpload")}>
					<Text style={styles.primaryBtnText}>Continue</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	content: { padding: 25, alignItems: "center" },
	header: { alignItems: "center", marginBottom: 40 },
	iconCircle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: colors.surface,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "800",
		color: colors.darkBlue,
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
	},
	stepsContainer: { width: "100%", marginBottom: 40 },
	stepItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 25,
		backgroundColor: colors.surface,
		padding: 20,
		borderRadius: 16,
	},
	stepText: { marginLeft: 15 },
	stepTitle: { fontSize: 16, fontWeight: "700", color: colors.darkBlue },
	stepDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
	primaryBtn: {
		backgroundColor: colors.primary,
		width: "100%",
		height: 56,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	primaryBtnText: { color: colors.white, fontSize: 16, fontWeight: "700" },
});

export default KycIntroScreen;
