// import { colors } from "@/src/theme/colors";
// import React, { useEffect, useRef } from "react";
// import {
// 	Animated,
// 	Easing,
// 	StyleSheet,
// 	Text,
// 	TextStyle,
// 	View,
// 	ViewStyle,
// } from "react-native";

// interface Logo3DProps {
// 	size?: number;
// }

// const Logo3D: React.FC<Logo3DProps> = React.memo(({ size = 180 }) => {
// 	const rotateAnim = useRef(new Animated.Value(0)).current;

// 	useEffect(() => {
// 		Animated.loop(
// 			Animated.timing(rotateAnim, {
// 				toValue: 1,
// 				duration: 8000, // Very subtle slow rotation for premium effect
// 				easing: Easing.linear,
// 				useNativeDriver: true,
// 			})
// 		).start();
// 	}, [rotateAnim]);

// 	const spin = rotateAnim.interpolate({
// 		inputRange: [0, 1],
// 		outputRange: ["0deg", "360deg"],
// 	});

// 	// Calculate dynamic heights based on size prop
// 	const containerStyle: Animated.WithAnimatedValue<ViewStyle> = {
// 		width: size,
// 		height: size * 1.35,
// 		transform: [{ perspective: 1000 }, { rotateY: spin }],
// 	};

// 	return (
// 		<Animated.View style={[styles.container, containerStyle]}>
// 			{/* Main blue VB monogram with geometric accent */}
// 			<View style={styles.monogramContainer}>
// 				<Text style={styles.monogram}>V</Text>
// 				{/* <View style={styles.verticalAccent} /> */}
// 				<Text style={[styles.monogram, styles.bLetter]}>B</Text>
// 			</View>

// 			{/* Company name below – clean and centered */}
// 			<Text style={styles.companyName}>Vellomij Bank</Text>
// 		</Animated.View>
// 	);
// });

// interface Styles {
// 	container: ViewStyle;
// 	monogramContainer: ViewStyle;
// 	monogram: TextStyle;
// 	bLetter: TextStyle;
// 	verticalAccent: ViewStyle;
// 	companyName: TextStyle;
// }

// const styles = StyleSheet.create<Styles>({
// 	container: {
// 		backgroundColor: "transparent",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		// Note: preserve-3d is experimental/unsupported in some RN versions,
// 		// zIndex and translateZ handle the layers here.
// 	},
// 	monogramContainer: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		position: "relative",
// 	},
// 	monogram: {
// 		fontSize: 80,
// 		fontWeight: "bold",
// 		color: "#007BFF",
// 		textShadowColor: "rgba(0, 0, 0, 0.75)",
// 		textShadowOffset: { width: 3, height: 3 },
// 		textShadowRadius: 8,
// 		zIndex: 2,
// 	},
// 	bLetter: {
// 		marginLeft: -20,
// 		color: "#0056B3",
// 	},
// 	verticalAccent: {
// 		position: "absolute",
// 		width: 12,
// 		height: 60,
// 		backgroundColor: "#FFFFFF",
// 		left: "45%",
// 		top: 10,
// 		borderRadius: 6,
// 		// perspective and translateZ create the "pop" effect
// 		transform: [{ translateX: -6 }],
// 		shadowColor: "#000000",
// 		shadowOffset: { width: 2, height: 2 },
// 		shadowOpacity: 0.4,
// 		shadowRadius: 6,
// 		elevation: 8,
// 		zIndex: 3,
// 	},
// 	companyName: {
// 		marginTop: 20,
// 		fontSize: 20,
// 		fontWeight: "600",
// 		// color: "#FFFFFF",
// 		color: colors.white,
// 		letterSpacing: 1.5,
// 		textAlign: "center",
// 		textShadowColor: "rgba(0, 0, 0, 0.5)",
// 		textShadowOffset: { width: 1, height: 1 },
// 		textShadowRadius: 3,
// 	},
// });

// export default Logo3D;

import { colors } from "@/src/theme/colors";
import React, { useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

interface Logo3DProps {
	size?: number;
	showName?: boolean; // Added to hide name if logo is too small
}

// 1. THE STATIC LOGO (For Receipts/Headers)
export const LogoStatic: React.FC<Logo3DProps> = React.memo(
	({ size = 180, showName = true }) => {
		// We scale the font based on the size prop provided
		const scaleFactor = size / 180;

		return (
			<View
				style={[
					styles.container,
					{ width: size, height: showName ? size * 1.35 : size },
				]}>
				<View style={styles.monogramContainer}>
					<Text style={[styles.monogram, { fontSize: 80 * scaleFactor }]}>
						V
					</Text>
					<Text
						style={[
							styles.monogram,
							styles.bLetter,
							{ fontSize: 80 * scaleFactor, marginLeft: -20 * scaleFactor },
						]}>
						B
					</Text>
				</View>
				{showName && (
					<Text
						style={[
							styles.companyName,
							{ fontSize: 20 * scaleFactor, marginTop: 10 * scaleFactor },
						]}>
						Vellomij Bank
					</Text>
				)}
			</View>
		);
	}
);

// 2. THE 3D SPINNING LOGO (Original)
const Logo3D: React.FC<Logo3DProps> = React.memo(({ size = 180 }) => {
	const rotateAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.timing(rotateAnim, {
				toValue: 1,
				duration: 8000,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	}, [rotateAnim]);

	const spin = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const containerStyle: Animated.WithAnimatedValue<ViewStyle> = {
		width: size,
		height: size * 1.35,
		transform: [{ perspective: 1000 }, { rotateY: spin }],
	};

	return (
		<Animated.View style={[styles.container, containerStyle]}>
			<View style={styles.monogramContainer}>
				<Text style={styles.monogram}>V</Text>
				<Text style={[styles.monogram, styles.bLetter]}>B</Text>
			</View>
			<Text style={styles.companyName}>Vellomij Bank</Text>
		</Animated.View>
	);
});

interface Styles {
	container: ViewStyle;
	monogramContainer: ViewStyle;
	monogram: TextStyle;
	bLetter: TextStyle;
	verticalAccent: ViewStyle;
	companyName: TextStyle;
}

const styles = StyleSheet.create<Styles>({
	container: {
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center",
	},
	monogramContainer: {
		flexDirection: "row",
		alignItems: "center",
		position: "relative",
	},
	monogram: {
		fontSize: 80,
		fontWeight: "bold",
		color: "#007BFF",
		textShadowColor: "rgba(0, 0, 0, 0.3)", // Reduced for cleaner receipt look
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 4,
		zIndex: 2,
	},
	bLetter: {
		marginLeft: -20,
		color: "#0056B3",
	},
	verticalAccent: {
		position: "absolute",
		width: 12,
		height: 60,
		backgroundColor: "#FFFFFF",
		left: "45%",
		top: 10,
		borderRadius: 6,
		transform: [{ translateX: -6 }],
		shadowColor: "#000000",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 6,
		elevation: 8,
		zIndex: 3,
	},
	companyName: {
		marginTop: 0,
		fontSize: 20,
		fontWeight: "600",
		color: colors.darkBlue || "#000", // Dark text for the receipt
		letterSpacing: 1.5,
		textAlign: "center",
	},
});

export default Logo3D;
