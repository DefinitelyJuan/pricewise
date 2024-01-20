import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

import MaterialCommunityIcons from '@expo/vector-icons/Ionicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'



const ProductCard = ({ productId, price, store, productName }) =>
{
	const navigation = useNavigation();

	const goToDetails = () => {
		navigation.navigate('ProductDetails', {product: {productId: productId, name: productName}})
	}

    return (
        <TouchableOpacity
            onPress={goToDetails}
        >
            <View style={styles.container}>
                <View style={styles.leftSide}>
                    <MaterialCommunityIcons name={'fast-food'} color={COLORS.Blue} size={29} />
                    <View style={styles.productDetails}>
                        <Text style={styles.ProductName} numberOfLines={1}>{productName}</Text>
                        <Text numberOfLines={1}>{store}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text numberOfLines={1} style={styles.price}>{`${price}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        borderRadius: 10,
        flex: 1
    },
    ProductName: {
        fontSize: 16,
        fontWeight: '500',
    },
    price: {
        fontSize: 19,
    },
    productDetails: {
      width: '77%'  
    },
    leftSide: {
        flexDirection: 'row',
        gap: 12,
        width: '65%',
        alignItems: 'center'
    },
    priceContainer: {
        width: '35%',
        alignItems: 'flex-end'
    }

})