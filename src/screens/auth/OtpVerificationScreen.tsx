import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
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
import { useAppSelector } from "../../hooks/useTypedSelector";
import { verifyUser } from "../../store/auth/action/verificationAction";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

const OTPScreen = ({ navigation, route }: any) => {
	const [code, setCode] = useState("");
	const [timer, setTimer] = useState(60);
	const [canResend, setCanResend] = useState(false);

	const inputRef = useRef<TextInput>(null);
	const CODE_LENGTH = 6; // Updated to 6-digit code not 4-digit

	const dispatch = useDispatch<AppDispatch>();
	const { loading } = useAppSelector((state) => state.verification);

	// Get email from previous screen params (passed during navigation from Register)
	const email = route?.params?.email || "your email";

	// Handle Countdown Timer logic
	// Handle Countdown Timer logic
	useEffect(() => {
		let interval: any; // Change from NodeJS.Timeout to any

		if (timer > 0) {
			interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else {
			setCanResend(true);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [timer]);

	const handleVerify = async () => {
		if (code.length < CODE_LENGTH) {
			return Alert.alert(
				"Invalid Code",
				`Please enter the full ${CODE_LENGTH}-digit code`
			);
		}

		try {
			// Dispatch and cast to 'any' to check the status property
			const response: any = await dispatch(verifyUser(code));

			if (response && (response.status === 200 || response.status === 201)) {
				// Success: Navigate to Login
				navigation.navigate("Login");
			}
		} catch (error) {
			// Error is handled globally in the action via Toast
			console.log("Verification process stopped");
		}
	};

	const handleResend = () => {
		if (!canResend) return;

		// Reset local state
		setTimer(60);
		setCanResend(false);
		setCode("");

		// Navigate to the ResendOTP screen
		// We pass the email along in case the Resend screen needs it to trigger the API
		navigation.navigate("ResendOTP", { email });
	};

	const renderInputs = () => {
		const inputs = [];
		for (let i = 0; i < CODE_LENGTH; i++) {
			const digit = code[i] || "";
			const isFocused = code.length === i;
			inputs.push(
				<View
					key={i}
					style={[
						styles.otpBox,
						isFocused && styles.otpBoxFocused,
						digit !== "" && styles.otpBoxFilled,
					]}>
					<Text style={styles.otpText}>{digit}</Text>
				</View>
			);
		}
		return inputs;
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
				<Text style={styles.title}>Verification</Text>
				<Text style={styles.subtitle}>
					Enter the 6-digit code sent to{" "}
					<Text style={{ fontWeight: "bold", color: colors.darkBlue }}>
						{email}
					</Text>
				</Text>

				<TouchableOpacity
					style={styles.otpContainer}
					activeOpacity={1}
					onPress={() => inputRef.current?.focus()}>
					{renderInputs()}
				</TouchableOpacity>

				{/* Hidden input to handle keyboard focus */}
				<TextInput
					ref={inputRef}
					value={code}
					onChangeText={(text) => text.length <= CODE_LENGTH && setCode(text)}
					keyboardType='number-pad'
					style={styles.hiddenInput}
					autoFocus
				/>

				<TouchableOpacity
					style={[styles.verifyBtn, loading && { opacity: 0.7 }]}
					onPress={handleVerify}
					disabled={loading}>
					<Text style={styles.verifyBtnText}>
						{loading ? "Verifying..." : "Verify Account"}
					</Text>
				</TouchableOpacity>

				<View style={styles.resendContainer}>
					<Text style={styles.resendText}>Didn't receive code? </Text>
					<TouchableOpacity onPress={handleResend} disabled={!canResend}>
						<Text
							style={[
								styles.resendLink,
								!canResend && { color: colors.border },
							]}>
							{canResend ? "Resend OTP" : `Resend in ${timer}s`}
						</Text>
					</TouchableOpacity>
				</View>
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
	content: { flex: 1, paddingHorizontal: 25, paddingTop: 30 },
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: colors.darkBlue,
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: colors.textSecondary,
		lineHeight: 22,
		marginBottom: 40,
	},
	otpContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 40,
	},
	otpBox: {
		width: 50,
		height: 60,
		borderRadius: 15,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.border,
		justifyContent: "center",
		alignItems: "center",
	},
	otpBoxFocused: { borderColor: colors.primary, borderWidth: 2 },
	otpBoxFilled: { backgroundColor: colors.white, borderColor: colors.primary },
	otpText: { fontSize: 22, fontWeight: "bold", color: colors.darkBlue },
	hiddenInput: { position: "absolute", opacity: 0, width: 1 },
	verifyBtn: {
		backgroundColor: colors.primary,
		height: 55,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	verifyBtnText: { color: colors.white, fontSize: 16, fontWeight: "700" },
	resendContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 30,
	},
	resendText: { color: colors.textSecondary, fontSize: 14 },
	resendLink: { color: colors.primary, fontWeight: "700", fontSize: 14 },
});

export default OTPScreen;
