import
  {
    StyleSheet,
    Text,
    View,
    ScrollView
  } from 'react-native'
import React from 'react'
import ProductCard from '../atoms/ProductCard'
import { formatPrice } from '../../constants'

const ProductsContainer = ({data}) =>
{
  const handlePress = () => {}
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.productCardContainer}>
        {
          data?.map((product) => (
            <ProductCard
			        productId={product.idProducto}
              productName={product.nombreProducto}
              price={formatPrice(product.precio)}
              store={product.tienda}
              handlePress={handlePress()}
              key={`${product.idProducto}${product.precio}`}
            />
          ))
        }
      </View>
    </ScrollView>
  )
}

export default ProductsContainer

const styles = StyleSheet.create({

  container: {
    marginTop: 13,
  },
  productCardContainer: {
    gap: 12
  }
})