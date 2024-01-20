import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import CancelButton from '../atoms/CancelButton';

const ForgotPasswordFooter = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <CancelButton 
                onPressFunction={() => navigation.goBack()}
            />
        </View>
    )
}

export default ForgotPasswordFooter

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    }
})