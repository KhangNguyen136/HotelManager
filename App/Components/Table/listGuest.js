import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GetIcon } from '../button';

export default function ListGuest({ navigation }) {
    const Guest = ({ item }) => {
        return (
            <View style={styles.itemContainer} >
                <Text>{item.id}</Text>
                <Text>{item.name}</Text>
                <Text>{item.type}</Text>
                <Text>{item.pid}</Text>
                <Text>{item.address}</Text>
            </View>
        )
    }
    return (
        <View>
            <Text>List guest</Text>
            <FlatList data={testData}
                renderItem={Guest}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={{
                    flexDirection: 'row', padding: 5, marginTop: 5,
                    alignSelf: 'flex-end', borderRadius: 5, borderWidth: 0.25,
                    borderColor: 'black', backgroundColor: '#81ecec'
                }} onPress={() => navigation.navigate('AddGuest')} >
                <GetIcon iconName={'pluscircleo'} source={'AntDesign'} size={18} />
                <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: '500' }} >Add new guest</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 0.25,
        padding: 5
    }
})

const testData = [
    {
        id: 'ID',
        name: 'Name',
        type: 'Type',
        pid: 'Personal identity',
        address: 'Address'
    }, {
        id: 1,
        name: 'guest 1',
        type: 'local',
        pid: '0123',
        address: 'alo123'
    }, {
        id: 2,
        name: 'guest 2',
        type: 'local',
        pid: '2345',
        address: 'alo123'
    }, {
        id: 3,
        name: 'guest 3',
        type: 'local',
        pid: '2314',
        address: 'alo123'
    }]