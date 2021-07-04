import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { GetIcon } from '../../Components/button';
import Card from '../../Components/card';
import { openDatabase } from 'expo-sqlite';
import { CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
const db = openDatabase('userDatabase.db');

export default function SyncData(navigation) {
    const [lastSync, setLastSync] = React.useState('')
    const [userID, setUserID] = React.useState('')
    React.useState(() => {
        db.transaction(tx => {
            tx.executeSql(
                'select * from userInforTable', [],
                (tx, result) => {
                    setLastSync(result.rows.item(0).lastSync)
                    setUserID(result.rows.item(0).userID)
                }
            )
        }, (error) => CheckInputFailed('Get data failed', error.message))
    })
    return (
        <SafeAreaView>
            <Card>
                <TouchableOpacity style={styles.itemContainer} >
                    <GetIcon iconName={'sync'} source={'AntDesign'} size={24} />
                    <View style={{ flex: 1, height: 50 }} >
                        <Text style={styles.content}>Sync data</Text>
                        {
                            lastSync != '' &&
                            <Text style={{ fontSize: 16, textAlign: 'center' }} >Last sync at: {lastSync}</Text>
                        }
                    </View>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer}>
                    <GetIcon iconName={'cloud-download'} source={'FontAwesome'} size={24} color={'#81ecec'} />
                    <Text style={styles.content}>Reload data</Text>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer}>
                    <GetIcon iconName={'delete'} source={'AntDesign'} size={24} color={'#ff7675'} />
                    <Text style={styles.content}>Reset data</Text>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />

                </TouchableOpacity>
                <Text style={{ fontSize: 18 }} >User ID: {userID}</Text>
            </Card>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '',
        width: '99%'
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 3,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5
    },
    content: {
        flex: 1,
        fontSize: 18,
        marginHorizontal: 10,
        textAlign: 'center'
        // padding: 5
    }
})