import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, Dimensions, FlatList, View } from 'react-native';
import { GetIcon } from '../../Components/button';
import Card, { ContentCard } from '../../Components/card';
import TimeButton from '../../Components/TimeFilterButton';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart } from 'react-native-chart-kit';
import { colorType, GetRoomTypeLogo } from '../../Components/InputCard/roomTypePicker'
import LoadingIndicator from '../../Components/loadingIndicator';
import { openDatabase } from 'expo-sqlite';
import { formatAmount } from '../../styles/globalStyles';
const db = openDatabase('userDatabase.db')

export default function RevenueStatistics({ navigation }) {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    // console.log(data)
    const [total, setTotal] = React.useState(0)
    const filterTime = useSelector(state => state.filterState.filterRevenue)
    const listBillUpdated = useSelector(state => state.billState.listBillUpdated)
    const roomTypeUpdated = useSelector(state => state.roomState.roomTypeUpdated)
    var tempData
    React.useEffect(() => {
        tempData = {
            total: 0,
            data: []
        }
        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from roomTypeTable', [],
                    (tx, result) => {
                        for (let i = 0; i < 3; i++) {
                            const item = result.rows.item(i)
                            tempData.data.push({
                                name: item.type,
                                typeID: item.typeID,
                                total: 0,
                                color: colorType(item.typeID),
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15
                            })
                        }
                    }
                )
            }, (error) => console.log(error.message),
            GetData
        )

    }, [listBillUpdated, roomTypeUpdated, filterTime]
    )
    const GetData = () => {
        db.transaction(
            tx => {
                tx.executeSql(
                    'select b.totalAmount, t.typeID, t.type, b.paidTime from billTable b inner join formTable f on b.formID = f.formID inner join roomTable r on f.roomID = r.roomID inner join roomTypeTable t on r.typeID = t.typeID', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++)
                            Insert(result.rows.item(i))
                    }
                )
            },
            (error) => console.log(error.message)
            , () => {
                var tempTotal = 0
                for (let i = 0; i < 3; i++)
                    tempTotal += tempData.data[i].total
                setTotal(tempTotal)
                setData(tempData.data)
                // console.log(tempData.data)
                setLoading(false)
            }
        )
    }

    const CheckDate = (dateStr) => {
        const date = new Date(dateStr)
        // const today = new Date()
        if (date.getMonth() == filterTime.getMonth() && date.getFullYear() == filterTime.getFullYear())
            return true
        return false
    }
    const Insert = (item) => {
        if (!CheckDate(item.paidTime))
            return
        for (let i = 0; i < 3; i++) {
            // console.log(tempData.data[i])
            if (item.type == tempData.data[i].name) {
                tempData.data[i].total += item.totalAmount
            }
        }
    }
    const Item = ({ item }) => {
        var percent = parseFloat(item.total / total * 100).toFixed(2)
        if (percent == 'NaN')
            percent = 0
        return (
            <Card>
                <ContentCard icon={'category'} source={'MaterialIcons'} size={22} title={'Room type: '} content={item.name} />
                <ContentCard icon={'attach-money'} source={'MaterialIcons'} size={22} title={'Total revenue: '} content={formatAmount(item.total)} />
                <ContentCard icon={'label-percent-outline'} source={'MaterialCommunityIcons'} size={22} title={'Percent: '} content={percent + " %"} />
                <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}
                    onPress={() => navigation.navigate('HistoryBill', { type: 'revenue', typeID: item.typeID, time: filterTime.toString(), typeName: item.name })}>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 5 }}>Detail </Text>
                    <GetIcon iconName={'right'} source={'AntDesign'} size={18} />
                </TouchableOpacity>
            </Card >
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <TimeButton value={filterTime} onpress={() => {
                navigation.navigate('FilterTime', { selectedValue: filterTime.toString(), type: 'revenue' })
            }} />
            <Card>
                <PieChart data={data}
                    width={Dimensions.get('window').width}
                    height={200}
                    accessor={'total'}
                    backgroundColor={'transparent'}
                    avoidFalseZero={true}
                    chartConfig={chartConfig}
                    paddingLeft={"15"}
                    absolute={true}
                />
                <Text style={{
                    textAlign: 'center',
                    fontSize: 18, fontWeight: '500'
                }}> Total: {formatAmount(total)}</Text>
            </Card>

            <FlatList renderItem={Item}
                data={data}
                keyExtractor={item => item.name}
            />

            {
                loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const styles = StyleSheet.create({
    container: {
        // flex: 'row',
        justifyContent: 'space-between',
        padding: 5,
        flex: 1,
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