import * as actionTypes from "../actionType/logoutActionType";

// 1. Define the State structure (Matching your pattern)
export interface LogoutState {
	loading_now: boolean;
	successMessage: string | null;
	errorMessage: string | null;
}

const initialState: LogoutState = {
	loading_now: false,
	successMessage: null,
	errorMessage: null,
};

// 2. Define the Action structure
interface Action {
	type: string;
	payload?: any;
}

// 3. Export the Reducer
export const logoutReducer = (
	state: LogoutState = initialState,
	action: Action
): LogoutState => {
	switch (action.type) {
		case actionTypes.LOGOUT_REQUEST:
			return {
				...state,
				loading_now: true,
				successMessage: null,
				errorMessage: null,
			};

		case actionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				loading_now: false,
				successMessage: action.payload,
				errorMessage: null,
			};

		case actionTypes.LOGOUT_FAILURE:
			return {
				...state,
				loading_now: false,
				errorMessage: action.payload,
				successMessage: null,
			};

		default:
			return state;
	}
};
