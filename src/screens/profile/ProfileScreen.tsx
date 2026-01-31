// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import {
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch } from "react-redux";
// import { useAppSelector } from "../../hooks/useTypedSelector";
// import { AppDispatch } from "../../store/auth/store";
// import { colors } from "../../theme/colors";

// // IMPORT LOGOUT ASSETS
// import LogoutModal from "../../components/common/LogoutModal";
// import { logoutUser } from "../../store/auth/action/logoutAction";

// const ProfileScreen = ({ navigation }: any) => {
// 	const dispatch = useDispatch<AppDispatch>();

// 	// Selectors - This pulls directly from your database-synced Redux state
// 	const { user } = useAppSelector((state) => state.loginState);
// 	const { loading_now } = useAppSelector((state) => state.logout);

// 	// Local State for Modal
// 	const [isModalVisible, setIsModalVisible] = useState(false);

// 	const handleLogoutPress = () => {
// 		setIsModalVisible(true);
// 	};

// 	const confirmLogout = async () => {
// 		try {
// 			await dispatch(logoutUser());
// 		} catch (error) {
// 			setIsModalVisible(false);
// 		} finally {
// 			setIsModalVisible(false);
// 		}
// 	};

// 	// Determine if user has a PIN already to change the menu label
// 	const hasPin = !!user?.transactionPin;

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<ScrollView contentContainerStyle={styles.content}>
// 				{/* Profile Header - Data comes from 'user' object */}
// 				<View style={styles.profileHeader}>
// 					<View style={styles.avatarContainer}>
// 						<Text style={styles.avatarText}>
// 							{user?.fullName?.charAt(0).toUpperCase() || "U"}
// 						</Text>
// 					</View>
// 					<Text style={styles.userName}>{user?.fullName || "User Name"}</Text>
// 					<Text style={styles.userEmail}>
// 						{user?.email || "user@example.com"}
// 					</Text>

// 					<TouchableOpacity style={styles.editBtn}>
// 						<Text style={styles.editBtnText}>Edit Profile</Text>
// 					</TouchableOpacity>
// 				</View>

// 				{/* Menu Items */}
// 				<View style={styles.menuSection}>
// 					<MenuItem
// 						icon='person-outline'
// 						label='Account Information'
// 						onPress={() => {}}
// 					/>

// 					{/* Transaction PIN Option */}
// 					<MenuItem
// 						icon='keypad-outline'
// 						label={hasPin ? "Change Transaction PIN" : "Set Transaction PIN"}
// 						onPress={() => navigation.navigate("SetPin")}
// 					/>

// 					<MenuItem
// 						icon='shield-checkmark-outline'
// 						label='Security & Biometrics'
// 						onPress={() => {}}
// 					/>

// 					<MenuItem
// 						icon='notifications-outline'
// 						label='Notifications'
// 						onPress={() => {}}
// 					/>
// 					<MenuItem
// 						icon='help-circle-outline'
// 						label='Help & Support'
// 						onPress={() => {}}
// 					/>

// 					{/* Delete Account Navigation */}
// 					<TouchableOpacity
// 						style={[styles.menuItem, { borderBottomWidth: 0 }]}
// 						onPress={() => navigation.navigate("DeleteAccount")}>
// 						<View style={[styles.menuIconBg, { backgroundColor: "#FFF5F5" }]}>
// 							<Ionicons name='trash-outline' size={22} color={colors.error} />
// 						</View>
// 						<Text style={[styles.menuLabel, { color: colors.error }]}>
// 							Delete Account
// 						</Text>
// 						<Ionicons
// 							name='chevron-forward'
// 							size={20}
// 							color={colors.textSecondary}
// 						/>
// 					</TouchableOpacity>
// 				</View>

// 				{/* Logout Button */}
// 				<TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress}>
// 					<Ionicons name='log-out-outline' size={22} color={colors.error} />
// 					<Text style={styles.logoutText}>Log Out</Text>
// 				</TouchableOpacity>

// 				<Text style={styles.versionText}>Version 1.0.0 (Production)</Text>
// 			</ScrollView>

// 			<LogoutModal
// 				visible={isModalVisible}
// 				onClose={() => setIsModalVisible(false)}
// 				onConfirm={confirmLogout}
// 				isLoading={loading_now}
// 			/>
// 		</SafeAreaView>
// 	);
// };

// // Helper Component for Menu Items
// const MenuItem = ({ icon, label, onPress }: any) => (
// 	<TouchableOpacity style={styles.menuItem} onPress={onPress}>
// 		<View style={styles.menuIconBg}>
// 			<Ionicons name={icon} size={22} color={colors.primary} />
// 		</View>
// 		<Text style={styles.menuLabel}>{label}</Text>
// 		<Ionicons name='chevron-forward' size={20} color={colors.textSecondary} />
// 	</TouchableOpacity>
// );

// const styles = StyleSheet.create({
// 	container: { flex: 1, backgroundColor: colors.white },
// 	content: { padding: 20 },
// 	profileHeader: { alignItems: "center", marginVertical: 30 },
// 	avatarContainer: {
// 		width: 100,
// 		height: 100,
// 		borderRadius: 50,
// 		backgroundColor: colors.surface,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		borderWidth: 4,
// 		borderColor: colors.border,
// 	},
// 	avatarText: { fontSize: 40, fontWeight: "bold", color: colors.primary },
// 	userName: {
// 		fontSize: 22,
// 		fontWeight: "bold",
// 		color: colors.darkBlue,
// 		marginTop: 15,
// 	},
// 	userEmail: { fontSize: 14, color: colors.textSecondary, marginTop: 5 },
// 	editBtn: {
// 		marginTop: 15,
// 		paddingHorizontal: 20,
// 		paddingVertical: 8,
// 		borderRadius: 20,
// 		backgroundColor: colors.primary + "10",
// 	},
// 	editBtnText: { color: colors.primary, fontWeight: "600" },
// 	menuSection: { marginTop: 20 },
// 	menuItem: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		paddingVertical: 15,
// 		borderBottomWidth: 1,
// 		borderBottomColor: colors.border,
// 	},
// 	menuIconBg: {
// 		width: 40,
// 		height: 40,
// 		borderRadius: 12,
// 		backgroundColor: colors.surface,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		marginRight: 15,
// 	},
// 	menuLabel: {
// 		flex: 1,
// 		fontSize: 16,
// 		color: colors.darkBlue,
// 		fontWeight: "500",
// 	},
// 	logoutBtn: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		marginTop: 40,
// 		padding: 15,
// 		borderRadius: 16,
// 		backgroundColor: colors.error + "10",
// 	},
// 	logoutText: {
// 		color: colors.error,
// 		fontSize: 16,
// 		fontWeight: "bold",
// 		marginLeft: 10,
// 	},
// 	versionText: {
// 		textAlign: "center",
// 		color: colors.textSecondary,
// 		marginTop: 30,
// 		fontSize: 12,
// 	},
// });

// export default ProfileScreen;

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";

import LogoutModal from "../../components/common/LogoutModal";
import { logoutUser } from "../../store/auth/action/logoutAction";

const ProfileScreen = ({ navigation }: any) => {
	const dispatch = useDispatch<AppDispatch>();

	// 1. IMPROVED SELECTORS
	// We check both loginState and dashboardState to ensure we get the data
	const loginUser = useAppSelector((state) => state.loginState);
	const dashboardUser = useAppSelector((state) => state.dashboard);

	// Merge them: Priority to dashboard data (often more up-to-date), fallback to login
	const user =
		dashboardUser.data?.user || loginUser.user?.user || loginUser.user;

	// console.log("User Data:", JSON.stringify(user, null, 2));

	const { loading_now } = useAppSelector((state) => state.logout);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleLogoutPress = () => {
		setIsModalVisible(true);
	};

	const confirmLogout = async () => {
		try {
			await dispatch(logoutUser());
		} catch (error) {
			setIsModalVisible(false);
		} finally {
			setIsModalVisible(false);
		}
	};

	const hasPin = !!user?.transactionPin;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.content}>
				{/* Profile Header */}
				<View style={styles.profileHeader}>
					<View style={styles.avatarContainer}>
						<Text style={styles.avatarText}>
							{/* logic to handle first letter safely */}
							{user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
						</Text>
					</View>

					{/* 2. DYNAMIC TEXT RENDERING */}
					<Text style={styles.userName}>{user?.fullName || "Loading..."}</Text>
					<Text style={styles.userEmail}>{user?.email || "..."}</Text>

					<TouchableOpacity style={styles.editBtn}>
						<Text style={styles.editBtnText}>Edit Profile</Text>
					</TouchableOpacity>
				</View>

				{/* Menu Items */}
				<View style={styles.menuSection}>
					<MenuItem
						icon='person-outline'
						label='Account Information'
						onPress={() => {}}
					/>

					<MenuItem
						icon='keypad-outline'
						label={hasPin ? "Change Transaction PIN" : "Set Transaction PIN"}
						onPress={() => navigation.navigate("SetPin")}
					/>

					<MenuItem
						icon='shield-checkmark-outline'
						label='Security & Biometrics'
						onPress={() => {}}
					/>

					<MenuItem
						icon='notifications-outline'
						label='Notifications'
						onPress={() => {}}
					/>
					<MenuItem
						icon='help-circle-outline'
						label='Help & Support'
						onPress={() => {}}
					/>

					<TouchableOpacity
						style={[styles.menuItem, { borderBottomWidth: 0 }]}
						onPress={() => navigation.navigate("DeleteAccount")}>
						<View style={[styles.menuIconBg, { backgroundColor: "#FFF5F5" }]}>
							<Ionicons name='trash-outline' size={22} color={colors.error} />
						</View>
						<Text style={[styles.menuLabel, { color: colors.error }]}>
							Delete Account
						</Text>
						<Ionicons
							name='chevron-forward'
							size={20}
							color={colors.textSecondary}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress}>
					<Ionicons name='log-out-outline' size={22} color={colors.error} />
					<Text style={styles.logoutText}>Log Out</Text>
				</TouchableOpacity>

				<Text style={styles.versionText}>Version 1.0.0 (Production)</Text>
			</ScrollView>

			<LogoutModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onConfirm={confirmLogout}
				isLoading={loading_now}
			/>
		</SafeAreaView>
	);
};

const MenuItem = ({ icon, label, onPress }: any) => (
	<TouchableOpacity style={styles.menuItem} onPress={onPress}>
		<View style={styles.menuIconBg}>
			<Ionicons name={icon} size={22} color={colors.primary} />
		</View>
		<Text style={styles.menuLabel}>{label}</Text>
		<Ionicons name='chevron-forward' size={20} color={colors.textSecondary} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	content: { padding: 20 },
	profileHeader: { alignItems: "center", marginVertical: 30 },
	avatarContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: colors.surface,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 4,
		borderColor: colors.border,
	},
	avatarText: { fontSize: 40, fontWeight: "bold", color: colors.primary },
	userName: {
		fontSize: 22,
		fontWeight: "bold",
		color: colors.darkBlue,
		marginTop: 15,
		textTransform: "capitalize", // Good for displaying names
	},
	userEmail: { fontSize: 14, color: colors.textSecondary, marginTop: 5 },
	editBtn: {
		marginTop: 15,
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: colors.primary + "10",
	},
	editBtnText: { color: colors.primary, fontWeight: "600" },
	menuSection: { marginTop: 20 },
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	menuIconBg: {
		width: 40,
		height: 40,
		borderRadius: 12,
		backgroundColor: colors.surface,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 15,
	},
	menuLabel: {
		flex: 1,
		fontSize: 16,
		color: colors.darkBlue,
		fontWeight: "500",
	},
	logoutBtn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		padding: 15,
		borderRadius: 16,
		backgroundColor: colors.error + "10",
	},
	logoutText: {
		color: colors.error,
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 10,
	},
	versionText: {
		textAlign: "center",
		color: colors.textSecondary,
		marginTop: 30,
		fontSize: 12,
	},
});

export default ProfileScreen;
