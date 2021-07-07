import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import InputForm from '../../Components/InputForm/signUpForm'

export default function SignUp() {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white',
            width: '99%',
            alignSelf: 'center'
        }}>
            <InputForm />
        </SafeAreaView>
    )
}