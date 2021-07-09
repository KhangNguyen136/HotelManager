import React from 'react';
import { TouchableOpacity, View, Text, FlatList, SafeAreaView, StyleSheet, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { IsSelectedView } from '../Components/InputCard/roomTypePicker';
import { FlexCard } from '../Components/card';
import { GetIcon, MyButton } from '../Components/button';
import { useDispatch } from 'react-redux';
import HeaderButton from '../Components/headerButton';
import Menu, { MenuItem } from 'react-native-material-menu';
import { setFilterBill, setFilterRevenue, setFilterUsageDensity } from '../Actions/filterActions'
const today = new Date()

const getListYear = () => {
    var result = []
    for (let i = today.getFullYear(); i >= 2000; i--)
        result.push({
            value: i, label: i
        })
    return result
}

export default function FilterTime({ navigation, route }) {

    var { selectedValue, type } = route.params
    const selectedDate = new Date(selectedValue)
    const [month, setMonth] = React.useState(selectedDate.getMonth())
    const [year, setYear] = React.useState(selectedDate.getFullYear())
    const [listMonth, setListMonth] = React.useState([])
    const [listYear] = React.useState(getListYear())
    const dispatch = useDispatch()

    React.useEffect(() => {
        getListMonth()
    }, [year])

    const getListMonth = () => {
        var result = []
        if (year == today.getFullYear()) {
            for (let i = 0; i <= today.getMonth(); i++) {
                result.push({
                    label: listMonthName[i],
                    value: [i]
                })
            }
            setListMonth(result)
            return
        }
        for (let i = 0; i < 12; i++)
            result.push({
                label: listMonthName[i],
                value: [i]
            })
        setListMonth(result)
    }

    var monthMenu = null
    const setMonthMenuRef = ref => {
        monthMenu = ref
    };
    const hideMonthMenu = () => {
        if (monthMenu != null)
            monthMenu.hide();
    };
    const showMonthMenu = () => {
        // if (menu != null)
        monthMenu.show();
    };
    var yearMenu = null
    const setYearMenuRef = ref => {
        yearMenu = ref
    };
    const hideYearMenu = () => {
        if (yearMenu != null)
            yearMenu.hide();
    };
    const showYearMenu = () => {
        // if (menu != null)
        yearMenu.show();
    };

    const didSelectMonth = (value) => {
        setMonth(value)
        hideMonthMenu()
    }
    const didSelectYear = (value) => {
        setYear(value)
        if (value == today.getFullYear() && month > today.getMonth()) {
            setMonth(0)
        }
        hideYearMenu()
    }
    const done = ({ }) => {
        var result = new Date()
        result.setFullYear(year)
        result.setMonth(month)
        switch (type) {
            case 'listBill':
                dispatch(setFilterBill(result))
                break;
            case 'revenue':
                dispatch(setFilterRevenue(result))
                break;
            case 'usageDensity':
                dispatch(setFilterUsageDensity(result))
                break;
        }
        navigation.goBack()
    }
    const Content = ({ title, onPress }) => {
        return (
            <TouchableOpacity style={{ ...styles.contentContainer, backgroundColor: '#55efc4' }} onPress={onPress} >
                <Text style={styles.title} >{title}</Text>
                <GetIcon iconName={'down'} source={'AntDesign'} size={18} />
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container} >
            <FlexCard>
                <View style={styles.section}>
                    <Text style={styles.title}>Month: </Text>
                    <Menu ref={setMonthMenuRef} button={<Content title={listMonthName[month]} onPress={showMonthMenu} />}
                    >
                        <FlatList data={listMonth}
                            keyExtractor={item => item.label}
                            renderItem={({ item }) => <MenuItem style={styles.item} onPress={() => didSelectMonth(item.value)} >{item.label}</MenuItem>} />
                    </Menu>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Year: </Text>
                    <Menu ref={setYearMenuRef} button={<Content title={year.toString()} onPress={showYearMenu} />}
                    >
                        <FlatList data={listYear}
                            keyExtractor={item => item.value.toString()}
                            renderItem={({ item }) => <MenuItem style={styles.item} onPress={() => didSelectYear(item.value)} >{item.label}</MenuItem>} />
                    </Menu>
                </View>
                {/* <View style={{ height: 40 }} /> */}

            </FlexCard>
            <MyButton title={'Done'} onPress={done} />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        // justifyContent: 'space-evenly',
        alignSelf: 'center',
        width: '99%'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        paddingHorizontal: 5
    },
    contentContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
        flexWrap: 'wrap',
    },
    item: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        backgroundColor: '#55efc4',
        fontSize: 18
    }
})

export const listMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']