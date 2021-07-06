import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
// import globalStyles from '../../../styles/globalStyles';
import { Formik } from 'formik';
import firebaseApp from '../../firebaseConfig';
import { Success, CheckInputFailed } from '../AlertMsg/messageAlert';
import { LoginButton } from '../button';
import TextInputCard from '../InputCard/TextInputCard';
import PasswordTextInput from '../InputCard/passwordInput';
import LoadingIndicator from '../loadingIndicator';
import { useNavigation } from '@react-navigation/native'

export default function SignUpInputForm(props) {
    const [loading, setLoading] = React.useState(false)
    const navigation = useNavigation()
    const SignUpAcc = (email, password, resetForm) => {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                setLoading(false);
                Success('Signed up successfully', 'Auto login after signed up.')
                resetForm()
                // firebaseApp.auth().signOut().then(() => {
                //     // Sign-out successful.
                //     console.log('Logged out after sign up successfully!')
                // }).catch((error) => {
                //     // An error happened.
                //     console.log('Logged out after sign up failed!')
                // });
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false);
                CheckInputFailed('Signed up failed', errorMessage)
                // ..
            });
    }
    return (
        <Formik initialValues={{ email: '', pass: '', pass2: '', displayName: '' }}
            onSubmit={(values, { resetForm }) => {
                setLoading(true)
                if (CheckInput(values.email, values.pass, values.pass2, values.displayName) === false) {
                    setLoading(false)
                    return
                }
                SignUpAcc(values.email, values.pass, resetForm)
            }}>
            {({ values, handleChange, handleSubmit, handleBlur }) => (
                <View style={{ padding: 20 }} >
                    <View style={{ alignSelf: 'center' }} >
                        <Image source={require('../../source/logo.png')} />
                    </View>
                    <TextInputCard placeholder={'Phone number or Email'} value={values.email} onChangeValue={handleChange('email')} onBlur={handleBlur('email')} />
                    <View style={{ height: 10 }} />
                    <PasswordTextInput placeholder={'Password'} value={values.pass} onChangeValue={handleChange('pass')} onBlur={handleBlur('pass')} />
                    <View style={{ height: 10 }} />
                    <PasswordTextInput placeholder={'Confirm password'} value={values.pass2} onChangeValue={handleChange('pass2')} onBlur={handleBlur('pass2')} />
                    <View style={{ height: 10 }} />
                    <TextInputCard placeholder={'Display name'} value={values.displayName} onChangeValue={handleChange('displayName')} onBlur={handleBlur('displayName')} />
                    <View style={{ height: 10 }} />
                    <LoginButton onPress={handleSubmit} title={'Sign up'} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        // paddingHorizontal: 10
                    }} >
                        <Text style={{ fontSize: 14 }} >Have had an account already?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
                            <Text style={{ paddingLeft: 3, fontSize: 14, fontWeight: '500', color: '#3399ff' }}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                    {loading &&
                        <LoadingIndicator />
                    }
                </View>
            )}
        </Formik>
    )
}

function CheckInput(email, pass, pass2, name) {
    if (validateEmail(email) === false) {
        CheckInputFailed('Invalid email', 'Check your email and try again!')
        return false
    }
    if (checkPassword(pass) === false) {
        CheckInputFailed('Invalid password', 'Password must contain more than 5 characters!')
        return false
    }
    if (pass !== pass2) {
        CheckInputFailed('Confirm password failed', 'Password and confirm password are not the same!')
        return false
    }
    if (name === '') {
        CheckInputFailed('Please enter display name!', 'We will use it to display your name in app')
        return false
    }
    return true
}

function checkPassword(pass) {
    if (pass.length < 6) {
        return false
    }
    return true
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}