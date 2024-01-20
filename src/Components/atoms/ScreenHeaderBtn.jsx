import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';



const ScreenHeaderBtn = ({type}) => {
  const navigation = useNavigation();
  return (
    type === 'icon' 
    ?
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Feather name="settings" size={30} color="black" />
      </TouchableOpacity>

    :
      <TouchableOpacity 
        style={{width: 57, height: 57}}
        onPress={() => navigation.navigate('Home')}
      >
        <Image 
          source={require('../../../assets/logo.png')}
          style={{width: '100%', height: '100%' }}
          resizeMode='contain'
        />
      </TouchableOpacity>
  )
}

export default ScreenHeaderBtn

const styles = StyleSheet.create({
  headerImg: {
    width:'100%',
    height:'100%',
  }
});