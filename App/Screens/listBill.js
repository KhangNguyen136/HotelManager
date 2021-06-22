import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Card from '../Components/card';

export default function ListBill({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })
    return (
        <SafeAreaView style={globalStyles.container}>
            <Card>

            </Card>
        </SafeAreaView>
    )
}