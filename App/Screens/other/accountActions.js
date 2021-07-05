import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { GetIcon } from '../../Components/button';
import { FlexCard } from '../../Components/card';
import confirmDelete from '../../Components/AlertMsg/confirmDelete';
import firebaseApp from '../../firebaseConfig';
import { DeleteAll } from '../../Model/userData';
import { Success, CheckInputFailed } from '../../Components/AlertMsg/messageAlert';

export default function AccountActions({ navigation }) {

    const clickLogOut = () => {
        confirmDelete('Log out', "This action will delete all current data in this device.If you haven't sync your data, let do it before log out. Do you want to continue?",
            () => {
                logOut()
            }, () => { })
    }
    const logOut = () => {
        firebaseApp.auth().signOut().then(() => {
            DeleteAll(() => Success('Log out successful'))
        }).catch((error) => {
            CheckInputFailed('Log out failed', error.message)
        })
    }
    return (
        <SafeAreaView style={styles.container} >
            <FlexCard>
                <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ChangePassword')} >
                    <GetIcon iconName={'key-change'} source={'MaterialCommunityIcons'} size={24} color={'black'} />
                    <Text style={styles.content}>Change password</Text>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={clickLogOut} >
                    <GetIcon iconName={'logout'} source={'AntDesign'} size={24} color={'#ff7675'} />
                    <Text style={styles.content}>Log out</Text>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />

                </TouchableOpacity>
            </FlexCard>
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
    content: {
        flex: 1,
        fontSize: 18,
        marginHorizontal: 10,
        textAlign: 'center'
        // padding: 5
    }
})