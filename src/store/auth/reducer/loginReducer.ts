import * as actionTypes from "../actionType/loginActionType";
import * as logoutTypes from "../actionType/logoutActionType";

interface LoginState {
	user: any;
	isLoading: boolean;
	error: string | null;
}

interface LoginAction {
	type: string;
	payload?: any;
}

const initialState: LoginState = {
	user: null,
	isLoading: false,
	error: null,
};

const loginReducer = (
	state = initialState,
	action: LoginAction
): LoginState => {
	switch (action.type) {
		case actionTypes.LOGIN_REQUEST:
			return { ...state, isLoading: true, error: null };
		case actionTypes.LOGIN_SUCCESS:
			return { ...state, isLoading: false, user: action.payload, error: null };
		case actionTypes.LOGIN_FAILURE:
			return { ...state, isLoading: false, error: action.payload };
		case logoutTypes.LOGOUT_SUCCESS:
			return { ...initialState };
		default:
			return state;
	}
};

export default loginReducer;
