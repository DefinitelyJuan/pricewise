import
  {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList,
    ActivityIndicator
  } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import ProductPriceCard from '../atoms/ProductPriceCard'
import { useRoute } from '@react-navigation/native';

import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { COLORS } from '../../constants'
import { formatPrice } from '../../constants'

const ProductDetailsCarousel = ({productId}) =>
{
  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  const navigation = useNavigation();
  const [currentPrices, setCurrentPrices] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    setLoading(true);
    axios.get(`https://pricewiseapi.azurewebsites.net/api/Producto/GetPreciosByIdProducto?idProducto=${productId}`)
        .then((response) => {
            setCurrentPrices(response.data);
            setLoading(false)
        })		
  }, []);

  return(
	<View>
            <View style={styles.containerHeader}>
              <Text style={styles.titleHome}>{LanguageObject.prices}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Products')}>
                <Text>{LanguageObject.showAll}</Text>
              </TouchableOpacity>
            </View>
            {
              loading
              ? <View style={styles.loadingContainer}>
                  <ActivityIndicator size={40} color={COLORS.Blue} />
                </View>
              : <View style={styles.containerBody}>
                  <FlatList 
                    data={currentPrices}
                    renderItem={({item}) => (
                      <ProductPriceCard
                        name={item.tienda}
                        price={formatPrice(item.precio)}					
                      />
                    )}
                    horizontal
                    key={item => item.idTienda}
                    contentContainerStyle={{columnGap: 10}}
                  />
                </View>
            }
            
	</View>
  )
}
export default ProductDetailsCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  titleHome: {
    fontSize: 22,
    fontWeight: '600'
  },
  containerBody: {
    padding: 12
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  }
})