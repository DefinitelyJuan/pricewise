import
    {
        StyleSheet,
        SafeAreaView,
        TouchableWithoutFeedback,
        Keyboard,
        KeyboardAvoidingView
    } from "react-native"
import { FirstHeader } from "../molecules/FirstHeader"
import ForgotPasswordForm from "../molecules/ForgotPasswordForm"
import ForgotPasswordFooter from "../molecules/ForgotPasswordFooter"
import { COLORS } from "../../constants"

export const ForgotPassword = () =>
{
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
                <FirstHeader
                    title={'Recover your password'}
                />
                <ForgotPasswordForm />
                <ForgotPasswordFooter />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.White,
    }
})