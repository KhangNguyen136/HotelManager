import { title } from 'min-document';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GetIcon } from './button';

export default function HeaderButton({ title, onPress, iconName, source }) {
    return (
        <TouchableOpacity onPress={onPress}
            style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                flex: 1,
                alignItems: 'center'
            }} >
            <GetIcon iconName={iconName} source={source} size={20}
            />
            <Text style={{ fontSize: 14, fontWeight: '500', marginLeft: 2 }} >{title}</Text>
        </TouchableOpacity>
    )
}