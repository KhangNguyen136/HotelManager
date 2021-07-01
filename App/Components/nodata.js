import React from 'react';
import { View, Image } from 'react-native';

export default function NoDataComp({ height = 80 }) {
    return (
        <View style={{ width: '100%', alignItems: 'center' }} >
            <Image source={require('../source/noData.png')} style={{ width: height * 1.77, height: height }} />
        </View>)
}