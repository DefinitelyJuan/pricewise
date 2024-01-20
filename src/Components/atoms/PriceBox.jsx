import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { useNavigation } from '@react-navigation/native'



const PriceBox = ({price, type,storeName, storeId, address, chain}) =>
{

  	const navigation = useNavigation();
	const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
	const goToDetails = () => {
		navigation.navigate('StoreDetails', {store: {storeId: storeId, name: storeName, storeAddress: address, storeChain: chain}})
	}
    return (
        <TouchableOpacity
            onPress={goToDetails}
        >
            <View style={styles().container}>
				<View>
				    <Text style={styles().text} numberOfLines={1}>{type == 'max' ? 'Mejor precio' : 'Peor precio' }</Text>
                    <Text style={styles(type=type).price} numberOfLines={1}>{price}</Text>		
            	</View>   
            </View>
        </TouchableOpacity>
    )
}

export default PriceBox

const styles = (type) => 
{
	return(
		StyleSheet.create({
		container: {
			backgroundColor: COLORS.White,
			alignItems: 'space-around',
			flexDirection: 'row',
			padding: 20,
			width: '100%',
			borderRadius: 10
		},
		text: {
			fontSize: 19,
			fontWeight: '500',
		},
		price: {
			fontSize: 19,
			fontWeight: '500',
			color: type == 'max' ? COLORS.successGreen : COLORS.Red
		}

	}))
} 
