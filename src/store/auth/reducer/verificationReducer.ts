import * as actionTypes from "../actionType/verificationActionType";

// 1. Define the shape of your state
interface VerificationState {
	loading: boolean;
	OtpVerification: any;
	errorMsg: string | null;
}

// 2. Define the shape of your action
interface VerificationAction {
	type: string;
	payload?: any;
}

const initialState: VerificationState = {
	loading: false,
	OtpVerification: null,
	errorMsg: null,
};

// 3. Apply the types to the reducer parameters
export const verificationReducer = (
	state = initialState,
	action: VerificationAction
): VerificationState => {
	switch (action.type) {
		case actionTypes.VERIFICATION_REQUEST:
			return {
				...state,
				loading: true,
				errorMsg: null,
			};
		case actionTypes.VERIFICATION_SUCCESS:
			return {
				...state,
				loading: false,
				OtpVerification: action.payload,
			};
		case actionTypes.VERIFICATION_FAILURE:
			return {
				...state,
				loading: false,
				errorMsg: action.payload,
			};
		default:
			return state;
	}
};
