import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

const LargeTextInput = ({textLabel, placeholder, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{textLabel}</Text>
      <TextInput 
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.SignUpLabels}
        style = {styles.inputText}
        multiline = {true}
        numberOfLines={8}
      />
    </View>
  )
}

export default LargeTextInput

const styles = StyleSheet.create({
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '100%'
  },
  text: {
    color: COLORS.DarkBlue,
    fontWeight: '800'
  },
  container: {
    width: '100%',
  }

})