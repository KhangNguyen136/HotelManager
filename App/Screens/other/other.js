import React from 'react';
import { SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import ListRoom from '../../Components/Table/listRoom';
import HeaderButton from '../../Components/headerButton';
import RoomTypeTable from '../../Components/Table/roomType';
import RuleTable from '../../Components/Table/rule';
import { Success, CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
import firebaseApp from '../../firebaseConfig';
export default function Other({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderButton iconName={'logout'} title={'Log out'}
                source={'MaterialCommunityIcons'} onPress={logOut} />,
            headerLeft: () => <HeaderButton iconName={'sync'} source={'Ionicons'} title={'Sync data'}
                onPress={() => navigation.navigate('SyncData')} />
        })
    })

    const logOut = () => {
        firebaseApp.auth().signOut().then(() => {
            Success('Log out successful')
        }).catch((error) => {
            CheckInputFailed('Log out failed', error.message)
        })
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ListRoom />
            <RoomTypeTable navigation={navigation} />
            <RuleTable navigation={navigation} />
            {/* <Button title={'To other again'} onPress={() => navigation.push('Other', { param: 'alo' })} /> */}
        </SafeAreaView>
    )
}