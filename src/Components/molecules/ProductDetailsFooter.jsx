import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import PriceBox from '../atoms/PriceBox'
import { useEffect, useState } from "react";
import axios from 'axios'
import { COLORS } from '../../constants';
import { formatPrice } from '../../constants';

const ProductDetailsFooter = ({productId}) => {
    const [maxPrice, setMaxPrice] = useState({});
    const [minPrice, setMinPrice] = useState({});
    const [minLoading, setMinLoading] = useState(false);
    const [maxLoading, setMaxLoading] = useState(false);
	useEffect(()=> {
        setMaxLoading(true);
        axios.get(`https://pricewiseapi.azurewebsites.net/api/Producto/GetPrecioMaximo?idProducto=${productId}`)
            .then((response) => {                
                setMaxPrice(response.data[0]);
                setMaxLoading(false)
            })
    }, []);
	useEffect(()=> {
        setMinLoading(true)
        axios.get(`https://pricewiseapi.azurewebsites.net/api/Producto/GetPrecioMinimo?idProducto=${productId}`)
            .then((response) => {
                setMinPrice(response.data[0])
                setMinLoading(false)
            })
    }, []);
    return (
        <>
        {
            !maxLoading && !minLoading
            ?
                <View style={styles.container}>
                    <PriceBox type='max' price ={formatPrice(maxPrice.precio)} storeName ={maxPrice.tienda} storeId ={maxPrice.idTienda} address = {maxPrice.direccion} chain = {maxPrice.nombreCadena}></PriceBox>
                    <PriceBox type='min' price ={formatPrice(minPrice.precio)} storeName ={minPrice.tienda} storeId ={minPrice.idTienda} address = {minPrice.direccion} chain = {minPrice.nombreCadena}></PriceBox>
                </View>
            :
                <View style={styles.loadingContainer}>
                <ActivityIndicator color={COLORS.Blue} size={40} />
              </View>
        }
        </>
        
    )
}
export default ProductDetailsFooter

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})