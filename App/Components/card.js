import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { GetIcon } from './button';

export default function Card(props) {
    return (
        <View style={styles.card}>
            {props.children}
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

export function ContentCard({ content, textColor = 'black', icon, source, size = 24, color = 'black' }) {
    return (
        <View style={styles.container} >
            <GetIcon iconName={icon} size={size} source={source} color={color} />
            <View style={styles.contentArea} >
                <TextInput style={{ color: textColor }} editable={false} value={content} />
            </View>
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
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.25,
        borderColor: 'black'
    },
    contentArea: {
        marginHorizontal: 5,
        padding: 10,
        flex: 1,
    },
    content: {
        fontSize: 18,

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