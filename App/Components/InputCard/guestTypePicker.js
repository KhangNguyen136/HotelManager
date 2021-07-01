import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GetIcon } from '../button';
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';

export default function TypePicker({ type, setType }) {

    var menu = null
    const didSelectType = (newType) => {
        hideMenu()
        if (newType != type)
            setType(newType)
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
        var color = '#f6e58d'
        if (value == 'Local')
            color = '#7bed9f'

        return (
            <TouchableOpacity style={{ ...styles.kindContainer, backgroundColor: color }} onPress={onPress} >
                <Text style={styles.kindContent} >{value}</Text>
                <GetIcon iconName={'down'} source={'AntDesign'} size={18} />
            </TouchableOpacity>
        )
    }
    const TypeItem = ({ onPress, value }) => {
        var color = '#7bed9f'
        if (value == 'Foreign')
            color = '#f6e58d'
        return (
            <TouchableOpacity style={
                {
                    flexDirection: 'row', padding: 10,
                    backgroundColor: color
                }} onPress={onPress}>
                <Text style={{ fontSize: 18, marginRight: 5, alignItems: 'center' }} >{value}</Text>
                <IsSelectedView isChoosen={value == type} paddingRight={18} iconSize={18} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                {/* <GetKindRoomLogo size={60} kind={kind} /> */}
                <GetTypeIcon type={type} />
                <Text style={{ marginLeft: 10, fontSize: 18 }} >Type of guest: </Text>
            </View>
            <Menu ref={setMenuRef} style={{ flex: 1 }}
                button={<Type onPress={showMenu} value={type} />} >
                <TypeItem onPress={() => didSelectType('Local')} value={'Local'} />
                <MenuDivider />
                <TypeItem onPress={() => didSelectType('Foreign')} value={'Foreign'} />
                <MenuDivider />
            </Menu>
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

function GetTypeIcon({ type }) {
    if (type == 'Local')
        return <GetIcon iconName={'home-floor-l'} source={'MaterialCommunityIcons'} size={28} />
    return <GetIcon iconName={'world-o'} source={'Fontisto'} />
}

export function colorType(type) {
    switch (type) {
        case 'A':
            return '#dff9fb';
        case 'B':
            return '#7bed9f';
        case 'C':
            return '#f6e58d';
        default:
            return '#ecf0f1'
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.25,
        borderColor: 'black',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    kindContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
        flexWrap: 'wrap',
        alignContent: 'center',
    },
    kindContent: { fontSize: 16, fontWeight: '500' }
})

