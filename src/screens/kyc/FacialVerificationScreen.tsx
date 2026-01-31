import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";

const FacialVerification = ({ navigation }: any) => {
	return (
		<View style={styles.container}>
			<Ionicons name='time-outline' size={100} color='#FF9500' />
			<Text style={styles.title}>Review in Progress</Text>
			<Text style={styles.subtitle}>
				We are verifying your documents. This usually takes between 1 to 24
				hours. We will notify you once it's done!
			</Text>

			<TouchableOpacity
				style={styles.btn}
				onPress={() => navigation.navigate("MainTabs")}>
				<Text style={styles.btnText}>Back to Dashboard</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		justifyContent: "center",
		alignItems: "center",
		padding: 30,
	},
	title: {
		fontSize: 24,
		fontWeight: "800",
		color: colors.darkBlue,
		marginTop: 20,
	},
	subtitle: {
		fontSize: 16,
		color: colors.textSecondary,
		textAlign: "center",
		marginTop: 10,
		lineHeight: 24,
	},
	btn: {
		marginTop: 40,
		backgroundColor: colors.darkBlue,
		paddingHorizontal: 40,
		height: 50,
		borderRadius: 12,
		justifyContent: "center",
	},
	btnText: { color: colors.white, fontWeight: "700" },
});

export default FacialVerification;
