import * as actionTypes from "../../actionType/dashboard/walletActionType";

// Defining the Blueprint for the Bill State
export interface BillState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

const initialState: BillState = {
	loading: false,
	error: null,
	success: false,
};

const billReducer = (state = initialState, action: any): BillState => {
	switch (action.type) {
		case actionTypes.BUY_AIRTIME_REQUEST:
		case actionTypes.BUY_ELECTRICITY_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				success: false,
			};

		case actionTypes.BUY_AIRTIME_SUCCESS:
		case actionTypes.BUY_ELECTRICITY_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};

		case actionTypes.BUY_AIRTIME_FAILURE:
		case actionTypes.BUY_ELECTRICITY_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};

		default:
			return state;
	}
};

export default billReducer;
