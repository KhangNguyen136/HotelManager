import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GetIcon } from '../button';
import { colorType } from '../InputCard/roomTypePicker'
import { useSelector, useDispatch } from 'react-redux'
import NoDataComp from '../nodata';
import { openDatabase } from 'expo-sqlite';
import LoadingIndicator from '../loadingIndicator';
import { setListGuest, setRoom } from '../../Actions/createFormActions';
const db = openDatabase('userDatabase.db');

export default function ListForm({ navigation }) {
    const listRoomSttUpdated = useSelector(state => state.roomState.listRoomSttUpdated)
    const listFormUpdated = useSelector(state => state.formState.listFormUpdated)
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    // const navigation = useNavigation()
    const dispatch = useDispatch()
    var tempData = []
    React.useEffect(() => {
        setLoading(true)
        db.transaction(tx => {
            tx.executeSql(
                "select f.formID , f.date, f.note, f.isPaid, r.roomID, r.roomName,t.typeID, t.price from formTable f inner join roomTable r on f.roomID = r.roomID inner join roomTypeTable t on r.typeID = t.typeID where f.isPaid = 0",
                [], (tx, formResults) => {
                    var n = formResults.rows.length
                    // console.log('Form: ', n)
                    for (let i = 0; i < n; i++) {
                        var tempItem = {
                            form: {},
                            guest: []
                        }
                        tempItem.form = formResults.rows.item(i)
                        tempData.push(tempItem)
                    }
                }
            )
        }, (error) => console.log(error),
            () => {
                getListGuest()
            }
        )

    }, [listFormUpdated, listRoomSttUpdated])
    const getListGuest = () => {
        db.transaction(tx => {
            for (let i = 0; i < tempData.length; i++)
                tx.executeSql(
                    'select * from guestTable where formID = ?', [tempData[i].form.formID],
                    (tx, guestResults) => {
                        // var item
                        for (let j = 0; j < guestResults.rows.length; j++)
                            tempData[i].guest.push(guestResults.rows.item(j))
                    }
                )
        }, (error) => console.log(error),
            () => {
                setData(tempData)
                setLoading(false)
                // console.log(tempData)
            }
        )
    }
    const Form = ({ item }) => {
        var color = colorType(item.form.typeID)
        return (
            <TouchableOpacity style={{ ...styles.itemContainer, backgroundColor: color }}
                onPress={() => {
                    {
                        navigation.push('CreateForm', { isEdit: true, formID: item.form.formID })

                    }
                }} >
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }} >{item.form.roomName}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1.5 }} >
                    <Text style={{ fontSize: 16 }}>{item.form.date.substr(0, 15)}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.form.note}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.guest.length}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const Title = () => {
        return (
            <View style={{ ...styles.itemContainer, backgroundColor: '#ecf0f1' }} >
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }} >Room</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1.5 }} >
                    <Text style={{ fontSize: 16 }}>Start date</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>Note</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>Guest</Text>
                </View>
            </View>
        )
    }
    return (
        <View>
            {/* <Text style={{ fontSize: 18, fontWeight: '400', marginBottom: 5, marginLeft: 10 }} >List guest: </Text> */}
            <Title />

            <FlatList data={data}
                renderItem={Form}
                keyExtractor={item => String(item.form.formID)}
                ListEmptyComponent={NoDataComp}
            />
            {
                loading && <LoadingIndicator />
            }

        </View>
    )


}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderBottomWidth: 0.25,
        padding: 5,
        margin: 3,
        borderRadius: 6
    },
    cellTbale: {
        borderColor: 'black',
        // borderRightWidth: 0.5,
        padding: 3,
        alignItems: 'center',
    }
})
