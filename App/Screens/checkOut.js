import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import TextInputCard from '../Components/InputCard/TextInputCard';
import { updateListSttRoom } from '../Actions/roomActions';
import { useSelector, useDispatch } from 'react-redux';
import { openDatabase } from 'expo-sqlite';
import Card, { ContentCard, FlexCard } from '../Components/card';
import { ListGuestView } from '../Components/Table/listGuest';
import { BottomButton } from '../Components/button';
import { AddBill } from '../Model/billServices';
import LoadingIndicator from '../Components/loadingIndicator';
import { Success, CheckInputFailed } from '../Components/AlertMsg/messageAlert';
const db = openDatabase('userDatabase.db');
export default function CheckOut({ navigation, route }) {
    const { data, diffDays, isEdit, ID } = route.params
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)
    const [surchargeForeign, setSurchargeForeign] = React.useState(1)
    const [surchargeThird, setSurchargeThird] = React.useState(1)
    const [note, setNote] = React.useState('')
    const [total, setTotal] = React.useState(0)
    const ruleUpated = useSelector(state => state.roomState.ruleUpated)
    const isThreeGuest = data.guest.length == 3
    const haveForeignGuest = data.guest.findIndex(item => item.type == 'Foreign') != -1

    React.useEffect(() => {
        // console.log(data)
        var temp1 = 1
        var temp2 = 1

        if (isEdit) {
            setTotal(data.infor.totalAmount)
            setSurchargeThird(data.infor.surchargeThird)
            setSurchargeForeign(data.infor.surchargeForeign)
            setNote(data.infor.note)
            setLoading(false)
        }


        else
            db.transaction(tx => {
                tx.executeSql(
                    'select * from ruleTable', [],
                    (tx, result) => {
                        for (let i = 0; i < 2; i++) {
                            const temp = result.rows.item(i)
                            console.log(temp)
                            if (temp.ruleName == 'foreign')
                                temp1 = haveForeignGuest ? temp.value : 1
                            else
                                temp2 = isThreeGuest ? temp.value : 1
                        }
                    }
                )
            }, (error) => console.log(error.message)
                , () => {
                    const temp = data.infor.price * diffDays * (1 + (temp1 - 1) + (temp2 - 1))
                    setTotal(temp)
                    setSurchargeForeign(temp1)
                    setSurchargeThird(temp2)
                    setLoading(false)
                })

    }, [ruleUpated])
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => <IconButton iconName={'notifications'}
            // onPress={() => { navigation.navigate('Notification') }} />
        })
    })

    const save = () => {
        const values = {
            formID: data.infor.formID,
            paidTime: new Date(),
            nday: diffDays,
            surchargeThird: surchargeThird,
            surchargeForeign: surchargeForeign,
            totalAmount: total,
            note: note,
            roomID: data.infor.roomID
        }
        AddBill(values,
            (msg) => {
                CheckInputFailed('Action failed!', msg)
            },
            () => {
                Success('Action successful')
                dispatch(updateListSttRoom())
                navigation.popToTop()
            }
        )

    }
    const update = () => {

    }

    const onDelete = () => {

    }

    return (
        <FlexCard>
            <ScrollView>
                <ContentCard icon={'hotel'} source={'FontAwesome'} title={'Room: '} content={data.infor.roomName} />
                <ContentCard icon={'category'} source={'MaterialIcons'} title={'Room type: '} content={data.infor.type} />
                <ContentCard icon={'price-tag'} source={'Entypo'} title={'Price: '} content={data.infor.price} />
                <ContentCard icon={'calendar'} source={'AntDesign'} title={'Start date: '} content={data.infor.date.substring(0, 15)} />
                <ContentCard icon={'clockcircleo'} source={'AntDesign'} title={'Number of day: '} content={diffDays} />
                <View>
                    <ListGuestView data={data.guest} />
                </View>
                <View>
                    <ContentCard icon={'attach-money'} source={'MaterialIcons'} title={'Amount: '} content={data.infor.price * diffDays} />
                </View>
                {isThreeGuest &&
                    <ContentCard icon={'persons'} source={'Fontisto'} title={'Surcharge for third guest: '} content={surchargeThird * 100 + '%'} />
                }
                {haveForeignGuest &&
                    <ContentCard icon={'globe'} source={'FontAwesome'} title={'Surcharge for foreign guest: '} content={surchargeForeign * 100 + '%'} />
                }
                <TextInputCard value={note} placeholder={'Note'} onChangeValue={setNote} />
            </ScrollView>
            <ContentCard icon={'money-bill'} source={'FontAwesome5'} title={'Total: '} content={total} />
            <BottomButton saveTitle={'Paid'} onSave={save} onUpdate={update} onDelete={onDelete} />
            {
                loading &&
                <LoadingIndicator />
            }
        </FlexCard>

    )
}