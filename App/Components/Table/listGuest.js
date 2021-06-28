import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GetIcon } from '../button';
import { CheckInputFailed } from '../AlertMsg/messageAlert';

export default function ListGuest({ navigation, isEdit = false, data }) {
    var id = 1
    const Guest = ({ item }) => {
        var color = '#7bed9f'
        if (item.type == 'Foreign')
            color = '#f6e58d'
        const ID = data.findIndex(i => i.IC == item.IC)
        return (
            <TouchableOpacity style={{ ...styles.itemContainer, backgroundColor: color }}
                onPress={() => {
                    navigation.navigate('AddGuest', { isEdit: true, item: item })
                }}
                accessible={isEdit} >
                <View style={{ ...styles.cellTbale, width: 25 }} >
                    <Text style={{ fontSize: 16 }} >{ID + 1}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                </View>
                <View style={{ ...styles.cellTbale, width: 65 }} >
                    <Text style={{ fontSize: 16 }}>{item.type}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.IC}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.address}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const toAddGuest = () => {
        if (data.length == 3) {
            CheckInputFailed('A room can only have 3 people')
            return
        }
        navigation.navigate('AddGuest')
    }

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: '400', marginBottom: 5, marginLeft: 10 }} >List guest: </Text>
            <FlatList data={data}
                renderItem={Guest}
                keyExtractor={item => item.IC}
                ListEmptyComponent={() => <View />}
                ListHeaderComponent={Title}
            />
            <TouchableOpacity
                style={{
                    flexDirection: 'row', padding: 5, marginTop: 5,
                    alignSelf: 'flex-end', borderRadius: 5,
                    borderColor: 'black', backgroundColor: '#81ecec', shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#333', shadowOpacity: 0.3, shadowRadius: 2,
                }} onPress={toAddGuest} >
                <GetIcon iconName={'pluscircleo'} source={'AntDesign'} size={18} />
                <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: '500' }} >Add guest</Text>
            </TouchableOpacity>
        </View>
    )


}

export function ListGuestView({ data }) {
    const Guest = ({ item }) => {
        var color = '#7bed9f'
        if (item.type == 'Foreign')
            color = '#f6e58d'
        const ID = data.findIndex(i => i.IC == item.IC)
        return (
            <View style={{ ...styles.itemContainer, backgroundColor: color }}
            >
                <View style={{ ...styles.cellTbale, width: 25 }} >
                    <Text style={{ fontSize: 16 }} >{ID + 1}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                </View>
                <View style={{ ...styles.cellTbale, width: 65 }} >
                    <Text style={{ fontSize: 16 }}>{item.type}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.IC}</Text>
                </View>
                <View style={{ ...styles.cellTbale, flex: 1 }} >
                    <Text style={{ fontSize: 16 }}>{item.address}</Text>
                </View>
            </View>
        )
    }
    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: '400', marginBottom: 5, marginLeft: 10 }} >List guest: </Text>
            <FlatList data={data}
                renderItem={Guest}
                keyExtractor={item => item.IC}
                ListEmptyComponent={() => <View />}
                ListHeaderComponent={Title}
            />
        </View>
    )
}

const Title = () => {
    return (
        <View style={{ ...styles.itemContainer, backgroundColor: "#ecf0f1" }} >
            <View style={{ ...styles.cellTbale, width: 25 }} >
                <Text style={{ fontSize: 16 }} >ID</Text>
            </View>
            <View style={{ ...styles.cellTbale, flex: 1 }} >
                <Text style={{ fontSize: 16 }}>Name</Text>
            </View>
            <View style={{ ...styles.cellTbale, width: 65 }} >
                <Text style={{ fontSize: 16 }}>Type</Text>
            </View>
            <View style={{ ...styles.cellTbale, flex: 1 }} >
                <Text style={{ fontSize: 16 }}>Identity Card</Text>
            </View>
            <View style={{ ...styles.cellTbale, flex: 1 }} >
                <Text style={{ fontSize: 16 }}>Address</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderBottomWidth: 0.25,
        // padding: 5
        borderRadius: 3
    },
    cellTbale: {
        borderColor: 'black',
        // borderRightWidth: 0.5,
        padding: 3,
        alignItems: 'center',
    }
})
