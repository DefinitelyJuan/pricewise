import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialIcons';

const DetailCard = ({text, handlePress, iconName, title }) =>
{
    return (
        <TouchableOpacity
            onPress={handlePress}
        >
            <View style={styles.container}>
                <MaterialCommunityIcons name={iconName} color={COLORS.Blue} size={29} />
                <View style={styles.details}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
                    <Text style={styles.cardText} numberOfLines={1}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DetailCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 20,
        gap: 10
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    cardText: {
        fontSize: 15,
        fontWeight: '400'
    },

    details: {
        width: '75%',
        marginLeft: 2
    }

})