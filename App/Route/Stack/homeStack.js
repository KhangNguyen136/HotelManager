import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../../Screens/dashboard/home'
import CheckOut from '../../Screens/dashboard/checkOut'
import RoomDetail from '../../Screens/dashboard/roomDetail'
import ListBill from '../../Screens/dashboard/listBill'
import EditForm from '../../Screens/dashboard/editForm';
import AddRoom from '../../Screens/other/addRoom';
import SelectRoom from '../../Screens/createForm/SelectRoom';
import AddGuest from '../../Screens/createForm/addGuest';
const Stack = createStackNavigator();

function HomeStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="RoomDetail" component={RoomDetail} options={{ title: 'Room detail' }} />
            <Stack.Screen name="EditForm" component={EditForm} options={{ title: 'Edit form' }} />
            <Stack.Screen name="CheckOut" component={CheckOut} options={{ title: 'Check out' }} />
            <Stack.Screen name="ListBill" component={ListBill} options={{ title: 'List bill' }} />
            <Stack.Screen name="AddRoom" component={AddRoom} options={{ title: 'New room' }} initialParams={{ isEdit: false }} />
            <Stack.Screen name="SelectRoom" component={SelectRoom} options={{ title: 'Select room' }} initialParams={{ isEdit: true }} />
            <Stack.Screen name="AddGuest" component={AddGuest} options={{ title: 'Add guest' }} initialParams={{ isDashboard: true }} />

        </Stack.Navigator>
    );
}

export default HomeStack;