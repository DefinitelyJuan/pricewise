import { StyleSheet, SafeAreaView } from 'react-native'
import PrincipalHeaderTitle from '../atoms/PrincipalHeaderTitle'
import StoreDetailsContainer from '../molecules/StoreDetailsContainer'
import { COLORS } from '../../constants'
import { useRoute } from '@react-navigation/native'


const StoreDetails = () => {
    const route = useRoute();
    return (
      <SafeAreaView style={styles.container}>
        <PrincipalHeaderTitle title={route.params.store.name} />
        <StoreDetailsContainer name={route.params.store.name} address={route.params.store.storeAddress} chain={route.params.store.storeChain} id={route.params.store.storeId} />		    
      </SafeAreaView>
    )
}

export default StoreDetails

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

    }

})