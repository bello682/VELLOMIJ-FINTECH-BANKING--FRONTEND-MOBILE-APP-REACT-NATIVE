import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import { loginUser } from "../../store/auth/action/loginAction"; // Ensure path is correct
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

const LoginScreen = ({ navigation }: any) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch<AppDispatch>();

	// Select login state from your root reducer
	const { isLoading, error } = useAppSelector((state) => state.loginState);
	// const loginState = useAppSelector((state) => state.transferState);
	// console.log(
	// 	"DEBUG LOGIN STATE TRANSFER:",
	// 	JSON.stringify(loginState, null, 2)
	// );

	const handleLogin = async () => {
		// Validation
		if (!email || !password) {
			return Alert.alert(
				"Required Fields",
				"Please enter both email and password."
			);
		}

		try {
			const credentials = {
				email: email.trim().toLowerCase(),
				password: password,
			};

			// Dispatch the action and wait for the response
			const response: any = await dispatch(loginUser(credentials));

			// If login is successful (status 200/201), navigate to the Dashboard
			if (response && (response.status === 200 || response.status === 201)) {
				// Use .replace so the user cannot navigate back to the Login screen
				navigation.replace("Main");
			}
		} catch (err) {
			// Error handling is managed by the Redux action and toast messages
			console.log("Login execution stopped due to error", err);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}>
				<View style={styles.content}>
					<Text style={styles.title}>Welcome Back</Text>
					<Text style={styles.subtitle}>Log in to your secure account</Text>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Email Address</Text>
						<TextInput
							style={styles.input}
							placeholder='name@example.com'
							placeholderTextColor={colors.textSecondary}
							value={email}
							onChangeText={setEmail}
							autoCapitalize='none'
							keyboardType='email-address'
						/>

						<Text style={styles.label}>Password</Text>
						<View style={styles.passwordInputWrapper}>
							<TextInput
								style={styles.passwordInput}
								placeholder='Enter your password'
								placeholderTextColor={colors.textSecondary}
								secureTextEntry={!showPassword}
								value={password}
								onChangeText={setPassword}
							/>
							<TouchableOpacity
								style={styles.eyeIcon}
								onPress={() => setShowPassword(!showPassword)}>
								<Ionicons
									name={showPassword ? "eye-off-outline" : "eye-outline"}
									size={22}
									color={colors.textSecondary}
								/>
							</TouchableOpacity>
						</View>
					</View>

					<TouchableOpacity
						onPress={() => navigation.navigate("ForgotPassword")}
						style={styles.forgotPasswordContainer}>
						<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
					</TouchableOpacity>

					{/* Display API error message if it exists */}
					{error && <Text style={styles.errorText}>{error}</Text>}

					<TouchableOpacity
						style={[styles.loginBtn, isLoading && { opacity: 0.7 }]}
						onPress={handleLogin}
						disabled={isLoading}>
						<Text style={styles.loginBtnText}>
							{isLoading ? "Signing in..." : "Sign In"}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Register")}
						disabled={isLoading}>
						<Text style={styles.footerText}>
							Don't have an account?{" "}
							<Text style={{ color: colors.primary, fontWeight: "bold" }}>
								Sign Up
							</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	content: { flex: 1, padding: 25, justifyContent: "center" },
	title: { fontSize: 30, fontWeight: "bold", color: colors.darkBlue },
	subtitle: {
		fontSize: 16,
		color: colors.textSecondary,
		marginTop: 5,
		marginBottom: 30,
	},
	inputContainer: { marginBottom: 10 },
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.darkBlue,
		marginBottom: 8,
		marginTop: 15,
	},
	input: {
		backgroundColor: colors.surface,
		height: 55,
		borderRadius: 12,
		paddingHorizontal: 15,
		fontSize: 16,
		borderWidth: 1,
		borderColor: colors.border,
		color: colors.darkBlue,
	},
	passwordInputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.border,
	},
	passwordInput: {
		flex: 1,
		height: 55,
		paddingHorizontal: 15,
		fontSize: 16,
		color: colors.darkBlue,
	},
	eyeIcon: {
		paddingHorizontal: 15,
	},
	loginBtn: {
		backgroundColor: colors.primary,
		height: 55,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30,
	},
	loginBtnText: { color: colors.white, fontSize: 18, fontWeight: "bold" },
	errorText: {
		color: "red",
		marginTop: 15,
		textAlign: "center",
		fontSize: 14,
		fontWeight: "500",
	},
	footerText: {
		textAlign: "center",
		marginTop: 25,
		color: colors.textSecondary,
	},
	forgotPasswordContainer: { alignSelf: "flex-end", marginTop: 10 },
	forgotPasswordText: {
		color: colors.primary,
		fontWeight: "700",
		fontSize: 14,
	},
});

export default LoginScreen;
