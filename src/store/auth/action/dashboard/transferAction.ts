import AsyncStorage from "@react-native-async-storage/async-storage";
import Axiotance from "../../../../config/Axiotance";
// FIX: Point to actionType file, not the reducer
import * as actionTypes from "../../actionType/dashboard/transferActionType";

// --- 2. P2P TRANSFERS ---

// 1. Verify Account
// export const verifyAccountNumber =
// 	(accountNumber: string) => async (dispatch: any) => {
// 		try {
// 			dispatch({ type: actionTypes.VERIFY_ACCOUNT_REQUEST });
// 			const jwtToken = await AsyncStorage.getItem("jwtToken");

// 			const res = await Axiotance.post(
// 				"/FintechTransactions/verify-account",
// 				{ accountNumber },
// 				{ headers: { Authorization: `Bearer ${jwtToken}` } }
// 			);

// 			dispatch({
// 				type: actionTypes.VERIFY_ACCOUNT_SUCCESS,
// 				payload: res.data.accountName,
// 			});
// 		} catch (err: any) {
// 			dispatch({
// 				type: actionTypes.VERIFY_ACCOUNT_FAILURE,
// 				payload: "Account not found",
// 			});
// 		}
// 	};
// actions/fintechActions.ts
export const verifyAccountNumber =
	(accountNumber: string, bankCode: string) => async (dispatch: any) => {
		try {
			dispatch({ type: actionTypes.VERIFY_ACCOUNT_REQUEST });
			const jwtToken = await AsyncStorage.getItem("jwtToken");

			const res = await Axiotance.post(
				"/FintechTransactions/verify-account",
				{ accountNumber, bankCode },
				{ headers: { Authorization: `Bearer ${jwtToken}` } }
			);

			dispatch({
				type: actionTypes.VERIFY_ACCOUNT_SUCCESS,
				payload: res.data.accountName,
			});
		} catch (err: any) {
			dispatch({
				type: actionTypes.VERIFY_ACCOUNT_FAILURE,
				payload: err.response?.data?.message || "Account not found",
			});
		}
	};

// 2. Send Money
export const sendMoney =
	(transferData: {
		accountNumber: string;
		amount: number;
		pin: string;
		recipientName?: string;
		description?: string;
	}) =>
	async (dispatch: any) => {
		try {
			// FIX: Destructure the values from transferData so they can be used below
			const { accountNumber, amount, pin, recipientName } = transferData;

			dispatch({ type: actionTypes.SEND_MONEY_REQUEST });
			const jwtToken = await AsyncStorage.getItem("jwtToken");

			const res = await Axiotance.post(
				"/FintechTransactions/transfer",
				{
					// MAP FRONTEND TO BACKEND NAMES HERE
					receiverAccountNumber: accountNumber,
					amount: amount,
					pin: pin,
					description: `Transfer to ${recipientName || "Recipient"}`,
				},
				{ headers: { Authorization: `Bearer ${jwtToken}` } }
			);

			dispatch({ type: actionTypes.SEND_MONEY_SUCCESS });

			// IMPORTANT: Based on your backend code:
			// res.data is the full object { status: true, data: { transactionId: ... } }
			// So we need res.data.data.transactionId
			return {
				success: true,
				transactionId:
					res.data?.data?.transactionId ||
					"TRX-" + Math.floor(Math.random() * 1000000),
			};
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || "Transfer failed";
			dispatch({ type: actionTypes.SEND_MONEY_FAILURE, payload: errorMsg });
			return { success: false, message: errorMsg };
		}
	};

export const getHistory = () => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.GET_TRANSACTIONS_REQUEST });
		const jwtToken = await AsyncStorage.getItem("jwtToken");

		const res = await Axiotance.get("/FintechTransactions/history", {
			headers: { Authorization: `Bearer ${jwtToken}` },
		});

		dispatch({
			type: actionTypes.GET_TRANSACTIONS_SUCCESS,
			payload: res.data, // This contains 'data' and 'pagination' from your backend
		});
	} catch (err: any) {
		dispatch({
			type: actionTypes.GET_TRANSACTIONS_FAILURE,
			payload: err.response?.data?.message || "Could not fetch history",
		});
	}
};

export const resetTransfer = () => ({ type: actionTypes.RESET_TRANSFER_STATE });
