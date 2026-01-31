import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import {
	createTicket,
	getUserTickets,
} from "../../store/auth/action/dashboard/supportAction";
import { colors } from "../../theme/colors";

const ChatSupportScreen = ({ navigation }: any) => {
	const dispatch = useDispatch();
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [priority, setPriority] = useState("MEDIUM");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCreateTicket = async () => {
		if (!subject || !message) {
			Alert.alert("Required", "Please provide both a subject and a message.");
			return;
		}

		setIsSubmitting(true);
		const res: any = await dispatch(
			createTicket({ subject, message, priority }) as any
		);

		if (res.success) {
			// Refresh the list in the background
			dispatch(getUserTickets() as any);
			Alert.alert("Ticket Created", res.message, [
				{
					text: "View Tickets",
					onPress: () => navigation.navigate("HelpCenterScreen"),
				},
			]);
		} else {
			Alert.alert("Error", res.message);
		}
		setIsSubmitting(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name='close' size={28} color={colors.darkBlue} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>New Support Ticket</Text>
				<View style={{ width: 28 }} />
			</View>

			<ScrollView contentContainerStyle={styles.form}>
				<Text style={styles.label}>What is the issue about?</Text>
				<TextInput
					style={styles.input}
					placeholder='e.g. Transaction Delay'
					value={subject}
					onChangeText={setSubject}
				/>

				<Text style={styles.label}>Priority Level</Text>
				<View style={styles.priorityRow}>
					{["LOW", "MEDIUM", "HIGH"].map((p) => (
						<TouchableOpacity
							key={p}
							style={[styles.pBtn, priority === p && styles.pBtnActive]}
							onPress={() => setPriority(p)}>
							<Text
								style={[styles.pText, priority === p && styles.pTextActive]}>
								{p}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.label}>Detailed Description</Text>
				<TextInput
					style={[styles.input, styles.textArea]}
					placeholder='Tell us more so we can help you faster...'
					multiline
					numberOfLines={6}
					textAlignVertical='top'
					value={message}
					onChangeText={setMessage}
				/>

				<TouchableOpacity
					style={[styles.submitBtn, isSubmitting && { opacity: 0.6 }]}
					onPress={handleCreateTicket}
					disabled={isSubmitting}>
					{isSubmitting ? (
						<ActivityIndicator color={colors.white} />
					) : (
						<Text style={styles.submitText}>Submit Request</Text>
					)}
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		alignItems: "center",
	},
	headerTitle: { fontSize: 18, fontWeight: "800", color: colors.darkBlue },
	form: { padding: 20 },
	label: {
		fontSize: 14,
		fontWeight: "700",
		color: colors.darkBlue,
		marginBottom: 10,
		marginTop: 10,
	},
	input: {
		backgroundColor: colors.surface,
		borderRadius: 12,
		padding: 15,
		fontSize: 15,
		borderWidth: 1,
		borderColor: colors.border,
	},
	textArea: { height: 150 },
	priorityRow: { flexDirection: "row", marginBottom: 20 },
	pBtn: {
		flex: 1,
		padding: 10,
		alignItems: "center",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.border,
		marginRight: 5,
	},
	pBtnActive: {
		backgroundColor: colors.darkBlue,
		borderColor: colors.darkBlue,
	},
	pText: { fontSize: 12, fontWeight: "700", color: colors.textSecondary },
	pTextActive: { color: colors.white },
	submitBtn: {
		backgroundColor: colors.primary,
		padding: 18,
		borderRadius: 15,
		alignItems: "center",
		marginTop: 30,
	},
	submitText: { color: colors.white, fontWeight: "800", fontSize: 16 },
});

export default ChatSupportScreen;
