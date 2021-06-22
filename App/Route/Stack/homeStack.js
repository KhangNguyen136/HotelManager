import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../../Screens/home';
import CheckOut from '../../Screens/checkOut'
import RoomDetail from '../../Screens/roomDetail';
import CreateForm from '../../Screens/createForm/createForm';
import ListBill from '../../Screens/listBill';

const Stack = createStackNavigator();

function HomeStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="RoomDetail" component={RoomDetail} options={{ title: 'Room detail' }} />
            <Stack.Screen name="FormDetail" component={CreateForm} options={{ title: 'Form detail' }} />
            <Stack.Screen name="CheckOut" component={CheckOut} options={{ title: 'Check out' }} />
            <Stack.Screen name="ListBill" component={ListBill} options={{ title: 'List bill' }} />

        </Stack.Navigator>
    );
}

export default HomeStack;