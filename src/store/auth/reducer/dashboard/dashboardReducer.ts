import * as actionTypes from "../../actionType/dashboard/dashboardActionType";

export interface DashboardState {
	loading_now: boolean;
	data: any | null;
	error: string | null;
}

const initialState: DashboardState = {
	loading_now: false,
	data: null,
	error: null,
};

interface Action {
	type: string;
	payload?: any;
}

export const dashboardReducer = (
	state: DashboardState = initialState,
	action: Action
): DashboardState => {
	switch (action.type) {
		case actionTypes.GET_DASHBOARD_REQUEST:
			return {
				...state,
				loading_now: true,
				error: null,
			};

		case actionTypes.GET_DASHBOARD_SUCCESS:
			return {
				...state,
				loading_now: false,
				data: action.payload,
				error: null,
			};

		case actionTypes.GET_DASHBOARD_FAILURE:
			return {
				...state,
				loading_now: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
