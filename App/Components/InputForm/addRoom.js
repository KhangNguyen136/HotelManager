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
import { useDispatch } from 'react-redux'
import DatePickerCard from '../InputCard/datePicker';
import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');


export default function AddNewRoomForm({ isEdit, item, navigation }) {
    const [loading, setLoading] = React.useState(false)
    // const [initValue, setInitValue] = React.useState({ roomName: '', kind: 'A', note: '', price: 0, addDate: new Date() })
    const dispatch = useDispatch()
    React.useLayoutEffect(() => {
        if (isEdit)
            navigation.setOptions({ title: 'Room details' })
    })
    var initValue = { roomName: '', typeID: 1, note: '', addDate: new Date() }

    // React.useEffect(() => {
    //     if (isEdit) {
    //         db.transaction(tx => {
    //             tx.executeSql(
    //                 'select * from roomTable where ID = ?', [itemID],
    //                 (tx, results) => {
    //                     const item = results.rows.item(0)
    //                     console.log({ ...item, addDate: new Date(item.addDate) })
    //                     setInitValue({ ...item, addDate: new Date(item.addDate) })
    //                     console.log('detail values:', initValue)
    //                 }
    //             )
    //         }, (error) => CheckInputFailed('Get room information failed', error.message),
    //             () => {
    //                 console.log(initValue)
    //             }
    //         )
    //     }
    // }, []
    // )
    if (isEdit)
        initValue = { ...item, addDate: new Date(item.addDate) }
    const deleteItem = () => {
        setLoading(true)
        deleteRoom(item.roomID,
            () => {
                navigation.goBack()
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
        console.log("update values:", values)
        setLoading(true)
        updateRoom(item.roomID, values,
            () => {
                navigation.goBack()
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
                        // dispatch(upda)
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
