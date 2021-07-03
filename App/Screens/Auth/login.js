import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Formik } from 'formik';
import firebaseApp from '../../firebaseConfig';
import { Success, CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
import TextInputCard from '../../Components/InputCard/TextInputCard';
import PasswordTextInput from '../../Components/InputCard/password';
import { LoginButton } from '../../Components/button';
import { useDispatch } from 'react-redux';
// import { setUser } from '../../Actions/userActions';
import LoadingIndicator from '../../Components/loadingIndicator';

export default function Login(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const { navigation } = props

    const LoginAcc = (email, password, setAccount) => {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                setLoading(false)
                Success('Logged in successfully!', '')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false)
                CheckInputFailed('Logged in failed!', errorMessage)
            });
    }
    const forgetPassword = () => {
        firebaseApp.auth().sendPasswordResetEmail(email)
            .then(() => {
                // Password reset email sent!
                Success('An email had been sent to your email')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                CheckInputFailed(errorMessage)
            });
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            <Formik initialValues={{ email: '', pass: '' }}
                onSubmit={(values) => {
                    setLoading(true)
                    if (CheckInput(values.email, values.pass) === false) {
                        setLoading(false)
                        return
                    }
                    LoginAcc(values.email, values.pass)
                    // AsyncLogin(values.email, values.pass)
                    //     .then(userCredential => { console.log(userCredential); setLoading(false); Success('Logged in successfully!') })
                    //     .catch(error => { setLoading(false); console.log(error) })
                }}>
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <View style={{ padding: 20 }} >
                        <View style={{ alignSelf: 'center' }} >
                            <Image source={require('../../source/logo.png')} style={{ width: 200, height: 200 }} />
                        </View>
                        <TextInputCard placeholder={'Phone number or Email'} value={values.email} onChangeValue={handleChange('email')} onBlur={handleBlur('email')} />
                        <View style={{ height: 10 }} />
                        <PasswordTextInput placeholder={'Password'} value={values.pass} onChangeValue={handleChange('pass')} onBlur={handleBlur('pass')} />
                        <View style={{ height: 10 }} />
                        <LoginButton onPress={handleSubmit} title={'Login'} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // paddingHorizontal: 10
                        }} >
                            <TouchableOpacity onPress={() => console.log('forgot password')} >
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#3399ff' }} >FORGOT PASSWORD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#3399ff' }}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                        {loading &&
                            <LoadingIndicator />
                        }
                    </View>
                )}
            </Formik>
        </SafeAreaView>)
}

function CheckInput(email, pass) {
    if (validateEmail(email) === false) {
        CheckInputFailed('Invalid email', 'Check your email and try again!')
        return false
    }
    if (checkPassword(pass) === false) {
        CheckInputFailed('Invalid password', 'Password must contain more than 5 characters!')
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