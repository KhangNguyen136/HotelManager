import Toast from 'react-native-toast-message';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GetIcon } from '../button';

const toastConfig = {
    missingInfor: ({ text1, text2, props, ...rest }) => (
        <View style={styles.container}>
            <GetIcon iconName={'warning'} source={'AntDesign'} size={30} color={'#f1c40f'} />
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
        minWidth: '50%',
        borderRadius: 10,
        backgroundColor: '#95a5a6',
        paddingVertical: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    },
    textContainer: {
        marginHorizontal: 10,
        // flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        // color: 'white',
        textAlign: 'center'
    },
    content: {
        // color: 'white',
        fontSize: 16,
        fontWeight: '500',

    }
})