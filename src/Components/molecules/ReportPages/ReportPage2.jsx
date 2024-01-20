import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DatePickerInput from '../../atoms/DatePickerInput'
import { useState, useEffect } from 'react'
import TwoOptionsInput from '../../atoms/TwoOptionsInput'
import { useLanguage } from '../../Localization/LanguageContext'
import { en, es } from '../../Localization'

const ReportPage2 = ({setFormData, setSecondPartvalid, formData}) =>
{

  const [issueDate, setIssueDate] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [warrantyInformed, setWarrantyInformed] = useState(true);
  const [submittedComplaint, setSubmittedComplaint] = useState(true);
  const [ownTheItem, setOwnTheItem] =useState(true);

  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;

  useEffect(() => {
    
  }, [issueDate])

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      fechaProblema: issueDate
    }))
  }, [issueDate])

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      fechaCompra: purchaseDate
    }))
  }, [purchaseDate])

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      informaronGarantia: warrantyInformed
    }))
  }, [warrantyInformed])

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      poseeArticulo: ownTheItem
    }))
  }, [ownTheItem]);

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      presentoReclamo: submittedComplaint
    }))
  }, [submittedComplaint]);


  return (
    <View style={styles.container}>
      <DatePickerInput 
        placeholder={LanguageObject.issueDate} 
        setDate={setIssueDate}/>
      <DatePickerInput 
        placeholder={LanguageObject.purchaseDate} 
        setDate={setPurchaseDate}/>
      <TwoOptionsInput 
        firstOptionName={LanguageObject.yes}
        secondOptionName={'No'}
        firstSelected={warrantyInformed}
        onFirstPress={() => setWarrantyInformed(true)}
        onSecondPress={() => setWarrantyInformed(false)}
        placeholder={LanguageObject.warrantyInformed}
      />
      <TwoOptionsInput 
        firstOptionName={LanguageObject.yes}
        secondOptionName={'No'}
        firstSelected={submittedComplaint}
        onFirstPress={() => setSubmittedComplaint(true)}
        onSecondPress={() => setSubmittedComplaint(false)}
        placeholder={LanguageObject.complaintSubmitted}
      />
      <TwoOptionsInput 
        firstOptionName={LanguageObject.yes}
        secondOptionName={'No'}
        firstSelected={ownTheItem}
        onFirstPress={() => setOwnTheItem(true)}
        onSecondPress={() => setOwnTheItem(false)}
        placeholder={LanguageObject.ownItem}
      />
    </View>
  )
}

export default ReportPage2

const styles = StyleSheet.create({
  container: {
    gap: 22
  }
})