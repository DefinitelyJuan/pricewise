import
    {
        StyleSheet,
        SafeAreaView,
        TouchableWithoutFeedback,
        Keyboard,
        KeyboardAvoidingView
    } from "react-native"
import { FirstHeader } from "../molecules/FirstHeader"
import ChangePasswordForm from "../molecules/ChangePasswordForm"
import ForgotPasswordFooter from "../molecules/ForgotPasswordFooter"
import { COLORS } from "../../constants"
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization'
import { useRoute } from '@react-navigation/native'

const ChangePassword = () =>
{
	const route = useRoute();
	const { language } = useLanguage();
  	const LanguageObject = language === 'en' ? en : es;
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
                <FirstHeader
                    title={LanguageObject.ChangePassword}
                />
                <ChangePasswordForm email = {route.params.email}/>
                <ForgotPasswordFooter />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
export default ChangePassword


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.White,
    }
})