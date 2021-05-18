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
import { resetState, setListGuest, setRoom, updateListForm } from '../../Actions/createFormActions';
import { Formik } from 'formik';

export default function CreateForm({ isEdit, item, navigation }) {
    const [loading, setLoading] = React.useState(false)
    const [note, setNote] = React.useState('')
    const [startDate, setStartDate] = React.useState(new Date())
    var oldRoomID = -1
    React.useLayoutEffect(() => {
        if (isEdit) {
            navigation.setOptions({ title: 'Form details' })
        }
    }
    )
    React.useEffect(() => {
        if (isEdit) {
            setNote(item.form.note)
            setStartDate(new Date(item.form.date))
            oldRoomID = item.form.roomID
        }
        else {
            dispatch(resetState())
        }
    }, [])
    const dispatch = useDispatch()
    const roomName = useSelector(state => state.formState.room)
    const roomID = useSelector(state => state.formState.roomID)
    const listGuest = useSelector(state => state.formState.listGuest)
    if (isEdit) {
        const values = item.form
        // console.log(item)
        useDispatch(setRoom(values.roomName, values.roomID))
        useDispatch(setListGuest(values.guest))
    }

    const deleteItem = () => {
        setLoading(true)
        deleteForm(item.form,
            () => {
                setLoading(false)
                navigation.goBack()
                Success('Deleted form')
                dispatch(updateListForm())
                dispatch(resetState())
            }, (msg) => {
                CheckInputFailed(msg)
                setLoading(false)
            })

    }

    const update = () => {
        setLoading(true)
        const values = {
            ID: item.form.ID,
            roomID, roomName, date: startDate, note,
            oldRoomID: item.form.roomID
        }
        const newListGuest = listGuest.filter(item => item.ID != -1)
        updateForm(values, newListGuest, item.guest, () => {
            navigation.goBack()
            Success('Updated form successfully')
            dispatch(updateListForm())
            dispatch(resetState())
        }, (msg) => {
            CheckInputFailed(msg)
            setLoading(false)
        })

    }

    const save = () => {
        if (!checkInput(roomName, listGuest)) {
            return
        }
        setLoading(true)

        addForm({ roomID, roomName, startDate, note, listGuest },
            () => {
                setLoading(false)
                Success('Added form successfully!')
                dispatch(resetState())
                setNote('')
                setStartDate(new Date())
            },
            (msg) => {
                setLoading(false)
                CheckInputFailed('Add form fail!', msg)
            })
    }

    return (

        <View>
            <Card>
                <PickerCard value={roomName} placeholder={'Select room'} onPress={() => navigation.navigate('SelectRoom', { selectedRoom: roomName, oldRoomID: oldRoomID })} />
                <DateTimePickerCard date={startDate} title={'Start date: '} onChangeDate={setStartDate} />
                <TextInputCard value={note} onChangeValue={setNote} placeholder={"Note"} />
                <ListGuest navigation={navigation} />
                <BottomButton isEditMode={isEdit} onSave={save} onDelete={deleteItem} onUpdate={update} />
            </Card>
            { loading &&
                <LoadingIndicator />}
        </View>

    )
}

function checkInput(roomName, listGuest) {
    if (roomName == '') {
        CheckInputFailed("Please enter room's name!")
        return false
    }
    if (listGuest.length == 1) {
        CheckInputFailed("Please add guest!")
        return false
    }
    return true
}

