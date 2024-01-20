import { StyleSheet, View } from 'react-native'
import React from 'react'
import { InputText } from '../atoms/InputText'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { PrimaryButton } from '../atoms/PrimaryButton';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import ResultModal from "../atoms/ResultModal";

import axios from 'axios'

const ForgotPasswordForm = () => {

  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  const [isEmpty, setIsEmpty] = useState(true);
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendCodeToMail = async () =>
    {
		
		OTP = generateOTP(6)
		axios.post(`https://pricewiseapi.azurewebsites.net/api/Correo/EnviarCorreo?correo=${email}&otp=${OTP}`)
            .then((response) => {             
				navigation.navigate('CodeVerification', {code: OTP, email: email})
            }).catch((error) =>
			{
				if(error.response){
					setErrorMessage(error.response.data)
					setModalOpen(true)
				}        
			})
    	};

	const generateOTP = (length) => 
	{
		const digits = '0123456789';
		let OTP = '';
		for (let i = 0; i < length; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
		}
		return OTP;
  	};

	const dummy = async () =>
    {        
		return false;
    };
	
	useEffect(() =>
    {
        (email != '') ? setIsEmpty(false) : setIsEmpty(true)

    }, [email]);
  return (
    <View style={styles.container}>
      <InputText 
            labelText={LanguageObject.emailText} 
            placeholder={LanguageObject.email}
            screenUse='ForgotPassword'
			onChangeText={setEmail} 
        />
		
        <PrimaryButton onPressFunction={isEmpty ? dummy : sendCodeToMail} enable = {!isEmpty} />
		<ResultModal 
			visible={modalOpen}
			buttonPress={() => setModalOpen(false)}
			isError={true}
			body={errorMessage}
		/>
    </View>
  )
}

export default ForgotPasswordForm

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
  
})