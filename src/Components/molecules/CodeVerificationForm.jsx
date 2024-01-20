import { StyleSheet, View } from 'react-native'
import React from 'react'
import { InputText } from '../atoms/InputText'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { PrimaryButton } from '../atoms/PrimaryButton';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import ResultModal from "../atoms/ResultModal";

const CodeVerificationForm = ({OTP, email}) => {
    const [modalOpen, setModalOpen] = useState(false);
  	const { language } = useLanguage();
  	const LanguageObject = language === 'en' ? en : es;
    const [code, setCode] = useState('');
	const navigation = useNavigation();
 	const [isEmpty, setIsEmpty] = useState(true);
	const verifyCode = () => 
	{
		OTP == code ? navigation.navigate('ChangePassword', {email: email}) : setModalOpen(true);
  	};
	
	const dummy = async () =>
    {        
		return false;
    };
	
	useEffect(() =>
    {
        (code != '') ? setIsEmpty(false) : setIsEmpty(true)

    }, [code]);
  return (
    <View style={styles.container}>
      <InputText 
            labelText={LanguageObject.codeText} 
            placeholder={LanguageObject.code}
            screenUse='CodeVerification'
			onChangeText={setCode} 
        />
		
        <PrimaryButton onPressFunction={isEmpty ? dummy : verifyCode} enable = {!isEmpty} />
        	<ResultModal 
                visible={modalOpen}
                buttonPress={() => setModalOpen(false)}
                isError={true}
                body={LanguageObject.errorMessage}
            />
    </View>
  )
}

export default CodeVerificationForm

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
  
})