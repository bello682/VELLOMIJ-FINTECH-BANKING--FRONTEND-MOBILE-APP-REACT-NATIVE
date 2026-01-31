import { register } from "@/src/store/auth/action/registerAction";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

const RegisterScreen = ({ navigation }: any) => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();
	const { loading, errorMsg } = useAppSelector((state) => state.registration);

	const handleRegister = async () => {
		if (!fullName || !email || !password) {
			return alert("Please fill in all fields");
		}

		const formData = { fullName, email, password };

		try {
			// cast the dispatch result to 'any' to access .status
			const response: any = await dispatch(register(formData));

			// Now TypeScript will let you access .status
			if (response && (response.status === 201 || response.status === 200)) {
				navigation.navigate("OTPVerification", { email: email });
			}
		} catch (error) {
			console.log("Registration process stopped due to error");
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}>
					<View style={styles.header}>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={styles.backBtn}>
							<Text style={{ color: colors.primary, fontWeight: "bold" }}>
								← Back
							</Text>
						</TouchableOpacity>
						<Text style={styles.title}>Create Account</Text>
						<Text style={styles.subtitle}>
							Join FintechBank and start saving today.
						</Text>
					</View>

					<View style={styles.form}>
						<Text style={styles.label}>Full Name</Text>
						<TextInput
							style={styles.input}
							placeholder='John Doe'
							placeholderTextColor={colors.textSecondary}
							value={fullName}
							onChangeText={setFullName}
						/>

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
						<TextInput
							style={styles.input}
							placeholder='Create a strong password'
							placeholderTextColor={colors.textSecondary}
							secureTextEntry
							value={password}
							onChangeText={setPassword}
						/>

						{errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

						<TouchableOpacity
							style={styles.registerBtn}
							onPress={handleRegister}
							disabled={loading}>
							<Text style={styles.registerBtnText}>
								{loading ? "Creating Account..." : "Continue"}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.footer}
							onPress={() => navigation.navigate("Login")}>
							<Text style={styles.footerText}>
								Already have an account?{" "}
								<Text style={styles.linkText}>Log In</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	scrollContent: { padding: 25 },
	header: { marginTop: 20, marginBottom: 30 },
	backBtn: { marginBottom: 20 },
	title: { fontSize: 28, fontWeight: "bold", color: colors.darkBlue },
	subtitle: { fontSize: 16, color: colors.textSecondary, marginTop: 8 },
	form: { marginTop: 10 },
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.darkBlue,
		marginBottom: 8,
		marginTop: 20,
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
	registerBtn: {
		backgroundColor: colors.primary,
		height: 55,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	registerBtnText: { color: colors.white, fontSize: 18, fontWeight: "bold" },
	errorText: { color: colors.error, marginTop: 15, textAlign: "center" },
	footer: { marginTop: 30, alignItems: "center" },
	footerText: { color: colors.textSecondary, fontSize: 15 },
	linkText: { color: colors.primary, fontWeight: "bold" },
});

export default RegisterScreen;
