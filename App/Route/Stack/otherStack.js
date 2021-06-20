import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Other from '../../Screens/other';
import AddRoom from '../../Screens/addRoom'
import EditRule from '../../Screens/editRule'
const Stack = createStackNavigator();

function OtherStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Other" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Other" component={Other} options={{ title: 'Other' }} />
            <Stack.Screen name="NewRoom" component={AddRoom} options={{ title: 'New room' }} initialParams={{
                isEdit: false
            }} />
            <Stack.Screen name="EditRule" component={EditRule} />
        </Stack.Navigator>
    );
}

export default OtherStack;