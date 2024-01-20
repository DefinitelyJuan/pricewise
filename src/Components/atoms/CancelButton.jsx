import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';


const CancelButton = ({ onPressFunction }) =>
{
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
    return (
        <View>
            <TouchableOpacity
                style={styles.pressable}
                onPress={onPressFunction}
            >
                <Text style={styles.text}>{LanguageObject.cancel}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CancelButton

const styles = StyleSheet.create({
    pressable: {
        backgroundColor: COLORS.Red,
        padding: 6,
        width: 150,
        borderRadius: 30,
    },
    text: {
        fontWeight: '800',
        color: COLORS.White,
        textAlign: 'center',
        fontSize: 16
    }
})