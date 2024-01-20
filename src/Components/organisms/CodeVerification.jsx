import
    {
        StyleSheet,
        SafeAreaView,
		KeyboardAvoidingView
    } from "react-native"
import { FirstHeader } from "../molecules/FirstHeader"
import CodeVerificationForm from "../molecules/CodeVerificationForm"
import ForgotPasswordFooter from "../molecules/ForgotPasswordFooter"
import { COLORS } from "../../constants"
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';
import { useRoute } from '@react-navigation/native'

const CodeVerification = () =>
{
  	const route = useRoute();
  	const { language } = useLanguage();
  	const LanguageObject = language === 'en' ? en : es;
    return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <FirstHeader title={LanguageObject.codeVerification} />
        <CodeVerificationForm OTP = {route.params.code} email = {route.params.email}/>
        <ForgotPasswordFooter/>
      </KeyboardAvoidingView>
    </SafeAreaView>
    )
} 

export default CodeVerification


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.White,
    }
})