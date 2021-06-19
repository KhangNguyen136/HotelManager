import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { View } from 'react-native';
import Card from '../Components/card'
import { MyButton, MyIconButton } from '../Components/button';
import ListGuest from '../Components/Table/listGuest';
import { globalStyles } from '../styles/globalStyles';
import { setListGuest, resetState } from '../Actions/createFormActions';
import { useDispatch } from 'react-redux'
import { changeStt } from '../Model/roomService';
import { CheckInputFailed, Success } from '../Components/AlertMsg/messageAlert';
import { updateListSttRoom } from '../Actions/roomActions';
import { ContentCard } from '../Components/card';
import { StyleSheet } from 'react-native';

export default function RoomDetail({ navigation, route }) {
    const data = route.params.data
    const dispatch = useDispatch()
    const today = new Date()
    const startDate = new Date(data.infor.date)
    const diffTime = Math.abs(today - startDate)
    var diffDays = Math.ceil(diffTime / 86400000 - 0.1)
    diffDays = diffDays > 1 ? diffDays : 1
    const days = diffDays > 1 ? ' days' : ' day'
    console.log(data)
    React.useEffect(() => {
        dispatch(setListGuest(data.guest))
        return () => {
            dispatch(resetState())
        }
    }, [])
    React.useLayoutEffect(() => {
        navigation.setOptions({ title: data.infor.roomName })
    })
    const checkOut = () => {
        console.log('Check out')
    }

    const editInfor = () => {
        navigation.navigate('CreateForm')
    }

    const CreateRentalForm = () => {
        console.log('Create rental form')
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
                        <ContentCard icon={'note'} source={'Octicons'} content={"Note: " + data.infor.formNote} />
                        <ContentCard icon={'calendar'} source={'AntDesign'} content={'Start date: ' + data.infor.startDate} />
                        <ContentCard icon={guestIcon.icon} source={guestIcon.source} content={'Number of guest: ' + data.guest.length} />
                        <ContentCard icon={'clockcircleo'} source={'AntDesign'} content={diffDays + days} />
                        <View style={styles.ButtonContainer} >
                            <MyIconButton title={'Check out'} onPress={checkOut} width={'33%'}
                                iconName={'payment'} iconSource={'MaterialIcons'} iconColor={'black'} />
                            <MyIconButton title={'Edit infor'} onPress={editInfor} width={'33%'}
                                iconName={'edit'} iconSource={'Feather'} iconColor={'black'} />
                        </View>
                    </View>
                )
            case 'available':
                return (
                    <View>
                        <ContentCard icon={'checksquareo'} source={'AntDesign'} content={'Availabel'} />
                        <View style={styles.ButtonContainer} >
                            <MyIconButton title={'Repair room'} onPress={() => changeStateRoom('repairing')}
                                width={'36%'} iconName={'tools'} iconSource={'Entypo'} iconColor={'#2c3e50'} iconSize={20} />
                            <MyIconButton title={'Clean room'} onPress={() => changeStateRoom('cleaning')} width={'36%'}
                                iconName={'cleaning-services'} iconSource={'MaterialIcons'} />

                        </View>
                        <MyIconButton title={'Add rental form'} onPress={() => CreateRentalForm()} width={'69%'}
                            iconColor={'black'} iconSource={'AntDesign'} iconName={'form'} />
                    </View>
                )
            case 'repairing':
                return (
                    <View>
                        <ContentCard icon={'checksquareo'} source={'AntDesign'} content={'Repairing'} />
                        <MyIconButton title={'Repaired'} onPress={() => changeStateRoom('available')} width={'69%'}
                            iconColor={'#3498db'} iconSource={'MaterialCommunityIcons'} iconName={'toolbox'} />
                    </View>
                )
            case 'cleaning':
                return (
                    <View>
                        <ContentCard icon={'checksquareo'} source={'AntDesign'} content={'Cleaning'} />
                        <MyIconButton title={'Cleanned'} onPress={() => changeStateRoom('available')}
                            width={'69%'} iconSource={'MaterialCommunityIcons'} iconName={'clipboard-check-outline'} iconColor={'black'} />
                    </View>
                )

        }
    }

    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <ContentCard icon={'hotel'} source={'FontAwesome'} content={"Room: " + data.infor.roomName} />
                <ContentCard icon={'category'} source={'MaterialIcons'} content={"Room class: " + data.infor.type} />
                <ContentCard icon={'price-tag'} source={'Entypo'} content={"Price: " + data.infor.price} />
                <ContentCard icon={'note'} source={'Octicons'} content={"Room note: " + data.infor.roomNote} />

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