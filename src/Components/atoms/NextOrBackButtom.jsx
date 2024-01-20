import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

const NextOrBackButtom = ({title, onPressFunction, isNext = false, isDisabled = false}) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      style={
        isNext ? 
        isDisabled ? {...styles.nextButton, opacity: 0.5} : styles.nextButton
        : isDisabled? {...styles.backButton, opacity: 0.5} : styles.backButton
      }
      disabled={isDisabled}>
        <Text style={isNext && styles.nextText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default NextOrBackButtom

const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: COLORS.DarkBlue,
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    backButton: {
        backgroundColor: COLORS.gray,
        padding: 10,
        borderRadius: 8,
        paddingHorizontal: 25,
    },
    nextText: {
        color: COLORS.White
    }
    
})