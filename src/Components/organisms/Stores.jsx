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
import StoresContainer from '../molecules/StoresContainer'
import SearchModal from '../atoms/SearchModal'
import axios from 'axios'
import { COLORS } from '../../constants'
import { useRoute } from '@react-navigation/native'
import MenuModal from '../atoms/MenuModal'
import { RouteMenuNames } from '../../constants'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'


const Stores = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [search, setSearch] = useState(null)
    const [data, setData] = useState(null);
    const [storesLoading, setStoresLoading] = useState(false); 

    const route = useRoute();
    const currentRouteName = route.name;
    const shouldShouMenu = RouteMenuNames.includes(currentRouteName);

    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;


  const loadAllStores = () => {
    setSearch(null);
    setStoresLoading(true);
    axios.get('https://pricewiseapi.azurewebsites.net/api/Tienda/GetTiendas')
      .then((response) => {
        setData(response.data);
        setStoresLoading(false);
      });
  }

  const setSearchData = () => {
    if(!search) return
    setStoresLoading(true);
    axios.get(`https://pricewiseapi.azurewebsites.net/api/Tienda/GetTiendasByNombre?nombre=${search}`)
      .then((response) => {
        setData(response.data)
        setStoresLoading(false);
      });
    setModalVisible(false)
  }

  useEffect(() => {
    loadAllStores()
  },[])
  
  return (
    <SafeAreaView style={styles.container}>
      <PrincipalHeaderTitle title={LanguageObject.stores} />
      <View style={styles.searchRow}>
        <View style={styles.searchButton}>
          <SearchButton handlePress={() => setModalVisible(true)}/>
        </View>
        <TouchableOpacity onPress={loadAllStores} disabled={!search}>
          <Text style={styles.clearSearchButton}>{LanguageObject.clearSearch}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bodyContainer}>
        {
          storesLoading
          ? <View style={styles.loadingContainer}>
              <ActivityIndicator size={60} color={COLORS.Blue}/>
            </View>
          : <StoresContainer data={data} />
        }

        <SearchModal 
          visible={modalVisible}
          handleClosePress={() => setModalVisible(false)} 
          setSearch={setSearch}
          handleSearchPress={setSearchData}
        />
        {
          shouldShouMenu && <MenuModal 
            activeOption={currentRouteName}
          />
        }
      </View>
    </SafeAreaView>
  )
}

export default Stores

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
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    bodyContainer: {
      justifyContent:'space-between',
      flex: 1,
    }

})