import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { forgetUserPassword } from "../../store/auth/action/forgetPasswordAction";
import { colors } from "../../theme/colors";

const ForgotPasswordScreen = ({ navigation }: any) => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	// Using your specific reducer state name
	const { loading_now } = useSelector(
		(state: any) => state.forgetPasswordReducer
	);

	const handleResetRequest = async () => {
		if (!email) return;

		const success = await dispatch(forgetUserPassword(email) as any);
		if (success) {
			// Usually, you stay here to show a success message
			// or navigate back to login
			setTimeout(() => navigation.navigate("Login"), 3000);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backBtn}>
				<Ionicons name='arrow-back' size={24} color={colors.darkBlue} />
			</TouchableOpacity>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.content}>
				<View style={styles.iconCircle}>
					<Ionicons name='key-outline' size={40} color={colors.primary} />
				</View>

				<Text style={styles.title}>Forgot Password?</Text>
				<Text style={styles.subtitle}>
					No worries! Enter the email associated with your account and we'll
					send a reset link.
				</Text>

				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Email Address</Text>
					<View style={styles.inputContainer}>
						<Ionicons
							name='mail-outline'
							size={20}
							color={colors.textSecondary}
						/>
						<TextInput
							placeholder='example@gmail.com'
							style={styles.input}
							value={email}
							onChangeText={setEmail}
							keyboardType='email-address'
							autoCapitalize='none'
						/>
					</View>
				</View>

				<TouchableOpacity
					style={[styles.primaryBtn, loading_now && { opacity: 0.7 }]}
					onPress={handleResetRequest}
					disabled={loading_now || !email}>
					{loading_now ? (
						<ActivityIndicator color={colors.white} />
					) : (
						<Text style={styles.primaryBtnText}>Send Reset Link</Text>
					)}
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	backBtn: {
		marginHorizontal: 20,
		marginTop: 10,
		width: 40,
		height: 40,
		justifyContent: "center",
	},
	content: { flex: 1, paddingHorizontal: 25, paddingTop: 20 },
	iconCircle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: colors.surface,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 30,
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: colors.darkBlue,
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 16,
		color: colors.textSecondary,
		lineHeight: 24,
		marginBottom: 40,
	},
	inputWrapper: { marginBottom: 30 },
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.darkBlue,
		marginBottom: 10,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: 16,
		paddingHorizontal: 15,
		height: 56,
	},
	input: { flex: 1, marginLeft: 12, fontSize: 16, color: colors.darkBlue },
	primaryBtn: {
		backgroundColor: colors.primary,
		height: 56,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	primaryBtnText: { color: colors.white, fontSize: 16, fontWeight: "700" },
});

export default ForgotPasswordScreen;
