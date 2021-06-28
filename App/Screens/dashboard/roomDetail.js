import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { View } from 'react-native';
import Card from '../../Components/card'
import { MyButton, MyIconButton } from '../../Components/button';
import { formatAmount, globalStyles } from '../../styles/globalStyles';
import { useSelector, useDispatch } from 'react-redux'
import { setRoom } from '../../Actions/createFormActions';
import { changeStt } from '../../Model/roomService';
import { CheckInputFailed, Success } from '../../Components/AlertMsg/messageAlert';
import { updateListSttRoom } from '../../Actions/roomActions';
import { ContentCard } from '../../Components/card';


export default function RoomDetail({ navigation, route }) {
    const data = route.params.data
    const dispatch = useDispatch()
    const listRoomSttUpdated = useSelector(state => state.roomState.listRoomSttUpdated)
    const today = new Date()
    const startDate = new Date(data.infor.date)
    const diffTime = Math.abs(today - startDate)
    var diffDays = Math.ceil(diffTime / 86400000 - 0.05)
    diffDays = diffDays > 1 ? diffDays : 1
    const days = diffDays > 1 ? ' days' : ' day'
    // var firstFlag = true
    // React.useEffect(() => {
    //     if (!firstFlag)
    //         navigation.goBack()
    //     firstFlag = false

    // }, [listRoomSttUpdated])
    React.useLayoutEffect(() => {
        navigation.setOptions({ title: data.infor.roomName })
    })
    const checkOut = () => {
        console.log('Check out')
        navigation.navigate('CheckOut', { data: data, diffDays: diffDays })
    }

    const editInfor = () => {
        // navigation.navigate('CreateFormStack')
        // navigation.navigate('CreateForm', { isEdit: true, item: data })

    }

    const CreateRentalForm = () => {
        console.log('Create rental form')
        navigation.goBack()
        dispatch(setRoom(data.infor.roomName, data.infor.roomID, data.infor.typeID, data.infor.price))
        navigation.navigate('CreateFormStack')
        // navigation.navigate('CreateForm')
    }

    const changeStateRoom = (type) => {
        changeStt(data.infor.roomID, type, (msg) => {
            CheckInputFailed('Change room stt failed: ' + msg)
        }, () => {
            Success('Change room stt successfully!')
            dispatch(updateListSttRoom())
            navigation.goBack()
        })
    }

    const Content = () => {
        switch (data.infor.stateRoom) {
            case 'occupied':
                const guestIcon = getGuestIcon(data.guest.length)
                return (
                    <View style={{ width: '100%' }} >
                        {/* <ContentCard icon={'room'} source={'Fontisto'} content={'Occupied'} /> */}
                        <ContentCard icon={'note'} source={'Octicons'} title={'Note: '} content={data.infor.formNote} />
                        <ContentCard icon={'calendar'} source={'AntDesign'} title={'Start date: '} content={data.infor.date.substring(0, 15)} />
                        <ContentCard icon={guestIcon.icon} source={guestIcon.source} title={'Number of guest: '} content={data.guest.length} />

                        <ContentCard icon={'clockcircleo'} source={'AntDesign'} title={'Number of day: '} content={diffDays + days} />
                        <View style={styles.ButtonContainer} >
                            <MyIconButton title={'Check out'} onPress={checkOut} width={'33%'}
                                iconName={'payment'} iconSource={'MaterialIcons'} iconColor={'black'} />
                            <MyIconButton title={'Edit form'} onPress={editInfor} width={'33%'} color={'#ffeaa7'}
                                iconName={'edit'} iconSource={'Feather'} iconColor={'black'} />
                        </View>
                    </View>
                )
            case 'available':
                return (
                    <View>
                        <ContentCard icon={'checksquareo'} source={'AntDesign'} title={'Room status: '} content={'Availabel'} />
                        <View style={styles.ButtonContainer} >
                            <MyIconButton title={'Repair room'} onPress={() => changeStateRoom('repairing')} color={'#ff7675'}
                                width={'36%'} iconName={'tools'} iconSource={'Entypo'} iconColor={'#2c3e50'} iconSize={20} />
                            <MyIconButton title={'Clean room'} onPress={() => changeStateRoom('cleaning')} width={'36%'}
                                iconName={'cleaning-services'} iconSource={'MaterialIcons'} color={'#81ecec'} />

                        </View>
                        <MyIconButton title={'Add rental form'} onPress={() => CreateRentalForm()} width={'69%'} color={'#ffeaa7'}
                            iconColor={'black'} iconSource={'AntDesign'} iconName={'form'} />
                    </View>
                )
            case 'repairing':
                return (
                    <View>
                        <ContentCard icon={'checksquareo'} source={'AntDesign'} title={'Room status: '} content={'Repairing'} />
                        <MyIconButton title={'Repaired'} onPress={() => changeStateRoom('available')} width={'69%'} color={'#81ecec'}
                            iconColor={'#ff7675'} iconSource={'MaterialCommunityIcons'} iconName={'toolbox'} />
                    </View>
                )
            case 'cleaning':
                return (
                    <View>
                        <ContentCard icon={'checksquareo'} source={'AntDesign'} title={'Room status: '} content={'Cleaning'} />
                        <MyIconButton title={'Cleanned'} onPress={() => changeStateRoom('available')} color={'#81ecec'}
                            width={'69%'} iconSource={'MaterialCommunityIcons'} iconName={'clipboard-check-outline'} iconColor={'black'} />
                    </View>
                )

        }
    }

    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <ContentCard icon={'hotel'} source={'FontAwesome'} title={'Room: '} content={data.infor.roomName} />
                <ContentCard icon={'category'} source={'MaterialIcons'} title={'Room type: '} content={data.infor.type} />
                <ContentCard icon={'price-tag'} source={'Entypo'} title={'Price: '} content={formatAmount(data.infor.price)} />
                <ContentCard icon={'note'} source={'Octicons'} title={"Room note: "} content={data.infor.roomNote} />

                <Content />
            </Card>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    ButtonContainer: {
        flexDirection: 'row', justifyContent: 'space-evenly', margin: 10,
    }
})

function getGuestIcon(n) {
    switch (n) {
        case 1:
            return {
                icon: 'md-person-circle-sharp',
                source: 'Ionicons'
            }
        case 2:
            return {
                icon: 'people-circle',
                source: 'Ionicons'
            }
        default:
            return {
                icon: 'persons',
                source: 'Fontisto'
            }
    }
}