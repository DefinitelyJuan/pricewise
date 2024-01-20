import { 
        View, 
        Text,
        TouchableOpacity,
        StyleSheet
    } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { Ionicons } from '@expo/vector-icons';


const CreateReport = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.bodyContainer}>
        <Ionicons name="add-circle" size={20} color={COLORS.White} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Blue,
    borderRadius: 10,
    paddingVertical: 8,
    paddingLeft: 20,
    width: '60%'
  },
  text: {
    color: COLORS.White,
    fontSize: 15
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});

export default CreateReport