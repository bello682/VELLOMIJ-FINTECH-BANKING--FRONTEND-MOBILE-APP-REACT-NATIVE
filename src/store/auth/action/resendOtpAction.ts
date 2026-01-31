import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/common/toastMessage";
import Axiotance from "../../../config/Axiotance";
import { AppDispatch } from "../../../store/auth/store";
import * as actionTypes from "../actionType/resendOtpActionType";

export const resendOtpUser =
	(email: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({ type: actionTypes.OTP_RESEND_REQUEST });

			// Keep this! It's good practice to send clean data.
			const formattedEmail = email.toLowerCase().trim();

			const res = await Axiotance.post("/FintechUsers/resend-otp", {
				email: formattedEmail,
			});

			dispatch({
				type: actionTypes.OTP_RESEND_SUCCESS,
				payload: res.data,
			});

			const token = res.data?.token;
			if (token) {
				await AsyncStorage.setItem("jwtToken", token);
			}

			showToast("success", res.data?.message || "OTP sent successfully.");
			return res;
		} catch (err: any) {
			const errorMessage =
				err.response?.data?.message || "Network Error, please try again!";
			dispatch({
				type: actionTypes.OTP_RESEND_FAILURE,
				payload: errorMessage,
			});
			showToast("error", errorMessage);
			throw err;
		}
	};
