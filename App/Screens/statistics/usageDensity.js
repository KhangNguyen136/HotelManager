import React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { GetIcon } from '../../Components/button';
import Card from '../../Components/card';
import NoDataComp from '../../Components/nodata';
export default function UsageDensityStatistics({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <Text>Usage density statistics</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 'row',
        justifyContent: 'space-between',
        padding: 5,

    },
    ButtonContainer: {
        width: '60%',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    }
})