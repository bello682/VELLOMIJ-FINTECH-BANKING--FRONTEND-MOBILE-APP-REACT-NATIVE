import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as LogoutTypes from "../../src/store/auth/actionType/logoutActionType";
import store from "../../src/store/auth/store";

const BASE_URL = process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL;
let isLoggingOut = false; // Add this at the top of Axiotance.ts

const Axiotance = axios.create({
	baseURL: BASE_URL,
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Request Interceptor
Axiotance.interceptors.request.use(
	async (config) => {
		try {
			const token = await AsyncStorage.getItem("jwtToken");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (error) {
			console.error("Error fetching token from storage", error);
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Axiotance.ts - Unified Response Interceptor
Axiotance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Extract status and message safely
		const status = error.response?.status;
		const errorMessage = error.response?.data?.message?.toLowerCase() || "";

		console.log("Response Error Status:", status);
		console.log("Error Message:", errorMessage);

		// 1. Handle 401 Unauthorized
		if (status === 401) {
			// CHECK: Is this a PIN error or a genuine Session Expiry?
			// If the message contains "pin", do NOT log out.
			const isPinError = errorMessage.includes("pin");

			const isAuthRequest =
				originalRequest.url.includes("/login") ||
				originalRequest.url.includes("/register");

			// Only trigger logout if it's NOT a login request,
			// NOT already logging out, and NOT a PIN error.
			if (!isAuthRequest && !isLoggingOut && !isPinError) {
				isLoggingOut = true;
				console.log("Session truly expired: Logging out...");

				await AsyncStorage.multiRemove(["jwtToken", "userId"]);

				try {
					const currentStore =
						store || require("../../src/store/auth/store").default;
					currentStore.dispatch({ type: LogoutTypes.LOGOUT_SUCCESS });
				} catch (dispatchError) {
					console.error("Manual Logout Failed:", dispatchError);
				}

				setTimeout(() => {
					isLoggingOut = false;
				}, 5000);
			}
		}

		// Always return the error so the ConfirmTransferScreen can show the Alert
		return Promise.reject(error);
	}
);
export default Axiotance;
