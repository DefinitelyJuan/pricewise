import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'



const StoreCard = ({ address, chain, storeName, handlePress, id}) =>
{

  	const navigation = useNavigation();

	const goToDetails = () => {
		navigation.navigate('StoreDetails', {store: {storeId: id, name: storeName, storeAddress: address, storeChain: chain}})
	}
    return (
        <TouchableOpacity
            onPress={goToDetails}
        >
            <View style={styles.container}>
                <MaterialCommunityIcons name={'storefront'} color={COLORS.Blue} size={29} style={styles.icon}/>
                <View style={styles.storeDetails}>
                    <Text style={styles.storeName} numberOfLines={1}>{storeName}</Text>
                    <Text numberOfLines={1}>{address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default StoreCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        borderRadius: 10
    },
    storeName: {
        fontSize: 17,
        fontWeight: '500',
    },
    address: {
        fontSize: 19,
        maxWidth: '25%'
    },

    storeDetails: {
        width: '60%',
        marginLeft: 20
    },
	
	icon: {
        marginLeft: 10
    }

})