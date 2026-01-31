// fetchUserByIdAction.js
import axios from "axios";
import * as actionTypes from "../actionType/fetchUserByIdActionType";
import { showToast } from "../../component/toastMessage";

export const fetchUserById = (userID) => async (dispatch) => {
	if (!userID) {
		dispatch({
			type: actionTypes.FETCH_USER_BY_ID_FAILURE,
			payload: "Invalid user ID",
		});
		return;
	}
	try {
		dispatch({ type: actionTypes.FETCH_USER_BY_ID_REQUEST });

		// Make the request to fetch user by ID
		const res = await axios.get(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/user/${userID}`
		);

		dispatch({
			type: actionTypes.FETCH_USER_BY_ID_SUCCESS,
			payload: res?.data, // Assuming the user data is in `data.data`
		});
	} catch (err) {
		// Dispatch failure action with error message from server response
		dispatch({
			type: actionTypes.FETCH_USER_BY_ID_FAILURE,
			payload: err.response?.data?.message || "Error fetching user",
		});

		// Show error toast message after failed user fetch
		showToast("error", err.response?.data?.message || "Error fetching user");
	}
};
