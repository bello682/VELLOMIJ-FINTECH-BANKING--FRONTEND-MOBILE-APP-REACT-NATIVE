import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

interface LoadingProps {
	visible: boolean;
	message?: string;
}

const LoadingOverlay = ({ visible, message = "Loading..." }: LoadingProps) => {
	if (!visible) return null;

	return (
		<Modal transparent animationType='fade' visible={visible}>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<ActivityIndicator size='large' color={colors.primary} />
					<Text style={styles.message}>{message}</Text>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		padding: 30,
		backgroundColor: "white",
		borderRadius: 16,
		alignItems: "center",
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		// Elevation for Android
		elevation: 5,
	},
	message: {
		marginTop: 15,
		fontSize: 14,
		fontWeight: "600",
		color: colors.darkBlue,
		textAlign: "center",
	},
});

export default LoadingOverlay;
