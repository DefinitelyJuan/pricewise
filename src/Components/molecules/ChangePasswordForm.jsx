import { StyleSheet, View } from 'react-native'
import React from 'react'
import { InputText } from '../atoms/InputText'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { PrimaryButton } from '../atoms/PrimaryButton';
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import ResultModal from "../atoms/ResultModal";
import { fromTexttoSha256 } from "../../utils";
import { VALIDATIONS } from '../../constants';

const ChangePasswordForm = (email) => {

  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  const [isEmpty, setIsEmpty] = useState(true);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const [formIsValid, setFormIsValid] = useState(null);


 	 const updatePassword = async () =>
    {
        axios.put(`https://pricewiseapi.azurewebsites.net/api/Registration/PutContrasena?correo=${email.email}&contrasena=${fromTexttoSha256(password)}`)
            .then((response) => {
            })
		setModalOpen(true);
    };

	useEffect(() => 
	{
        setFormIsValid(VALIDATIONS.passwordRegEx.test(password));
	}, [password])

	const dummy = async () =>
    {        
		return false;
    };
	
  return (
    <View style={styles.container}>
      <InputText 
            labelText={LanguageObject.changePasswordText} 
            placeholder={LanguageObject.password}
            screenUse='ChangePassword'
			onChangeText={setPassword} 
			type={'password'}
			isValid = {
                        password ? VALIDATIONS.passwordRegEx.test(password) : true
                    }
			errorMessage={LanguageObject.passwordError}
        />
		
        <PrimaryButton 
		onPressFunction={!formIsValid ? dummy : updatePassword} 
		enable = {formIsValid}
		text={LanguageObject.ChangePassword}
		/>
            <ResultModal 
                visible={modalOpen}
                buttonPress={() => {navigation.navigate('Login');setModalOpen(false)}}
                body={LanguageObject.PasswordUpdated}
            />
    </View>
  )
}

export default ChangePasswordForm

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
  
})