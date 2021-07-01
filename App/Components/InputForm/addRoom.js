import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import TextInputCard from '../InputCard/TextInputCard';
import { Success, CheckInputFailed } from '../AlertMsg/messageAlert'
import Card from '../card';
import { BottomButton } from '../button';
import TypePicker from '../InputCard/roomTypePicker';
import { addNewRoom, deleteRoom, updateRoom } from '../../Model/roomService';
import LoadingIndicator from '../loadingIndicator';
import { updateListRoom } from '../../Actions/roomActions';
import { setRoom } from '../../Actions/createFormActions';
import { updateState } from '../../Actions/updateActions'
import { useDispatch, useSelector } from 'react-redux'
import DatePickerCard from '../InputCard/datePicker';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');


export default function AddNewRoomForm({ isEdit, item, navigation }) {
    const [loading, setLoading] = React.useState(false)
    const roomObserve = useSelector(state => state.updateState.roomID)
    const roomSelected = useSelector(state => state.formState.roomID)
    // const [initValue, setInitValue] = React.useState({ roomName: '', kind: 'A', note: '', price: 0, addDate: new Date() })
    const dispatch = useDispatch()
    React.useLayoutEffect(() => {
        if (isEdit)
            navigation.setOptions({ title: 'Room details' })
    })
    var initValue = { roomName: '', typeID: 1, note: '', addDate: new Date() }

    if (isEdit)
        initValue = { ...item, addDate: new Date(item.addDate) }
    const deleteItem = () => {
        setLoading(true)
        deleteRoom(item.roomID,
            () => {
                navigation.goBack()
                if (item.roomID == roomSelected) {
                    dispatch(setRoom('Select room', -1, -1, 0))
                }
                if (item.roomID == roomObserve)
                    dispatch(updateState())
                setLoading(false)
                Success('Deleted room successfully')
                dispatch(updateListRoom())
                // dispatch(updateListSttRoom())
            },
            (msg) => {
                setLoading(false)
                CheckInputFailed('Delete room failed', msg)
            })
    }

    const update = (values) => {
        // console.log("update values:", values)
        setLoading(true)
        updateRoom(item.roomID, values,
            () => {
                navigation.goBack()
                if (roomSelected == item.roomID) {
                    dispatch(('Select room', -1, -1, 0))
                }
                if (item.roomID == roomObserve)
                    dispatch(updateState())
                setLoading(false)
                Success('Updated room successfully')
                dispatch(updateListRoom())
            }, (msg) => {
                setLoading(false)
                CheckInputFailed('Update room failed', msg)
            })
    }

    return (
        <Formik initialValues={initValue}
            onSubmit={(values) => {
                if (!checkInput(values.roomName)) {
                    setLoading(false)
                    return
                }

                addNewRoom(values,
                    () => {
                        setLoading(false)
                        Success('Added room successfully')
                        dispatch(updateListRoom())
                        navigation.goBack()
                    },
                    (msg) => {
                        setLoading(false)
                        CheckInputFailed('Added room failed', msg)
                    })
            }} >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <View>
                    <Card>
                        <TextInputCard value={values.roomName} onChangeValue={handleChange('roomName')} onBlur={handleBlur('roomName')} placeholder={"Room's name"} />

                        <TypePicker
                            setType={(typeID) => {
                                setFieldValue('typeID', typeID)
                            }} />
                        <DatePickerCard title={'Add date: '} date={values.addDate} onChangeDate={(value) => setFieldValue('addDate', value)} />
                        <TextInputCard value={values.note} onChangeValue={handleChange('note')} onBlur={handleBlur('note')} placeholder={"Note"} />
                        {/* <SaveButton onPress={handleSubmit} /> */}
                        <BottomButton isEditMode={isEdit} onSave={handleSubmit} onDelete={deleteItem} onUpdate={() => update(values)} />
                    </Card>
                    {loading &&
                        <LoadingIndicator />}
                </View>
            )}
        </Formik>
    )
}

function checkInput(roomName) {
    if (roomName == '') {
        CheckInputFailed("Please enter room's name!")
        return false
    }
    return true
}

