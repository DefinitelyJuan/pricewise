import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateField from 'react-native-datefield';
import { COLORS } from '../../constants';
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';



const DatePickerInput = ({placeholder, setDate}) =>
{

  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  return (
    <View>
    <Text style={styles.placeholder}>{placeholder}</Text>
      <DateField
        labelDate={LanguageObject.inputDay}
        labelMonth={LanguageObject.inputMonth}
        labelYear={LanguageObject.inputYear}
        onSubmit={setDate}
        styleInput={styles.inputBorder}
        containerStyle={{gap: 14}}        
    />
    </View>
  )
}

export default DatePickerInput

const styles = StyleSheet.create({
  placeholder: {
    color: COLORS.DarkBlue,
    fontWeight: '800',
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: COLORS.Blue,
    padding: 8,
    borderRadius: 10,
  }

})