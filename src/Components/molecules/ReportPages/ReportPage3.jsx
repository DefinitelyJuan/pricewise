import { StyleSheet, Text, View } from 'react-native'
import {useState, useEffect} from 'react'
import TwoOptionsInput from '../../atoms/TwoOptionsInput'
import LargeTextInput from '../../atoms/LargeTextInput'
import { useLanguage } from '../../Localization/LanguageContext'
import { en, es } from '../../Localization'


const ReportPage3 = ({setFormData, setThirdPartValid, formData}) => {

  const [presentedBook, setPresentedBook] = useState(true);
  const [itemRepaired, setItemRepaired] = useState(true);
  const [reportDetails, setReportDetails] = useState('');


  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;

  useEffect(() =>{
    setFormData(prevFormData => ({
      ...prevFormData,
      articuloReparado: itemRepaired
    }))
  },[itemRepaired])


  useEffect(() =>{
    setFormData(prevFormData => ({
      ...prevFormData,
      libroReclamaciones: presentedBook
    }))
  },[presentedBook])

  useEffect(() => {
    if(reportDetails) {
      setFormData(prevFormData => ({
        ...prevFormData,
        detalleProblema: reportDetails
      }))
    }
    else {
      setFormData(prevFormData => ({
        ...prevFormData,
        detalleProblema: null
      }))
    }
  }, [reportDetails])


  return (
    <View style={styles.container}>
      <TwoOptionsInput 
        firstOptionName={LanguageObject.yes}
        secondOptionName={'No'}
        placeholder={LanguageObject.itemRepaired}
        firstSelected={itemRepaired}
        onFirstPress={() => setItemRepaired(true)}
        onSecondPress={() => setItemRepaired(false)}
      />
      <TwoOptionsInput 
        firstOptionName={LanguageObject.yes}
        secondOptionName={'No'}
        placeholder={LanguageObject.complaintsBook}
        firstSelected={presentedBook}
        onFirstPress={() => setPresentedBook(true)}
        onSecondPress={() => setPresentedBook(false)}
      />
      <LargeTextInput 
        placeholder={LanguageObject.extraDetails}
        textLabel={LanguageObject.extraDetailsText}
        onChangeText={setReportDetails}

      />
    </View>
  )
}

export default ReportPage3

const styles = StyleSheet.create({
  container: {
    gap: 25,
    width: '90%'
  }
})