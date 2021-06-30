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
import { resetState, setRoom, updateListForm, setListGuest } from '../../Actions/createFormActions';
import { updateListSttRoom } from '../../Actions/roomActions';
import { updateState } from '../../Actions/updateActions'
import PriceCard from '../InputCard/priceCard';
import { formatAmount } from '../../styles/globalStyles';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export default function CreateForm({ isEdit, formID, navigation }) {
    const [loading, setLoading] = React.useState(false)
    const [note, setNote] = React.useState('')
    const [startDate, setStartDate] = React.useState(new Date())
    const dispatch = useDispatch()
    const roomObserve = useSelector(state => state.updateState.roomID)
    const formObserve = useSelector(state => state.updateState.formID)
    const roomName = useSelector(state => state.formState.room)
    const roomID = useSelector(state => state.formState.roomID)
    const price = useSelector(state => state.formState.price)
    const roomType = useSelector(state => state.formState.roomType)
    const listGuest = useSelector(state => state.formState.listGuest)
    const [item, setItem] = React.useState({})
    React.useLayoutEffect(() => {
        if (isEdit) {
            navigation.setOptions({ title: 'Form details' })
        }
    })
    React.useEffect(() => {
        if (isEdit) {
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
                    dispatch(setRoom(temp.form.roomName, temp.form.roomID, temp.form.typeID, temp.form.price))
                    dispatch(setListGuest(temp.guest))
                    setItem(temp)
                }
            )

        }
        return () => {
            dispatch(resetState())
        }
    }, [])

    const deleteItem = () => {
        setLoading(true)
        deleteForm(item.form,
            () => {
                setLoading(false)
                dispatch(updateListForm())
                dispatch(updateListSttRoom())
                if (item.form.formID == formObserve || item.form.roomID == roomObserve)
                    dispatch(updateState())
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
            oldRoomID: item.form.roomID,
            roomID: roomID
        }
        updateForm(values, listGuest, item.guest, () => {
            dispatch(updateListSttRoom())
            dispatch(updateListForm())
            console.log({ roomObserve, formObserve })
            if (values.formID == formObserve || values.roomID == roomObserve || values.oldRoomID == roomObserve)
                dispatch(updateState())
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
                dispatch(updateListSttRoom())
                console.log({ roomObserve, formObserve })
                if (roomID == roomObserve)
                    dispatch(updateState())

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
                    <PriceCard value={formatAmount(price)} />
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

