import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { GetIcon } from '../../Components/button';
import Card from '../../Components/card';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export default function SyncData(navigation) {
    const [lastSync, setLastSync] = React.useState('2123123')
    React.useState(() => {

    })
    return (
        <SafeAreaView>
            <Card>
                <TouchableOpacity style={styles.itemContainer} >
                    <GetIcon iconName={'sync'} source={'AntDesign'} size={24} />
                    <View style={{ flex: 1, height: 50 }} >
                        <Text style={styles.content}>Sync data</Text>
                        {
                            lastSync != '' &&
                            <Text style={{ fontSize: 16, textAlign: 'center' }} >Last sync at: {lastSync.substring(0, 21)}</Text>
                        }
                    </View>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer}>
                    <GetIcon iconName={'cloud-download'} source={'FontAwesome'} size={24} color={'#81ecec'} />
                    <Text style={styles.content}>Reload data</Text>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer}>
                    <GetIcon iconName={'delete'} source={'AntDesign'} size={24} color={'#ff7675'} />
                    <Text style={styles.content}>Reset data</Text>
                    <GetIcon iconName={'caretright'} source={'AntDesign'} size={26} />

                </TouchableOpacity>
            </Card>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '',
        width: '99%'
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 3,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5
    },
    content: {
        flex: 1,
        fontSize: 18,
        marginHorizontal: 10,
        textAlign: 'center'
        // padding: 5
    }
})