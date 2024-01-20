import { 
          StyleSheet, 
          Text, 
          View, 
          SafeAreaView, 
          TouchableOpacity,
          ActivityIndicator
       } from 'react-native'
import {useState, useEffect} from 'react'
import PrincipalHeaderTitle from '../atoms/PrincipalHeaderTitle'
import SearchButton from '../atoms/SearchButton'
import ProductsContainer from '../molecules/ProductsContainer'
import SearchModal from '../atoms/SearchModal'
import axios from 'axios'
import { COLORS } from '../../constants'
import { useRoute } from '@react-navigation/native'
import MenuModal from '../atoms/MenuModal'
import { RouteMenuNames } from '../../constants'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'

const Products = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [search, setSearch] = useState(null)
    const [data, setData] = useState(null);
    const route = useRoute();
    const currentRouteName = route.name;
    const shouldShouMenu = RouteMenuNames.includes(currentRouteName);
    const [ productsLoading, setProductsLoading ] = useState(false);
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
    

    const loadAllProducts = () => {
      setProductsLoading(true);
      setSearch(null)
      axios.get('https://pricewiseapi.azurewebsites.net/api/Producto/GetProductos')
        .then((response) => {
          setData(response.data);
          setProductsLoading(false);
        });
    }

    const setSearchData = (search) => {
      console.log(search);
      if (!search) return;
      setProductsLoading(true);
      axios.get('https://pricewiseapi.azurewebsites.net/api/Producto/GetProductos')
          .then((response) => {
              let filteredData = response.data.filter(item =>
                  item.nombreProducto.toLowerCase().includes(search.toLowerCase())
              );
              setData(filteredData);
              setModalVisible(false);
              setProductsLoading(false);
          })
  };
  

    useEffect(() => {
      if(route.params)
      {
        setSearch(route.params.search)
        setSearchData(route.params.search)
      } else {
        loadAllProducts()
      }
    },[])
  
    return (
      <SafeAreaView style={styles.container}>
        <PrincipalHeaderTitle title={LanguageObject.products} />
        <View style={styles.searchRow}>
          <View style={styles.searchButton}>
            <SearchButton handlePress={() => setModalVisible(true)}/>
          </View>
          <TouchableOpacity 
            onPress={loadAllProducts}
            disabled={!search}
          >
            <Text style={styles.clearSearchButton}>{LanguageObject.clearSearch}</Text>
          </TouchableOpacity>
        </View>
        {
          productsLoading
          ? <View style={styles.productsLoadingContainer}>
              <ActivityIndicator size={60} color={COLORS.Blue}/>
            </View>
          : <ProductsContainer data={data} />

        }
        <SearchModal 
          visible={modalVisible}
          handleClosePress={() => setModalVisible(false)} 
          setSearch={setSearch}
          handleSearchPress={() => setSearchData(search)}
        />
        {
          shouldShouMenu && <MenuModal 
            activeOption={currentRouteName} 
          />
        }
      </SafeAreaView>
    )
}

export default Products

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1,
    },
    searchRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingRight: 10,
      alignItems: 'center',
    },
    searchButton: {
      width: '40%',
    },
    clearSearchButton: {
      color: COLORS.gray,
      fontSize: 18,
      fontWeight: '800'

    },
    productsLoadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

})