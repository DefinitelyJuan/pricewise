import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';

export const LoginRememberPassword = () =>
{
    const navigation = useNavigation();
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.pressableText}>{LanguageObject.rememberPassword}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        color: COLORS.LightBlue,
    },

    text: {
        color: COLORS.LightBlue,
        fontSize: 16
    },

    pressableText: {
        color: COLORS.LightBlue,
        fontSize: 16,
        textDecorationLine: 'underline'
    }

})