import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GetIcon } from '../button';

export default function PriceCard({ kind }) {

    return (
        <View style={styles.container} >
            <GetIcon iconName={'price-tag'} size={26} source={'Entypo'} />
            <Text style={styles.content} >Price: {getPrice(kind)}</Text>
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
        fontSize: 18,
        marginHorizontal: 5,
        // padding: 10,
        flex: 1,
        fontWeight: '500',
        textAlign: 'right'
    },
})


function getPrice(kind) {
    switch (kind) {
        case 'A':
            return 150000
        case 'B':
            return 170000
    }
    return 200000
}