import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { Ionicons } from '@expo/vector-icons'; 


const SettingsOption = ({optionLabel, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{optionLabel}</Text>
      <Ionicons name="chevron-forward" size={18} color="black" />
    </TouchableOpacity>
  )
}

export default SettingsOption

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: COLORS.gray,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 17
    }
})