import AsyncStorage from "@react-native-async-storage/async-storage";
import Axiotance from "../../../../config/Axiotance";
import * as actionTypes from "../../actionType/dashboard/supportActionType";

// Fetch all tickets for the logged-in user
export const getUserTickets = () => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.GET_TICKETS_REQUEST });
		const jwtToken = await AsyncStorage.getItem("jwtToken");

		const res = await Axiotance.get("/FintechSupport/my-tickets", {
			headers: { Authorization: `Bearer ${jwtToken}` },
		});

		dispatch({
			type: actionTypes.GET_TICKETS_SUCCESS,
			payload: res.data.tickets, // Matches your backend { success: true, tickets }
		});
	} catch (err: any) {
		dispatch({
			type: actionTypes.GET_TICKETS_FAILURE,
			payload: err.response?.data?.message || "Failed to load tickets",
		});
	}
};

// Create a new ticket
export const createTicket =
	(ticketData: { subject: string; message: string; priority: string }) =>
	async (dispatch: any) => {
		try {
			dispatch({ type: actionTypes.CREATE_TICKET_REQUEST });
			const jwtToken = await AsyncStorage.getItem("jwtToken");

			const res = await Axiotance.post("/FintechSupport/create", ticketData, {
				headers: { Authorization: `Bearer ${jwtToken}` },
			});

			dispatch({ type: actionTypes.CREATE_TICKET_SUCCESS });
			return { success: true, message: res.data.message };
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || "Failed to create ticket";
			dispatch({ type: actionTypes.CREATE_TICKET_FAILURE, payload: errorMsg });
			return { success: false, message: errorMsg };
		}
	};
