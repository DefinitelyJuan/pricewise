import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { COLORS } from '../../constants'

const ChainOption = ({isSelected = true, text, onPress}) => {

    return (
    <TouchableOpacity 
        style={isSelected ? styles.container : styles.notSelectedContainer} 
        onPress={onPress}>
        <Text style={isSelected ? styles.text : styles.notSelectedText}>
        {text}
        </Text>
    </TouchableOpacity>
    )
}

export default ChainOption

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.darkGray,
        borderRadius: 10,
        padding: 5,
        
    },
    text: {
        textAlign: 'center',
        color: COLORS.darkGray
    },

    notSelectedText: {
        textAlign: 'center',
        color: COLORS.lightGray
    },

    notSelectedContainer: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 10,
        padding: 5,
        
    },
})