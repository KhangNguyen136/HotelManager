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
import SearchBox from '../../Components/InputCard/searchBox';
const db = openDatabase('userDatabase.db')
export default function ListBill({ navigation }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [searchKey, setSearchKey] = React.useState('')
    var tempData
    // var [tempData, setTempData] = React.useState([])
    const listBillUpdated = useSelector(state => state.billState.listBillUpdated)
    const listRoomSttUpdated = useSelector(state => state.roomState.listRoomSttUpdated)
    const roomTypeUpdated = useSelector(state => state.roomState.roomTypeUpdated)

    React.useEffect(() => {
        tempData = []
        db.transaction(
            tx => {
                tx.executeSql(
                    'select b.ID, b.paidTime, b.nday, b.totalAmount, b.note, b.surchargeThird, b.surchargeForeign, f.date, f.formID, r.roomID, r.roomName, r.typeID, t.type, t.price from billTable b inner join formTable f on b.formID = f.formID inner join roomTable r on r.roomID = f.roomID inner join roomTypeTable t on r.typeID = t.typeID', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++) {
                            const tempItem = {
                                infor: result.rows.item(i),
                                guest: []
                            }
                            tx.executeSql(
                                'select * from guestTable where guestID = ?', [tempItem.infor.formID],
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

    }, [listBillUpdated, listRoomSttUpdated, roomTypeUpdated, searchKey])

    const checkDate = () => {
        return true
    }
    const search = (item) => {
        const infor = item.infor
        const key = searchKey.toLowerCase()
        if (key == '')
            return true
        if (infor.roomName.toLowerCase().includes(key) || infor.note.toLowerCase().includes(key))
            return true
        const guest = item.guest
        const nGuest = guest.length
        for (let i = 0; i < nGuest; i++) {
            if (guest[i].name.toLowerCase().includes(key))
                return true
        }
        return false
    }
    const insertIntoTemp = (tempItem) => {
        if (!search(tempItem))
            return
        const infor = tempItem.infor
        const itemDate = new Date(infor.paidTime)
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
        const day = item.infor.nday > 1 ? 'days' : 'day'
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
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 2, alignItems: 'flex-start' }} >
                    <View style={{ flexDirection: 'row', marginLeft: 3, flex: 1.5, alignItems: 'center' }} >
                        <GetIcon iconName={'attach-money'} source={'MaterialIcons'} size={16} />
                        <Text style={{ fontSize: 16 }}>Total: {formatAmount(item.infor.totalAmount, false)}</Text>
                    </View>
                    <View style={{ width: 90, flexDirection: 'row', alignItems: 'center' }} >
                        <GetIcon iconName={guestIcon} source={guestSource} size={16} />
                        <Text style={{ marginLeft: 3, fontSize: 16 }}>Guest: {nGuest}</Text>
                    </View>
                    {
                        item.infor.note !== '' &&
                        <View style={{ marginLeft: 5, alignItems: 'flex-start', flex: 1, flexDirection: 'row' }} >
                            <GetIcon iconName={'edit'} source={'AntDesign'} size={16} />
                            <Text style={{ fontSize: 16, marginLeft: 5, flex: 1 }}>Note: {item.infor.note}</Text>
                        </View>
                    }
                </View>
            </TouchableOpacity >
        )
    }
    const Section = ({ item }) => {
        return (
            <View >
                <View style={styles.sectionContainer}>
                    <Text style={{ fontSize: 16 }} >{item.date.toString().substring(0, 15)}</Text>
                    <Text style={{ fontSize: 16, color: '#27ae60' }}>{formatAmount(item.total)}</Text>
                </View>
                <FlatList data={item.items}
                    renderItem={Bill}
                    keyExtractor={item => String(item.infor.ID)}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            <TimeButton />
            <Card>
                <SearchBox value={searchKey} textChange={setSearchKey} placeholder={'Search by room name, bill note or guest name'} />
                <FlatList data={data}
                    renderItem={Section}
                    keyExtractor={item => item.date.toString()}
                    ListEmptyComponent={NoDataComp}
                // ListHeaderComponent={Title}
                />
            </Card>
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
