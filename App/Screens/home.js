import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { IconButton } from '../Components/button';
import Card from '../Components/card';
export default function Home({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })

    return (
        <SafeAreaView style={globalStyles.container}>
            <Card>
                <Text style={{ height: 40, fontSize: 20, textAlign: 'center' }} > Home screen: list current room, find room</Text>

            </Card>
            <Card>
                <Button title={'Check out'} onPress={() => navigation.navigate('CheckOut')} />
            </Card>
            <Card>
                <Button title={'Report'} onPress={() => navigation.navigate('Statistics')} />
            </Card>
            <Card>
                <Button title={'Add new room'} onPress={() => navigation.navigate('NewRoom')} />
            </Card>
        </SafeAreaView>
    )
}