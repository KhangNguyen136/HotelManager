import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { GetIcon } from '../../Components/button';
import { FlexCard } from '../../Components/card';
import firebaseApp from '../../firebaseConfig';
import { CheckInputFailed, Success } from '../../Components/AlertMsg/messageAlert';
import LoadingIndicator from '../../Components/loadingIndicator';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db')
const dbRef = firebaseApp.database()

export default function ChangePassword(navigation) {
    const [userID, setUserID] = React.useState('')
    const [loading, setLoading] = React.useState(false)
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

    return (
        <SafeAreaView style={styles.container} >
            <FlexCard>
                <Text>Comming soon</Text>

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
    content: {
        flex: 1,
        fontSize: 18,
        marginHorizontal: 10,
        textAlign: 'center'
        // padding: 5
    }
})