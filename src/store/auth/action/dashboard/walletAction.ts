import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../../components/common/toastMessage";
import Axiotance from "../../../../config/Axiotance";
import * as actionTypes from "../../actionType/dashboard/walletActionType";

// --- 1. WALLET & HISTORY ---
export const getWalletDetails = () => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.GET_WALLET_REQUEST });

		const jwtToken = await AsyncStorage.getItem("jwtToken");

		// Hits your 'fundWallet' or general wallet info endpoint
		const res = await Axiotance.get("/FintechTransactions/wallet-info", {
			headers: { Authorization: `Bearer ${jwtToken}` },
		});

		dispatch({
			type: actionTypes.GET_WALLET_SUCCESS,
			payload: res.data,
		});
	} catch (err: any) {
		const errorMessage =
			err.response?.data?.message || "Could not load wallet details";
		dispatch({ type: actionTypes.GET_WALLET_FAILURE, payload: errorMessage });
		showToast("error", errorMessage);
	}
};

export const getTransactionHistory =
	(page = 1, search = "") =>
	async (dispatch: any) => {
		try {
			dispatch({ type: actionTypes.GET_TRANSACTIONS_REQUEST });
			const jwtToken = await AsyncStorage.getItem("jwtToken");

			// Your backend uses query params for search and pagination
			const res = await Axiotance.get(
				`/FintechTransactions/history?page=${page}&search=${search}`,
				{
					headers: { Authorization: `Bearer ${jwtToken}` },
				}
			);

			dispatch({
				type: actionTypes.GET_TRANSACTIONS_SUCCESS,
				payload: res.data.data, // Accessing the 'data' array from your response
			});
		} catch (err: any) {
			dispatch({
				type: actionTypes.GET_TRANSACTIONS_FAILURE,
				payload: err.response?.data?.message || "Error fetching history",
			});
		}
	};

// --- 4. SECURITY & PROFILE ---
// we dont need to dispatch the pin setting states to redux as its a one time action so we just live it to be saved in the backend
export const setTransactionPin = (pin: string) => async () => {
	try {
		const jwtToken = await AsyncStorage.getItem("jwtToken");
		const res = await Axiotance.post(
			"FintechUsers/set-transaction-pin",
			{ pin },
			{ headers: { Authorization: `Bearer ${jwtToken}` } }
		);
		return { success: true, message: res.data.message };
	} catch (err: any) {
		return {
			success: false,
			message: err.response?.data?.message || "Failed to set PIN",
		};
	}
};

// --- 3. BILLS & UTILITIES ---
export const buyAirtimeAction =
	(payload: {
		phoneNumber: string;
		amount: number;
		network: string;
		pin: string;
	}) =>
	async (dispatch: any) => {
		try {
			dispatch({ type: actionTypes.BUY_AIRTIME_REQUEST });
			const jwtToken = await AsyncStorage.getItem("jwtToken");

			const res = await Axiotance.post("/FintechBills/buy-airtime", payload, {
				headers: { Authorization: `Bearer ${jwtToken}` },
			});

			dispatch({ type: actionTypes.BUY_AIRTIME_SUCCESS });

			// PRODUCTION TIP: Dispatch a balance update so the Home screen reflects the new balance
			// dispatch({ type: "UPDATE_WALLET_BALANCE", payload: res.data.data.balance });

			return { success: true, message: res.data.message };
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || "Airtime purchase failed";
			dispatch({ type: actionTypes.BUY_AIRTIME_FAILURE, payload: errorMsg });
			return { success: false, message: errorMsg };
		}
	};

export const buyElectricityAction =
	(payload: {
		meterNumber: string;
		amount: number;
		provider: string;
		pin: string;
	}) =>
	async (dispatch: any) => {
		try {
			dispatch({ type: actionTypes.BUY_ELECTRICITY_REQUEST });
			const jwtToken = await AsyncStorage.getItem("jwtToken");

			const res = await Axiotance.post(
				"/FintechBills/buy-electricity",
				payload,
				{
					headers: { Authorization: `Bearer ${jwtToken}` },
				}
			);

			dispatch({ type: actionTypes.BUY_ELECTRICITY_SUCCESS });

			// We return the data which includes the simulated token from your backend
			return { success: true, message: res.data.message, data: res.data.data };
		} catch (err: any) {
			const errorMsg =
				err.response?.data?.message || "Electricity purchase failed";
			dispatch({
				type: actionTypes.BUY_ELECTRICITY_FAILURE,
				payload: errorMsg,
			});
			return { success: false, message: errorMsg };
		}
	};

export const buyDataAction =
	(payload: {
		phoneNumber: string;
		amount: number;
		network: string;
		dataPlan: string; // The description of the plan (e.g., "1GB - 30 Days")
		pin: string;
	}) =>
	async (dispatch: any) => {
		try {
			dispatch({ type: actionTypes.BUY_AIRTIME_REQUEST }); // Reusing loading states for bills
			const jwtToken = await AsyncStorage.getItem("jwtToken");

			const res = await Axiotance.post("/FintechBills/buy-airtime", payload, {
				headers: { Authorization: `Bearer ${jwtToken}` },
			});

			dispatch({ type: actionTypes.BUY_AIRTIME_SUCCESS });
			return { success: true, message: "Data top-up successful!" };
		} catch (err: any) {
			dispatch({ type: actionTypes.BUY_AIRTIME_FAILURE });
			return {
				success: false,
				message: err.response?.data?.message || "Data purchase failed",
			};
		}
	};

// --- 5. SUPPORT TICKETS ---
export const createSupportTicket =
	(ticketData: { subject: string; message: string; priority: string }) =>
	async (dispatch: any) => {
		try {
			const jwtToken = await AsyncStorage.getItem("jwtToken");
			const res = await Axiotance.post(
				"/FintechTransactions/create-ticket",
				ticketData,
				{
					headers: { Authorization: `Bearer ${jwtToken}` },
				}
			);
			return { success: true, data: res.data };
		} catch (err: any) {
			return { success: false, message: "Could not submit ticket" };
		}
	};
