// userReducer.js
import * as actionTypes from "../actionType/fetchUserByIdActionType";

const initialState = {
	profile: null,
	loading: false,
	error: null,
};

const FetchUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_USER_BY_ID_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionTypes.FETCH_USER_BY_ID_SUCCESS:
			return {
				...state,
				loading: false,
				profile: action.payload,
			};
		case actionTypes.FETCH_USER_BY_ID_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default FetchUserReducer;
