import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { showToast } from "../../../components/common/toastMessage";
import Axiotance from "../../../config/Axiotance";
import * as actionTypes from "../actionType/kycUser.ActionType";
import { AppDispatch } from "../store"; // Adjust path to your store

export const updateKyc =
	(formData: FormData) => async (dispatch: AppDispatch) => {
		try {
			dispatch({ type: actionTypes.KYC_UPDATE_REQUEST });

			const token = await AsyncStorage.getItem("jwtToken");
			if (!token) throw new Error("No token found");

			const decoded: any = jwtDecode(token);
			const userId = decoded?.userId || decoded?.id;

			const res = await Axiotance.patch(
				`/FintechUsers/users/${userId}/update-kyc`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch({
				type: actionTypes.KYC_UPDATE_SUCCESS,
				payload: res.data,
			});

			showToast("success", "KYC submitted successfully!");
			return res;
		} catch (err: any) {
			const errorMessage =
				err.response?.data?.message || "KYC submission failed";
			dispatch({ type: actionTypes.KYC_UPDATE_FAILURE, payload: errorMessage });
			showToast("error", errorMessage);
			throw err;
		}
	};
