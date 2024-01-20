import { StyleSheet, SafeAreaView } from 'react-native'
import PrincipalHeaderTitle from '../atoms/PrincipalHeaderTitle'
import ProductDetailsChart from '../molecules/ProductDetailsChart'
import ProductDetailsCarousel from '../molecules/ProductDetailsCarousel'
import ProductDetailsFooter from '../molecules/ProductDetailsFooter'
import { COLORS } from '../../constants'
import { useRoute } from '@react-navigation/native'
import MenuModal from '../atoms/MenuModal'
import { RouteMenuNames } from '../../constants'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'

const ProductDetails = () => {
    const route = useRoute();
    const currentRouteName = route.name;
    const shouldShouMenu = RouteMenuNames.includes(currentRouteName);

    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;

    return (
      <SafeAreaView style={styles.container}>
        <PrincipalHeaderTitle title={route.params.product.name} />
		    <ProductDetailsCarousel productId = {route.params.product.productId}></ProductDetailsCarousel>
        <ProductDetailsChart productId={route.params.product.productId} />
		  <ProductDetailsFooter productId = {route.params.product.productId} />
      </SafeAreaView>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1,
		justifyContent: 'space-around',
    }

})