import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GetIcon } from '../button';
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';

export default function TypePicker({ kind, setKind }) {
    const items = [
        { title: 'Category A', value: 'A' },
        { title: 'Category B', value: 'B' },
        { title: 'Category C', value: 'C' }]

    var menu = null
    const didSelectType = (newKind) => {
        hideMenu()
        if (newKind != kind)
            setKind(newKind)
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
    const getTitle = (kind) => {
        switch (kind) {
            case 'A':
                return items[0].title
            case 'B':
                return items[1].title
        }
        return items[2].title
    }
    const Kind = ({ onPress, value }) => {
        const color = colorType(value)
        return (
            <TouchableOpacity style={{ ...styles.kindContainer, backgroundColor: color }} onPress={onPress} >
                <Text style={styles.kindContent} >{getTitle(value)}</Text>
                <GetIcon iconName={'down'} source={'AntDesign'} size={18} />
            </TouchableOpacity>
        )
    }
    const KindItem = ({ onPress, title }) => {
        const color = colorType(title[9])
        return (
            <TouchableOpacity style={
                {
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: color
                }} onPress={onPress}>
                <Text style={{ fontSize: 18, marginRight: 5, alignItems: 'center' }} >{title}</Text>
                <IsSelectedView isChoosen={title[9] == kind} paddingRight={18} iconSize={18} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <GetKindRoomLogo size={60} kind={kind} />

                <Text style={{ marginLeft: 10, fontSize: 18 }} >Kind of room: </Text>
            </View>
            <Menu ref={setMenuRef}
                button={<Kind onPress={showMenu} value={kind} />} >
                <KindItem onPress={() => didSelectType(items[0].value)} title={items[0].title} />
                <MenuDivider />
                <KindItem onPress={() => didSelectType(items[1].value)} title={items[1].title} />
                <MenuDivider />
                <KindItem onPress={() => didSelectType(items[2].value)} title={items[2].title} />
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

export function GetKindRoomLogo({ kind, size }) {
    switch (kind) {
        case 'A':
            return <Image source={require('../../source/KindRoom/A.png')} style={{ width: size, height: size }} />
        case 'B':
            return <Image source={require('../../source/KindRoom/B.png')} style={{ width: size, height: size }} />
        case 'C':
            return <Image source={require('../../source/KindRoom/C.png')} style={{ width: size, height: size }} />
        default:
            return <GetIcon iconName={'format-list-bulleted-type'} source={'MaterialCommunityIcons'} size={26} />
    }
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
    kindContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
        flexWrap: 'wrap'
    },
    kindContent: { fontSize: 18, fontWeight: '500', marginRight: 10 }
})

