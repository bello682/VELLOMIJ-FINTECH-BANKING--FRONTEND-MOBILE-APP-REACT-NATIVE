import * as actionTypes from "../actionType/deleteUserActionType";

// 1. Define the State structure (Matching your production pattern)
export interface DeleteUserState {
	loading_now: boolean;
	successMessage: string | null;
	error: string | null;
}

const initialState: DeleteUserState = {
	loading_now: false,
	successMessage: null,
	error: null,
};

// 2. Define the Action structure
interface Action {
	type: string;
	payload?: any;
}

// 3. Export the Reducer
const deleteUserReducer = (
	state: DeleteUserState = initialState,
	action: Action
): DeleteUserState => {
	switch (action.type) {
		case actionTypes.DELETE_USER_REQUEST:
			return {
				...state,
				loading_now: true,
				successMessage: null,
				error: null,
			};

		case actionTypes.DELETE_USER_SUCCESS:
			return {
				...state,
				loading_now: false,
				successMessage: action.payload,
				error: null,
			};

		case actionTypes.DELETE_USER_FAILURE:
			return {
				...state,
				loading_now: false,
				successMessage: null,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default deleteUserReducer;
