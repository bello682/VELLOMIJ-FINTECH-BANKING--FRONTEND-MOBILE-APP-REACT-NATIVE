import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAppSelector } from "../hooks/useTypedSelector"; // We'll create this hook next

// Navigators
import AuthNavigator from "../navigation/AuthNavigator";
import MainNavigator from "../navigation/MainNavigator";

const Stack = createStackNavigator();

const RootNavigator = () => {
  // We grab the login state from your converted Redux store
  const { user, isLoading } = useAppSelector((state) => state.loginState);

  // Show a splash screen while checking if the user is logged in
  // if (isLoading) {
  //   // return <SplashScreen />;
  //   return <LoadingOverlay visible={isLoading} message="Please wait..." />;
  // }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* If loading or no token, show Auth stack. Splash handles the delay internally. */}
      {isLoading || !user?.token ? (
        /* Auth Flow - User needs to login/register */
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        /* Main App - User is logged in */
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
