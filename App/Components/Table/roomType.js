import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { GetIcon, IconButton } from '../button';
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';
import Card from '../card';
import { useSelector } from 'react-redux'
import { openDatabase } from 'expo-sqlite';
import { colorType, GetRoomTypeLogo } from '../InputCard/roomTypePicker';
const db = openDatabase('userDatabase.db');

export default function RoomTypeTable({ navigation }) {
    const [data, setData] = React.useState([])
    const roomTypeUpdated = useSelector(state => state.roomState.roomTypeUpdated)
    React.useEffect(() => {
        var temp = []

        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from roomTypeTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++)
                            temp.push(result.rows.item(i))
                        // console.log(temp)
                    }
                )
            }, (error) => console.log(error.message),
            () => setData(temp)
        )
    }, [roomTypeUpdated])
    const Item = ({ item }) => {
        const color = colorType(item.typeID)

        return (
            <View>
                <View style={{ ...styles.typeContainer, backgroundColor: color }} >
                    <GetRoomTypeLogo typeID={item.typeID} />
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }} >
                        <Text style={styles.typeContent} >{item.type} </Text>
                        <Text style={styles.typeContent} >Price: {item.price}</Text>
                    </View>
                    <IconButton iconName={'edit'} source={'Feather'} size={24} onPress={() => navigation.navigate('EditRule', { type: 'roomType', ID: item.typeID })} />
                </View>
            </View >
        )
    }
    return (
        <Card>
            <Text style={styles.typeContent} >Room type: </Text>
            <FlatList data={data}
                renderItem={Item}
                keyExtractor={item => item.type}
            />
        </Card>
    )

}

const styles = StyleSheet.create({
    typeContainer: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
        flexWrap: 'wrap',
    },
    typeContent: {
        fontSize: 16, fontWeight: '500',
        marginRight: 10,
        marginLeft: 5,
        // textAlign: 'center',
        // flex: 1
    }
})