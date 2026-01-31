import * as actionTypes from "../actionType/forgetPasswordActionType";

// Define the State structure
export interface ForgetPasswordState {
	loading_now: boolean;
	message: string | null;
	error: string | null;
}

const initialState: ForgetPasswordState = {
	loading_now: false,
	message: null,
	error: null,
};

// Define the Action structure
interface Action {
	type: string;
	payload?: any;
}

export const forgetPasswordReducer = (
	state: ForgetPasswordState = initialState,
	action: Action
): ForgetPasswordState => {
	switch (action.type) {
		case actionTypes.FORGET_PASSWORD_REQUEST:
			return {
				...state,
				loading_now: true,
				error: null,
			};

		case actionTypes.FORGET_PASSWORD_SUCCESS:
			return {
				...state,
				loading_now: false,
				message: action.payload,
				error: null,
			};

		case actionTypes.FORGET_PASSWORD_FAIL:
			return {
				...state,
				loading_now: false,
				error: action.payload,
				message: null,
			};

		default:
			return state;
	}
};
