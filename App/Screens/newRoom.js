import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { IconButton } from '../Components/button';
import Card from '../Components/card';
import AddNewRoomForm from '../Components/InputForm/newRoom'
export default function NewRoom({ navigation, route }) {
    const { isEdit, item } = route.params
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })

    return (
        <SafeAreaView style={globalStyles.container}>
            <AddNewRoomForm item={item} isEdit={isEdit} navigation={navigation} />

        </SafeAreaView>
    )
}