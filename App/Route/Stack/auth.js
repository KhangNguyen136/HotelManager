import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Login from '../../Screens/Auth/login';
import SignUp from '../../Screens/Auth/signUp';
import ForgotPassword from '../../Screens/Auth/forgotPassword';

const Stack = createStackNavigator();

function AuthStack({ navigation }) {
    return (
        // <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="LogIn" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign up' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot password' }} />

        </Stack.Navigator>
        /* </NavigationContainer> */
    )
}

export default AuthStack;