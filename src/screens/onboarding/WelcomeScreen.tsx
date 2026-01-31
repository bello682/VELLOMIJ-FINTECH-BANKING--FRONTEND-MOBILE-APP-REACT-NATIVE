import { Logo3D } from "@/assets";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");

interface Props {
	navigation: StackNavigationProp<any>;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			{/* Top section with Logo/Illustration */}
			<View style={styles.topSection}>
				<LinearGradient
					colors={["#ffffff", "#f0f5ff"]}
					style={styles.circleBg}
				/>
				{/* <Image
					source={AppImages.logo}
					style={styles.logo}
					resizeMode='contain'
				/> */}
				<Logo3D size={220} />
			</View>

			{/* Content Section */}
			<View style={styles.content}>
				<Text style={styles.brandName}>VELLOMIJ BANK</Text>
				<Text style={styles.title}>Welcome to the Future of Banking</Text>
				<Text style={styles.subtitle}>
					Manage your finances, save for goals, and invest in your future all in
					one place.
				</Text>

				<TouchableOpacity
					style={styles.primaryBtn}
					onPress={() => navigation.navigate("Register")}>
					<LinearGradient
						colors={[colors.primary, colors.secondary]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.gradientBtn}>
						<Text style={styles.btnText}>Get Started</Text>
					</LinearGradient>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.secondaryBtn}
					onPress={() => navigation.navigate("Login")}>
					<Text style={styles.secondaryBtnText}>Sign In to Account</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	topSection: { height: "50%", justifyContent: "center", alignItems: "center" },
	circleBg: {
		position: "absolute",
		width: width * 1.5,
		height: width * 1.5,
		borderRadius: width,
		top: -width * 0.7,
	},
	logo: { width: 120, height: 120 },
	content: { flex: 1, padding: 30, alignItems: "center" },
	brandName: {
		color: colors.primary,
		fontWeight: "bold",
		fontSize: 18,
		letterSpacing: 2,
		marginBottom: 10,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: colors.darkBlue,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		color: colors.textSecondary,
		textAlign: "center",
		marginTop: 15,
		lineHeight: 24,
	},
	primaryBtn: {
		width: "100%",
		height: 56,
		marginTop: 40,
		borderRadius: 16,
		overflow: "hidden",
	},
	gradientBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
	btnText: { color: colors.white, fontSize: 18, fontWeight: "bold" },
	secondaryBtn: { marginTop: 20, padding: 10 },
	secondaryBtnText: { color: colors.primary, fontSize: 16, fontWeight: "600" },
});

export default WelcomeScreen;
