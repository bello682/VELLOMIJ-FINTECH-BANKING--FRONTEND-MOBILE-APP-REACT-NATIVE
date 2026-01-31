// logoutAction.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/common/toastMessage";
import Axiotance from "../../../config/Axiotance";
import * as actionTypes from "../actionType/logoutActionType";

export const logoutUser = () => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.LOGOUT_REQUEST });

		// 1. Get the token BEFORE you delete it
		const jwtToken = await AsyncStorage.getItem("jwtToken");

		// 2. Make the API call WITH the token manually
		// We use axios directly or ensure Axiotance hasn't cleared it yet
		await Axiotance.post(
			"/FintechUsers/logout",
			{},
			{
				headers: { Authorization: `Bearer ${jwtToken}` },
			}
		).catch(() => {
			// Silence background errors so the interceptor doesn't trip
			console.log("Server already cleared or silent error.");
		});
	} catch (err) {
		console.log("Logout request failed");
	} finally {
		// 3. ALWAYS clear storage LAST
		await AsyncStorage.multiRemove(["jwtToken", "user", "userId"]);
		await AsyncStorage.removeItem("hasSeenOnboarding");

		dispatch({ type: actionTypes.LOGOUT_SUCCESS });
		showToast("success", "Logged out successfully");
	}
};
