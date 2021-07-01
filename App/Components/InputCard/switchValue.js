import React from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';

export default function SwitchValue({ title, value, onChangeValue }) {
    return (
        <View style={styles.container} >
            <Text style={styles.title} >{title}</Text>
            <Switch value={value}
                onValueChange={onChangeValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 35,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        // borderBottomColor: 'black',
        // borderBottomWidth: 0.25,
    },
    title: {
        fontSize: 18,
    },

})