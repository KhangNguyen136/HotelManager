import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { formatAmount, globalStyles } from '../../styles/globalStyles';
import Card from '../../Components/card';
import { useSelector } from 'react-redux';
import { GetIcon } from '../../Components/button';
import LoadingIndicator from '../../Components/loadingIndicator';
import { colorType } from '../../Components/InputCard/roomTypePicker';
import NoDataComp from '../../Components/nodata';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db')
export default function ListBill({ navigation }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    var tempData = []
    const listBillUpdated = useSelector(state => state.billState.listBillUpdated)
    const listRoomUpdated = useSelector(state => state.roomState.listRoomUpdated)
    const roomTypeUpdated = useSelector(state => state.roomState.roomTypeUpdated)

    React.useEffect(() => {
        tempData = []
        db.transaction(
            tx => {
                tx.executeSql(
                    'select b.ID, b.paidTime, b.nday, b.totalAmount, b.note, b.surchargeThird, b.surchargeForeign, f.date, f.formID, r.roomID, r.roomName, r.typeID, t.type, t.price from billTable b inner join formTable f on b.formID = f.formID inner join roomTable r on r.roomID = f.roomID inner join roomTypeTable t on r.typeID = t.typeID', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++)
                            insertIntoTemp(result.rows.item(i))
                    }
                )
            }, (error) => console.log(error.message),
            () => {
                if (tempData.length != 0)
                    getListGuest()
                else
                    setLoading(false)
            })

    }, [listBillUpdated, listRoomUpdated, roomTypeUpdated])
    const getListGuest = () => {
        for (let s = 0; s < tempData.length; s++) {
            const section = tempData[s]
            for (let id = 0; id < section.items.length; id++) {
                const item = section.items[id]
                db.transaction(
                    tx => {
                        tx.executeSql(
                            'select * from guestTable where formID = ?', [item.infor.formID],
                            (tx, result) => {
                                const n = result.rows.length
                                for (let i = 0; i < n; i++)
                                    item.guest.push(result.rows.item(i))
                            }
                        )
                    }, (error) => console.log(error.message)
                    , () => {
                        setData(tempData)
                        // console.log(tempData)
                        setLoading(false)
                    }
                )
            }
        }
    }
    const checkDate = () => {
        return true
    }
    const insertIntoTemp = (item) => {
        const tempItem = {
            infor: item, guest: []
        }
        const itemDate = new Date(item.paidTime)
        const itemDateString = itemDate.toString().substring(0, 15)
        for (let i = 0; i < tempData.length; i++) {
            const tempDateString = tempData[i].date.toString().substring(0, 15)
            if (tempDateString == itemDateString) {
                tempData[i].items.push(tempItem)
                tempData[i].total += item.totalAmount
                return
            }
            else if (tempData[i].date > itemDate) {
                tempData.splice(i, 0, {
                    date: itemDate, total: item.totalAmount, items: [tempItem]
                })
                return
            }
        }
        tempData.push({
            date: itemDate, total: item.totalAmount,
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
                        <Text style={{ fontSize: 16 }}>Total: {formatAmount.format(item.infor.totalAmount)}</Text>
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
                    <Text style={{ fontSize: 16, color: '#27ae60' }}>{formatAmount.format(item.total)}</Text>
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
            <Card>
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

const Title = () => {
    return (
        <View style={{ ...styles.itemContainer, backgroundColor: '#ecf0f1' }} >
            <View style={{ ...styles.cellTbale, flex: 1 }} >
                <Text style={{ fontSize: 16 }} >Room</Text>
            </View>
            <View style={{ ...styles.cellTbale, flex: 1 }} >
                <Text style={{ fontSize: 16 }}>Paid time</Text>
            </View>
            <View style={{ ...styles.cellTbale, flex: 2 }} >
                <Text style={{ fontSize: 16 }}>Amount</Text>
            </View>
            <View style={{ ...styles.cellTbale, flex: 1 }} >
                <Text style={{ fontSize: 16 }}>Note</Text>
            </View>
        </View>
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
        margin: 3
    },
    cellTbale: {
        borderColor: 'black',
        // borderRightWidth: 0.5,
        padding: 3,
        alignItems: 'center',
    }
})
