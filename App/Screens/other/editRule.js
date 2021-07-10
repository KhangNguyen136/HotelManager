import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { SaveButton } from '../../Components/button';
import Card, { ContentCard } from '../../Components/card';
// import AmountInputCard from '../../Components/InputCard/amountInput';
import TextInputCard from '../../Components/InputCard/TextInputCard'
import { openDatabase } from 'expo-sqlite'
import { useDispatch } from 'react-redux';
import { updateRoomType, updateRule } from '../../Actions/roomActions';
import { Success, CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
const db = openDatabase('userDatabase.db');

export default function EditRule({ navigation, route }) {
    const { type, ID } = route.params
    const dispatch = useDispatch()
    const [name, setName] = React.useState('')
    const [value, setValue] = React.useState(0)
    React.useLayoutEffect(() => {
        const title = type == 'roomType' ? 'Edit room type' : 'Edit surcharge'
        navigation.setOptions({
            title: title
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })
    React.useEffect(() => {
        db.transaction(tx => {
            if (type == 'roomType')
                tx.executeSql(
                    'select * from roomTypeTable where typeID = ?', [ID],
                    (tx, result) => {
                        const data = result.rows.item(0)
                        // console.log(data)
                        setName(data.type)
                        setValue(data.price)
                    }
                )
            else
                tx.executeSql(
                    'select * from ruleTable where ruleID = ?', [ID],
                    (tx, result) => {
                        const data = result.rows.item(0)
                        setName(data.ruleName)
                        setValue(data.value)
                    }
                )
        }
        )
    }, [])
    var icon = 'persons'
    var source = 'Fontisto'
    var title = 'Surcharge for third guest'
    if (type == 'foreign') {
        icon = 'globe'
        title = 'Surcharge for foreign guest'
        source = 'FontAwesome'
    }
    const save = () => {
        // console.log('save')
        if (!checkInput())
            return
        db.transaction(
            tx => {
                if (type == 'roomType')
                    tx.executeSql(
                        'update roomTypeTable set type = ?, price = ? where typeID = ?', [name, value, ID],
                        (tx, result) => {
                            console.log(result.rowsAffected)
                        }
                    )
                else
                    tx.executeSql(
                        'update ruleTable set value = ? where ruleID = ?', [value, ID],
                        (tx, result) => {
                            console.log(result.rowsAffected)
                        }
                    )
            }, (error) => CheckInputFailed('Action failed!', error.message)
            , () => {
                if (type == 'roomType') {
                    dispatch(updateRoomType())
                }
                else {
                    dispatch(updateRule())
                }
                Success('Change successful')
                navigation.goBack()
            }
        )
    }

    const checkInput = () => {
        if (type == 'roomType') {
            if (name == '') {
                CheckInputFailed('Please enter room type!')
                return false
            }
            if (value <= 0) {
                CheckInputFailed('Invalid price!')
                return false
            }
            return true
        }
        if (value < 1) {
            CheckInputFailed('Invalid surcharge!')
            return false
        }
        return true
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            {type == 'roomType' &&
                <Card>
                    <TextInputCard value={name} onChangeValue={setName} placeholder={'Enter room type'} />
                    <TextInputCard value={value.toString()} onChangeValue={setValue} placeholder={'Enter price'} keyboardType={'decimal-pad'} />
                </Card>
            }
            {
                type != 'roomType' &&
                <Card>
                    <ContentCard icon={icon} source={source} title={title} />
                    <TextInputCard value={value.toString()} onChangeValue={setValue} placeholder={title} keyboardType={'numeric'} />
                </Card>
            }
            <SaveButton width={'69%'} onPress={save} />
        </SafeAreaView>
    )
}