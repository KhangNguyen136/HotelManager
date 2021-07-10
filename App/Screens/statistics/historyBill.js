import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { formatAmount, globalStyles } from '../../styles/globalStyles';
import Card from '../../Components/card';
import { useSelector } from 'react-redux';
import { GetIcon } from '../../Components/button';
import LoadingIndicator from '../../Components/loadingIndicator';
import TimeButton from '../../Components/TimeFilterButton';
import { colorType } from '../../Components/InputCard/roomTypePicker';
import NoDataComp from '../../Components/nodata';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db')
export default function HistoryBill({ navigation, route }) {
    const { type, time, typeID, roomID, typeName, roomName } = route.params
    var filterTime = new Date(time)
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    var tempData
    // var [tempData, setTempData] = React.useState([])
    const listBillUpdated = useSelector(state => state.billState.listBillUpdated)
    const listRoomSttUpdated = useSelector(state => state.roomState.listRoomSttUpdated)
    const roomTypeUpdated = useSelector(state => state.roomState.roomTypeUpdated)
    React.useLayoutEffect(() => {
        if (type == 'revenue')
            navigation.setOptions({ title: typeName + "'s revenue" })
        else
            navigation.setOptions({ title: roomName + "'s bills" })

    })
    React.useEffect(() => {
        tempData = []
        setLoading(true)
        db.transaction(
            tx => {
                if (type == 'revenue')
                    tx.executeSql(
                        'select b.ID, b.paidTime, b.nday, b.totalAmount, b.note, b.surchargeThird, b.surchargeForeign, f.date, f.formID, r.roomID, r.roomName, r.typeID, t.type, t.price from billTable b inner join formTable f on b.formID = f.formID inner join roomTable r on r.roomID = f.roomID inner join roomTypeTable t on r.typeID = t.typeID where t.typeID = ?', [typeID],
                        (tx, result) => {
                            const n = result.rows.length
                            for (let i = 0; i < n; i++) {
                                const tempItem = {
                                    infor: result.rows.item(i),
                                    guest: []
                                }
                                tx.executeSql(
                                    'select * from guestTable where formID = ?', [tempItem.infor.formID],
                                    (tx, guests) => {
                                        const nGuest = guests.rows.length
                                        for (let j = 0; j < nGuest; j++)
                                            tempItem.guest.push(guests.rows.item(j))
                                        insertIntoTemp(tempItem)
                                    }
                                )
                            }
                        }
                    )
                else
                    tx.executeSql(
                        'select b.ID, b.paidTime, b.nday, b.totalAmount, b.note, b.surchargeThird, b.surchargeForeign, f.date, f.formID, r.roomID, r.roomName, r.typeID, t.type, t.price from billTable b inner join formTable f on b.formID = f.formID inner join roomTable r on r.roomID = f.roomID inner join roomTypeTable t on r.typeID = t.typeID where r.roomID = ?', [roomID],
                        (tx, result) => {
                            const n = result.rows.length
                            for (let i = 0; i < n; i++) {
                                const tempItem = {
                                    infor: result.rows.item(i),
                                    guest: []
                                }
                                tx.executeSql(
                                    'select * from guestTable where formID = ?', [tempItem.infor.formID],
                                    (tx, guests) => {
                                        const nGuest = guests.rows.length
                                        for (let j = 0; j < nGuest; j++)
                                            tempItem.guest.push(guests.rows.item(j))
                                        insertIntoTemp(tempItem)
                                    }
                                )
                            }
                        }
                    )
            }, (error) => console.log(error.message),
            () => {

                setData(tempData)
                setLoading(false)
            })

    }, [listBillUpdated, listRoomSttUpdated, roomTypeUpdated])

    const checkDate = (date) => {
        if (date.getMonth() == filterTime.getMonth() && date.getFullYear() == filterTime.getFullYear())
            return true
        return false
    }

    const insertIntoTemp = (tempItem) => {
        const infor = tempItem.infor
        const itemDate = new Date(infor.paidTime)
        if (type == 'revenue') {
            if (!checkDate(itemDate))
                return
        }
        else
            if (!checkDate(itemDate) && !checkDate(new Date(infor.date)))
                return
        const itemDateString = itemDate.toString().substring(0, 15)
        for (let i = 0; i < tempData.length; i++) {
            const tempDateString = tempData[i].date.toString().substring(0, 15)
            if (tempDateString == itemDateString) {
                tempData[i].items.push(tempItem)
                tempData[i].total += infor.totalAmount
                return
            }
            else if (tempData[i].date > itemDate) {
                tempData.splice(i, 0, {
                    date: itemDate, total: infor.totalAmount, items: [tempItem]
                })
                return
            }
        }
        tempData.push({
            date: itemDate, total: infor.totalAmount,
            items: [tempItem]
        })

    }
    const Bill = ({ item }) => {
        const color = colorType(item.infor.typeID)
        var guestIcon = 'md-person-circle-sharp'
        var guestSource = 'Ionicons'
        const nGuest = item.guest.length
        switch (nGuest) {
            case 2:
                guestIcon = 'people-circle'
                break;
            case 3:
                guestIcon = 'persons'
                guestSource = 'Fontisto'
                break;
        }
        return (
            <TouchableOpacity style={{ ...styles.itemContainer, backgroundColor: color }}
                onPress={() => navigation.navigate('CheckOut', { isEdit: true, data: item, diffDays: item.infor.nday })}>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 2, }}>
                    <View style={{ marginLeft: 5, flex: 2, flexDirection: 'row', alignItems: 'center' }} >
                        <GetIcon iconName={'room'} source={'Fontisto'} size={16} />
                        <Text style={{ fontSize: 16, marginLeft: 5 }} >Room: {item.infor.roomName}</Text>
                    </View>
                    <View style={{ width: 150, flexDirection: 'row', alignItems: 'center' }} >
                        <GetIcon iconName={'date-range'} source={'MaterialIcons'} size={16} />
                        <Text style={{ fontSize: 16, marginLeft: 1 }}>Number of day: {item.infor.nday} </Text>
                    </View>

                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' }} >
                    <View style={{ flexDirection: 'row', marginLeft: 3, flex: 1.5, alignItems: 'center' }} >
                        <GetIcon iconName={'attach-money'} source={'MaterialIcons'} size={16} />
                        <Text style={{ fontSize: 16 }}>Total: {formatAmount(item.infor.totalAmount, false)}</Text>
                    </View>
                    <View style={{ width: 90, flexDirection: 'row', alignItems: 'center' }} >
                        <GetIcon iconName={guestIcon} source={guestSource} size={16} />
                        <Text style={{ marginLeft: 3, fontSize: 16 }}>Guest: {nGuest}</Text>
                    </View>
                </View>
                {
                    item.infor.note !== '' &&
                    <View style={{ marginLeft: 5, alignItems: 'flex-start', flex: 1, flexDirection: 'row' }} >
                        <GetIcon iconName={'edit'} source={'AntDesign'} size={16} />
                        <Text style={{ fontSize: 16, marginLeft: 5, flex: 1 }}>Note: {item.infor.note}</Text>
                    </View>
                }
            </TouchableOpacity >
        )
    }
    const Section = ({ item }) => {
        return (
            <Card >
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ width: 4, backgroundColor: 'black', marginRight: 10 }} />
                        <Text style={{ fontSize: 16 }} >{item.date.toString().substring(0, 15)}</Text>
                    </View>
                    <Text style={{ fontSize: 16, color: '#27ae60' }}>{formatAmount(item.total)}</Text>
                </View>
                <FlatList data={item.items}
                    renderItem={Bill}
                    keyExtractor={item => String(item.infor.ID)}
                />
            </Card>
        )
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            <TimeButton value={filterTime} />
            <FlatList data={data}
                renderItem={Section}
                keyExtractor={item => item.date.toString()}
                ListEmptyComponent={NoDataComp}
            // ListHeaderComponent={Title}
            />
            {
                loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 3,

    },
    itemContainer: {
        // justifyContent: 'space-between',
        borderColor: 'black',
        borderBottomWidth: 0.25,
        padding: 5,
        marginLeft: 20,
        margin: 3,
        borderRadius: 8
    },
    cellTbale: {
        borderColor: 'black',
        // borderRightWidth: 0.5,
        padding: 3,
        alignItems: 'center',
    }
})
