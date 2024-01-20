import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS } from '../../constants';


const StoresHome = ({chain, direction, sector}) => {
  return (
    <TouchableOpacity style={styles.container} disabled>
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Ionicons name="basket" size={40} color={COLORS.Blue} />
            </View>
            <Text style={styles.chainText}>{chain}</Text>
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.directionText} numberOfLines={1}>{direction}</Text>
            <Text style={styles.sectorText}>{sector}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default StoresHome

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        padding: 15,
        borderRadius: 15,
        width: 215,
    },
    header: {
    },
    imageContainer: {
        backgroundColor: COLORS.lightGray,
        width: 53,
        alignItems: 'center',
        borderRadius: 9,
        padding: 5
    },
    bodyContainer: {
        marginTop: 10,
    },
    chainText: {
        marginTop: 2,
        color: COLORS.darkGray,
    },
    directionText: {
        color: COLORS.Black,
        fontSize: 18,
    },
    sectorText: {
        color: COLORS.darkGray,
    }
})