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
import { setRoomEdit } from '../../Actions/editFormActions';
const db = openDatabase('userDatabase.db')

export default function RoomPicker({ navigation, route }) {
    const [searchKey, setSearchKey] = React.useState('')
    const [listRoom, setListRoom] = React.useState([])
    const dispatch = useDispatch()
    const listRoomSttUpdated = useSelector(state => state.roomState.listRoomSttUpdated)
    const { selectedRoom, old, isEdit } = route.params
    React.useEffect(() => {
        if (searchKey == '')
            getListRoom()
        else
            findRoom()
        // getListRoo
    }, [searchKey, listRoomSttUpdated])

    const getListRoom = () => {
        console.log(old, selectedRoom)
        var result = []
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
        const amount = formatAmount(item.price, false)
        return (
            <TouchableOpacity style={{ ...styles.itemContainer, backgroundColor: color }}
                onPress={() => {
                    if (item.roomName == selectedRoom) {
                        navigation.goBack()
                        return
                    }
                    if (isEdit)
                        dispatch(setRoomEdit(item.roomName, item.roomID, item.typeID, item.price))
                    else
                        dispatch(setRoom(item.roomName, item.roomID, item.typeID, item.price));
                    // setNote('Form ' + item.roomName)
                    navigation.goBack()

                }} >
                <GetRoomTypeLogo typeID={item.typeID} size={30} />
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
                    ListHeaderComponent={Title}
                />
            </Card>
        </SafeAreaView >
    )
}

const SelectedView = ({ isSelected, ID }) => {
    if (ID == -1)
        return <View style={{ width: 26 }} />
    if (isSelected)
        return <GetIcon size={24} iconName={'checkcircle'} source={'AntDesign'} color={'blue'} />
    return <GetIcon iconName={'right'} source={'AntDesign'} />

}

const Title = () => {
    return (
        <View style={{ ...styles.itemContainer, backgroundColor: '#ecf0f1' }}
        >
            <GetRoomTypeLogo typeID={-1} size={30} />
            <View style={{ padding: 2, marginLeft: 15, flex: 1 }}>
                <Text  >Room</Text>
            </View>
            <View style={{ padding: 2, width: 80, alignItems: 'center' }}>
                <Text  >Room type</Text>
            </View>
            <View style={{ marginLeft: 10, flex: 1, alignItems: 'center' }}>
                <Text >Price</Text>
            </View>
            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text >Note</Text>
            </View>
            <View style={{ width: 24 }} />
        </View>)
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 5,
        margin: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4
    }
})
