import { showToast } from "../../../../components/common/toastMessage";
import Axiotance from "../../../../config/Axiotance";
import * as actionTypes from "../../actionType/dashboard/dashboardActionType";

export const getUserDashboard = () => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.GET_DASHBOARD_REQUEST });

		// Retrieve token for the request
		// const jwtToken = await AsyncStorage.getItem("jwtToken");

		const res = await Axiotance.get(
			"/FintechUsers/dashboard"
			// 	 {
			// 	headers: {
			// 		Authorization: `Bearer ${jwtToken}`,
			// 	},
			// }
		);

		const dashboardData = res.data.data;

		dispatch({
			type: actionTypes.GET_DASHBOARD_SUCCESS,
			payload: dashboardData,
		});

		// We don't usually show a toast for a successful background fetch
		// unless it's a manual refresh to keep the UI clean.
		return res;
	} catch (err: any) {
		let errorMessage = err.response?.data?.message;

		if (!err.response) {
			errorMessage = "Network error. Could not update dashboard.";
		}

		if (!errorMessage) {
			errorMessage = "Failed to fetch dashboard data.";
		}

		dispatch({
			type: actionTypes.GET_DASHBOARD_FAILURE,
			payload: errorMessage,
		});

		// Only show toast if it's a critical failure
		showToast("error", errorMessage);

		return Promise.reject(err);
	}
};
