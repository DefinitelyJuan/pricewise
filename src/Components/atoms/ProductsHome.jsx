import { 
        StyleSheet, 
        Text, 
        View, 
        TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS } from '../../constants';


const ProductsHome = ({name, description}) => {
  return (
    <TouchableOpacity style={styles.container} disabled>
        <View style={styles.imageContainer}>
            <Ionicons name="fast-food-outline" size={24} color={COLORS.DarkBlue} />
        </View>
        <View style={styles.descripion}>
            <Text style={styles.productName} numberOfLines={1}>{name}</Text>
            <Text style={styles.productType}>{description}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ProductsHome

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: COLORS.gray,
        borderRadius: 8,
        padding: 10,
        width: 55,
        alignItems: "center",
    },
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.White,
        borderRadius: 15,
        alignItems: 'center',
        padding: 15,
        gap: 20
    },
    productName: {
        fontSize: 22,
        fontWeight: '500'
    },
    productType: {
        fontSize: 16
    },
    descripion: {
        width: '75%'
    }
})