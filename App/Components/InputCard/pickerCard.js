import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetIcon } from '../button';

export default function PickerCard({ value, onPress, placeholder, type }) {
    var textColor = 'black'
    var iconName = ''
    var source = ''
    switch (placeholder) {
        case 'Select room':
            iconName = 'hotel'
            source = 'FontAwesome'
            break;
    }
    const IconLeft = () => {
        if (value == placeholder)
            return <GetIcon iconName={iconName} source={source} />
        else
            switch (type) {
                case 1:
                    return <Image source={require('../../source/KindRoom/A.png')} style={styles.img} />
                case 2:
                    return <Image source={require('../../source/KindRoom/B.png')} style={styles.img} />
                default:
                    return <Image source={require('../../source/KindRoom/C.png')} style={styles.img} />

            }
    }
    if (value == placeholder)
        textColor = 'gray'
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} delayPressIn={0}>
            <IconLeft />
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

    },
    img: {
        width: 24,
        height: 24
    }
})
