import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import {
    MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome,
    AntDesign, Entypo, Fontisto, Feather, Octicons
} from '@expo/vector-icons';

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
        case 'Feather':
            return (<Feather name={iconName} size={size} color={color} />)
        case 'Octicons':
            return (<Octicons name={iconName} size={size} color={color} />)
        default:
            return (<Ionicons name={iconName} size={size} color={color} />)
    }
}

export function SaveButton({ onPress, width = '69%', title = 'Save' }) {
    return (
        <TouchableOpacity style={{ ...styles.SaveButtonContainer, width: width }} onPress={onPress} >
            <GetIcon iconName={'save'} source={'Entypo'} size={26} color={'white'} />
            <Text style={styles.saveBtnContent} > {title} </Text>
        </TouchableOpacity>
    )
}

export function MyIconButton({ onPress, title, width = 200, color = '#0be881', iconName, iconSource, iconSize = 22, iconColor = 'black' }) {
    return (
        <TouchableOpacity style={{ ...styles.MyButtonCotainer, width: width, backgroundColor: color }} onPress={onPress} >
            <GetIcon iconName={iconName} source={iconSource} size={iconSize} color={iconColor} />
            <Text style={styles.MyButtonContent} > {title} </Text>
        </TouchableOpacity>
    )
}

export function MyButton({ onPress, title, width = 200 }) {
    return (
        <TouchableOpacity style={{ ...styles.MyButtonCotainer, width: width }} onPress={onPress} >
            <Text style={styles.saveBtnContent} > {title} </Text>
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

export function BottomButton({ isEditMode, onSave, onUpdate, onDelete = null, saveTitle = 'Save' }) {
    if (isEditMode == true)
        return (
            <View style={styles.BottomBtnContainer}>
                <SaveButton onPress={onUpdate} width={'40%'} />
                <DeleteButton onPress={onDelete} />
            </View>
        )
    else
        return (
            <SaveButton onPress={onSave} width={'69%'} title={saveTitle} />
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
        MyButtonCotainer: {
            margin: 5,
            // minWidth: '40%',
            alignSelf: 'center',
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0be881',
            borderRadius: 8,
            shadowColor: '#333',
            shadowOpacity: 0.1,
            shadowOffset: { width: 1, height: 1 },

        },
        MyButtonContent: {
            fontSize: 16,
            fontWeight: '600'
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
            borderRadius: 8,
            shadowColor: '#333',
            shadowOpacity: 0.1,
            shadowOffset: { width: 1, height: 1 },
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