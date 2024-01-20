import { StyleSheet, View, ActivityIndicator } from "react-native"
import { InputText } from "../atoms/InputText";
import { LoginRememberPassword } from "../atoms/LoginRememberPassword";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useFetch } from "../../hook/useFetch";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fromTexttoSha256 } from "../../utils";
import { COLORS } from "../../constants";
import ResultModal from "../atoms/ResultModal";

import storage from "../../helpers/Storage";

import { useLanguage } from "../Localization/LanguageContext";
import { en, es } from "../Localization";

export const LoginForm = () =>
{
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;

    const [email, setEmail] = useState('email');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [modalOpen, setModalOpen] = useState(false);

    const { data, error, fetchData, isLoading } = useFetch();

    const [isEmpty, setIsEmpty] = useState(true);
    const validateUser = async () =>
    {
        const requestData = {
            correo: email === '' ? 'correo' : email,
            contrasena: password === '' ? 'password' : fromTexttoSha256(password)
        };

        await fetchData(
            'Registration/IniciarSesion',
            requestData,
            'GET',
        )
    };

    useEffect(()=> {
        if(error) {
            setModalOpen(true);
        }
    },[error])
    
	const dummy = async () =>
    {        
		return false;
    };

    useEffect(() =>
    {
        if (data)
        {
            const userData = data.data;
            if (userData && userData.length > 0 && data.status == 200)
            {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}]
                });
                storage.save(
                    {
                        key: 'userLoginInfo',
                        data: userData[0],
                        token: 'ImplementationOfAuthJWT',
                        expires: 1000 * 3600
                    }
                );
            }
        }
    }, [data]);
	useEffect(() =>
    {
        (email != '' && password != '') ? setIsEmpty(false) : setIsEmpty(true)

    }, [email,password]);
    return (
        <View style={styles.view}>
            <InputText labelText={LanguageObject.emailText} placeholder={LanguageObject.email} onChangeText={setEmail} />
            <InputText labelText={LanguageObject.passwordText} placeholder={LanguageObject.password} type={'password'} onChangeText={setPassword}/>
            {
                isLoading
                ? <ActivityIndicator
                    size={'large'}
                    color={COLORS.Blue}
                /> 
                : <PrimaryButton onPressFunction={isEmpty ? dummy : validateUser} enable = {!isEmpty} />
            }
            <ResultModal 
                visible={modalOpen}
                buttonPress={() => setModalOpen(false)}
                isError={true}
                body={LanguageObject.errorMessage}
            />
            <LoginRememberPassword />
        </View>
    );
}


const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
});

