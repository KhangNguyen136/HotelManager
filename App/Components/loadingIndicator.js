import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function LoadingIndicator() {
    return (
        <View style={globalStyles.loading}>
            <ActivityIndicator color={'black'} size='large' />
        </View>
    )
}