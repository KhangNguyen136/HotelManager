import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GetIcon } from './button';
export default function TimeButton({ title, onpress }) {
    return (
        <TouchableOpacity style={styles.container} onpress={onpress} >
            <Text style={styles.content}>This month</Text>
            <GetIcon iconName={'right'} source={'AntDesign'} size={18} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '96%',
        justifyContent: 'center',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#f5f6fa',
        margin: 4

    },
    content: {
        fontWeight: '500',
        fontSize: 16,
        marginRight: 5
    }

})