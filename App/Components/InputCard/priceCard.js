import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GetIcon } from '../button';

export default function PriceCard({ value }) {

    return (
        <View style={styles.container} >
            <GetIcon iconName={'price-tag'} size={26} source={'Entypo'} />
            <View style={styles.contentContainer} >
                <Text style={styles.content} >Price: </Text>
                <Text style={styles.content}>{value} vnđ</Text>
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
        fontSize: 18,
        marginHorizontal: 5,
        // padding: 10,
        fontWeight: '500',
        textAlign: 'right'
    },
    contentContainer: {
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

