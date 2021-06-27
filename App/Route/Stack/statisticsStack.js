import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Statistics from '../../Screens/statistics/statistics';
import RevenueStatistics from '../../Screens/statistics/revenue';
import UsageDensityStatistics from '../../Screens/statistics/usageDensity';
const Stack = createStackNavigator();

function StatisticsStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Statistics" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics' }} />
            <Stack.Screen name="UsageDensity" component={UsageDensityStatistics} options={{ title: 'Usage density' }} />
            <Stack.Screen name="Revenue" component={RevenueStatistics} options={{ title: 'Revenue' }} />

        </Stack.Navigator>
    );
}

export default StatisticsStack;