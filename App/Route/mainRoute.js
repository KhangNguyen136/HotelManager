import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Stack/homeStack';
import CreateFormStack from './Stack/createFormStack';
import StatisticsTab from './Stack/statisticsStack';
import OtherStack from './Stack/otherStack';
import { GetIcon } from '../Components/button'

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return (<TabBarIcon focused={focused} routeName={route.name} color={color} size={size} />)
                },
            })}
                tabBarOptions={{
                    activeTintColor: '#3399ff',
                    inactiveTintColor: 'black',
                }}>
                <Tab.Screen name='DashboardStack' component={HomeStack} options={{ title: 'Dashboard' }} />
                <Tab.Screen name='CreateFormStack' component={CreateFormStack} options={{ title: 'Create Form' }} />
                <Tab.Screen name='StatisticsTab' component={StatisticsTab} options={{ title: 'Statistics' }} />
                <Tab.Screen name='OtherStack' component={OtherStack} options={{ title: 'Manage hotel' }} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

function TabBarIcon({ focused, routeName, color, size }) {
    let iconName;
    switch (routeName) {
        case 'DashboardStack':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'CreateFormStack':
            iconName = focused ? 'document-text' : 'document-text-outline';
            break;
        case 'StatisticsTab':
            iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline';
            break;
        default:
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
    }
    return (
        <GetIcon iconName={iconName} size={size} color={color} />
    )
}