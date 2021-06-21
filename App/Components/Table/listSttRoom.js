import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GetIcon } from '../button';
import { useSelector } from 'react-redux'
import { CheckInputFailed } from '../AlertMsg/messageAlert';
import { openDatabase } from 'expo-sqlite';
import LoadingIndicator from '../loadingIndicator';
import NoDataComp from '../nodata';
const db = openDatabase('userDatabase.db');

export default function ListSttRoom({ navigation, type, typeID }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const listSttRoomUpdated = useSelector(state => state.roomState.listRoomSttUpdate)
    var tempData = []
    React.useEffect(() => {
        setLoading(true)
        db.transaction(tx => {
            tx.executeSql(
                "select r.roomID, r.roomName,r.stateRoom, r.note roomNote, t.typeID, t.type, t.price, f.formID, f.date, f.note formNote from roomTable r inner join roomTypeTable t on r.typeID = t.typeID left join formTable f on r.roomID = f.roomID AND f.isPaid = 0 where r.typeID = ?",
                [typeID], (tx, formResults) => {
                    var n = formResults.rows.length
                    console.log('Form: ', n)
                    for (let i = 0; i < n; i++) {
                        var tempItem = {
                            infor: {},
                            guest: []
                        }
                        tempItem.infor = formResults.rows.item(i)
                        tempData.push(tempItem)
                        // console.log(tempItem)
                    }
                }
            )
        }, (error) => console.log(error),
            () => {
                getListGuest()
                setLoading(false)
            }
        )
    }, [listSttRoomUpdated])
    const getListGuest = () => {
        db.transaction(tx => {
            for (let i = 0; i < tempData.length; i++)
                tx.executeSql(
                    'select * from guestTable where formID = ?', [tempData[i].infor.formID],
                    (tx, guestResults) => {
                        for (let j = 0; j < guestResults.rows.length; j++)
                            tempData[i].guest.push(guestResults.rows.item(j))
                    }
                )
        }, (error) => console.log(error),
            () => {
                setData(tempData)
                // console.log(tempData)
            }
        )
    }
    const Item = ({ item }) => {
        var color = '#2ecc71'
        var iconName = 'checkcircle'
        var iconSource = 'AntDesign'
        var iconColor = '#ecf0f1'
        var stt = 'Available'
        var title = 'Free Room'

        switch (item.infor.stateRoom) {
            case 'occupied':
                var date = item.infor.date
                date = date.substr(0, 11)
                stt = 'Occupied'
                title = item.guest[0].name
                color = "#ecf0f1"
                iconColor = '#f1c40f'
                switch (item.guest.length) {
                    case 1:
                        iconName = 'md-person-circle-sharp'
                        iconSource = 'Ionicons'
                        break;
                    case 2:
                        iconSource = 'Ionicons'
                        iconName = 'people-circle'
                        break;
                    default:
                        iconName = 'persons'
                        iconSource = 'Fontisto'
                }
                break;
            case 'repairing':
                stt = 'Not available'
                title = 'Reparing'
                iconSource = 'MaterialIcons'
                iconName = 'room-preferences'
                color = "#ff7675"
                break;
            case 'cleaning':
                stt = 'Not available'
                title = 'Cleaning'
                iconSource = 'MaterialIcons'
                iconName = 'cleaning-services'
                color = "#2e86de"
                iconColor = "#f1c40f"
                break;
        }

        return (
            <TouchableOpacity style={{ ...styles.itemContainer, backgroundColor: color }} onPress={() => navigation.navigate('RoomDetail', { data: item })} >
                <View style={styles.item1} >
                    <Text style={{ fontSize: 12, fontWeight: "500" }} >Room: {item.infor.roomName}</Text>
                </View>
                <View style={styles.item2} >
                    <GetIcon iconName={iconName} source={iconSource} size={18} color={iconColor} />
                    <Text style={{ marginLeft: 3 }} >{title}</Text>
                </View>
                <View style={{ backgroundColor: 'white' }} >
                    <Text style={{ fontSize: 12, fontWeight: "500", margin: 4 }} >{stt}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container} >
            <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 5, marginLeft: 10 }} >Room type {type}: </Text>
            <FlatList data={data}
                renderItem={Item}
                keyExtractor={item => item.infor.roomName}
                numColumns={3}
            // ListEmptyComponent={NoDataComp}
            />
            {
                data.length == 0 &&
                <NoDataComp />
            }
            {
                loading && <LoadingIndicator />
            }
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flex: 1,
        // backgroundColor: 'red'

    },
    itemContainer: {
        // flexDirection: 'row',
        // alignSelf: 'center',
        borderColor: 'gray',
        borderWidth: 0.25,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        width: '31%',
        marginBottom: 10,
        marginHorizontal: 5,
        // padding: 5
    },
    item1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 2
    },
    item2: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
        marginTop: 5
    }
})
