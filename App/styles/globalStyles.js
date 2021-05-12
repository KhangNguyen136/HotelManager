import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignSelf: 'center',
            width: '99%',
            flexDirection: 'column',
            // paddingBottom: 
            // backgroundColor: '#efeff5',
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