import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome, AntDesign, Entypo, Fontisto } from '@expo/vector-icons';
import Card from './card';

export function IconButton({ iconName, onPress, source, size, color = 'black' }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconButton}>
                <GetIcon iconName={iconName} source={source} size={size} color={color} />
            </View>
        </TouchableOpacity>
    );
}

export function GetIcon({ iconName, source, size = 24, color = 'black' }) {
    switch (source) {
        case 'Fontisto':
            return <Fontisto name={iconName} size={size} color={color} />
        case 'Entypo':
            return <Entypo name={iconName} size={size} color={color} />
        case 'AntDesign':
            return <AntDesign name={iconName} size={size} color={color} />
        case 'FontAwesome5':
            return <FontAwesome5 name={iconName} size={size} color={color} />
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={size} color={color} />
        case 'MaterialCommunityIcons':
            return (<MaterialCommunityIcons name={iconName} size={size} color={color} />)
        case 'MaterialIcons':
            return (<MaterialIcons name={iconName} size={size} color={color} />)
        default:
            return (<Ionicons name={iconName} size={size} color={color} />)
    }
}

export function SaveButton({ onPress, width = '69%' }) {
    return (
        <TouchableOpacity style={{ ...styles.SaveButtonContainer, width: width }} onPress={onPress} >
            <GetIcon iconName={'save'} source={'Entypo'} size={26} color={'white'} />
            <Text style={styles.saveBtnContent} > Save </Text>
        </TouchableOpacity>
    )
}

export function LoginButton({ onPress, title }) {
    return (
        <TouchableOpacity style={{ ...styles.SaveButtonContainer, width: '100%' }} onPress={onPress} >
            <Text style={styles.saveBtnContent} > {title} </Text>
        </TouchableOpacity>
    )
}

export function DeleteButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.DeleteButtonContainer} onPress={onPress} >
            <GetIcon iconName={'delete'} source={'MaterialIcons'} size={26} color={'red'} />
            <Text style={styles.DeleteButtonContent} > Delete </Text>
        </TouchableOpacity>
    )
}

export function BottomButton({ isEditMode, onSave, onUpdate, onDelete = null }) {
    if (isEditMode == true)
        return (
            <View style={styles.BottomBtnContainer}>
                <SaveButton onPress={onUpdate} width={'40%'} />
                <DeleteButton onPress={onDelete} />
            </View>
        )
    else
        return (
            <SaveButton onPress={onSave} width={'69%'} />
        )
}

const styles = StyleSheet.create(
    {
        iconButton: {
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 5,
            justifyContent: 'center',
        },
        SaveButtonContainer: {
            margin: 10,
            minWidth: '40%',
            alignSelf: 'center',
            flexDirection: 'row',
            padding: 8,
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: '#3399ff',
            borderRadius: 8
        },
        saveBtnContent: {
            color: 'white',
            fontSize: 20,
            fontWeight: '600'
        },
        DeleteButtonContainer: {
            margin: 10,
            width: '40%',
            alignSelf: 'center',
            flexDirection: 'row',
            padding: 8,
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: 'red',
            backgroundColor: 'white'
        },
        DeleteButtonContent: {
            color: 'red',
            fontSize: 20,
            fontWeight: '500'
        },
        BottomBtnContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        },

    }
)