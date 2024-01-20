import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';


const ProductPriceCard = ({name, price}) => {
  return (
    <TouchableOpacity style={styles.container} disabled>
        <View style={styles.bodyContainer}>
            <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
            <Text style={styles.priceText}>{price}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ProductPriceCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        padding: 15,
        borderRadius: 15,
        width: 215,
    },
    bodyContainer: {
        marginTop: 10,
    },
    nameText: {
        color: COLORS.Black,
        fontSize: 18,
    },
    priceText: {
        color: COLORS.successGreen,
    }
})