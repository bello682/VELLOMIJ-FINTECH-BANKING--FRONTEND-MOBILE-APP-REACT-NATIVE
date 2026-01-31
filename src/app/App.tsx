import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "../../src/store/auth/store"; // We will point this to your Redux index
import RootNavigator from "./RootNavigator";

const App = () => {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<StatusBar style='auto' />
				<RootNavigator />
				<Toast />
			</SafeAreaProvider>
		</Provider>
	);
};

export default App;

// REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.3 npx expo start -c
