import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { colorType } from '../InputCard/roomTypePicker';
import { openDatabase } from 'expo-sqlite';
import { formatAmount } from '../../styles/globalStyles';
import Card from '../card';
import SearchBox from '../InputCard/searchBox';
import { GetIcon } from '../button';
import NoDataComp from '../nodata';
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
        var result = []
        db.transaction(tx => {
            tx.executeSql(
                'select * from roomTable r inner join roomTypeTable t on r.typeID = t.typeID', [],

                (tx, results) => {
                    var temp = results.rows.length
                    for (let i = 0; i < temp; i++) {
                        result.push(results.rows.item(i))
                    }
                    setListRoom(result)
                    // console.log(result)
                    setTotalRoom(temp)
                }
            )
        })
    }
    const findRoom = () => {
        var result = []
        var temp = 0
        db.transaction(tx => {
            tx.executeSql(
                'select * from roomTable r inner join roomTypeTable t on r.typeID = t.typeID', [],
                (tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        const item = results.rows.item(i)

                        if (item.roomName.toLowerCase().includes(searchKey.toLowerCase()) || item.note.toLowerCase().includes(searchKey.toLowerCase())) {
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
        var color = colorType(item.typeID)
        const amount = formatAmount(item.price, false)
        return (
            <TouchableOpacity style={{ ...Styles.itemContainer, backgroundColor: color }}
                onPress={() => {
                    if (item.ID != 'ID')
                        navigation.navigate('NewRoom', {
                            isEdit: true, item: item
                        })
                }} >
                <View
                    style={{ ...Styles.cellTable, width: '8%', }} >
                    <Text style={{ fontSize: 16 }} >{item.roomID}</Text>
                </View>
                <View style={{ ...Styles.cellTable, flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>{item.roomName}</Text>
                </View>
                <View
                    style={{ ...Styles.cellTable, width: '20%' }}>
                    <Text style={{ fontSize: 16 }}>{item.type}</Text>
                </View>
                <View style={{ ...Styles.cellTable, flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>{amount}</Text>
                </View>
                <View style={{ flex: 1, padding: 2, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{item.note}</Text>
                </View>
            </TouchableOpacity>)
    }
    const Title = () => {
        return (
            <View style={{ ...Styles.itemContainer, backgroundColor: '#ecf0f1' }} >
                <View
                    style={{ ...Styles.cellTable, width: '8%', }} >
                    <Text style={{ fontSize: 16 }} >ID</Text>
                </View>
                <View style={{ ...Styles.cellTable, flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>Room name</Text>
                </View>
                <View
                    style={{ ...Styles.cellTable, width: '20%' }}>
                    <Text style={{ fontSize: 16 }}>Category</Text>
                </View>
                <View style={{ ...Styles.cellTable, flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>Price</Text>
                </View>
                <View style={{ flex: 1, padding: 2, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>Note</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={Styles.container} >
            <Text style={{ fontSize: 16, fontWeight: '500' }} > List room: {totalRoom}</Text >
            <SearchBox value={searchKey} textChange={setSearchKey} placeholder={"Search by room's name or note"} />
            <Title />
            <FlatList data={listRoom}
                renderItem={RoomItem}
                keyExtractor={item => item.roomName}
                ListEmptyComponent={NoDataComp} />

            <TouchableOpacity
                style={{
                    flexDirection: 'row', padding: 5, marginTop: 5,
                    alignSelf: 'flex-end', borderRadius: 5,
                    borderColor: 'black', backgroundColor: '#2ecc71',
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#333',
                    shadowOpacity: 0.3, shadowRadius: 2,
                }} onPress={() => navigation.navigate('NewRoom')} >

                <GetIcon iconName={'pluscircleo'} source={'AntDesign'} size={24} />
                <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: '500' }} >New room</Text>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // maxHeight: '70%',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 4,
        padding: 5,
    }
    ,
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: 'black',
        padding: 5,
        borderRadius: 4
    },
    cellTable: {
        borderColor: 'black',
        // borderRightWidth: 0.5,
        padding: 2,
        alignItems: 'center',
    }
})
