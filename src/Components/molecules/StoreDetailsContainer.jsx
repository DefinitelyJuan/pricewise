import
  {
    StyleSheet,
    View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView
  } from 'react-native'
import React from 'react'
import DetailCard from '../atoms/DetailCard'
import {openMapsOnLocation} from "../../utils"
import {useState, useEffect} from 'react'
import axios from 'axios'
import ProductsHome from '../atoms/ProductsHome'
import AppLink from 'react-native-app-link';
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../constants'


const StoreDetailsContainer = ({name, address, chain, id}) =>
{
	const navigation = useNavigation();
	const { language } = useLanguage();
	const LanguageObject = language === 'en' ? en : es;
	const [productsData, setProductsData] = useState();
	const [ productsLoading, setProductsLoading ] = useState(false);
  	const handlePress = () => {}
	const query = name + " " + address
  	const openMapOnLocation = () => {
		AppLink.maybeOpenURL(
			'https://www.google.com/maps/search/?api=1&query=' + query, 
			{ 
				appName: 'Google Maps', 
				appStoreId: '585027354', 
				playStoreId: 'com.google.android.apps.maps' }
		)
		.then(() => {})
		.catch((err) => {});
	}
	useEffect(()=> {
		setProductsLoading(true);
		axios.get(`https://pricewiseapi.azurewebsites.net/api/Producto/GetProductosByIDTienda?idTienda=${id}`)
		.then((response) => {
			setProductsData(response.data);
			setProductsLoading(false);
		})
	}, []);
	return (
	<View style={styles.container}>
		<View style={styles.storeDetailsCardContainer}>
			<DetailCard
					text={address}
					iconName={'location-pin'}
					handlePress={openMapOnLocation}
					title={chain}
			/>
		</View>
		<View style={styles.container}>
			<View style={styles.storesContainerHeader}>
              <Text style={styles.titleHome}>{LanguageObject.popularProducts}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Products')}>
                <Text>{LanguageObject.showAll}</Text>
              </TouchableOpacity>
            </View>
			<ScrollView style={styles.productsContainer}>
				<View style={styles.productsContainerBody}>
					{
						productsLoading
						? <ActivityIndicator size={38} color={COLORS.Blue} />
						: productsData?.map((product) => (
							<ProductsHome 
								name={product.nombreProducto}
								description={product.tipoProducto}
								key={`${product.idProducto}${product.precio}`}
							/>
							))
					}
				</View>
			</ScrollView>
		</View>
		
	</View>
	
  )
}

export default StoreDetailsContainer

const styles = StyleSheet.create({

  container: {
    marginTop: 13,
	flex: 1,
	paddingVertical: 8
  },
  storeDetailsCardContainer: {
    gap: 12
  },
  storesContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
	paddingVertical: 10
  },
  titleHome: {
    fontSize: 22,
    fontWeight: '600'
  },
  productsContainerBody: {
	gap: 12
  },
  productsContainer: {
  }
})