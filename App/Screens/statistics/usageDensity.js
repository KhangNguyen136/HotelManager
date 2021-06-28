import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { GetIcon } from '../../Components/button';
import Card from '../../Components/card';
import LoadingIndicator from '../../Components/loadingIndicator'
import { useSelector } from 'react-redux';
import { openDatabase } from 'expo-sqlite';
import TimeButton from '../../Components/TimeFilterButton'
import NoDataComp from '../../Components/nodata';
const db = openDatabase('userDatabase.db')

export default function UsageDensityStatistics({ navigation }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const listRoomUpdated = useSelector(state => state.roomState.listRoomUpdated)
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
                        console.log(result.row)
                        for (let i = 0; i < n; i++)
                            tempData.push({ ...result.rows.item(i), nday: 0 })
                    }
                )
            }, (error) => console.log(error.message)
            , () => {
                console.log(tempData)
                getUsage()
            }
        )
    }, [listRoomUpdated, listBillUpdated])
    const getUsage = () => {
        db.transaction(
            tx => {
                for (let item in tempData) {
                    tx.executeSql(
                        'select f.date, b.paidTime from formTable f inner join billTable b on f.formID = b.formID where f.roomID = ?', [item.roomID],
                        (tx, result) => {
                            const n = result.rows.length
                            for (let i = 0; i < n; i++) {
                                const item = result.rows.item(i)
                                item.nday += GetNday(item.date, item.paidTime)
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
    const GetNday = (start, end) => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const diffTime = end - start
        return Math.ceil(diffTime / 86400000 - 0.05)
    }
    const Item = ({ item }) => {
        return (
            <View>
                <Text>{item.roomName}</Text>
                <Text>{item.nday}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <TimeButton />
            <FlatList data={data}
                renderItem={Item}
                keyExtractor={item => item.roomName}
                ListEmptyComponent={NoDataComp} />
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
    }
})