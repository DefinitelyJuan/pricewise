import
    {
        StyleSheet,
        SafeAreaView,
        TouchableWithoutFeedback,
        Keyboard,
        KeyboardAvoidingView,
        View
    } from "react-native"
import { LoginForm } from "../molecules/LoginForm"
import { FirstHeader } from "../molecules/FirstHeader"
import { LoginFooter } from "../molecules/LoginFooter"
import { COLORS } from "../../constants"
import { useLanguage } from "../Localization/LanguageContext"
import { en, es } from "../Localization"


export const Login = () =>
{
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : 'null'} style={styles.keyboardAvoiding}>
                    <FirstHeader title={LanguageObject.login} />
                    <LoginForm />
                    <LoginFooter />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },

    keyboardAvoiding: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.White,
    }
})

