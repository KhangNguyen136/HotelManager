import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GetIcon } from '../button';

export default function DateTimePickerCard({ date, onChangeDate, title, minimumDate = undefined }) {
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        onChangeDate(currentDate);
    };
    const IOSComp = () => {
        return (
            <View style={styles.contentContainer} >
                <View style={{ width: 150 }} >
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        minimumDate={minimumDate}
                    />
                </View>
                <View style={{ width: 100 }} >
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        minimumDate={minimumDate}
                    />
                </View>
            </View>
        )
    }

    const AndroidComp = () => {
        const [mode, setMode] = React.useState('date');
        const [show, setShow] = React.useState(false);
        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };

        const showDatepicker = () => {
            showMode('date');
        };

        const showTimepicker = () => {
            showMode('time');
        };
        const Output = (date, type) => {
            if (type == 'date') {
                return date.getDate() + '/' + String(date.getMonth() + 1) + '/' + date.getFullYear()
            }
            return date.getHours() + ':' + date.getMinutes()
        }
        return (
            <View style={styles.contentContainer} >
                <TouchableOpacity style={{
                    width: 150,
                    height: 30,
                    backgroundColor: '#e0e0eb',
                    borderRadius: 6,
                    alignItems: 'center',
                    alignSelf: 'center'
                }} onPress={showDatepicker}  >
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#4da6ff' }} >{Output(date, 'date')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 60,
                    height: 30,
                    backgroundColor: '#e0e0eb',
                    borderRadius: 6,
                    alignItems: 'center',
                    alignSelf: 'center'
                }} onPress={showTimepicker} >
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#4da6ff' }} >{Output(date, 'time')}</Text>
                </TouchableOpacity>
                {
                    show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )
                }
            </View >
        )
    }

    const Content = () => {
        if (Platform.OS === 'ios')
            return <IOSComp />
        return <AndroidComp />
    }
    return (
        <View>
            <Text style={{ marginHorizontal: 10, fontSize: 16 }} >{title}</Text>
            <View style={styles.container} >
                <GetIcon iconName={'calendar'} source={'FontAwesome'} size={26} />
                <Content />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        marginHorizontal: 10,
        // marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.25,
        borderBottomColor: 'black',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5,

        padding: 10,
    },
    datetime:
    {
        fontSize: 14,

    }
})
