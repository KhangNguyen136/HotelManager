import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { GetIcon } from '../button';

export default function TextInputCard({ value, placeholder, onChangeValue, onBlur, keyboardType = 'default', isEdit = true }) {
    var iconName
    var source
    switch (placeholder) {
        case 'Identity card':
            iconName = 'idcard'
            source = 'AntDesign'
            break;
        case 'Address':
            iconName = 'address'
            source = 'Entypo'
            break;
        case "Note":
            iconName = 'text'
            source = 'Entypo'
            break;
        case 'Enter price':
            iconName = 'price-tag'
            source = 'Entypo'
            break;
        case 'Phone number or Email':
            iconName = 'user-circle-o'
            source = 'FontAwesome'
            break;
        // case 'Enter room name':
        //     iconName =
        //     source = 
        default:
            iconName = 'pencil-square-o'
            source = 'FontAwesome'
    }
    return (
        <View style={styles.container} >
            <GetIcon iconName={iconName} size={26} source={source} />
            <View style={styles.contentArea}>
                <TextInput style={styles.content}
                    value={value}
                    onChangeText={onChangeValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    keyboardType={keyboardType}
                    editable={isEdit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.25,
        borderColor: 'black'
    },
    content: {
        flex: 1,
        fontSize: 18,
    },
    contentArea: {
        marginHorizontal: 5,
        padding: 10,
        flex: 1,

    }
})