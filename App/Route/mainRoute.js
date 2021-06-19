import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Stack/homeStack';
import CreateFormStack from './Stack/createFormStack';
import StatisticsStack from '../Screens/statistics';
import OtherStack from './Stack/otherStack';
import { GetIcon } from '../Components/button'

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                return (<TabBarIcon focused={focused} routeName={route.name} color={color} size={size} />)
            },
        })}
            tabBarOptions={{
                activeTintColor: '#3399ff',
                inactiveTintColor: 'black',
            }}>
            <Tab.Screen name='Dashboard' component={HomeStack} />
            <Tab.Screen name='CreateForm' component={CreateFormStack} options={{ title: 'Create Form' }} />
            <Tab.Screen name='Statistics' component={StatisticsStack} />
            <Tab.Screen name='Setting' component={OtherStack} options={{ title: 'Other' }} />
        </Tab.Navigator>
    );
}

function TabBarIcon({ focused, routeName, color, size }) {
    let iconName;
    switch (routeName) {
        case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'CreateForm':
            iconName = focused ? 'document-text' : 'document-text-outline';
            break;
        case 'Statistics':
            iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline';
            break;
        default:
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
    }
    return (
        <GetIcon iconName={iconName} size={size} color={color} />
    )
}