import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { GetIcon } from '../../Components/button';
import { FlexCard } from '../../Components/card';
import { openDatabase } from 'expo-sqlite';
import firebaseApp from '../../firebaseConfig';
import { CheckInputFailed, Success } from '../../Components/AlertMsg/messageAlert';
import LoadingIndicator from '../../Components/loadingIndicator';
import confirmDelete from '../../Components/AlertMsg/confirmDelete'
import { useDispatch } from 'react-redux';
import { updateState } from '../../Actions/updateActions';
import { updateListBill } from '../../Actions/billActions';
import { updateListForm } from '../../Actions/createFormActions';
import { updateObserve } from '../../Actions/editFormActions';
import { updateListRoom, updateRoomType, updateRule } from '../../Actions/roomActions';
import NetInfo from '@react-native-community/netinfo'
import { syncData, reloadData, resetData, DeleteAll, DeleteData } from '../../Model/userData';
const db = openDatabase('userDatabase.db');
const dbRef = firebaseApp.database()

export default function SyncData(navigation) {
    const [lastSync, setLastSync] = React.useState('')
    const [userID, setUserID] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [updated, setUpdated] = React.useState(false)
    // const [isConnect, setIsConnect] = React.useState(true)
    const dispatch = useDispatch()
    // const sub = NetInfo.addEventListener(state => {
    //     console.log('isConnected: ', state.isConnected)
    //     setIsConnect(state.isConnected)
    // })
    React.useEffect(() => {

        db.transaction(tx => {
            tx.executeSql(
                'select * from userInforTable', [],
                (tx, result) => {
                    setLastSync(result.rows.item(0).lastSync)
                    setUserID(result.rows.item(0).userID)
                }
            )
        }, (error) => CheckInputFailed('Get data failed', error.message))
    }, [updated]
    )

    const updateApp = () => {
        dispatch(updateListRoom())
        dispatch(updateListForm())
        dispatch(updateListBill())
        dispatch(updateRoomType())
        dispatch(updateRule())
        dispatch(updateState())
        dispatch(updateObserve())
        setUpdated(!updated)
    }
    const clickSync = () => {
        // CheckInputFailed('Unfinish function','Comming soon!')
        setLoading(true)
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                syncData(userID, () => {
                    setUpdated(!updated)
                    setLoading(false)
                }, () => setLoading(false))
            }
            else {
                setLoading(false)
                CheckInputFailed('No connection', 'Check your internet and try again!')

            }
        })

    }
    const clickReload = () => {
        setLoading(true)
        NetInfo.fetch().then(state => {
            if (state.isConnected) {

                confirmDelete('Reload data',
                    'This action will delete all current data in this device and reload data under your account on server. Do you want to continue?',
                    () => {
                        DeleteData(reloadDataProgress)
                    },
                    () => setLoading(false))
            }
            else {
                setLoading(false)
                CheckInputFailed('No connection', 'Check your internet and try again!')
            }
        })

    }
    const reloadDataProgress = () => {
        reloadData(userID, () => {
            updateApp()
            setLoading(false)
        }, () => setLoading(false))
    }

    const clickReset = () => {
        setLoading(true)
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                confirmDelete('Reset data', 'This action will delete all data in this device and on server. Do you want to continue?',
                    () => {
                        resetData(userID, () => {
                            Success('Reset all data')
                            updateApp()
                            setLoading(false)
                        }, () => setLoading(false))
                    }, () => setLoading(false)
                )
            }
            else {
                setLoading(false)
                CheckInputFailed('No connection', 'Check your internet and try again!')
            }
        })



    }

    return (
        <SafeAreaView style={styles.container} >
            <FlexCard>
                <TouchableOpacity style={styles.itemContainer} onPress={clickSync} >
                    <GetIcon iconName={'sync'} source={'AntDesign'} size={24} />
                    <View style={{ flex: 1, height: 50 }} >
                        <Text style={styles.content}>Sync data</Text>
                        {
                            lastSync != '' &&
                            <Text style={{ fontSize: 16, textAlign: 'center' }} >Last sync at: {lastSync}</Text>
                        }
                    </View>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />
                </TouchableOpacity >
                <TouchableOpacity style={styles.itemContainer} onPress={clickReload} >
                    <GetIcon iconName={'cloud-download'} source={'FontAwesome'} size={24} color={'#81ecec'} />
                    <Text style={styles.content}>Reload data</Text>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={clickReset} >
                    <GetIcon iconName={'delete'} source={'AntDesign'} size={24} color={'#ff7675'} />
                    <Text style={styles.content}>Reset data</Text>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />

                </TouchableOpacity>
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