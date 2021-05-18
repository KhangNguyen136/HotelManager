import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { IconButton } from '../../Components/button';
import Card from '../../Components/card';
import CreateForm from '../../Components/InputForm/createForm';
export default function CreateBill({ navigation, route }) {
    const { isEdit, item } = route.params
    React.useLayoutEffect(() => {
        if (!isEdit)
            navigation.setOptions({
                headerRight: () => <View style={{ marginRight: 10 }} >
                    <IconButton iconName={'list'}
                        onPress={() => { navigation.navigate('ListForm') }} />
                </View>
            })
    })
    return (
        <SafeAreaView style={globalStyles.container}>
            <CreateForm navigation={navigation} isEdit={isEdit} item={item} />
        </SafeAreaView>
    )
}