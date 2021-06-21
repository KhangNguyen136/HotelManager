import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import TextInputCard from '../Components/InputCard/TextInputCard';
import { updateListSttRoom } from '../Actions/roomActions';
import { useSelector, useDispatch } from 'react-redux';
import { openDatabase } from 'expo-sqlite';
import Card, { ContentCard } from '../Components/card';
import ListGuest from '../Components/Table/listGuest';
const db = openDatabase('userDatabase.db');
export default function CheckOut({ navigation, route }) {
    const { data, diffDays } = route.params
    const [surchargeForeign, setSurchargeForeign] = React.useState(1)
    const [surchargeThird, setSurchargeThird] = React.useState(1)
    const [note, setNote] = React.useState('')
    const [total, setTotal] = React.useState(0)
    const ruleUpated = useSelector(state => state.roomState.ruleUpated)
    const isThreeGuest = data.guest.length == 3
    const haveForeignGuest = data.guest.find(item => item.type == 'Foreign') == -1
    React.useEffect(() => {
        console.log(data)
        db.transaction(tx => {
            tx.executeSql(
                'select * from ruleTable', [],
                (tx, result) => {
                    for (let i = 0; i < 2; i++) {
                        const temp = result.rows.item(i)
                        if (temp.ruleName == 'foreign')
                            setSurchargeForeign(temp.value)
                        else
                            setSurchargeThird(temp.value)
                    }
                }
            )
        }, (error) => console.log(error.message)
            , () => {
                const tempSurChargeThird = isThreeGuest ? surchargeThird : 1
                const tempSurChargeForeign = haveForeignGuest ? surchargeForeign : 1
                const temp = data.infor.price * diffDays * tempSurChargeForeign * tempSurChargeThird
                setTotal(temp)
                console.log('Total: ' + temp)
            })

    }, [ruleUpated])
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })

    return (
        <SafeAreaView style={globalStyles.container}>
            <Card>
                <ContentCard icon={'hotel'} source={'FontAwesome'} title={'Room: '} content={data.infor.roomName} />
                <ContentCard icon={'category'} source={'MaterialIcons'} title={'Room type: '} content={data.infor.type} />
                <ContentCard icon={'price-tag'} source={'Entypo'} title={'Price: '} content={data.infor.price} />
                <ContentCard icon={'calendar'} source={'AntDesign'} title={'Start date: '} content={data.infor.date.substring(0, 15)} />
                <ListGuest isEdit={false} data={data.guest} />

                <ContentCard icon={'clockcircleo'} source={'AntDesign'} title={'Number of day: '} content={diffDays} />
                <ContentCard icon={'attach-money'} source={'MaterialIcons'} title={'Amount: '} content={data.infor.price * diffDays} />
                {isThreeGuest &&
                    <ContentCard icon={'persons'} source={'Fontisto'} title={'Surcharge for third guest: '} content={surchargeThird * 100 + '%'} />
                }
                {haveForeignGuest &&
                    <ContentCard icon={'globe'} source={'FontAwesome'} title={'Surcharge for foreign guest: '} content={surchargeForeign * 100 + '%'} />
                }
                <ContentCard icon={'money-bill'} source={'FontAwesome5'} title={'Total: '} content={total} />
                <TextInputCard value={note} placeholder={'Note'} onChangeValue={setNote} />
            </Card>
        </SafeAreaView>
    )
}