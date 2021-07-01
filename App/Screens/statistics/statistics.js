import React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { GetIcon } from '../../Components/button';
import Card from '../../Components/card';
import NoDataComp from '../../Components/nodata';
export default function Statistics({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('Revenue')} >
                <GetIcon iconName={'piechart'} source={'AntDesign'} size={50} color={'#2ecc71'} />
                <Text style={styles.title} >Revenue statistics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('UsageDensity')} >
                <GetIcon iconName={'list'} source={'Feather'} size={50} color={'#1abc9c'} />
                <Text style={styles.title} >Usage density statistics</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        padding: 10,
        alignItems: 'center'

    },
    ButtonContainer: {
        width: '80%',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        margin: 10,
        textAlign: 'center'
    }
})