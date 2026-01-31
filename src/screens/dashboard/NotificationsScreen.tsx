import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { colors } from "../../theme/colors";

const NotificationsScreen = ({ navigation }: any) => {
	const { data } = useAppSelector((state) => state.dashboard);
	const notifications = data?.notifications || [];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name='arrow-back' size={24} color={colors.darkBlue} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Notifications</Text>
				<View style={{ width: 24 }} />
			</View>

			{notifications.length > 0 ? (
				<FlatList
					data={notifications}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => (
						<View style={styles.notifItem}>
							<Text style={styles.notifText}>
								{item.message || "New Update"}
							</Text>
						</View>
					)}
				/>
			) : (
				<View style={styles.emptyState}>
					<Ionicons
						name='notifications-off-outline'
						size={64}
						color={colors.border}
					/>
					<Text style={styles.emptyText}>No notifications yet</Text>
				</View>
			)}
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
	notifItem: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	notifText: { fontSize: 14, color: colors.darkBlue },
	emptyState: { flex: 1, justifyContent: "center", alignItems: "center" },
	emptyText: { marginTop: 10, color: colors.textSecondary, fontSize: 16 },
});

export default NotificationsScreen;
