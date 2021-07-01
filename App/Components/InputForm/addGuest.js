import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import TextInputCard from '../../Components/InputCard/TextInputCard';
import { Success, CheckInputFailed } from '../AlertMsg/messageAlert'
import Card from '../card';
import { BottomButton } from '../button';
import TypePicker from '../InputCard/guestTypePicker';
import LoadingIndicator from '../loadingIndicator';
import { addGuest, deleteGuest, updateGuest } from '../../Actions/createFormActions';
import { addGuestEdit, updateGuestEdit, deleteGuestEdit } from '../../Actions/editFormActions'
import { useDispatch } from 'react-redux'

export default function AddGuest({ navigation, route }) {
    const { isEdit, item, isDashboard } = route.params
    // console.log(isDashboard)
    React.useLayoutEffect(() => {
        if (isEdit)
            navigation.setOptions({ title: 'Guest details' })
    })
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    var initValue = { name: '', type: 'Local', IC: '', address: '', note: '' }
    if (isEdit) {
        initValue = item
    }

    const deleteItem = () => {
        setLoading(true)
        if (isDashboard)
            dispatch(deleteGuestEdit(item.IC))
        else
            dispatch(deleteGuest(item.IC))
        navigation.goBack()
    }

    const update = (values) => {
        setLoading(true)
        const newGuest = {
            name: values.name, type: values.type, IC: values.IC, note: values.note
        }
        if (!isDashboard)
            dispatch(updateGuest(item, values,
                () => {
                    Success('Update successful')
                    navigation.goBack()
                },
                () => {
                    CheckInputFailed("Same identity card")
                    setLoading(false)
                }
            ))
        else
            dispatch(updateGuestEdit(item, values,
                () => {
                    Success('Update successful')
                    navigation.goBack()
                },
                () => {
                    CheckInputFailed("Same identity card")
                    setLoading(false)
                }
            ))
    }

    return (
        <Formik initialValues={initValue}
            onSubmit={(values) => {
                setLoading(true)
                if (!checkInput(values)) {
                    setLoading(false)
                    return
                }
                if (!isDashboard)
                    dispatch(addGuest(values,
                        () => {
                            Success('Add guest successful')
                            navigation.goBack()
                        },
                        () => {
                            CheckInputFailed("Same identity card")
                            setLoading(false)
                        }))
                else
                    dispatch(addGuestEdit(values,
                        () => {
                            Success('Add guest successful')
                            navigation.goBack()
                        },
                        () => {
                            CheckInputFailed("Same identity card")
                            setLoading(false)
                        }))
            }} >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <View>
                    <Card>
                        <TextInputCard value={values.name} onChangeValue={handleChange('name')} onBlur={handleBlur('name')} placeholder={"Guest's name"} />
                        <TypePicker type={values.type} setType={(value) => setFieldValue('type', value)} />
                        <TextInputCard value={values.IC} onChangeValue={handleChange('IC')} onBlur={handleBlur('IC')} placeholder={"Identity card"} />
                        <TextInputCard value={values.address} onChangeValue={handleChange('address')} onBlur={handleBlur('address')} placeholder={"Address"} />
                        <TextInputCard value={values.note} onChangeValue={handleChange('note')} onBlur={handleBlur('note')} placeholder={"Note"} />
                        <BottomButton isEditMode={isEdit} onSave={handleSubmit} onDelete={deleteItem} onUpdate={() => update(values)} />
                    </Card>
                    {loading &&
                        <LoadingIndicator />}
                </View>
            )}
        </Formik>
    )
}

function checkInput(values) {
    if (values.name == '') {
        CheckInputFailed("Please enter guest's name!")
        return false
    }
    if (values.IC == '') {
        CheckInputFailed("Please enter guest's identity card!")
        return false
    }
    if (values.address == '') {
        CheckInputFailed("Please enter guest's address!")
        return false
    }
    return true
}

