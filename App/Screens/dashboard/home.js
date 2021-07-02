import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import HeaderButton from '../../Components/headerButton';
import { useSelector } from 'react-redux'
import ListSttRoom from '../../Components/Table/listSttRoom';
import { openDatabase } from 'expo-sqlite';
import { CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
import SearchBox from '../../Components/InputCard/searchBox';
import LoadingIndicator from '../../Components/loadingIndicator'
const db = openDatabase('userDatabase.db');
// import SearchBox from 
export default function Home({ navigation }) {
    const [source, setSource] = React.useState(initRoomType)
    const [loading, setLoading] = React.useState(true)
    const [searchKey, setSearchKey] = React.useState('')
    const roomTypeUpdated = useSelector(state => state.roomState.roomTypeUpdated)
    React.useEffect(() => {
        const temp = []
        db.transaction(tx => {
            tx.executeSql(
                'select typeID, type, price from roomTypeTable', [],
                (tx, result) => {
                    const n = result.rows.length
                    for (let i = 0; i < n; i++)
                        temp.push(result.rows.item(i))
                }
            )

        }, (error) => {
            CheckInputFailed('Database error', error.message)
        }, () => {
            console.log('Dashboard loaded data')
            setSource(temp)
            setLoading(false)
        }
        )
    }, [roomTypeUpdated])
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <HeaderButton iconName={'plus-square'} source={'Feather'}
                        title={'Add room'} onPress={() => { navigation.push('AddRoom') }} />
                )
            },
            headerRight: () => {
                return (
                    <HeaderButton iconName={'history'} source={'MaterialIcons'}
                        title={'List bill'} onPress={() => { navigation.navigate('ListBill') }} />
                )
            }
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            {/* {!loading && */}
            <View style={{ flex: 1 }} >
                <SearchBox value={searchKey} textChange={setSearchKey} placeholder={'Search by room name, guest name or form note'} />
                {/* {
                    searchKey == '' && */}
                <View style={{ flex: 1 }} >
                    <View style={styles.listContainer}>
                        <ListSttRoom navigation={navigation} type={source[0].type}
                            typeID={source[0].typeID} price={source[0].price} searchKey={searchKey.toLowerCase()} />
                    </View>
                    <View style={styles.listContainer}>
                        <ListSttRoom navigation={navigation} type={source[1].type}
                            typeID={source[1].typeID} price={source[1].price} searchKey={searchKey.toLowerCase()} />
                    </View>
                    <View style={styles.listContainer}>
                        <ListSttRoom navigation={navigation} type={source[2].type}
                            typeID={source[2].typeID} price={source[2].price} searchKey={searchKey.toLowerCase()} />
                    </View>
                </View>
                {/* } */}
            </View>
            {/* } */}
            {loading &&
                <LoadingIndicator />
            }
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
        // height: '33%',
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

const initRoomType = [
    {
        typeID: 1,
        type: 'A'
    },
    {
        typeID: 2,
        type: 'B'
    },
    {
        typeID: 3,
        type: 'C'
    },

]