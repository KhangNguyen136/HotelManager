import Toast from 'react-native-toast-message';

export function CheckInputFailed(title, message) {
    return (
        Toast.show({
            type: 'missingInfor',
            position: 'top',
            text1: title,
            text2: message,
            topOffset: 50,
            visibilityTime: 0.1
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
            visibilityTime: 0.0
        })
    )
}