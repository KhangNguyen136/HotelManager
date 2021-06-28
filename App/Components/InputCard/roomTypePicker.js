import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { formatAmount } from '../../styles/globalStyles';
import { GetIcon } from '../button';
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';
import PriceCard from './priceCard';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');


export default function TypePicker({ setType }) {
    const [items, setItems] = React.useState(initItems)
    const [value, setValue] = React.useState({ typeID: 0, type: '', price: 0 })
    // const [price, setPrice] = React.useState(0)
    React.useEffect(() => {
        const temp = []
        db.transaction(tx => {
            tx.executeSql(
                'select * from roomTypeTable', [],
                (tx, results) => {
                    const n = results.rows.length
                    for (let i = 0; i < n; i++)
                        temp.push(results.rows.item(i))
                }
            )
        }, (error) => {
            console.log('Get roomType error: ' + error.message)
        },
            () => {
                // console.log(temp)
                setValue(temp[0])
                setItems(temp)
            }
        )
    }, [])

    var menu = null
    const didSelectType = (newValue) => {
        hideMenu()
        if (newValue.type != value.type) {
            setValue(newValue)
            setType(newValue.typeID)
        }
    };
    const setMenuRef = ref => {
        menu = ref
    };
    const hideMenu = () => {
        if (menu != null)
            menu.hide();
    };
    const showMenu = () => {
        // if (menu != null)
        menu.show();
    };
    const Type = ({ onPress, value }) => {
        const color = colorType(value.typeID)
        return (
            <TouchableOpacity style={{ ...styles.typeContainer, backgroundColor: color }} onPress={onPress} >
                <Text style={styles.typeContent} >{value.type}</Text>
                <GetIcon iconName={'down'} source={'AntDesign'} size={18} />
            </TouchableOpacity>
        )
    }
    const KindItem = ({ onPress, item }) => {
        const color = colorType(item.typeID)
        return (
            <TouchableOpacity style={
                {
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: color
                }} onPress={onPress}>
                <Text style={{ fontSize: 18, marginRight: 5, alignItems: 'center' }} >{item.type}</Text>
                <IsSelectedView isChoosen={item.type == value.type} paddingRight={18} iconSize={18} />
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={styles.container} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <GetRoomTypeLogo size={60} typeID={value.typeID} />
                    <Text style={{ marginLeft: 10, fontSize: 18 }} >Room type: </Text>
                </View>
                <Menu ref={setMenuRef}
                    button={<Type onPress={showMenu} value={value} />} >
                    <KindItem onPress={() => didSelectType(items[0])} item={items[0]} />
                    <MenuDivider />
                    <KindItem onPress={() => didSelectType(items[1])} item={items[1]} />
                    <MenuDivider />
                    <KindItem onPress={() => didSelectType(items[2])} item={items[2]} />
                    <MenuDivider />
                </Menu>
            </View>
            <PriceCard value={formatAmount(value.price)} />
        </View>
    )
}

export const IsSelectedView = ({ isChoosen, paddingRight = 0, iconSize = 24 }) => {
    if (isChoosen)
        return (
            <View>
                <GetIcon iconName={'checkcircle'} source={'AntDesign'} color={'blue'} size={iconSize} />
            </View>
        )
    return (
        <View style={{ width: paddingRight }} />
    )
}

export function GetRoomTypeLogo({ typeID, size }) {
    switch (typeID) {
        case 1:
            return <Image source={require('../../source/KindRoom/A.png')} style={{ width: size, height: size }} />
        case 2:
            return <Image source={require('../../source/KindRoom/B.png')} style={{ width: size, height: size }} />
        case 3:
            return <Image source={require('../../source/KindRoom/C.png')} style={{ width: size, height: size }} />
        default:
            return <GetIcon iconName={'format-list-bulleted-type'} source={'MaterialCommunityIcons'} size={26} />
    }
}

export function colorType(typeID) {
    switch (typeID) {
        case 1:
            return '#48dbfb';
        case 2:
            return '#7bed9f';
        case 3:
            return '#f6e58d';
        default:
            return '#ecf0f1'
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        marginHorizontal: 10,
        // marginVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.25,
        borderColor: 'black',
        justifyContent: 'space-between',
        // paddingVertical: 10
    },
    typeContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
        flexWrap: 'wrap',
    },
    typeContent: {
        fontSize: 18, fontWeight: '500',
        marginRight: 10,
        marginLeft: 5,
        textAlign: 'center',
        // flex: 1
    }
})

const initItems = [
    {
        typeID: 1,
        type: 'init-1',
        price: 150000
    },
    {
        typeID: 2,
        type: 'init-2',
        price: 170000
    },
    {
        typeID: 3,
        type: 'init-3',
        price: 200000
    },
]
