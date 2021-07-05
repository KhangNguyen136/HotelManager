import React from 'react';
import { SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import ListRoom from '../../Components/Table/listRoom';
import HeaderButton from '../../Components/headerButton';
import RoomTypeTable from '../../Components/Table/roomType';
import RuleTable from '../../Components/Table/rule';
export default function Other({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderButton iconName={'account-box'} title={'Account'}
                source={'MaterialIcons'} onPress={() => navigation.navigate('AccountActions')} />,
            headerLeft: () => <HeaderButton iconName={'database'} source={'AntDesign'} title={'Data'}
                onPress={() => navigation.navigate('SyncData')} />
        })
    })



    return (
        <SafeAreaView style={globalStyles.container}>
            <ListRoom />
            <RoomTypeTable navigation={navigation} />
            <RuleTable navigation={navigation} />
            {/* <Button title={'To other again'} onPress={() => navigation.push('Other', { param: 'alo' })} /> */}
        </SafeAreaView>
    )
}