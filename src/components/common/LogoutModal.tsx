import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";

interface LogoutModalProps {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isLoading: boolean;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
	visible,
	onClose,
	onConfirm,
	isLoading,
}) => {
	return (
		<Modal visible={visible} transparent animationType='fade'>
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<View style={styles.iconCircle}>
						<Ionicons name='log-out-outline' size={32} color='#FF3B30' />
					</View>

					<Text style={styles.title}>Log Out</Text>
					<Text style={styles.message}>
						Are you sure you want to log out of your account?
					</Text>

					<View style={styles.buttonRow}>
						<TouchableOpacity
							style={[styles.btn, styles.cancelBtn]}
							onPress={onClose}
							disabled={isLoading}>
							<Text style={styles.cancelText}>Cancel</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.btn, styles.confirmBtn]}
							onPress={onConfirm}
							disabled={isLoading}>
							<Text style={styles.confirmText}>
								{isLoading ? "Logging out..." : "Yes, Logout"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	modalContainer: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 24,
		padding: 25,
		alignItems: "center",
	},
	iconCircle: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#FFF5F5",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		color: colors.darkBlue,
		marginBottom: 10,
	},
	message: {
		fontSize: 15,
		color: "#666",
		textAlign: "center",
		marginBottom: 30,
		lineHeight: 22,
	},
	buttonRow: { flexDirection: "row", width: "100%", gap: 12 },
	btn: {
		flex: 1,
		height: 50,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	cancelBtn: { backgroundColor: "#F2F2F7" },
	confirmBtn: { backgroundColor: "#FF3B30" },
	cancelText: { color: colors.darkBlue, fontWeight: "600" },
	confirmText: { color: "#fff", fontWeight: "700" },
});

export default LogoutModal;
