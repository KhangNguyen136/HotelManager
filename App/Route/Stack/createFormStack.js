import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateForm from '../../Screens/createForm/createForm';
import AddGuest from '../../Screens/createForm/addGuest';
import SelectRoom from '../../Screens/createForm/SelectRoom';
import ListForm from '../../Screens/createForm/listForm';

const Stack = createStackNavigator();

function CreateFormStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Other" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="CreateForm" component={CreateForm} options={{ title: 'New form' }} initialParams={{ isEdit: false }} />
            <Stack.Screen name="AddGuest" component={AddGuest} options={{ title: 'Add guest' }} />
            <Stack.Screen name="SelectRoom" component={SelectRoom} options={{ title: 'Select room' }} />
            <Stack.Screen name="ListForm" component={ListForm} options={{ title: 'List form' }} />

        </Stack.Navigator>
    );
}

export default CreateFormStack;