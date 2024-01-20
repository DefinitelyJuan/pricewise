import
{
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native'
import { useState } from 'react'
import PrincipalHeaderTitle from '../atoms/PrincipalHeaderTitle'
import NextOrBackButtom from '../atoms/NextOrBackButtom'
import ReportPage1 from '../molecules/ReportPages/ReportPage1'
import ReportPage2 from '../molecules/ReportPages/ReportPage2'
import ReportPage3 from '../molecules/ReportPages/ReportPage3'
import { useEffect } from 'react'
import storage from '../../helpers/Storage'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { useFetch } from "../../hook/useFetch";
import ResultModal from '../atoms/ResultModal'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from "../../constants";
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'


const Report = () =>
{

  const navigation = useNavigation();
  const { language, setLanguage } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
  const [firstPartValid, setFirstPartValid] = useState(false);
  const [secondPartValid, setSecondPartValid] = useState(false);
  const [thirdPartValid, setThirdPartValid] = useState(false);
  const [submitEnable, setSubmitEnable] = useState(false)
  const [userData, setUserData] = useState();
  const [formData, setFormData] = useState({
    idUsuario: 0,

    // Page 1
    idTienda: 0,
    idProducto: null,
    montoCompra: null,
    idTipoProblema: null,
    idTipoPago: null,

    // Page 2
    fechaProblema: null,
    fechaCompra: null,
    informaronGarantia: null,
    presentoReclamo: null,
    poseeArticulo: null,

    // Page 3
    articuloReparado: null,
    libroReclamaciones: null,
    detalleProblema: null
  });

  const [screen, setScreen] = useState(0);

  useEffect(() =>
  {
    storage
      .load({
        key: 'userLoginInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then((response) =>
      {
        setUserData(response);
      })
      .catch((err) =>
      {
        switch (err.name)
        {
          case 'NotFoundError':
            console.log('User not found');
            break;
          case 'ExpiredError':
            console.log('Expired session');
            break;
          default:
            console.error('Error loading user data:', err);
        }
      });
  }, []);

  useEffect(() =>
  {
    if (userData)
    {
      setFormData(prevFormData => ({
        ...prevFormData,
        idUsuario: userData.idUsuario
      }))
    }
  }, [userData])




  const screenTitle = [LanguageObject.firstPart, LanguageObject.secondPart, LanguageObject.thirdPart];


  const [backDisabled, setBackDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)
  const {data, error, isLoading, fetchData } = useFetch();
  const [visible, setVisible] = useState(false);
  const [isError, setError] = useState(false);

  const handleBackButtonPress = () =>
  {
    setScreen(screen - 1);
  };

  const handleNextButtonPress = () =>
  {
    setScreen(screen + 1);
  };

  useEffect(() => {
    const allPropertiesNotNull = Object.values(formData).every(prop => prop !== null && prop !== '')
    if(allPropertiesNotNull){
      setSubmitEnable(true);
    }
  }, [formData])
  useEffect(() => {
    switch (screen) {
      case 0:
        setBackDisabled(true)
        break;
      case 1:
        setBackDisabled(false)
        break;
      case 2:
        setBackDisabled(false)
        break; 
      default:
        break;
    }  
  }, [screen])

  const handleSubmitButtonPress = async () =>
  {
    const reportData = { ...formData }
    reportData.fechaCompra = formData.fechaCompra.toISOString();
    reportData.fechaProblema = formData.fechaProblema.toISOString();
    await fetchData(
      'ReporteIncongruencia/SetReporte',
      null,
      'POST',
      reportData
    )
  };

  useEffect(() =>
  {
    if (data)
    {
      const responseData = data.data
      const statusCode = data.status

      if (responseData)
      {
        if (statusCode >= 400)
        {
          setError(true)
        }
        setVisible(true);
      }
    }
  }, [data])


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.viewContainer}>
        <PrincipalHeaderTitle title={screenTitle[screen]} />
        {
          screen === 0 ? (
            <ReportPage1 
                setFormData={setFormData} 
                setFirstPartValid={firstPartValid}
                formData={formData}
              />
          ) : screen === 1 ? (
            <ReportPage2 
                setFormData={setFormData} 
                setSecondPartvalid={secondPartValid}
                formData={formData}
            />
          ) : (
            <ReportPage3 
                setFormData={setFormData}
                setThirdPartValid={thirdPartValid}
                formData={formData}
            />
          )
        }
        <View style={styles.BottomContainer}>
          <NextOrBackButtom
            title={LanguageObject.back}
            onPressFunction={handleBackButtonPress}
            isDisabled={backDisabled}
          />
          {screen === 2 ? (
            isLoading ? <ActivityIndicator
                    size={'large'}
                    color={COLORS.Blue}
                /> 
			    : <PrimaryButton
              text={LanguageObject.submitReport}
              onPressFunction={handleSubmitButtonPress}
              enable={submitEnable}
            />
          ) : (
            <NextOrBackButtom
              title={LanguageObject.next}
              onPressFunction={handleNextButtonPress}
              isNext={true}
              isDisabled={nextDisabled}
            />
          )}
        </View>
        <ResultModal
          buttonPress={() =>
          {
            setVisible(false);
            navigation.goBack();
          }}
          visible={visible}
          body={!isError ? LanguageObject.reportSubmittedSuccesfully
            : LanguageObject.reportError}
          isError={isError}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Report

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 13,
  },
  BottomContainer: {
    paddingBottom: 15,
    flexDirection: 'row',
    gap: 100
  }
})