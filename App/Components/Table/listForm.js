import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GetIcon } from '../button';
import { useSelector, useDispatch } from 'react-redux'
import { CheckInputFailed } from '../AlertMsg/messageAlert';
import { openDatabase } from 'expo-sqlite';
import LoadingIndicator from '../loadingIndicator';
import { setListGuest, setRoom } from '../../Actions/createFormActions';
import { useNavigation } from '@react-navigation/core';
const db = openDatabase('userDatabase.db');

export default function ListForm({ navigation }) {
    const listFormUpdated = useSelector(state => state.formState.listFormUpdated)
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    // const navigation = useNavigation()
    const dispatch = useDispatch()
    var tempData = []
    React.useEffect(() => {
        setLoading(true)
        db.transaction(tx => {
            tx.executeSql(
                "select * from formTable",
                [], (tx, formResults) => {
                    var n = formResults.rows.length
                    console.log('Form: ', n)
                    for (let i = 0; i < n; i++) {
                        var tempItem = {
                            form: {},
                            guest: []
                        }
                        tempItem.form = formResults.rows.item(i)
                        tempData.push(tempItem)
                    }
                }
            )
        }, (error) => console.log(error),
            () => {
                console.log('Get list form successfully')
                getListGuest()
                setLoading(false)
            }
        )

    }, [listFormUpdated])
    const getListGuest = () => {
        var item
        db.transaction(tx => {
            for (let i = 0; i < tempData.length; i++)
                tx.executeSql(
                    'select * from guestTable where formID = ?', [tempData[i].form.ID],
                    (tx, guestResults) => {
                        // console.log('List guest: ', guestResults.rows)
                        // var item
                        for (let j = 0; j < guestResults.rows.length; j++)
                            tempData[i].guest.push(guestResults.rows.item(j))
                    }
                )
        }, (error) => console.log(error),
            () => {
                console.log('Get list')
                setData(tempData)
                // console.log(tempData)
            }
        )
    }
    const Form = ({ item }) => {
        // var date = new Date(item.form.date)
        var color = '#7bed9f'
        // var ID = 'ID'
        // if (item.type == 'Foreign')
        //     color = '#f6e58d'
        // if (item.type == 'Type')
        //     color = '#ecf0f1'
        // if (item.type != 'Type')
        // ID = data.findIndex(i => i.IC == item.IC)
        return (
            <TouchableOpacity style={{ ...styles.itemContainer, backgroundColor: color }}
                onPress={() => {
                    {
                        navigation.push('CreateForm', { isEdit: true, item: item })
                        // navigation.push('CreateForm')
                        dispatch(setRoom(item.form.roomName, item.form.roomID))
                        console.log('Go to form details')
                        dispatch(setListGuest(item.guest))
                    }
                }} >
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }} >{item.form.roomName}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1.5 }} >
                    <Text style={{ fontSize: 16 }}>{item.form.date.substr(0, 15)}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.form.note}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.guest.length}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const Title = () => {
        return (
            <View style={{ ...styles.itemContainer, backgroundColor: '#ecf0f1' }} >
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }} >Room</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1.5 }} >
                    <Text style={{ fontSize: 16 }}>Date</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>Note</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>Guest</Text>
                </View>
            </View>
        )
    }
    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: '400', marginBottom: 5, marginLeft: 10 }} >List guest: </Text>
            <Title />
            <FlatList data={data}
                renderItem={Form}
                keyExtractor={item => String(item.form.ID)} />
            {
                loading && <LoadingIndicator />
            }

        </View>
    )


}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 0.25,
        // padding: 5
    },
    cellTbale: {
        borderColor: 'black',
        borderRightWidth: 0.5,
        padding: 3,
        alignItems: 'center',
    }
})
