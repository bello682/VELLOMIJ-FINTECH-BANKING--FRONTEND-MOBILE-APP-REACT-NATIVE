import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { getUserTickets } from "../../store/auth/action/dashboard/supportAction";
import { colors } from "../../theme/colors";

const HelpCenterScreen = ({ navigation }: any) => {
	const dispatch = useDispatch();
	const { tickets, loading } = useAppSelector((state) => state.supportState);

	useEffect(() => {
		dispatch(getUserTickets() as any);
	}, []);

	const getStatusStyle = (status: string) => {
		switch (status) {
			case "RESOLVED":
				return { bg: "#EFFFF4", text: "#27AE60" };
			case "OPEN":
				return { bg: "#FFF9E6", text: "#F2994A" };
			default:
				return { bg: colors.surface, text: colors.textSecondary };
		}
	};

	const renderTicket = ({ item }: any) => {
		const status = getStatusStyle(item.status);
		return (
			<View style={styles.ticketCard}>
				<View style={styles.ticketHeader}>
					<Text style={styles.subject}>{item.subject}</Text>
					<View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
						<Text style={[styles.statusText, { color: status.text }]}>
							{item.status}
						</Text>
					</View>
				</View>
				<Text style={styles.message} numberOfLines={2}>
					{item.message}
				</Text>
				{item.adminReply && (
					<View style={styles.replyBox}>
						<Text style={styles.replyLabel}>Support Reply:</Text>
						<Text style={styles.replyText}>{item.adminReply}</Text>
					</View>
				)}
				<Text style={styles.date}>
					{new Date(item.createdAt).toLocaleDateString()}
				</Text>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name='chevron-back' size={28} color={colors.darkBlue} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Support Tickets</Text>
				<View style={{ width: 28 }} />
			</View>

			{loading ? (
				<ActivityIndicator
					size='large'
					color={colors.primary}
					style={{ marginTop: 50 }}
				/>
			) : (
				<FlatList
					data={tickets}
					keyExtractor={(item) => item.id}
					renderItem={renderTicket}
					contentContainerStyle={{ padding: 20 }}
					ListEmptyComponent={
						<Text style={styles.emptyText}>You have no support tickets.</Text>
					}
				/>
			)}

			<TouchableOpacity
				style={styles.fab}
				onPress={() => navigation.navigate("ChatSupportScreen")}>
				<Ionicons name='add' size={30} color={colors.white} />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.white },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
	headerTitle: { fontSize: 20, fontWeight: "800", color: colors.darkBlue },
	ticketCard: {
		padding: 15,
		borderRadius: 15,
		backgroundColor: colors.white,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: colors.border,
	},
	ticketHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	subject: { fontSize: 16, fontWeight: "700", color: colors.darkBlue, flex: 1 },
	statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
	statusText: { fontSize: 10, fontWeight: "800" },
	message: { fontSize: 14, color: colors.textSecondary, marginBottom: 10 },
	replyBox: {
		backgroundColor: colors.surface,
		padding: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	replyLabel: { fontSize: 12, fontWeight: "700", color: colors.primary },
	replyText: { fontSize: 13, color: colors.darkBlue },
	date: { fontSize: 11, color: colors.border, marginTop: 10 },
	fab: {
		position: "absolute",
		bottom: 30,
		right: 30,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
	},
	emptyText: {
		textAlign: "center",
		marginTop: 50,
		color: colors.textSecondary,
	},
});

export default HelpCenterScreen;
