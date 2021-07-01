import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import AddNewRoomForm from '../../Components/InputForm/addRoom'
export default function NewRoom({ navigation, route }) {
    const { item, isEdit } = route.params
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