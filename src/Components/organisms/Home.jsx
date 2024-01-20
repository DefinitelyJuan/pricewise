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
import storage from '../../helpers/Storage'
import SearchHome from '../molecules/SearchHome'
import ChainOption from '../atoms/ChainOption'
import axios from 'axios'
import StoresHome from '../atoms/StoresHome'
import ProductsHome from '../atoms/ProductsHome'
import MenuModal from '../atoms/MenuModal'
import { useRoute } from '@react-navigation/native';
import { COLORS, RouteMenuNames } from '../../constants';

import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'




const Home = () =>
{
  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [isSelected, setIsSelected] = useState(LanguageObject.all)
  const [storesData, setStoresData] = useState({});
  const [productsData, setProductsData] = useState();
  const [filteredStoresData, setFilteredStoresData] = useState([]);
  const [chainData, setChainData] = useState([]);
  const [chainsLoading, setChainsLoading] = useState(false);
  const [storesLoading, setStoresLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);


  
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

  const getAllChains = async () => {
    setChainsLoading(true);
    axios.get('https://pricewiseapi.azurewebsites.net/api/Cadena/GetCadenas')
      .then((response) => {
        const tempArray = [LanguageObject.all]
        response.data.map(chainData => (
          tempArray.push(chainData.nombreCadena)
        ))
        setChainData(tempArray)
        setChainsLoading(false);
      })
  }

  
  useEffect(() => {
    getAllChains()
  }, [language]);

  useEffect(()=> {
    setStoresLoading(true);
    axios.get('https://pricewiseapi.azurewebsites.net/api/Tienda/GetTiendas')
        .then((response) => {
            setStoresData(response.data);
            setStoresLoading(false);
        })
  }, []);

  useEffect(()=> {
    if (isSelected === LanguageObject.all) {
      setFilteredStoresData(storesData)

    } else {
      setStoresLoading(true);
      const filteredData = storesData.filter(store => 
        store.nombreCadena === isSelected
      )
      setFilteredStoresData(filteredData);
      setStoresLoading(false);
      
    }
  }, [isSelected, storesData])

  useEffect(()=> {
    setProductsLoading(true);
    axios.get('https://pricewiseapi.azurewebsites.net/api/Producto/GetProductos')
        .then((response) => {
            setProductsData(response.data);
            setProductsLoading(false);
        })
  }, []);

  const route = useRoute();
  const currentRouteName = route.name;
  const shouldShouMenu = RouteMenuNames.includes(currentRouteName);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={styles.headerContainer}>
          <Text style={styles.helloText}>{LanguageObject.hello}, {userData.nombreCompleto || LanguageObject.guest}</Text>
          <Text style={styles.headerText}>{LanguageObject.findWisestPrices}</Text>
        </View>
        <SearchHome />
        <View style={styles.chainContainer}>
          {
            chainsLoading 
            ? <ActivityIndicator size={38} color={COLORS.Blue} />
            : <FlatList 
            data={chainData}
            renderItem={({item}) => (
              <ChainOption 
                text={item}
                isSelected={item === isSelected}
                onPress={() => setIsSelected(item)}
              />
            )}
            horizontal
            keyExtractor={() => "id" + Math.random().toString(16).slice(2)}
            contentContainerStyle={{columnGap: 10}}
          />
          }
        </View>
        <View>
            <View style={styles.storesContainerHeader}>
              <Text style={styles.titleHome}>{LanguageObject.popularStores}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Stores')}>
                <Text>{LanguageObject.showAll}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.storesContainerBody}>
              {
                storesLoading
                ? <ActivityIndicator size={38} color={COLORS.Blue} />
                : <FlatList 
                data={filteredStoresData}
                renderItem={({item}) => (
                  <StoresHome
                    direction={item.direccion}
                    sector={item.nombreSector}
                    chain={item.nombreCadena}
                  />
                )}
                horizontal
                key={item => item.idTienda}
                contentContainerStyle={{columnGap: 10}}
              />
              }
            </View>
        </View>
        <View>
            <View style={styles.storesContainerHeader}>
              <Text style={styles.titleHome}>{LanguageObject.popularProducts}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Products')}>
                <Text>{LanguageObject.showAll}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productsContainerBody}>
            {
                productsLoading 
                ? <ActivityIndicator size={40} color={COLORS.Blue} />
                : productsData?.map((product) => (
                  <ProductsHome 
                    name={product.nombreProducto}
                    description={product.tipoProducto}
                    key={`${product.idProducto}${product.precio}`}
                  />
                ))
            }
            </View>
        </View>
      </ScrollView>
      {
        shouldShouMenu && <MenuModal 
          activeOption={currentRouteName}
        />
      }
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },

  headerContainer: {
    padding: 8,
    alignItems: 'center',
  },

  helloText: {
    fontSize: 16,
    fontWeight: '300',
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chainContainer:{
    padding: 12
  },
  storesContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  titleHome: {
    fontSize: 22,
    fontWeight: '600'
  },
  storesContainerBody: {
    padding: 12
  },

  productsContainerBody: {
    padding: 12,
    gap: 12,
    justifyContent: 'center',
  }
})