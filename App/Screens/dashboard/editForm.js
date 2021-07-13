import React from 'react';
import { View } from 'react-native';
import TextInputCard from '../../Components/InputCard/TextInputCard'
import { CheckInputFailed, Success } from '../../Components/AlertMsg/messageAlert';
import Card, { FlexCard } from '../../Components/card';
import { BottomButton } from '../../Components/button';
import { globalStyles } from '../../styles/globalStyles'
import LoadingIndicator from '../../Components/loadingIndicator';
import { useDispatch, useSelector } from 'react-redux'
import PickerCard from '../../Components/InputCard/pickerCard';
import DateTimePickerCard from '../../Components/InputCard/dateTimePicker';
import ListGuest from '../../Components/Table/listGuest';
import { deleteForm, updateForm } from '../../Model/formServices';
import { setRoomEdit, setListGuest, updateObserve } from '../../Actions/editFormActions';
import { updateListForm } from '../../Actions/createFormActions';
import { updateListSttRoom } from '../../Actions/roomActions';
import { setFormID, resetState, setRoomID } from '../../Actions/updateActions';
import PriceCard from '../../Components/InputCard/priceCard';
import { formatAmount } from '../../styles/globalStyles';
import confirmDelete from '../../Components/AlertMsg/confirmDelete';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export default function EditForm({ route, navigation }) {
    const formID = route.params.formID
    const [loading, setLoading] = React.useState(false)
    const [note, setNote] = React.useState('')
    const [startDate, setStartDate] = React.useState(new Date())
    const dispatch = useDispatch()
    const isUpdated = useSelector(state => state.updateState.isUpdated)
    const formObserve = useSelector(state => state.editFormState.formObserve)
    const roomName = useSelector(state => state.editFormState.room)
    const roomID = useSelector(state => state.editFormState.roomID)
    const price = useSelector(state => state.editFormState.price)
    const roomType = useSelector(state => state.editFormState.roomType)
    const listGuest = useSelector(state => state.editFormState.listGuest)
    const [item, setItem] = React.useState({})
    React.useLayoutEffect(() => {
        navigation.setOptions({ title: 'Form details' })
    })

    React.useEffect(() => {
        if (isUpdated) {
            dispatch(resetState())
            navigation.popToTop()
            dispatch(resetState())
            return
        }

    }, [isUpdated])
    React.useEffect(() => {
        var temp = {
            form: {},
            guest: []
        }
        db.transaction(
            tx => {
                tx.executeSql(
                    'select f.formID , f.date, f.note, f.isPaid, r.roomID, r.roomName,t.typeID, t.price from formTable f inner join roomTable r on f.roomID = r.roomID inner join roomTypeTable t on r.typeID = t.typeID where f.formID = ?',
                    [formID],
                    (tx, result) => {
                        temp.form = result.rows.item(0)
                    }
                )
                tx.executeSql(
                    'select * from guestTable where formID = ?', [formID],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++)
                            temp.guest.push(result.rows.item(i))
                    }
                )
            }, (error) => console.log(error.message),
            () => {
                setNote(temp.form.note)
                setStartDate(new Date(temp.form.date))
                dispatch(setRoomEdit(temp.form.roomName, temp.form.roomID, temp.form.typeID, temp.form.price))
                dispatch(setListGuest(temp.guest))
                setItem(temp)
                // dispatch(setFormID(temp.form.formID))
                // dispatch(setRoomID(temp.form.roomID))
            }
        )

    }, [])
    const clickDelete = () => {
        const title = 'Confirm delete'
        const message = "Deleted data can't be recovered if you haven't sync yet. Do you want to continue?"
        confirmDelete(title, message, deleteItem, () => { })
    }
    const deleteItem = () => {
        setLoading(true)
        deleteForm(item.form,
            () => {
                setLoading(false)
                dispatch(updateListForm())
                dispatch(updateListSttRoom())
                if (item.form.formID == formObserve)
                    dispatch(updateObserve())
                navigation.popToTop()
                dispatch(resetState())
                Success('Deleted form')
            }, (msg) => {
                CheckInputFailed(msg)
                setLoading(false)
            })
    }

    const update = () => {
        if (!checkInput(roomID, listGuest))
            return
        setLoading(true)
        const values = {
            formID: item.form.formID,
            date: startDate, note,
            oldRoomID: item.form.roomID,
            roomID: roomID
        }
        updateForm(values, listGuest, item.guest, () => {
            dispatch(updateListSttRoom())
            dispatch(updateListForm())
            if (values.formID == formObserve)
                dispatch(updateObserve())
            navigation.popToTop()
            dispatch(resetState())
            Success('Update form successful')
        }, (msg) => {
            setLoading(false)
            CheckInputFailed(msg)
        })

    }

    return (

        <View style={globalStyles.container} >
            <FlexCard>
                <PickerCard value={roomName} placeholder={'Select room'} type={roomType} onPress={() => {
                    const oldRoomID = item.form != undefined ? item.form.roomID : -1
                    navigation.navigate('SelectRoom', { selectedRoom: roomName, old: oldRoomID })
                }} />
                {
                    roomID != -1 &&
                    <PriceCard value={formatAmount(price)} />
                }
                <DateTimePickerCard date={startDate} title={'Start date: '} onChangeDate={setStartDate} />
                <TextInputCard value={note} onChangeValue={setNote} placeholder={"Note"} />
                <ListGuest navigation={navigation} data={listGuest} />
            </FlexCard>
            <BottomButton isEditMode={true} onDelete={clickDelete} onUpdate={update} />

            {loading &&
                <LoadingIndicator />}
        </View>

    )
}

function checkInput(roomID, listGuest) {
    if (roomID == -1) {
        CheckInputFailed("Please select room!")
        return false
    }
    if (listGuest.length == 0) {
        CheckInputFailed("Please add guest!")
        return false
    }
    return true
}

