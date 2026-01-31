import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/common/toastMessage";
import Axiotance from "../../../config/Axiotance"; // Path to your Axiotance instance
import * as actionTypes from "../actionType/loginActionType";

export const loginUser = (credentials: any) => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.LOGIN_REQUEST });

		const res = await Axiotance.post("/FintechUsers/login", credentials);

		const userData = res.data;
		if (userData.token) {
			await AsyncStorage.setItem("jwtToken", userData.token);
			dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: userData });

			// Use the success message from backend if it exists, otherwise use fallback
			showToast("success", userData.message || "Welcome back!");
			return res;
		}
	} catch (err: any) {
		// 1. START WITH THE BACKEND ERROR
		// This looks for: err.response.data.message (standard for most APIs)
		let errorMessage = err.response?.data?.message;

		// 2. FALLBACK: If status is 401 but backend didn't send a message
		if (!errorMessage && err.response?.status === 401) {
			errorMessage = "Invalid email or password.";
		}

		// 3. FALLBACK: If there is no response at all (Network Error)
		if (!err.response) {
			errorMessage = "Network error. Please check your internet connection.";
		}

		// 4. FINAL FALLBACK: If everything else fails
		if (!errorMessage) {
			errorMessage = "Something went wrong. Please try again later.";
		}

		dispatch({ type: actionTypes.LOGIN_FAILURE, payload: errorMessage });

		// We show the toast here because we want the user to see the specific error
		showToast("error", errorMessage);

		return Promise.reject(err);
	}
};
