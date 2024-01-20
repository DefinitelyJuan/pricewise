import
  {
    StyleSheet,
    Text,
    View,
    ScrollView
  } from 'react-native'
import React from 'react'
import StoreCard from '../atoms/StoreCard'

const StoresCard = ({data}) =>
{
  const handlePress = () => {}
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.storeCardContainer}>
        {
          data?.map((store) => (
            <StoreCard
              storeName={store.nombre}
              address={store.direccion}
              chain={store.nombreCadena}
              handlePress={handlePress()}
			  id={store.idTienda}
              key={store.idTienda}
            />
          ))
        }
      </View>
    </ScrollView>
  )
}

export default StoresCard

const styles = StyleSheet.create({

  container: {
    marginTop: 13,
  },
  storeCardContainer: {
    gap: 12
  }
})