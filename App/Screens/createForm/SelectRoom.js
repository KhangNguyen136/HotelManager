import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { formatAmount, globalStyles } from '../../styles/globalStyles';
import Card from '../../Components/card';
import { useDispatch, useSelector } from 'react-redux';
import { openDatabase } from 'expo-sqlite'
import { GetRoomTypeLogo, IsSelectedView, colorType } from '../../Components/InputCard/roomTypePicker'
import SearchBox from '../../Components/InputCard/searchBox';
import { GetIcon } from '../../Components/button';
import { setRoom } from '../../Actions/createFormActions';
const db = openDatabase('userDatabase.db')

export default function RoomPicker({ navigation, route }) {
    const [searchKey, setSearchKey] = React.useState('')
    const [listRoom, setListRoom] = React.useState([])
    const dispatch = useDispatch()
    const listRoomUpdated = useSelector(state => state.roomState.listRoomUpdated)
    const { selectedRoom, old } = route.params
    const setNote = useSelector(state => state.formState.setNote)
    React.useEffect(() => {
        if (searchKey == '')
            getListRoom()
        else
            findRoom()
        // getListRoo
    }, [searchKey, listRoomUpdated])

    const getListRoom = () => {
        console.log(old, selectedRoom)
        var result = [tittleItem]
        db.transaction(tx => {
            tx.executeSql(
                'select * from roomTable r inner join roomTypeTable t on r.typeID = t.typeID  where r.stateRoom = ? or r.roomID = ?', ['available', old],
                (tx, results) => {
                    var temp = results.rows.length
                    for (let i = 0; i < temp; i++) {
                        // if (item.roomName.toLowerCase().includes(searchKey.toLocaleLowerCase()) || item.note.toLowerCase().includes(searchKey.toLocaleLowerCase())) {
                        result.push(results.rows.item(i))
                        // }
                    }
                    // console.log(result)
                    setListRoom(result)
                }
            )
        })
    }

    const findRoom = () => {
        var result = [tittleItem]
        db.transaction(tx => {
            tx.executeSql(
                'select * from roomTable r inner join roomTypeTable t on r.typeID = t.typeID  where r.stateRoom = ? or r.roomID = ?', ['available', old],
                (tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        const item = results.rows.item(i)

                        if (item.roomName.toLowerCase().includes(searchKey.toLocaleLowerCase()) || item.note.toLowerCase().includes(searchKey.toLocaleLowerCase())) {
                            result.push(item)
                        }
                    }
                    setListRoom(result)
                }
            )
        })
    }

    const Room = ({ item }) => {
        const color = colorType(item.typeID)
        const amount = formatAmount.format(item.price)
        return (
            <TouchableOpacity style={{ ...styles.itemContainer, backgroundColor: color }}
                onPress={() => {
                    if (item.ID == -1)
                        return
                    if (item.roomName == selectedRoom) {
                        navigation.goBack()
                        return
                    }
                    dispatch(setRoom(item.roomName, item.roomID, item.typeID, item.price));
                    // setNote('Form ' + item.roomName)
                    navigation.goBack()

                }} >
                <GetRoomTypeLogo kind={item.typeID} size={32} />
                <View style={{ padding: 2, marginLeft: 15, flex: 1 }}>
                    <Text  >{item.roomName}</Text>
                </View>
                <View style={{ padding: 2, flex: 1, alignItems: 'center' }}>
                    <Text  >{item.type}</Text>
                </View>
                <View style={{ marginLeft: 10, flex: 1, alignItems: 'center' }}>
                    <Text >{amount}</Text>
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text >{item.note}</Text>
                </View>
                <SelectedView isSelected={selectedRoom == item.roomName} ID={item.ID} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <SearchBox value={searchKey} textChange={setSearchKey} placeholder={"Search by room's name or note"} />
            <Card>
                <FlatList data={listRoom}
                    renderItem={Room}
                    keyExtractor={item => item.roomName}
                />
            </Card>
        </SafeAreaView >
    )
}

const SelectedView = ({ isSelected, ID }) => {
    if (ID == -1)
        return <View style={{ width: 26 }} />
    if (isSelected)
        return <GetIcon size={26} iconName={'checkcircle'} source={'AntDesign'} color={'blue'} />
    return <GetIcon iconName={'right'} source={'AntDesign'} />

}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 5,
        margin: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

const tittleItem = {
    ID: -1,
    roomName: 'Room',
    type: 'Room type ',
    price: 'Price',
    note: 'Note'
}