import { 
        StyleSheet, 
        View, 
        ActivityIndicator} from 'react-native'
import { InputText } from '../atoms/InputText'
import { useFetch } from "../../hook/useFetch";
import { useEffect, useState } from "react";
import { fromTexttoSha256 } from "../../utils";
import React from 'react'
import {Dropdown} from '../atoms/Dropdown.jsx';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from '../atoms/PrimaryButton';
import { COLORS } from '../../constants';
import CancelButton from '../atoms/CancelButton';
import ResultModal from '../atoms/ResultModal';
import { VALIDATIONS } from '../../constants';
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';



const RegisterForm = () => {

    const [sectorItems, setSectorItems] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [docsTypeItems, setDocsTypeItems] = useState({});
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [document, setDocument] = useState(null);
    const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
    const [sectorValue, setSectorValue] = useState(null);
    const [sexValue, setSexValue] = useState(null);
    const [docTypeValue, setDocTypeValue] = useState(null);
    const [formIsValid, setFormIsValid] = useState(null);


    const navigation = useNavigation();
    const {data, error, isLoading, fetchData} = useFetch()
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;

    const sexItems = [
        { key: true, value: LanguageObject.masculine },
        { label: false, value: LanguageObject.femenine },
    ];


    useEffect(()=> {
        axios.get('https://pricewiseapi.azurewebsites.net/api/Sector/GetSector')

            .then((response) => {
                let tempArray = response.data.map((sectorItem) => 
                (
                    {key: sectorItem.value, value: sectorItem.label}
                ));
                setSectorItems(tempArray)
            })
    }, [sectorItems]);

    useEffect(()=> {
        axios.get('https://pricewiseapi.azurewebsites.net/api/TipoDocumento/GetTipoDocumento')
            .then((response) => {
                let tempArray = response.data.map((docTypeItem) => 
                (
                    {key: docTypeItem.value, value: docTypeItem.label}
                ));
                setDocsTypeItems(tempArray)
            })
    }, [docsTypeItems])

	useEffect(() => {
        const isNameValid = VALIDATIONS.nameRegEx.test(name);
        const isEmailValid = VALIDATIONS.emailRegEx.test(email);
        const isSectorValid = sectorValue !== null;
        const isSexValid = sexValue !== null;
        const isDocTypeValid = docTypeValue !== null;
        const isDocumentValid = parseInt(docTypeValue) === 1 
            ? VALIDATIONS.documentRegEx.test(document)
            : VALIDATIONS.passpordRegEx.test(document);
        const isPasswordValid = VALIDATIONS.passwordRegEx.test(password);
        const isConfirmPasswordValid = password === confirmPassword;
      
        const isFormValid =
          isNameValid &&
          isEmailValid &&
          isSectorValid &&
          isSexValid &&
          isDocTypeValid &&
          isDocumentValid &&
          isPasswordValid &&
          isConfirmPasswordValid;
      
        setFormIsValid(isFormValid);
      }, [name, email, sectorValue, sexValue, docTypeValue, document, password, confirmPassword]);
      

    let registrationBody = {}
    const registerUser = async () => {
        registrationBody = {
            idRol: 1,
			nombreCompleto: name === '' ? 'name' : name,
			idTipoDocumento: docTypeValue === '' ? 0 : parseInt(docTypeValue),
			documento: document === '' ? 'document' : document,
			correo: email === '' ? 'correo' : email,
			contrasena: password === '' ? 'password' : fromTexttoSha256(password),
			sexo: sexValue === 0 ? 0 : sexValue === 1 ? true : false,
			idSector: sectorValue === '' ? 0 : parseInt(sectorValue),
			estado: true
        }
        await fetchData(
            'Registration/RegistrarCuenta',
            null,
            'POST',
            registrationBody
        ).then(() => {
            setModalOpen(true);
        })
    }
    return (
            <View style={styles.container}>
                <InputText 
                    labelText={LanguageObject.fullNameText} 
                    placeholder={LanguageObject.fullName}
                    screenUse='Register' 
                    onChangeText={setName}
					isValid = {
                        name ? VALIDATIONS.nameRegEx.test(name) : true
                    }
					errorMessage={LanguageObject.fullNameError}
                />
                <InputText 
                    labelText={LanguageObject.emailText} 
                    placeholder={LanguageObject.email}
                    screenUse='Register' 
                    onChangeText={setEmail}
					isValid = {
                        email ? VALIDATIONS.emailRegEx.test(email) : true
                    }
					errorMessage={LanguageObject.emailError}
                />
                <View style={styles.dropdownsContainer}>
                    <Dropdown 
                        placeholder={LanguageObject.sector}
                        items={sectorItems}
                        setSelected={setSectorValue}
                        text={LanguageObject.sectorText}
                    />
                    <Dropdown 
                        placeholder={LanguageObject.sex}
                        items={sexItems}
                        setSelected={setSexValue}
                        text={LanguageObject.sexText}
                    />
                </View>
                <Dropdown 
                    placeholder={LanguageObject.docType}
                    items={docsTypeItems}
                    setSelected={setDocTypeValue}
                    text={LanguageObject.docTypeText}
                />
                <InputText 
                    labelText={LanguageObject.docNumberText} 
                    placeholder={LanguageObject.docNumber}
                    screenUse='Register' 
                    onChangeText={setDocument}
					isValid = {
                        document ? 
                            parseInt(docTypeValue) === 1 
                                ? VALIDATIONS.documentRegEx.test(document)
                                : VALIDATIONS.passpordRegEx.test(document) 
                        : true
                    }
					errorMessage={
                        parseInt(docTypeValue) === 1 
                            ? LanguageObject.docNumberError
                            : LanguageObject.passportError
                    }
                />
                <InputText 
                    labelText={LanguageObject.passwordText} 
                    placeholder={LanguageObject.password}
                    screenUse='Register' 
                    type={'password'}
                    onChangeText={setPassword}
					isValid = {
                        password ? VALIDATIONS.passwordRegEx.test(password) : true
                    }
					errorMessage={LanguageObject.passwordError}
                />
                <InputText 
                    labelText={LanguageObject.confirmPasswordText} 
                    placeholder={LanguageObject.confirmPasswordText}
                    screenUse='Register'
                    type={'password'}
                    onChangeText={setConfirmPassword}
					isValid = {
                        password ? password === confirmPassword : true
                    }
					errorMessage={LanguageObject.confirmPasswordTextError}
                />
                {
                    isLoading 
                    ? <ActivityIndicator 
                        size={32}
                        color={COLORS.Blue}
                    /> 
                    : <>
                        <PrimaryButton
                        onPressFunction={!formIsValid ? () => {} : registerUser}
                        screenUse='Register'
						enable = {formIsValid}
                        text={LanguageObject.access}
                        />
                        <CancelButton 
                            onPressFunction={() => navigation.goBack()}
                        />
                    </>
                }
                <ResultModal
                    body={
                        error
                        ? LanguageObject.errorMessage
                        : LanguageObject.successMessage
                    }
                    isError={error ? true : false}
                    buttonPress={() => {
                        setModalOpen(false);
                        !error ? navigation.navigate('Login') : console.log(error)
                    }}
                    visible={modalOpen}
                />
                

            </View>
    )
}

export default RegisterForm

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
	placeholderStyle: {
        fontSize: 16,
    },
	selectedTextStyle: {
        fontSize: 16,
    },
	inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    dropdownsContainer: {
        flexDirection: 'row',
        width: '47.5%',
        justifyContent: 'center',
        gap: 15,
    }
})