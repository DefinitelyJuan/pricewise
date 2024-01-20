import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../../constants'


const TwoOptionsInput = ({
                        firstOptionName, 
                        secondOptionName, 
                        onFirstPress,
                        onSecondPress,
                        firstSelected,
                        placeholder}) => {


  return (
    <View style={styles.container}>
    <Text style={styles.labelText}>{placeholder}</Text>
        <View style={styles.optinonsContainer}>
        <TouchableOpacity 
            onPress={onFirstPress} 
            style={firstSelected ? styles.selectedOption : styles.unselectedOption}>
            <Text style={firstSelected ? styles.selectedText : styles.unselectedText}>{firstOptionName}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={onSecondPress} 
            style={!firstSelected ? styles.selectedOption : styles.unselectedOption}>
            <Text style={!firstSelected ? styles.selectedText : styles.unselectedText}>{secondOptionName}</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default TwoOptionsInput

const styles = StyleSheet.create({
    optinonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 50
        
    },
    selectedOption: {
        backgroundColor: COLORS.lightGreen,
        padding: 15,
        borderRadius: 10
    },
    unselectedOption: {
        backgroundColor: COLORS.darkGray,
        padding: 15,
        borderRadius: 10
    },
    selectedText: {
        color: COLORS.darkGray,
    },
    unselectedText: {
        color: COLORS.White,
    },
    container: {
        gap: 8,
        width: '83%',
    },
    labelText: {
        color: COLORS.DarkBlue,
        fontWeight: '700'
    }
})