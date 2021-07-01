import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { IconButton } from '../../Components/button';
import Card from '../../Components/card';
import AddGuestForm from '../../Components/InputForm/addGuest';

export default function AddGuest({ navigation, route }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })
    return (
        <SafeAreaView style={globalStyles.container}>
            <AddGuestForm navigation={navigation} route={route} />
        </SafeAreaView>
    )
}