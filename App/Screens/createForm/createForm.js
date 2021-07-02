import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { IconButton } from '../../Components/button';
import CreateForm from '../../Components/InputForm/createForm';
import HeaderButton from '../../Components/headerButton';
export default function CreateFormScreen({ navigation, route }) {
    const { isEdit, formID } = route.params
    React.useLayoutEffect(() => {
        if (!isEdit)
            navigation.setOptions({
                headerRight: () => <HeaderButton iconName={'list'}
                    title={'List form'} onPress={() => navigation.navigate('ListForm')} />
            })
    })
    return (
        <SafeAreaView style={globalStyles.container}>
            <CreateForm navigation={navigation} isEdit={isEdit} formID={formID} />
        </SafeAreaView>
    )
}