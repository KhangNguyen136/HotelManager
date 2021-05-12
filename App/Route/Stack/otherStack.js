import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Other from '../../Screens/other';
import NewRoom from '../../Screens/newRoom'

const Stack = createStackNavigator();

function OtherStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Other" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Other" component={Other} options={{ title: 'Other' }} />
            <Stack.Screen name="NewRoom" component={NewRoom} options={{ title: 'New room' }} initialParams={{
                isEdit: false
            }} />
        </Stack.Navigator>
    );
}

export default OtherStack;