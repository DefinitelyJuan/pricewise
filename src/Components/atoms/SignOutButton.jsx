import { 
            StyleSheet, 
            Text, 
            View,
            TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { Ionicons } from '@expo/vector-icons'; 
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';


const SignOutButton = ({onPress}) => {
  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={onPress}
    >
      <Text style={styles.text}>{LanguageObject.signOut}</Text>
      <Ionicons name="md-exit-outline" size={24} color={COLORS.White} />
    </TouchableOpacity>
  )
}

export default SignOutButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.signOut,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 18,
    },
    text: {
        fontSize: 20,
        color: COLORS.White,
        fontWeight: '500'
    }
})