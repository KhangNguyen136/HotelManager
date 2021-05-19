import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetIcon } from '../button';

export default function PickerCard({ value, onPress, placeholder }) {
    var textColor = 'black'
    var iconName = ''
    var source = ''
    switch (placeholder) {
        case 'Select room':
            iconName = 'hotel'
            source = 'FontAwesome'
            break;
    }
    if (value == placeholder)
        textColor = 'gray'
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} delayPressIn={0}>
            <GetIcon iconName={iconName} source={source} />
            <View style={styles.contentArea} >
                <Text style={{ ...styles.content, color: textColor }}>{value}</Text>
            </View>
            <GetIcon iconName={'right'} source={'AntDesign'} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.25,
        borderColor: 'black',
    },
    content: {
        fontSize: 18
    },
    contentArea: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,

    }
})
