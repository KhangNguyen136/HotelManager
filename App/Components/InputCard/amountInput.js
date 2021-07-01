import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { GetIcon } from '../button';
import { formatAmount } from '../../styles/globalStyles';

export default function AmountInputCard({ value, placeholder, onChangeValue, onBlur }) {
    const [amount, setAmount] = React.useState(formatAmount.format(value))
    var iconName
    var source
    switch (placeholder) {
        case 'Enter price':
            iconName = 'price-tag'
            source = 'Entypo'
            break;
    }
    const onChangeAmount = ({ newAmount }) => {
        onChangeValue(newAmount)
        setAmount(formatAmount.format(newAmount))
    }
    return (
        <View style={styles.container} >
            <GetIcon iconName={iconName} size={26} source={source} />
            <View style={styles.contentArea}>
                <TextInput style={styles.content}
                    value={amount}
                    onChangeText={onChangeAmount}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    keyboardType={'numeric'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.25,
        borderColor: 'black'
    },
    content: {
        flex: 1,
        fontSize: 18,
    },
    contentArea: {
        marginHorizontal: 5,
        padding: 10,
        flex: 1,

    }
})