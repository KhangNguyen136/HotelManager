import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { colorType } from '../../Components/InputCard/roomTypePicker';
import LoadingIndicator from '../../Components/loadingIndicator'
import { useSelector } from 'react-redux';
import { openDatabase } from 'expo-sqlite';
import TimeButton from '../../Components/TimeFilterButton'
import NoDataComp from '../../Components/nodata';
import moment from 'moment';
import { parse } from 'react-native-svg';
const db = openDatabase('userDatabase.db')

export default function UsageDensityStatistics({ navigation }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const today = new Date()
    const dayOfMonth = moment().daysInMonth(today.getMonth())
    const listRoomSttUpdated = useSelector(state => state.roomState.listRoomSttUpdated)
    const listBillUpdated = useSelector(state => state.billState.listBillUpdated)
    var tempData
    React.useEffect(() => {
        tempData = []
        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from roomTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++)
                            tempData.push({ ...result.rows.item(i), nday: 0 })
                    }
                )
            }, (error) => console.log(error.message)
            , () => {
                // console.log(tempData)
                getUsage()
            }
        )
    }, [listRoomSttUpdated, listBillUpdated])
    const getUsage = () => {
        db.transaction(
            tx => {
                for (let id in tempData) {
                    tx.executeSql(
                        'select f.date, b.paidTime from formTable f inner join billTable b on f.formID = b.formID where f.roomID = ?', [tempData[id].roomID],
                        (tx, result) => {
                            const n = result.rows.length
                            for (let i = 0; i < n; i++) {
                                const item = result.rows.item(i)
                                tempData[id].nday += getNday(item.date, item.paidTime)
                            }
                        }
                    )
                }
            }, (error) => console.log(error.message)
            , () => {
                setData(tempData)
                setLoading(false)
            }
        )
    }
    const getNday = (start, end) => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const fdayOfMonth = moment().clone().startOf('month').toDate()
        const ldayOfMonth = moment().clone().endOf('month').toDate()
        // var diffTime
        if (startDate >= fdayOfMonth && endDate <= ldayOfMonth) {
            const diffTime = Math.abs(endDate - startDate)
            return Math.ceil(diffTime / 86400000 - 0.05)
        }
        if (startDate >= fdayOfMonth && endDate > fdayOfMonth) {
            const diffTime = Math.abs(ldayOfMonth - startDate)
            return Math.ceil(diffTime / 86400000 - 0.05)
        }
        if (startDate < fdayOfMonth && endDate <= ldayOfMonth) {
            const diffTime = Math.abs(endDate - fdayOfMonth)
            return Math.ceil(diffTime / 86400000 - 0.05)
        }
        return 0
    }
    const Item = ({ item }) => {
        const percent = (item.nday / dayOfMonth * 100).toFixed(2)
        const color = colorType(item.typeID)
        return (
            <View style={{ ...styles.itemContainer, backgroundColor: color, alignItems: 'center' }} >
                <Text style={{ fontSize: 16, width: 30, marginLeft: 5 }} >{item.roomID}</Text>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center' }} >{item.roomName}</Text>
                <Text style={{ fontSize: 16, width: 110, textAlign: 'center' }} >{item.nday}</Text>
                <View style={{
                    flex: 1.5, flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-evenly',
                }} >
                    <ProgressCircle percent={percent} radius={20} borderWidth={8} color={'#e67e22'} bgColor={color} shadowColor={'#95a5a6'} />
                    <Text style={{ fontSize: 16, flex: 1, textAlign: 'center' }}> {parseFloat(percent)} %</Text>
                </View>
            </View>
        )
    }
    const Title = () => {
        return (
            <View style={{ ...styles.itemContainer, backgroundColor: '#ecf0f1' }} >
                <Text style={{ fontSize: 16, width: 30, marginLeft: 5 }} >ID</Text>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center' }} >Room</Text>
                <Text style={{ fontSize: 16, width: 110, textAlign: 'center' }} >Number of day</Text>
                <Text style={{ fontSize: 16, flex: 1.5, textAlign: 'center' }}> Usage density %</Text>

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <TimeButton />
            <View style={styles.listContainer} >
                <FlatList data={data}
                    renderItem={Item}
                    ListHeaderComponent={Title}
                    keyExtractor={item => item.roomName}
                    ListEmptyComponent={NoDataComp} />
            </View>
            {
                loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 'row',
        justifyContent: 'space-between',
        padding: 5,

    },
    listContainer: {
        // flex: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 4,
        padding: 5,
    },
    ButtonContainer: {
        width: '60%',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderBottomWidth: 0.25,
        padding: 5,
        margin: 2,
        borderRadius: 4
    },
    itemRow: {
        fontSize: 16
    }
})