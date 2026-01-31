import { showToast } from "../../../components/common/toastMessage";
import Axiotance from "../../../config/Axiotance";
import { AppDispatch } from "../../../store/auth/store";
import * as actionTypes from "../actionType/verificationActionType";

// If your backend needs the email too, pass it here
export const verifyUser =
	(otp: string, email?: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({ type: actionTypes.VERIFICATION_REQUEST });

			// Check if backend expects just { otp } or { email, otp }
			const payload = email
				? { email: email.toLowerCase().trim(), otp }
				: { otp };

			const res = await Axiotance.post("/FintechUsers/verify-otp", payload);

			dispatch({
				type: actionTypes.VERIFICATION_SUCCESS,
				payload: res.data,
			});

			showToast("success", res.data?.message || "Verification successful!");
			return res;
		} catch (err: any) {
			// Use the backend message (e.g., "OTP has expired")
			const errorMessage =
				err.response?.data?.message ||
				err.response?.data?.error ||
				"Verification failed. Please try again.";

			dispatch({
				type: actionTypes.VERIFICATION_FAILURE,
				payload: errorMessage,
			});

			showToast("error", errorMessage);
			throw err;
		}
	};
