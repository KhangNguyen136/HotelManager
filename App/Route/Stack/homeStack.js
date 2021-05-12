import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../../Screens/home';
import CheckOut from '../../Screens/checkOut'

const Stack = createStackNavigator();

function HomeStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="CheckOut" component={CheckOut} options={{ title: 'Check out' }} />
        </Stack.Navigator>
    );
}

export default HomeStack;