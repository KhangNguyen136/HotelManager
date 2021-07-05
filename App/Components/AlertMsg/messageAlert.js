import Toast from 'react-native-toast-message';

export function CheckInputFailed(title, message) {
    return (
        Toast.show({
            type: 'missingInfor',
            position: 'top',
            text1: title,
            text2: message,
            topOffset: 50,
            visibilityTime: 2000
            // autoHide: false
        })
    )
}

export function Error(title, message) {
    return (
        Toast.show({
            type: 'error',
            position: 'top',
            text1: title,
            text2: message,
            topOffset: 50,
            visibilityTime: 2000
            // autoHide: false
        })
    )
}

export function Success(title, message) {
    return (
        Toast.show({
            type: 'success',
            text1: title,
            text2: message,
            topOffset: 50,
            visibilityTime: 1000,

        })
    )
}