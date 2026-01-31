import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
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
import { setTransactionPin } from "../../store/auth/action/dashboard/walletAction";
import { colors } from "../../theme/colors";

const SetPinScreen = ({ navigation }: any) => {
	const dispatch = useDispatch();
	const [pin, setPin] = useState("");
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<TextInput>(null);

	const handleComplete = async (value: string) => {
		if (value.length === 4) {
			setLoading(true);
			const res: any = await dispatch(setTransactionPin(value) as any);
			setLoading(false);

			if (res.success) {
				Alert.alert("Success", res.message, [
					{ text: "Continue", onPress: () => navigation.goBack() },
				]);
			} else {
				setPin(""); // Clear on failure
				Alert.alert("Error", res.message);
			}
		}
	};

	const renderBoxes = () => {
		return (
			<TouchableOpacity
				style={styles.boxContainer}
				activeOpacity={1}
				onPress={() => inputRef.current?.focus()}>
				{[0, 1, 2, 3].map((index) => (
					<View
						key={index}
						style={[
							styles.box,
							pin.length === index && styles.activeBox,
							pin.length > index && styles.filledBox,
						]}>
						<Text style={styles.boxText}>{pin[index] ? "●" : ""}</Text>
					</View>
				))}
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.backBtn}>
						<Ionicons name='chevron-back' size={28} color={colors.darkBlue} />
					</TouchableOpacity>
				</View>

				<View style={styles.content}>
					<View style={styles.iconCircle}>
						<Ionicons name='lock-closed' size={32} color={colors.primary} />
					</View>

					<Text style={styles.title}>Set Transaction PIN</Text>
					<Text style={styles.subtitle}>
						Create a 4-digit PIN to authorize your transfers and bill payments.
					</Text>

					{renderBoxes()}

					{/* Hidden Actual Input */}
					<TextInput
						ref={inputRef}
						value={pin}
						onChangeText={(val) => {
							if (val.length <= 4) {
								setPin(val);
								if (val.length === 4) handleComplete(val);
							}
						}}
						keyboardType='number-pad'
						maxLength={4}
						style={styles.hiddenInput}
						autoFocus={true}
					/>

					{loading && (
						<View style={styles.loader}>
							<ActivityIndicator size='large' color={colors.primary} />
							<Text style={styles.loaderText}>Securing your account...</Text>
						</View>
					)}
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	header: { padding: 10 },
	backBtn: {
		width: 45,
		height: 45,
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 30,
		paddingTop: 20,
	},
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
		fontSize: 15,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
		marginBottom: 40,
	},
	boxContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 20,
	},
	box: {
		width: 60,
		height: 65,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.border,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.surface,
	},
	activeBox: { borderColor: colors.primary, borderWidth: 2 },
	filledBox: { borderColor: colors.darkBlue },
	boxText: { fontSize: 24, fontWeight: "700", color: colors.darkBlue },
	hiddenInput: { position: "absolute", opacity: 0, height: 0, width: 0 },
	loader: { marginTop: 40, alignItems: "center" },
	loaderText: { marginTop: 10, color: colors.textSecondary, fontSize: 14 },
});

export default SetPinScreen;
