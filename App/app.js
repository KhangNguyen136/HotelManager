import React from 'react';
import MainRoute from './Route/mainRoute'
import { Provider } from 'react-redux';
import store from './appStore';
import Toast from 'react-native-toast-message';
import Config from './Components/AlertMsg/ToastConfig';
import AuthStack from './Route/Stack/auth';
import SplashScreen from './Screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import initDatabase from './Model/initDatabase';

export default function App() {
    const [logIn, setLogIn] = React.useState()
    React.useEffect(() => {
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
        firebaseApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                // console.log('Log in')
                setLogIn('logIn')
                initDatabase()
            } else {
                // No user is signed in.
                // console.log('Not log in')
                setLogIn('notLogIn')
            }
        });
    }, [])

    switch (logIn) {
        case 'logIn':
            return (
                <Provider store={store} >
                    <NavigationContainer>
                        <MainRoute />
                    </NavigationContainer>
                    <Toast config={Config} ref={(ref) => Toast.setRef(ref)} />
                </Provider>
            );
        case 'notLogIn':
            return (
                <Provider store={store} >
                    <NavigationContainer>
                        <AuthStack />
                    </NavigationContainer>
                    <Toast config={Config} ref={(ref) => Toast.setRef(ref)} />
                </Provider>
            )
        default:
            return (
                <SplashScreen />
            )
    }
}
