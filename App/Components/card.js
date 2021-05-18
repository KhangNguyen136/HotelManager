import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
    return (
        <View style={styles.card}>
            {/* <View style={styles.content} > */}
            {props.children}
            {/* </View> */}
        </View>
    )
}

export function FlexCard(props) {
    return (
        <View style={styles.flexCard}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 5,
    },
    container: {
        marginHorizontal: 10,
        marginVertical: 18,
        // flex: 1
    },
    flexCard: {
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 5,
        flex: 1,
    },

})