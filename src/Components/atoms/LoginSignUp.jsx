import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../Localization/LanguageContext";
import { en, es } from "../Localization";

export const LoginSignUp = () =>
{

    const navigation = useNavigation();
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;

    return (
        <TouchableOpacity
            style={styles.pressable}
            onPress={() => navigation.navigate("Register")}>
            <Text style={styles.text}>{LanguageObject.signUp}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pressable: {
        minWidth: '60%',
        padding: 5,
        padding: 10,
        borderWidth: 1.8,
        borderColor: COLORS.Yellow,
        borderRadius: 18,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.Yellow,
        fontWeight: 'bold',
    }

})