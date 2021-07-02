import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { GetIcon } from '../button';

export default function SearchBox({ value, textChange, placeholder }) {
    return (
        <View style={styles.container} >
            <GetIcon iconName={'search1'} source={'AntDesign'} size={18} />
            <TextInput style={{ flex: 1, marginLeft: 5 }} value={value} onChangeText={textChange} placeholder={placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 30,
        marginHorizontal: 10,
        marginVertical: 5,
        borderColor: 'black',
        borderWidth: 0.25,
        alignItems: 'center',
        backgroundColor: '#dff9fb',
        borderRadius: 5,
        padding: 5
    }
})