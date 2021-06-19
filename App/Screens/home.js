import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import ListSttRoom from '../Components/Table/listSttRoom';
import { openDatabase } from 'expo-sqlite';
import { CheckInputFailed } from '../Components/AlertMsg/messageAlert';
const db = openDatabase('userDatabase.db');
// import SearchBox from 
export default function Home({ navigation }) {
    const [source, setSource] = React.useState([])
    React.useEffect(() => {
        const temp = []
        db.transaction(tx => {
            tx.executeSql(
                'select typeID, type from roomTypeTable', [],
                (tx, result) => {
                    const n = result.rows.length
                    for (let i = 0; i < n; i++)
                        temp.push(result.rows.item(i))
                }
            )

        }, () => {
            CheckInputFailed('Database error')
        }, () => {
            // console.log(temp)
            setSource(temp)
        }
        )
    }, [])
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })
    const TypeSection = ({ item }) => {
        return (
            <View style={styles.listContainer} >
                <ListSttRoom navigation={navigation} type={item.type} typeID={item.typeID} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={source}
                renderItem={TypeSection}
                keyExtractor={item => item.type} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        width: '99%',
        // backgroundColor: 'red'
    },
    listContainer: {
        height: '33%',
        flex: 1,
        // maxHeight: '33%',
        borderRadius: 8,
        backgroundColor: '#fff',

        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 2,
        marginVertical: 3,
        padding: 5,
    }
})