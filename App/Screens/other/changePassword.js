import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { GetIcon, MyButton } from '../../Components/button';
import { FlexCard } from '../../Components/card';
import firebaseApp from '../../firebaseConfig';
import firebase from 'firebase';
import { CheckInputFailed, Success } from '../../Components/AlertMsg/messageAlert';
import LoadingIndicator from '../../Components/loadingIndicator';
import { openDatabase } from 'expo-sqlite';
import PasswordTextInput from '../../Components/InputCard/passwordInput';
const db = openDatabase('userDatabase.db')

export default function ChangePassword({ navigation }) {
    const [userID, setUserID] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmNewPass, setConfirmNewPass] = React.useState('')

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'select * from userInforTable', [],
                (tx, result) => {
                    setUserID(result.rows.item(0).userID)
                }
            )
        }, (error) => CheckInputFailed('Get data failed', error.message))
    }, []
    )

    const checkInput = () => {
        if (password.length < 6 || newPassword.length < 6) {
            CheckInputFailed('Invalid input', 'Check your input and try again.')
            return
        }
        if (newPassword == password) {
            CheckInputFailed('Same password', 'New password must be different from previous password.')
            return
        }
        if (newPassword != confirmNewPass) {
            CheckInputFailed('Confirm new password failed', 'Confirm new password must be the same as new password.')
            return
        }
        changePass()
        // CheckInputFailed('Error function')
    }

    const changePass = () => {
        setLoading(true)
        const user = firebaseApp.auth().currentUser

        var credential = firebase.auth.EmailAuthProvider.credential(
            user.email, password);

        user.reauthenticateWithCredential(credential).then(() => {
            // User re-authenticated.
            user.updatePassword(newPassword).then(() => {
                navigation.goBack()
                Success('Change password successful')
            }).catch(error => {
                CheckInputFailed('Change password failed', error.message)
                setLoading(false)
            })
            // console.log('success')
        }).catch((error) => {
            // An error ocurred
            CheckInputFailed('Action failed', error.message)
            setLoading(false)
            // ...
        });
    }

    return (
        <SafeAreaView style={styles.container} >
            <FlexCard>
                {/* <Text style={styles.title} >Change password</Text> */}
                <Text style={styles.content}>Your new password must be different from previous password.</Text>
                <PasswordTextInput value={password} placeholder={'Current password'} onChangeValue={setPassword} />
                <PasswordTextInput value={newPassword} placeholder={'New password'} onChangeValue={setNewPassword} />
                <Text style={styles.instruction}>Must be at least 6 characters.</Text>
                <PasswordTextInput value={confirmNewPass} placeholder={'Confirm new password'} onChangeValue={setConfirmNewPass} />
                <Text style={styles.instruction}>Must be the same as new password.</Text>
                <View style={{ height: 20 }} />
                <MyButton title={'Change password'} width={'69%'} onPress={checkInput} />
            </FlexCard>
            {
                loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '',
        alignSelf: 'center',
        width: '99%'
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 3,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        // flex: 1,
        textAlign: 'center',
        marginVertical: 15
    },
    instruction: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    content: {
        // flex: 1,
        fontSize: 18,
        marginHorizontal: 10,
        // textAlign: 'center'
        // padding: 5
    }
})