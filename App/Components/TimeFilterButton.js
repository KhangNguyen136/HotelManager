import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GetIcon } from './button';
import { listMonthName } from '../Screens/filterTime';
export default function TimeButton({ value, onpress }) {
    const month = value.getMonth()
    const year = value.getFullYear().toString()
    return (
        <TouchableOpacity style={styles.container} onPress={onpress} >
            <Text style={styles.content}>{listMonthName[month]} {year}</Text>
            <GetIcon iconName={'right'} source={'AntDesign'} size={18} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '99%',
        justifyContent: 'center',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 5,
        borderRadius: 6,
        backgroundColor: '#fff',
        margin: 4

    },
    content: {
        fontWeight: '500',
        fontSize: 16,
        marginRight: 5
    }

})