import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Card from '../Components/card';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../Components/loadingIndicator';
import { colorType } from '../Components/InputCard/roomTypePicker';
import NoDataComp from '../Components/nodata';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db')
export default function ListBill({ navigation }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    var tempData = []
    const listBillUpdated = useSelector(state => state.formState.listBillUpdated)
    React.useEffect(() => {
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
                getListGuest()
            })

    }, [listBillUpdated])
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
                        console.log(tempData)
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
        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i].date.getTime() === itemDate.getTime()) {
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
        const color = colorType(item.infor.typeID)
        return (
            <TouchableOpacity style={{ ...styles.itemContainer, backgroundColor: color }}
                onPress={() => navigation.navigate('CheckOut', { isEdit: true, data: item, diffDays: item.infor.nday })}>
                <View style={{ ...styles.cellTbale, flex: 1.5 }} >
                    <Text style={{ fontSize: 16 }} >Room:{item.infor.roomName}</Text>
                </View>
                <View style={{ ...styles.cellTbale, width: 60 }} >
                    <Text style={{ fontSize: 16 }}>{item.infor.paidTime.substring(16, 21)}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1.5 }} >
                    <Text style={{ fontSize: 16 }}>{item.infor.totalAmount}</Text>
                </View>
                <View style={{ ...styles.cellTbale, width: 60 }} >
                    <Text style={{ fontSize: 16 }}>Guest: {item.guest.length}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>Note: {item.infor.note}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const Section = ({ item }) => {
        return (
            <View >
                <View style={styles.sectionContainer}>
                    <Text style={{ fontSize: 16 }} >{item.date.toString().substring(0, 15)}</Text>
                    <Text style={{ fontSize: 16, color: '#55efc4' }}>{item.total}</Text>
                </View>
                <FlatList data={item.items}
                    renderItem={Bill}
                    keyExtractor={item => String(item.ID)}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
