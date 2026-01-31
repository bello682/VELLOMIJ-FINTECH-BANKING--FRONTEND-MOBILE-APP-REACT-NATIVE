import Toast from "react-native-toast-message";

/**
 * Global Toast Utility
 * @param type 'success' | 'error' | 'info'
 * @param text1 Primary message
 * @param text2 Optional sub-message
 */
export const showToast = (
	type: "success" | "error" | "info",
	text1: string,
	text2?: string
) => {
	Toast.show({
		type: type,
		text1: text1,
		text2: text2,
		position: "top",
		visibilityTime: 4000,
		autoHide: true,
		topOffset: 50,
	});
};
