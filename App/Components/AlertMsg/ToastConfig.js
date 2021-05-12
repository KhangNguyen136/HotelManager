import Toast from 'react-native-toast-message';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GetIcon } from '../button';

const toastConfig = {
    missingInfor: ({ text1, text2, props, ...rest }) => (
        <View style={styles.container}>
            <GetIcon iconName={'warning'} source={'AntDesign'} size={30} color={'white'} />
            <View style={styles.textContainer} >
                <Text style={styles.title} >{text1}</Text>
                <Text style={styles.content} >{text2}</Text>
            </View>
        </View>
    ),
    info: () => { },
    any_custom_type: () => { }
};

export default toastConfig;

const styles = StyleSheet.create({
    container: {
        // width: '69%',
        borderRadius: 20,
        backgroundColor: 'orange',
        padding: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    textContainer: {
        marginHorizontal: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white'
    },
    content: {
        color: 'white',
        fontWeight: '500',

    }
})