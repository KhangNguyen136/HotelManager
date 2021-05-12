import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { colorType } from '../InputCard/typePicker';
import { openDatabase } from 'expo-sqlite';
import Card from '../card';
import SearchBox from '../InputCard/searchBox';
import { GetIcon } from '../button';
const db = openDatabase('userDatabase.db');

export default function RoomList() {
    const navigation = useNavigation()
    const [listRoom, setListRoom] = React.useState([])
    const [totalRoom, setTotalRoom] = React.useState(0)
    const [searchKey, setSearchKey] = React.useState('')

    const listRoomUpdated = useSelector(state => state.roomState.listRoomUpdated)
    // var sourceData = []
    React.useEffect(
        () => {
            if (searchKey == '')
                getListRoom()
            else
                findRoom()
        }, [listRoomUpdated, searchKey]
    )
    const getListRoom = () => {
        var result = [tittleItem]
        var temp = 0
        db.transaction(tx => {
            tx.executeSql(
                'select * from roomTable', [],
                (tx, results) => {
                    var temp = results.rows.length
                    for (let i = 0; i < temp; i++) {
                        result.push(results.rows.item(i))
                    }
                    setListRoom(result)
                    setTotalRoom(temp)
                }
            )
        })
    }
    const findRoom = () => {
        var result = [tittleItem]
        var temp = 0
        db.transaction(tx => {
            tx.executeSql(
                'select * from roomTable', [],
                (tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        const item = results.rows.item(i)

                        if (item.roomName.toLowerCase().includes(searchKey) || item.note.toLowerCase().includes(searchKey)) {
                            result.push(item)
                            temp++
                        }
                    }
                    setListRoom(result)
                    setTotalRoom(temp)
                }
            )
        })

    }
    const RoomItem = ({ item }) => {
        var color = colorType(item.kind)
        return (
            <TouchableOpacity style={{ ...Styles.itemContainer, backgroundColor: color }}
                onPress={() => {
                    if (item.ID != 'ID')
                        navigation.navigate('NewRoom', {
                            isEdit: true, item: item
                        })
                }} >
                <View
                    style={{ width: '8%', borderColor: 'black', borderRightWidth: 0.5, padding: 2, alignItems: 'center' }} >
                    <Text >{item.ID}</Text>
                </View>
                <View
                    style={{ flex: 1, borderColor: 'black', borderRightWidth: 0.5, padding: 2, alignItems: 'center' }}>
                    <Text>{item.roomName}</Text>
                </View>
                <View
                    style={{ width: '10%', borderColor: 'black', borderRightWidth: 0.5, padding: 2, alignItems: 'center' }}>
                    <Text>{item.kind}</Text>
                </View>
                <View
                    style={{ flex: 1, borderColor: 'black', borderRightWidth: 0.5, padding: 2, alignItems: 'center' }}>
                    <Text>{item.price}</Text>
                </View>
                <View
                    style={{ flex: 1, padding: 2, alignItems: 'center' }}>
                    <Text>{item.note}</Text>
                </View>

            </TouchableOpacity>)
    }
    return (
        <View style={Styles.container} >
            <Text style={{ fontSize: 16, fontWeight: '500' }} > List room: {totalRoom}</Text >
            <SearchBox value={searchKey} textChange={setSearchKey} placeholder={"Search by room's name or note"} />
            <FlatList data={listRoom}
                renderItem={RoomItem}
                keyExtractor={item => item.roomName} />
            <TouchableOpacity
                style={{
                    flexDirection: 'row', padding: 5, marginTop: 5,
                    alignSelf: 'flex-end', borderRadius: 5, borderWidth: 0.25,
                    borderColor: 'black', backgroundColor: '#81ecec'
                }} onPress={() => navigation.navigate('NewRoom')} >
                <GetIcon iconName={'pluscircleo'} source={'AntDesign'} size={18} />
                <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: '500' }} >Add new room</Text>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        // flex: 1,
        maxHeight: '50%',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 5,
    }
    ,
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: 'black',
        // padding: 5
    },
})

const tittleItem = {
    ID: 'ID',
    roomName: "Room's name",
    kind: 'Type',
    price: 'Price',
    note: 'Note'
}