import * as actionTypes from "../actionType/kycUser.ActionType";

export interface KycState {
	loadingKyc: boolean;
	kycData: any | null;
	errorMsgKyc: string | null;
}

const initialState: KycState = {
	loadingKyc: false,
	kycData: null,
	errorMsgKyc: null,
};

interface KycAction {
	type: string;
	payload?: any;
}

export const kycReducer = (
	state = initialState,
	action: KycAction
): KycState => {
	switch (action.type) {
		case actionTypes.KYC_UPDATE_REQUEST:
			return { ...state, loadingKyc: true, errorMsgKyc: null };
		case actionTypes.KYC_UPDATE_SUCCESS:
			return { ...state, loadingKyc: false, kycData: action.payload };
		case actionTypes.KYC_UPDATE_FAILURE:
			return { ...state, loadingKyc: false, errorMsgKyc: action.payload };
		default:
			return state;
	}
};
