import { StyleSheet, View, Text } from 'react-native';
// import { header } from 'react-navigation'

export default function MyHeader({ tittle, navigation }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}> {tittle}  </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        // height: header.height,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
})