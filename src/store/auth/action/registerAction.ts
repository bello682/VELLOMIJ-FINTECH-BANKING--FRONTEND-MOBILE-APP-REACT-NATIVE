import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/common/toastMessage";
import Axiotance from "../../../config/Axiotance";
import { AppDispatch } from "../../../store/auth/store";
import * as actionTypes from "../actionType/registerActionType";

export const register = (userData: any) => async (dispatch: AppDispatch) => {
	try {
		dispatch({ type: actionTypes.REGISTRATION_REQUEST });

		// Axiotance handles the BaseURL automatically from your config
		const res = await Axiotance.post("/FintechUsers/register", userData);

		dispatch({
			type: actionTypes.REGISTRATION_SUCCESS,
			payload: res.data,
		});

		// 1. Prioritize saving the token if returned upon registration
		const token = res.data?.token;
		if (token) {
			await AsyncStorage.setItem("jwtToken", token);
		}

		// 2. Use the exact success message from your Backend
		showToast("success", res.data?.message || "Registration successful!");

		return res;
	} catch (err: any) {
		// 3. Extract the Backend Error Message
		// Covers cases where backend sends { message: "Email already exists" }
		const errorMessage =
			err.response?.data?.message ||
			err.response?.data?.error ||
			"Network Error, please check your connection.";

		dispatch({
			type: actionTypes.REGISTRATION_FAILURE,
			payload: errorMessage,
		});

		// 4. Show the specific backend error in the toast
		showToast("error", errorMessage);

		throw err;
	}
};
