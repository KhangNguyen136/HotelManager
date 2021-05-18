import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { IconButton } from '../Components/button';
import Card from '../Components/card';
import ListRoom from '../Components/Table/roomList'
export default function Other({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })

    return (
        <SafeAreaView style={globalStyles.container}>
            <ListRoom />
            {/* <Button title={'To other again'} onPress={() => navigation.push('Other', { param: 'alo' })} /> */}
        </SafeAreaView>
    )
}