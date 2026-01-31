import * as actionTypes from "../actionType/resendOtpActionType";

interface ResendOtpState {
	loading: boolean;
	resendOtpNew: any;
	errorMsg: string | null;
}

interface ResendOtpAction {
	type: string;
	payload?: any;
}

const initialState: ResendOtpState = {
	loading: false,
	resendOtpNew: null,
	errorMsg: null,
};

export const resendOtpReducer = (
	state = initialState,
	action: ResendOtpAction
): ResendOtpState => {
	switch (action.type) {
		case actionTypes.OTP_RESEND_REQUEST:
			return { ...state, loading: true, errorMsg: null };
		case actionTypes.OTP_RESEND_SUCCESS:
			return { ...state, loading: false, resendOtpNew: action.payload };
		case actionTypes.OTP_RESEND_FAILURE:
			return { ...state, loading: false, errorMsg: action.payload };
		default:
			return state;
	}
};
