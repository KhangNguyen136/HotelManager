import React from 'react';
import { View } from 'react-native';
import TextInputCard from '../../Components/InputCard/TextInputCard';
import { Success, CheckInputFailed } from '../AlertMsg/messageAlert'
import Card from '../card';
import { BottomButton, SaveButton } from '../button';
import LoadingIndicator from '../loadingIndicator';
import { useDispatch, useSelector } from 'react-redux'
import PickerCard from '../InputCard/pickerCard';
import DateTimePickerCard from '../InputCard/dateTimePicker';
import ListGuest from '../Table/listGuest';
import { addForm, deleteForm, updateForm } from '../../Model/formServices';
import { resetState, setRoom, updateListForm } from '../../Actions/createFormActions';
import { updateListSttRoom } from '../../Actions/roomActions';
import PriceCard from '../InputCard/priceCard';

export default function CreateForm({ isEdit, item, navigation }) {
    const [loading, setLoading] = React.useState(false)
    const [note, setNote] = React.useState('')
    const [startDate, setStartDate] = React.useState(new Date())
    const dispatch = useDispatch()
    const roomName = useSelector(state => state.formState.room)
    const roomID = useSelector(state => state.formState.roomID)
    const price = useSelector(state => state.formState.price)
    const roomType = useSelector(state => state.formState.roomType)
    const listGuest = useSelector(state => state.formState.listGuest)
    React.useLayoutEffect(() => {
        if (isEdit) {
            navigation.setOptions({ title: 'Form details' })
        }
    })
    React.useEffect(() => {
        if (isEdit) {
            setNote(item.form.note)
            setStartDate(new Date(item.form.date))
        }
        return () => {
            dispatch(resetState())
            dispatch(setRoom('Select room', -1, 0, 0))
        }
    }, [])
    const deleteItem = () => {
        setLoading(true)
        deleteForm(item.form,
            () => {
                setLoading(false)
                dispatch(updateListForm())
                dispatch(updateListSttRoom())
                navigation.goBack()
                Success('Deleted form')
            }, (msg) => {
                CheckInputFailed(msg)
                setLoading(false)
            })
    }

    const update = () => {
        setLoading(true)
        const values = {
            formID: item.form.formID,
            date: startDate, note,
            oldRoomID: item.form.roomID
        }
        updateForm(values, listGuest, item.guest, () => {
            dispatch(updateListSttRoom())
            dispatch(updateListForm())
            navigation.goBack()
            Success('Update form successful')
        }, (msg) => {
            setLoading(false)
            CheckInputFailed(msg)
        })

    }

    const save = () => {
        if (!checkInput(roomID, listGuest)) {
            return
        }
        setLoading(true)
        addForm({ roomID, startDate, note, listGuest },
            () => {
                setLoading(false)
                Success('Add form successful')
                dispatch(resetState())
                dispatch(setRoom('Select room', -1))
                dispatch(updateListSttRoom())
                setNote('')
                setStartDate(new Date())
            },
            (msg) => {
                setLoading(false)
                CheckInputFailed('Add form failed', msg)
            })
    }

    return (

        <View>
            <Card>
                <PickerCard value={roomName} placeholder={'Select room'} type={roomType} onPress={() => {
                    const oldRoomID = item.form != undefined ? item.form.roomID : -1
                    // dispatch(setNote(setNote))
                    navigation.navigate('SelectRoom', { selectedRoom: roomName, old: oldRoomID })
                }} />
                {
                    roomID != -1 &&
                    <PriceCard value={price} />
                }
                <DateTimePickerCard date={startDate} title={'Start date: '} onChangeDate={setStartDate} />
                <TextInputCard value={note} onChangeValue={setNote} placeholder={"Note"} />
                <ListGuest navigation={navigation} data={listGuest} />
                <BottomButton isEditMode={isEdit} onSave={save} onDelete={deleteItem} onUpdate={update} />
            </Card>
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

