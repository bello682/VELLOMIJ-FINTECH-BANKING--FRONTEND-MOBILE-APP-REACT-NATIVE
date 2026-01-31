import * as actionTypes from "../actionType/registerActionType";

const initialState = {
	loading: false,
	UserRegister: null,
	errorMsg: null,
};

export const registrationReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.REGISTRATION_REQUEST:
			return {
				...state,
				loading: true,
				errorMsg: null,
			};
		case actionTypes.REGISTRATION_SUCCESS:
			return {
				...state,
				loading: false,
				UserRegister: action.payload,
			};
		case actionTypes.REGISTRATION_FAILURE:
			return {
				...state,
				loading: false,
				errorMsg: action.payload,
			};

		default:
			return state;
	}
};
