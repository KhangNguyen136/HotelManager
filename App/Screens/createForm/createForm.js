import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { IconButton } from '../../Components/button';
import Card from '../../Components/card';
import CreateForm from '../../Components/InputForm/createForm';
export default function CreateBill({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <View style={{ marginLeft: 10 }} >
                <IconButton iconName={'list'}
                    onPress={() => { navigation.navigate('ListForm') }} />
            </View>
        })
    })
    return (
        <SafeAreaView style={globalStyles.container}>
            <CreateForm navigation={navigation} />
        </SafeAreaView>
    )
}