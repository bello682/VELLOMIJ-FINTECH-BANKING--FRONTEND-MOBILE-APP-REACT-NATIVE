// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { thunk } from "redux-thunk";
// // Import your reducers (Ensure paths are correct)
// import deleteUserReducer from "./reducer/deleteUserReducer";
// import FetchUserReducer from "./reducer/fetchUserByIdReducer";
// import { forgetPasswordReducer } from "./reducer/forgetPasswordReducer";
// import { kycReducer } from "./reducer/kycUser.Reducer";
// import loginReducer from "./reducer/loginReducer";
// import { logoutReducer } from "./reducer/logoutReducer";
// import { resendOtpReducer } from "./reducer/resendOtpReducer";
// import { registrationReducer } from "./reducer/resgisterReducer";
// import { verificationReducer } from "./reducer/verificationReducer";

// const rootReducer = combineReducers({
// 	registration: registrationReducer,
// 	verification: verificationReducer,
// 	resendOtpState: resendOtpReducer,
// 	loginState: loginReducer,
// 	logout: logoutReducer,
// 	forgetPasswordReducer: forgetPasswordReducer,
// 	userProfileFetch: FetchUserReducer,
// 	deleteUserState: deleteUserReducer,
// 	kyc: kycReducer,
// });

// // 1. Define the RootState type based on the rootReducer
// export type RootState = ReturnType<typeof rootReducer>;

// const store = createStore(rootReducer, applyMiddleware(thunk));

// // 2. Define the AppDispatch type
// export type AppDispatch = typeof store.dispatch;

// export default store;

import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import * as DeleteTypes from "./actionType/deleteUserActionType";
import * as LogoutTypes from "./actionType/logoutActionType";

// Your Imports
import billReducer from "./reducer/dashboard/billReducer";
import { dashboardReducer } from "./reducer/dashboard/dashboardReducer";
import supportReducer from "./reducer/dashboard/supportReducer";
import transferReducer from "./reducer/dashboard/transferReducer";
import walletReducer from "./reducer/dashboard/walletReducer";
import deleteUserReducer from "./reducer/deleteUserReducer";
import FetchUserReducer from "./reducer/fetchUserByIdReducer";
import { forgetPasswordReducer } from "./reducer/forgetPasswordReducer";
import { kycReducer } from "./reducer/kycUser.Reducer";
import loginReducer from "./reducer/loginReducer";
import { logoutReducer } from "./reducer/logoutReducer";
import { resendOtpReducer } from "./reducer/resendOtpReducer";
import { registrationReducer } from "./reducer/resgisterReducer";
import { verificationReducer } from "./reducer/verificationReducer";

// 1. This is your standard combined reducer
const appReducer = combineReducers({
	registration: registrationReducer,
	verification: verificationReducer,
	resendOtpState: resendOtpReducer,
	loginState: loginReducer,
	logout: logoutReducer,
	forgetPasswordReducer: forgetPasswordReducer,
	userProfileFetch: FetchUserReducer,
	deleteUserState: deleteUserReducer,
	kyc: kycReducer,
	dashboard: dashboardReducer,
	walletState: walletReducer,
	transferState: transferReducer,
	supportState: supportReducer,
	billState: billReducer,
});

// 2. This is the "Master" Reducer that clears everything on logout
const rootReducer = (state: any, action: any) => {
	if (
		action.type === LogoutTypes.LOGOUT_SUCCESS ||
		action.type === DeleteTypes.DELETE_USER_SUCCESS
	) {
		// When the user logs out successfully, we set state to 'undefined'
		// This forces Redux to reset every single reducer to its 'initialState'
		state = undefined;
	}
	return appReducer(state, action);
};

// 3. Define Types
export type RootState = ReturnType<typeof appReducer>;

// 4. Create Store using the 'rootReducer'
const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export default store;
