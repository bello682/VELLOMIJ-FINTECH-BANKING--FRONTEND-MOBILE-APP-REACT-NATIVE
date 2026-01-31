import { useAppSelector } from "@/src/hooks/useTypedSelector";
import { resendOtpUser } from "@/src/store/auth/action/resendOtpAction";
import { AppDispatch } from "@/src/store/auth/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { colors } from "../../theme/colors";

const ResendOTPScreen = ({ navigation, route }: any) => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch<AppDispatch>();
	const { loading } = useAppSelector((state) => state.resendOtpState);

	// Add this useEffect to capture the email from previous screen
	useEffect(() => {
		if (route.params?.email) {
			setEmail(route.params.email);
		}
	}, [route.params?.email]);

	const handleResendOTP = async () => {
		if (!email) {
			return Alert.alert("Error", "Please enter your email address");
		}

		try {
			// Use the Redux action instead of local axios call
			await dispatch(resendOtpUser(email));

			// Navigate on success
			navigation.navigate("OTPVerification", { email: email.toLowerCase() });
		} catch (error) {
			// Error is already handled by the action's catch block (Toast & Dispatch)
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
					<Ionicons
						name='mail-unread-outline'
						size={40}
						color={colors.primary}
					/>
				</View>

				<View style={styles.textSection}>
					<Text style={styles.title}>Resend OTP</Text>
					<Text style={styles.subtitle}>
						Enter your email address{" "}
						<Text style={{ fontWeight: "bold", color: colors.darkBlue }}>
							{email || "your account"}
						</Text>
						. We will send a new 6-digit verification code to your inbox.
					</Text>
				</View>

				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Email Address</Text>
					<View style={styles.inputContainer}>
						<Ionicons
							name='mail-outline'
							size={20}
							color={colors.textSecondary}
						/>
						<TextInput
							placeholder='Enter your email'
							style={styles.input}
							value={email}
							onChangeText={setEmail}
							keyboardType='email-address'
							autoCapitalize='none'
						/>
					</View>
				</View>

				<TouchableOpacity
					style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
					onPress={handleResendOTP}
					disabled={loading}>
					{loading ? (
						<ActivityIndicator color={colors.white} />
					) : (
						<Text style={styles.primaryBtnText}>Send New Code</Text>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.cancelBtn}
					onPress={() => navigation.navigate("Login")}>
					<Text style={styles.cancelBtnText}>Back to Login</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

// ... keep your existing styles

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
	textSection: { marginBottom: 40 },
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: colors.darkBlue,
		marginBottom: 12,
	},
	subtitle: { fontSize: 16, color: colors.textSecondary, lineHeight: 24 },
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
	},
	primaryBtnText: { color: colors.white, fontSize: 16, fontWeight: "700" },
	cancelBtn: { marginTop: 20, alignItems: "center" },
	cancelBtnText: {
		color: colors.textSecondary,
		fontSize: 14,
		fontWeight: "600",
	},
});

export default ResendOTPScreen;
