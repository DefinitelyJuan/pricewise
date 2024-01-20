import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants';
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'


const SearchButton = ({handlePress}) => {
  const { language, setLanguage } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={handlePress}
    >
      <Text style={styles.text}>{LanguageObject.search}</Text>
      <Ionicons name='search' color={COLORS.White} size={20}/>
    </TouchableOpacity>
  )
}

export default SearchButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: COLORS.Blue,
        padding: 6,
        justifyContent: 'center',
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
        color: COLORS.White,

    }
})