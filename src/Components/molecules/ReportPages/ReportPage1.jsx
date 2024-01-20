import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import {useEffect, useState} from 'react'
import { InputText } from '../../atoms/InputText'
import { Dropdown } from '../../atoms/Dropdown'
import axios from 'axios'
import TwoOptionsInput from '../../atoms/TwoOptionsInput'
import { useLanguage } from '../../Localization/LanguageContext'
import { en, es } from '../../Localization'
import { COLORS } from '../../../constants'
import CurrencyInputComponent from '../../atoms/CurrencyInputComponent'
import { parse } from 'react-native-svg'

const ReportPage1 = ({setFormData, setFirstPartValid, formData}) => {

  const [storeList, setStoreList] =useState();
  const [storeId, setStoreId] = useState();
  const [productList, setProductList] = useState();
  const [payWithCash, setPayWithCash] = useState(true);
  const [storesLoading, setStoresLoading] = useState(false)
  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;

  const problemTypes = [
    {
      key: 2,
      value: LanguageObject.defectiveProduct
    },
    {
      key: 3,
      value: LanguageObject.wrongItem
    },
    {
      key: 4,
      value: LanguageObject.deliveryIssues
    }
  ]
  useEffect(()=> {
      setStoresLoading(true);
      axios.get('https://pricewiseapi.azurewebsites.net/api/Tienda/GetTiendas')
          .then((response) => {
              let tempArray = response.data.map((storeItem) => 
              (
                  {key: storeItem.idTienda, value: storeItem.nombre}
              ));
              setStoreList(tempArray);
              setStoresLoading(false);
          })
  }, []);

  useEffect(() => {
    if (storeId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        idTienda: storeId
      }))
    }
  }, [storeId])

  useEffect(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        idTipoPago: payWithCash === true ? 3 : 1
      }))
  }, [payWithCash])

  useEffect(()=> {
    if(storeId) {
      axios.get(`https://pricewiseapi.azurewebsites.net/api/Producto/GetProductosByIDTienda?idTienda=${storeId}`)
          .then((response) => {
              let tempArray = response.data
              .map((productItem) => 
              (
                  {key: productItem.idProducto, value: productItem.nombreProducto}
              ));
              setProductList(tempArray)
          })
    }
  }, [storeId]);
  
  const defaultProductList = {key: 0, value: LanguageObject.defaultProductList};
  return (
    <View style={styles.generalContainer}>
      {
        storesLoading
        ? <ActivityIndicator size={60} color={COLORS.Blue} />
        : 
        <>
          <Dropdown 
            items={storeList}
            setSelected={setStoreId}
            placeholder={LanguageObject.incidentStore}
            text={LanguageObject.incidentStoreText}
            isReportPage
          />
          <Dropdown 
            items={productList ? productList : defaultProductList}
            setSelected={(productId) => {
              setFormData(prevFormData => ({
                ...prevFormData,
                idProducto: productId,
              }))
            }}
            placeholder={LanguageObject.productToReport}
            text={LanguageObject.productToReportText}
            isReportPage
          />
          <Dropdown 
            items={problemTypes}
            setSelected={(problemTypeId) => {
              setFormData(prevFormData => ({
                ...prevFormData,
                idTipoProblema: problemTypeId,
              }))
            }}
            placeholder={LanguageObject.reportPoblemType}
            text={LanguageObject.reportProblemTypeText}
            isReportPage
          />
          <CurrencyInputComponent
            labelText={LanguageObject.productPriceText}
            placeholder={LanguageObject.productPrice}
            onChangeValue={(value) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                montoCompra: parseFloat(value)
              }));
            }}
            value={formData.montoCompra}
          />
          <TwoOptionsInput 
            firstOptionName={LanguageObject.yes}
            secondOptionName={'No'}
            firstSelected={payWithCash}
            onFirstPress={() => setPayWithCash(true)}
            onSecondPress={() => setPayWithCash(false)}
            placeholder={LanguageObject.payInCash}
          />
      </>
      }
    </View>
  )
}

export default ReportPage1

const styles = StyleSheet.create({
  generalContainer: {
    width: '90%',
    gap: 25
  }
})