import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
	Image,
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
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../../components/common/AppLoader";
import { updateKyc } from "../../store/auth/action/kycUser.Action";
import { colors } from "../../theme/colors";

// 1. Define Props for the Reusable Input
interface CustomInputProps {
	label: string;
	value: string;
	onChange: (text: string) => void;
	keyboard?: "default" | "phone-pad" | "number-pad" | "email-address";
	maxLength?: number;
}

const DocumentUpload = ({ navigation }: any) => {
	const dispatch = useDispatch();

	// Accessing your kycReducer
	const { loadingKyc } = useSelector((state: any) => state.kyc);

	const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
	const [showDatePicker, setShowDatePicker] = useState(false);

	// Form state matching your backend expectations
	const [form, setForm] = useState({
		documentType: "idCard", // Default value allowed by your backend
		occupation: "",
		address: "",
		dateOfBirth: new Date(),
		bvn: "",
		phoneNumber: "",
		placeOfWork: "",
	});

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("Sorry, we need camera roll permissions to make this work!");
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			// Using string array to avoid 'MediaType' property errors
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
		});

		if (!result.canceled) {
			setImage(result.assets[0]);
		}
	};

	const handleDateChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date
	) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setForm({ ...form, dateOfBirth: selectedDate });
		}
	};

	const handleSubmit = async () => {
		if (!image) {
			alert("Please upload your ID document image");
			return;
		}

		if (!form.bvn || form.bvn.length < 11) {
			alert("Please enter a valid 11-digit BVN");
			return;
		}

		const formData = new FormData();
		formData.append("documentType", form.documentType);
		formData.append("occupation", form.occupation);
		formData.append("address", form.address);
		formData.append("dateOfBirth", form.dateOfBirth.toISOString());
		formData.append("bvn", form.bvn);
		formData.append("phoneNumber", form.phoneNumber);
		formData.append("placeOfWork", form.placeOfWork);

		const imageFile = {
			uri:
				Platform.OS === "android"
					? image.uri
					: image.uri.replace("file://", ""),
			name: "documentImage.jpg",
			type: "image/jpeg",
		};

		// Ensure this key 'documentImage' matches your backend upload.single() or upload.fields()
		formData.append("documentImage", imageFile as any);

		try {
			const success = await dispatch(updateKyc(formData) as any);
			if (success) {
				navigation.navigate("FacialVerification");
			}
		} catch (error: any) {
			if (error.response) {
				console.log("SERVER ERROR DATA:", error.response.data);
				const serverMessage =
					error.response.data.message || "Invalid data submitted";
				alert(`Verification Failed: ${serverMessage}`);
			} else {
				console.error("KYC Submission failed", error.message);
				alert("An unexpected error occurred. Please try again.");
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<LoadingOverlay
				visible={loadingKyc}
				message='Uploading your documents...'
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}>
					<View style={styles.headerArea}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Ionicons name='arrow-back' size={24} color={colors.darkBlue} />
						</TouchableOpacity>
						<Text style={styles.headerTitle}>Verification Details</Text>
					</View>

					<Text style={styles.sectionLabel}>SELECT DOCUMENT TYPE</Text>
					<View style={styles.typeContainer}>
						{[
							{ id: "idCard", label: "National ID" },
							{ id: "passport", label: "Passport" },
							{ id: "driverLicense", label: "Driver License" },
						].map((type) => (
							<TouchableOpacity
								key={type.id}
								style={[
									styles.typeButton,
									form.documentType === type.id && styles.typeButtonActive,
								]}
								onPress={() => setForm({ ...form, documentType: type.id })}>
								<Text
									style={[
										styles.typeButtonText,
										form.documentType === type.id &&
											styles.typeButtonTextActive,
									]}>
									{type.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					<Text style={styles.sectionLabel}>PERSONAL INFORMATION</Text>

					<CustomInput
						label='Phone Number'
						value={form.phoneNumber}
						onChange={(text) => setForm({ ...form, phoneNumber: text })}
						keyboard='phone-pad'
					/>

					<CustomInput
						label='Bank Verification Number (BVN)'
						value={form.bvn}
						onChange={(text) => setForm({ ...form, bvn: text })}
						keyboard='number-pad'
						maxLength={11}
					/>

					<Text style={styles.label}>Date of Birth</Text>
					<TouchableOpacity
						style={styles.datePickerBtn}
						onPress={() => setShowDatePicker(true)}>
						<Text style={styles.dateText}>
							{form.dateOfBirth.toDateString()}
						</Text>
						<Ionicons
							name='calendar-outline'
							size={20}
							color={colors.primary}
						/>
					</TouchableOpacity>

					<Text style={styles.sectionLabel}>EMPLOYMENT & ADDRESS</Text>

					<CustomInput
						label='Occupation'
						value={form.occupation}
						onChange={(text) => setForm({ ...form, occupation: text })}
					/>

					<CustomInput
						label='Place of Work'
						value={form.placeOfWork}
						onChange={(text) => setForm({ ...form, placeOfWork: text })}
					/>

					<CustomInput
						label='Residential Address'
						value={form.address}
						onChange={(text) => setForm({ ...form, address: text })}
					/>

					<Text style={styles.sectionLabel}>DOCUMENT UPLOAD</Text>
					<TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
						{image ? (
							<Image source={{ uri: image.uri }} style={styles.preview} />
						) : (
							<View style={styles.uploadPlaceholder}>
								<Ionicons
									name='camera-outline'
									size={40}
									color={colors.primary}
								/>
								<Text style={styles.uploadText}>
									Tap to select{" "}
									{form.documentType === "idCard"
										? "ID Card"
										: form.documentType}
								</Text>
							</View>
						)}
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.submitBtn,
							(!image || !form.bvn) && { opacity: 0.6 },
						]}
						onPress={handleSubmit}
						disabled={loadingKyc}>
						<Text style={styles.submitBtnText}>Submit for Verification</Text>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>

			{showDatePicker && (
				<DateTimePicker
					value={form.dateOfBirth}
					mode='date'
					display={Platform.OS === "ios" ? "spinner" : "default"}
					onChange={handleDateChange}
					maximumDate={new Date()}
				/>
			)}
		</SafeAreaView>
	);
};

const CustomInput = ({
	label,
	value,
	onChange,
	keyboard = "default",
	maxLength,
}: CustomInputProps) => (
	<View style={styles.inputGroup}>
		<Text style={styles.label}>{label}</Text>
		<TextInput
			style={styles.input}
			value={value}
			onChangeText={onChange}
			keyboardType={keyboard}
			maxLength={maxLength}
			placeholder={`Enter ${label.toLowerCase()}`}
			placeholderTextColor='#999'
		/>
	</View>
);

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	scrollContent: { padding: 25 },
	headerArea: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
	headerTitle: {
		fontSize: 22,
		fontWeight: "800",
		color: colors.darkBlue,
		marginLeft: 15,
	},
	sectionLabel: {
		fontSize: 12,
		fontWeight: "700",
		color: colors.primary,
		letterSpacing: 1,
		marginTop: 10,
		marginBottom: 15,
	},
	typeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	typeButton: {
		flex: 1,
		paddingVertical: 12,
		marginHorizontal: 4,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.border,
		alignItems: "center",
		backgroundColor: colors.surface,
	},
	typeButtonActive: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
	typeButtonText: { fontSize: 11, fontWeight: "600", color: "#666" },
	typeButtonTextActive: { color: colors.white },
	inputGroup: { marginBottom: 20 },
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.darkBlue,
		marginBottom: 8,
	},
	input: {
		backgroundColor: colors.surface,
		height: 55,
		borderRadius: 12,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: colors.border,
		color: colors.darkBlue,
		fontSize: 16,
	},
	datePickerBtn: {
		backgroundColor: colors.surface,
		height: 55,
		borderRadius: 12,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: colors.border,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 25,
	},
	dateText: { color: colors.darkBlue, fontSize: 16 },
	uploadBox: {
		height: 180,
		backgroundColor: colors.surface,
		borderRadius: 16,
		borderStyle: "dashed",
		borderWidth: 2,
		borderColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		overflow: "hidden",
	},
	uploadPlaceholder: { alignItems: "center" },
	uploadText: {
		fontSize: 13,
		color: colors.primary,
		fontWeight: "600",
		marginTop: 10,
	},
	preview: { width: "100%", height: "100%" },
	submitBtn: {
		backgroundColor: colors.primary,
		height: 58,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
		marginBottom: 50,
		elevation: 5,
	},
	submitBtnText: { color: colors.white, fontSize: 16, fontWeight: "700" },
});

export default DocumentUpload;
