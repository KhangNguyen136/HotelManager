import { Alert } from 'react-native';

export default function confirmDelete(title, message, onOk, cancel) {
    Alert.alert(
        title,
        message,
        [
            {
                text: 'Continue',
                onPress: onOk,
                style: 'destructive'
            },
            {
                text: 'Cancel',
                onPress: cancel,
                style: 'cancel'
            }
        ],
    )
}