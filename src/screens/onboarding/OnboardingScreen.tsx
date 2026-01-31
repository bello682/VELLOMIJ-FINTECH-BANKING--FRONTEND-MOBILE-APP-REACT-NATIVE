import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");

const DATA = [
	{
		id: "1",
		title: "Smart Saving",
		desc: "Save for your future with automated goals and high-yield interest.",
		icon: "💰",
		bg: "#F0F5FF",
	},
	{
		id: "2",
		title: "Fast Transfers",
		desc: "Send money to anyone, anywhere in the world, instantly.",
		icon: "⚡",
		bg: "#FFF9F0",
	},
	{
		id: "3",
		title: "Secure Banking",
		desc: "Bank-grade security with multi-factor authentication.",
		icon: "🛡️",
		bg: "#F0FFF4",
	},
];

const OnboardingScreen = ({ navigation }: any) => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const flatListRef = useRef<FlatList>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems[0]) {
			setCurrentIndex(viewableItems[0].index);
		}
	}).current;

	const handleNext = async () => {
		if (currentIndex < DATA.length - 1) {
			flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
		} else {
			// SAVE: Mark onboarding as completed in AsyncStorage, means user already seen it they are not new user so they wont have to see it again, only new user sees it
			await AsyncStorage.setItem("hasSeenOnboarding", "true");
			navigation.replace("Welcome");
		}
	};

	const Paginator = () => {
		return (
			<View style={styles.paginatorContainer}>
				{DATA.map((_, i) => {
					const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

					const dotWidth = scrollX.interpolate({
						inputRange,
						outputRange: [10, 25, 10],
						extrapolate: "clamp",
					});

					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0.3, 1, 0.3],
						extrapolate: "clamp",
					});

					return (
						<Animated.View
							key={i.toString()}
							style={[styles.dot, { width: dotWidth, opacity }]}
						/>
					);
				})}
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.replace("Welcome")}
				style={styles.skipContainer}>
				<Text style={styles.skipText}>Skip</Text>
			</TouchableOpacity>

			<Animated.FlatList
				ref={flatListRef}
				data={DATA}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				onViewableItemsChanged={handleViewableItemsChanged}
				viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
				renderItem={({ item }) => (
					<View style={styles.slide}>
						<View style={[styles.iconBg, { backgroundColor: item.bg }]}>
							<Text style={styles.icon}>{item.icon}</Text>
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.desc}>{item.desc}</Text>
						</View>
					</View>
				)}
			/>

			<View style={styles.footer}>
				<Paginator />

				<TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
					<Text style={styles.nextBtnText}>
						{currentIndex === DATA.length - 1 ? "Get Started" : "Next"}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	skipContainer: { alignSelf: "flex-end", padding: 20 },
	skipText: { color: colors.textSecondary, fontSize: 16, fontWeight: "500" },
	slide: { width, alignItems: "center", padding: 20 },
	iconBg: {
		width: 280,
		height: 280,
		borderRadius: 140,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	icon: { fontSize: 100 },
	textContainer: { marginTop: 40, alignItems: "center" },
	title: {
		fontSize: 32,
		fontWeight: "800",
		color: colors.darkBlue,
		textAlign: "center",
		paddingHorizontal: 20,
	},
	desc: {
		fontSize: 16,
		color: colors.textSecondary,
		textAlign: "center",
		marginTop: 15,
		paddingHorizontal: 40,
		lineHeight: 24,
	},
	footer: {
		paddingHorizontal: 30,
		paddingBottom: 40,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	paginatorContainer: { flexDirection: "row", height: 64 },
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: colors.primary,
		marginHorizontal: 4,
		marginTop: 27,
	},
	nextBtn: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		paddingHorizontal: 35,
		borderRadius: 15,
		elevation: 5,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
	},
	nextBtnText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
});

export default OnboardingScreen;
