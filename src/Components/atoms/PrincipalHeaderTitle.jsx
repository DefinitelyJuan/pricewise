import { 
            View, 
            Text, 
            StyleSheet,
            TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const PrincipalHeaderTitle = ({title}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons 
        name="chevron-back" 
        size={30} 
        color={COLORS.Black} 
      />
    </TouchableOpacity>

      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default PrincipalHeaderTitle

const styles = StyleSheet.create({
    text: {
        fontSize: 35,
        fontWeight: '500',
        paddingLeft: 12,

    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
    }
})