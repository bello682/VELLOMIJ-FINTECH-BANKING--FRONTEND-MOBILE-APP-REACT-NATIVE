import * as actionTypes from "../../actionType/dashboard/supportActionType";

export interface SupportState {
	tickets: any[];
	loading: boolean;
	error: string | null;
}

const initialState: SupportState = {
	tickets: [],
	loading: false,
	error: null,
};

const supportReducer = (state = initialState, action: any): SupportState => {
	switch (action.type) {
		case actionTypes.GET_TICKETS_REQUEST:
		case actionTypes.CREATE_TICKET_REQUEST:
			return { ...state, loading: true, error: null };

		case actionTypes.GET_TICKETS_SUCCESS:
			return { ...state, loading: false, tickets: action.payload };

		case actionTypes.CREATE_TICKET_SUCCESS:
			return { ...state, loading: false };

		case actionTypes.GET_TICKETS_FAILURE:
		case actionTypes.CREATE_TICKET_FAILURE:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default supportReducer;
