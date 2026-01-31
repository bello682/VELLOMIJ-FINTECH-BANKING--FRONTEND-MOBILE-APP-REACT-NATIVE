import { showToast } from "../../../components/common/toastMessage";
import Axiotance from "../../../config/Axiotance";
import { AppDispatch } from "../../../store/auth/store";
import * as actionTypes from "../actionType/forgetPasswordActionType";

export const forgetUserPassword =
	(email: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({ type: actionTypes.FORGET_PASSWORD_REQUEST });

			// Normalize email to match your lowercase database entries
			const cleanEmail = email.toLowerCase().trim();

			const res = await Axiotance.post(
				`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/forgot-password`,
				{ email: cleanEmail },
				{ headers: { "Content-Type": "application/json" } }
			);

			dispatch({
				type: actionTypes.FORGET_PASSWORD_SUCCESS,
				payload: res.data.message, // Fixed: use res.data.message
			});

			showToast("success", res.data.message);
			return true;
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || "Network Error";
			dispatch({
				type: actionTypes.FORGET_PASSWORD_FAIL,
				payload: errorMessage,
			});
			showToast("error", errorMessage);
			return false;
		}
	};
