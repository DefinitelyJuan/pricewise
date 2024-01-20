import { 
        StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ScrollView } from 'react-native'
import React from 'react'
import { InputText } from '../atoms/InputText'
import { COLORS } from '../../constants'
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';



const SearchHome = () => {
  const navigate = useNavigation();
  const { language } = useLanguage();
  const [search, setSearch] = useState('');
  const LanguageObject = language === 'en' ? en : es;
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={LanguageObject.homeSearchPlaceholder}
        style={styles.textInput}
        onChangeText={setSearch}
        >
      </TextInput>
      <TouchableOpacity 
        style={{...styles.buttonContainer, backgroundColor: search === '' ? COLORS.gray : COLORS.Blue}} 
        disabled={search === ''}
        onPress={() => {
          navigate.push('Products', {search: search})
        }} 
      >
        <Ionicons 
          name="search" 
          size={24} 
          color={COLORS.White} 
          />
      </TouchableOpacity>
    </View>
  )
}

export default SearchHome

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        backgroundColor: COLORS.gray,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: COLORS.Black,
        width: '85%',
    },
    container: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        width: '100%',
        gap: 10
    },
    buttonContainer: {
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
    }
})