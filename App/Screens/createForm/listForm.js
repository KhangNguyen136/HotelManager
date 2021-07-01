import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { IconButton } from '../../Components/button';
import Card from '../../Components/card';
import ListForm from '../../Components/Table/listForm';

export default function ListFormSreen({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })
    return (
        <SafeAreaView style={globalStyles.container}>
            <Card>
                <ListForm navigation={navigation} />
            </Card>
        </SafeAreaView>
    )
}