import * as actionTypes from "../../actionType/dashboard/walletActionType";

export interface WalletState {
	loading_now: boolean;
	walletData: any | null;
	transactions: any[];
	error: string | null;
}

const initialState: WalletState = {
	loading_now: false,
	walletData: null,
	transactions: [],
	error: null,
};

const walletReducer = (state = initialState, action: any): WalletState => {
	switch (action.type) {
		case actionTypes.GET_WALLET_REQUEST:
			return { ...state, loading_now: true, error: null };
		case actionTypes.GET_WALLET_SUCCESS:
			return {
				...state,
				loading_now: false,
				walletData: action.payload,
				error: null,
			};
		case actionTypes.GET_WALLET_FAILURE:
			return { ...state, loading_now: false, error: action.payload };

		case actionTypes.GET_TRANSACTIONS_SUCCESS:
			return { ...state, transactions: action.payload };

		default:
			return state;
	}
};

export default walletReducer;
