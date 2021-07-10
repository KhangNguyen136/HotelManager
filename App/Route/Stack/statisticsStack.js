// import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { GetIcon } from '../../Components/button';
import RevenueStatistics from '../../Screens/statistics/revenue';
import UsageDensityStatistics from '../../Screens/statistics/usageDensity';
import FilterTime from '../../Screens/filterTime';
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator()

function StatisticsTab({ navigation }) {
    return (
        <Tab.Navigator initialRouteName={'Revenue'} screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                return (<TabBarIcon focused={focused} routeName={route.name} color={color} size={size} />)
            },

        })} tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }} >
            <Tab.Screen name="Revenue" component={RevenueStatistics} options={{ title: 'Revenue' }} />
            <Tab.Screen name="UsageDensity" component={UsageDensityStatistics} options={{ title: 'Usage density' }} />
        </Tab.Navigator>
    );
}

function StatisticsStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName={'Statistics'} >
            <Stack.Screen name='Statistics' component={StatisticsTab} options={{}} />
            <Stack.Screen name='FilterTime' component={FilterTime} options={{ title: 'Data setting' }} />
        </Stack.Navigator>
    )
}

export default StatisticsStack;

function TabBarIcon({ focused, routeName, color }) {
    var iconName
    var source
    // var color
    if (routeName == 'Revenue') {
        iconName = focused ? 'pie-chart' : 'pie-chart-outline'
        source = 'Ionicons'
        color = focused ? '#2ecc71' : 'black'
    }
    else {
        iconName = focused ? 'file-percent' : 'file-percent-outline'
        source = 'MaterialCommunityIcons'
        color = focused ? '#1abc9c' : 'black'
    }
    console.log({ focused, routeName, color })
    return (
        <GetIcon iconName={iconName} source={source} color={color} size={30} />
    )
}