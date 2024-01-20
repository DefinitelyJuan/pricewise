import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import CurrencyInput from 'react-native-currency-input';

const CurrencyInputComponent = ({placeholder, labelText, onChangeValue, value}) => {
    return (
    <View>
        <Text style={styles.text}>{labelText}</Text>
        <CurrencyInput
            placeholder={placeholder} 
            onChangeValue={onChangeValue}
            prefix={"RD$ "}
            delimiter={","}
            separator={"."}
            precision={2}
            minValue={0}
            placeholderTextColor={COLORS.SignUpLabels}
            style={styles.input}
            value={value}
        />
    </View>
  )
}

export default CurrencyInputComponent;

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
        fontWeight: 'bold',
        color: COLORS.SignUpLabels
    },
    input: {
        padding: 5,
        borderColor: COLORS.Blue,
        borderWidth: 1,
        backgroundColor: COLORS.White,
        color: COLORS.SignUpLabels,
        borderRadius: 10,
        textAlign: 'center'

    }
});
