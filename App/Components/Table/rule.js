import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { GetIcon, IconButton } from '../button';
import Card from '../card';
import { useSelector } from 'react-redux'
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export default function RuleTable({ navigation }) {
    const [data, setData] = React.useState([])
    const ruleUpdated = useSelector(state => state.roomState.ruleUpdated)
    React.useEffect(() => {
        var temp = []

        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from ruleTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++)
                            temp.push(result.rows.item(i))
                        // console.log(temp)
                    }
                )
            }, (error) => console.log(error.message),
            () => setData(temp)
        )
    }, [ruleUpdated])
    const Item = ({ item }) => {
        var icon = 'globe'
        var source = 'FontAwesome'
        var value = (item.value * 100) + "%"
        var title = 'Surcharge for foreign guest: '
        if (item.ruleName != 'foreign') {
            icon = 'persons'
            source = 'Fontisto'
            value = (item.value * 100) + "%"
            title = 'Surcharge for third guest: '
        }
        return (
            <View>
                <View style={styles.typeContainer} >
                    <GetIcon iconName={icon} source={source} size={22} />
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }} >
                        <Text style={styles.typeContent} >{title}</Text>
                        <Text style={styles.typeContent} >{value}</Text>

                    </View>
                    <IconButton iconName={'edit'} source={'Feather'} size={24} onPress={() => navigation.navigate('EditRule', { type: 'rule', ID: item.ruleID })} />
                </View>
            </View >
        )
    }
    return (
        <Card>
            <Text style={styles.typeContent} >Rule : </Text>
            <FlatList data={data}
                renderItem={Item}
                keyExtractor={item => item.ruleName}
                scrollEnabled={false}
            />
        </Card>
    )

}

const styles = StyleSheet.create({
    typeContainer: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
        flexWrap: 'wrap',
    },
    typeContent: {
        fontSize: 16, fontWeight: '500',
        marginRight: 10,
        marginLeft: 5,
        // textAlign: 'center',
        // flex: 1
    }
})