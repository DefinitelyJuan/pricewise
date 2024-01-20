import
  {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
  } from 'react-native'
import {useState, useEffect} from 'react'
import RegisterForm from '../molecules/RegisterForm'
import RegisterFooter from '../molecules/RegisterFooter'
import { FirstHeader } from '../molecules/FirstHeader'
import { COLORS } from '../../constants'
import Constants from 'expo-constants'
import SearchModal from '../atoms/SearchModal'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'


const Register = () =>
{

  const [openModal, setOpenModal] = useState(true);
  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={styles.ScrollViewcontainer} showsVerticalScrollIndicator={false}>
          <FirstHeader title={LanguageObject.signUp} />
          <RegisterForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}

export default Register


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    paddingBottom: 15,
  },

  formContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    gap: 1,
  },

  ScrollViewcontainer: {
    flex: 1,
  },

  scrollViewContainer: {
    flexGrow: 1,
  },
})