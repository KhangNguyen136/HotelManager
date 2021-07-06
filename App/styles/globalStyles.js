import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignSelf: 'center',
            width: '99%',
            flexDirection: 'column',
            // paddingBottom: 
            // backgroundColor: '#fff',
        },
        SaveButton: {
            width: '80%',
            paddingVertical: 0,
            height: 30,
            tintColor: 'black',
            color: 'white',
            borderRadius: 8,

        },
        loading: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'white'
        }
    }
);

export const myHeaderStyle = {
    headerTitleAlgin: 'center',
}

export function formatAmount(number, haveUnit = true) {
    var temp = String(number)
    const n = temp.length
    var newN = n
    var end = n - 1
    if (n < 4)
        return haveUnit ? temp + " vnđ" : temp
    for (let id = n - 3; id > 0; id = id - 3) {
        temp = temp.substring(0, id) + '.' + temp.substring(id, newN)
        newN++
    }
    return haveUnit ? temp + " vnđ" : temp
}