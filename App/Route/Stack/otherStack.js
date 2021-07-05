import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Other from '../../Screens/other/other';
import AddRoom from '../../Screens/other/addRoom'
import SyncData from '../../Screens/other/syncData';
import EditRule from '../../Screens/other/editRule';
import AccountActions from '../../Screens/other/accountActions';
import ChangePassword from '../../Screens/other/changePassword';
const Stack = createStackNavigator();

function OtherStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Other" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Other" component={Other} options={{ title: 'Manage hotel' }} />
            <Stack.Screen name="NewRoom" component={AddRoom} options={{ title: 'New room' }} initialParams={{
                isEdit: false
            }} />
            <Stack.Screen name="EditRule" component={EditRule} />
            <Stack.Screen name="SyncData" component={SyncData} options={{ title: 'Data' }} />
            <Stack.Screen name="AccountActions" component={AccountActions} options={{ title: 'Account' }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change password' }} />



        </Stack.Navigator>
    );
}

export default OtherStack;