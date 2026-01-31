import * as actionTypes from "../../actionType/dashboard/transferActionType";

export interface TransferState {
	loading_verify: boolean;
	loading_send: boolean;
	loading_history: boolean; // Added for history loading
	verifiedName: string | null;
	error: string | null;
	success: boolean;
	transactions: any[]; // Added to store the list
	pagination: {
		// Added to handle backend pagination
		currentPage: number;
		totalPages: number;
		totalItems: number;
	} | null;
}

const initialState: TransferState = {
	loading_verify: false,
	loading_send: false,
	loading_history: false,
	verifiedName: null,
	error: null,
	success: false,
	transactions: [],
	pagination: null,
};

const transferReducer = (state = initialState, action: any): TransferState => {
	switch (action.type) {
		// ... (Keep your VERIFY_ACCOUNT cases exactly as they are)
		case actionTypes.VERIFY_ACCOUNT_REQUEST:
			return {
				...state,
				loading_verify: true,
				verifiedName: null,
				error: null,
			};
		case actionTypes.VERIFY_ACCOUNT_SUCCESS:
			return { ...state, loading_verify: false, verifiedName: action.payload };
		case actionTypes.VERIFY_ACCOUNT_FAILURE:
			return { ...state, loading_verify: false, error: action.payload };

		// ... (Keep your SEND_MONEY cases exactly as they are)
		case actionTypes.SEND_MONEY_REQUEST:
			return { ...state, loading_send: true, error: null, success: false };
		case actionTypes.SEND_MONEY_SUCCESS:
			return { ...state, loading_send: false, success: true, error: null };
		case actionTypes.SEND_MONEY_FAILURE:
			return {
				...state,
				loading_send: false,
				error: action.payload,
				success: false,
			};

		// --- NEW: TRANSACTION HISTORY CASES ---
		case actionTypes.GET_TRANSACTIONS_REQUEST:
			return { ...state, loading_history: true, error: null };

		case actionTypes.GET_TRANSACTIONS_SUCCESS:
			return {
				...state,
				loading_history: false,
				transactions: action.payload.data, // Matching your backend 'data' key
				pagination: action.payload.pagination, // Matching your backend 'pagination' key
			};

		case actionTypes.GET_TRANSACTIONS_FAILURE:
			return { ...state, loading_history: false, error: action.payload };

		case actionTypes.RESET_TRANSFER_STATE:
			return initialState;

		default:
			return state;
	}
};

export default transferReducer;
