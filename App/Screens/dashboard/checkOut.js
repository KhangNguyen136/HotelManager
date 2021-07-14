import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import TextInputCard from '../../Components/InputCard/TextInputCard';
import { updateListSttRoom } from '../../Actions/roomActions';
import { useSelector, useDispatch } from 'react-redux';
import { openDatabase } from 'expo-sqlite';
import { ContentCard, FlexCard } from '../../Components/card';
import { ListGuestView } from '../../Components/Table/listGuest';
import { BottomButton } from '../../Components/button';
import { updateListForm } from '../../Actions/createFormActions'
import { updateListBill } from '../../Actions/billActions';
import { setFormID, setRoomID, resetState } from '../../Actions/updateActions';
import { AddBill, deleteBill, UpdateBill } from '../../Model/billServices';
import DateTimePicker from '../../Components/InputCard/dateTimePicker';
import LoadingIndicator from '../../Components/loadingIndicator';
import { updateObserve } from '../../Actions/editFormActions'
import { Success, CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
import { formatAmount } from '../../styles/globalStyles';
import confirmDelete from '../../Components/AlertMsg/confirmDelete';
const db = openDatabase('userDatabase.db');
export default function CheckOut({ navigation, route }) {
    const { data, isEdit } = route.params
    const dispatch = useDispatch()
    const formObserve = useSelector(state => state.editFormState.formObserve)
    const [loading, setLoading] = React.useState(true)
    const [surchargeForeign, setSurchargeForeign] = React.useState(1)
    const [surchargeThird, setSurchargeThird] = React.useState(1)
    const [note, setNote] = React.useState('')
    const [paidTime, setPaidTime] = React.useState(new Date())
    const startDate = new Date(data.infor.date)
    const diffTime = Math.abs(paidTime - startDate)
    var diffDays = Math.ceil(diffTime / 86400000 - 0.02)
    diffDays = diffDays > 1 ? diffDays : 1
    const ruleUpated = useSelector(state => state.roomState.ruleUpated)
    // const formUpdated = useSelector(state => state.updateState.formUpdated)
    const isUpdated = useSelector(state => state.updateState.isUpdated)
    const isThreeGuest = data.guest.length == 3
    const haveForeignGuest = data.guest.findIndex(item => item.type == 'Foreign') != -1
    const [total, setTotal] = React.useState(0)

    React.useEffect(() => {
        const tempTotal = data.infor.price * diffDays * (1 + (surchargeForeign - 1) + (surchargeThird - 1))
        setTotal(tempTotal)
    }, [diffDays])
    React.useEffect(() => {
        var temp1 = 1
        var temp2 = 1
        // setFormID(data.infor.formID)
        // setRoomID(data.infor.roomID)
        if (isEdit) {
            // setTotal(data.infor.totalAmount)
            setSurchargeThird(data.infor.surchargeThird)
            setSurchargeForeign(data.infor.surchargeForeign)
            setPaidTime(new Date(data.infor.paidTime))
            setNote(data.infor.note)
            const tempTotal = data.infor.price * diffDays * (1 + (data.infor.surchargeForeign - 1) + (data.infor.surchargeThird - 1))
            setTotal(tempTotal)
            setLoading(false)
        }
        else
            db.transaction(tx => {
                tx.executeSql(
                    'select * from ruleTable', [],
                    (tx, result) => {
                        for (let i = 0; i < 2; i++) {
                            const temp = result.rows.item(i)
                            // console.log(temp)
                            if (temp.ruleName == 'foreign')
                                temp1 = haveForeignGuest ? temp.value : 1
                            else
                                temp2 = isThreeGuest ? temp.value : 1
                        }
                    }
                )
            }, (error) => console.log(error.message)
                , () => {
                    // const temp = data.infor.price * diffDays * (1 + (temp1 - 1) + (temp2 - 1))
                    // setTotal(temp)
                    setSurchargeForeign(temp1)
                    setSurchargeThird(temp2)
                    const tempTotal = data.infor.price * diffDays * (1 + (temp1 - 1) + (temp2 - 1))
                    setTotal(tempTotal)
                    setLoading(false)
                })

    }, [ruleUpated])
    React.useEffect(() => {
        if (isUpdated) {
            dispatch(resetState())
            navigation.popToTop()
            dispatch(resetState())
            return
        }
    }, [isUpdated])

    const save = () => {
        const values = {
            formID: data.infor.formID,
            paidTime: paidTime,
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
                dispatch(updateListForm())
                if (values.formID == formObserve)
                    dispatch(updateObserve())
                navigation.popToTop()
                dispatch(resetState())
            }
        )

    }
    const update = () => {
        setLoading(true)
        const values = {
            paidTime, total, ID: data.infor.ID, nday: diffDays, note: note
        }
        // console.log(values)
        UpdateBill(values,
            (msg) => {
                CheckInputFailed('Update fail', msg)
                setLoading(false)
            },
            () => {
                Success('Update successful')
                dispatch(updateListBill())
                navigation.goBack()
            })
    }
    const clickDelete = () => {
        const title = 'Confirm delete'
        const message = "Delete bill will also delete form of this bill. Deleted data can't be recovered if you haven't sync yet. Do you want to continue?"
        confirmDelete(title, message, onDelete, () => { })
    }
    const onDelete = () => {
        deleteBill(data.infor.ID, data.infor.formID,
            (msg) => {
                CheckInputFailed('Delete fail', msg)
                setLoading(false)
            },
            () => {
                Success('Bill deleted')
                dispatch(updateListBill())
                navigation.goBack()
            }
        )
    }

    return (
        <FlexCard>
            <ScrollView>
                <ContentCard icon={'hotel'} source={'FontAwesome'} title={'Room: '} content={data.infor.roomName} />
                <ContentCard icon={'category'} source={'MaterialIcons'} title={'Room type: '} content={data.infor.type} />
                <ContentCard icon={'price-tag'} source={'Entypo'} title={'Price: '} content={formatAmount(data.infor.price)} />
                <ContentCard icon={'calendar'} source={'AntDesign'} title={'Start date: '} content={data.infor.date.substring(0, 21)} />
                <ContentCard icon={'clockcircleo'} source={'AntDesign'} title={'Number of day: '} content={diffDays} />
                <View>
                    <ListGuestView data={data.guest} />
                </View>
                <View>
                    <ContentCard icon={'attach-money'} source={'MaterialIcons'} title={'Amount: '} content={formatAmount(data.infor.price * diffDays)} />
                </View>
                {isThreeGuest &&
                    <ContentCard icon={'persons'} source={'Fontisto'} title={'Surcharge for third guest: '} content={surchargeThird * 100 + '%'} />
                }
                {haveForeignGuest &&
                    <ContentCard icon={'globe'} source={'FontAwesome'} title={'Surcharge for foreign guest: '} content={surchargeForeign * 100 + '%'} />
                }
                <DateTimePicker title={"Paid time: "} date={paidTime} onChangeDate={setPaidTime} minimumDate={startDate} />
                <TextInputCard value={note} placeholder={'Note'} onChangeValue={setNote} />
            </ScrollView>
            <ContentCard icon={'money-bill'} source={'FontAwesome5'} title={'Total: '} content={formatAmount(total)} />
            <BottomButton saveTitle={'Paid'} onSave={save} onUpdate={update} onDelete={clickDelete} isEditMode={isEdit} />
            {
                loading &&
                <LoadingIndicator />
            }
        </FlexCard>

    )
}