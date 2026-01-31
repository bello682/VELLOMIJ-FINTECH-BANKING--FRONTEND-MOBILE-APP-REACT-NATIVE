import Axiotance from "@/src/config/Axiotance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/common/toastMessage"; // For showing toast notifications
import * as actionTypes from "../actionType/deleteUserActionType";

// src/store/auth/action/deleteUserAction.ts

export const deleteUserAccount = (userID: string) => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.DELETE_USER_REQUEST });

		const jwtToken = await AsyncStorage.getItem("jwtToken");

		// This hits the new Soft Delete endpoint
		const res = await Axiotance.delete(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/user/${userID}`,
			{ headers: { Authorization: `Bearer ${jwtToken}` } }
		);

		// CLEAR REDUX AND STORAGE
		dispatch({ type: actionTypes.DELETE_USER_SUCCESS });
		dispatch({ type: "LOGOUT" }); // Trigger a global logout action

		await AsyncStorage.multiRemove(["jwtToken", "user"]);

		showToast("success", "Account closed successfully.");
		return true;
	} catch (err: any) {
		dispatch({
			type: actionTypes.DELETE_USER_FAILURE,
			payload: err.response?.data?.message || "Error",
		});
		return false;
	}
};
