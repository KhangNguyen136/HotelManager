import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { IconButton } from '../../Components/button';
import Card from '../../Components/card';

export default function ListForm({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })
    return (
        <SafeAreaView style={globalStyles.container}>
            <Card>
                <Text style={{ height: 40, fontSize: 20, textAlign: 'center' }} > List form screen</Text>
            </Card>
        </SafeAreaView>
    )
}