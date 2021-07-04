import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import TextInputCard from '../../Components/InputCard/TextInputCard';
import { MyButton } from '../../Components/button';
import { FlexCard } from '../../Components/card';
import { globalStyles } from '../../styles/globalStyles';
import { validateEmail } from './login';
import LoadingIndicator from '../../Components/loadingIndicator';
import { CheckInputFailed, Success } from '../../Components/AlertMsg/messageAlert';
import firebaseApp from '../../firebaseConfig';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const ok = () => {
        if (!validateEmail(email)) {
            CheckInputFailed('Invalid email', 'Check email and try again.')
            return
        }
        setLoading(true)
        firebaseApp.auth().sendPasswordResetEmail(email)
            .then(() => {
                // Password reset email sent!
                Success('Instructions sent', 'We have sent a password recover instructions to your email.')
                navigation.goBack()
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                CheckInputFailed('Action failed', errorMessage)
                setLoading(false)
            });
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            <FlexCard>
                <Text style={styles.Title} >Reset password</Text>
                <Text style={styles.content}>Enter the email with your account and we will send an email with instructions to reset your password.</Text>
                <Text style={styles.content}>Email address: </Text>
                <TextInputCard placeholder={'Your email'} value={email} onChangeValue={setEmail} />
                <MyButton title={'Send instructions'} onPress={ok} />
            </FlexCard>
            {
                loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     width: '99%',
    //     backgroundColor:
    // },
    Title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        padding: 10
    },
    content: {
        fontSize: 18,
        padding: 10
    }
})