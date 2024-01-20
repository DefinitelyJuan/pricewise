import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PrimaryButton } from '../atoms/PrimaryButton'
import CancelButton from '../atoms/CancelButton'
import { useNavigation } from "@react-navigation/native";


const RegisterFooter = () =>
{
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <PrimaryButton
                screenUse='Register'
                text='Sign up'
            />
            <CancelButton
                onPressFunction={() => navigation.goBack()}
            />
        </View>
    )
}

export default RegisterFooter

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        gap: 13,
        alignSelf: 'flex-end',
    }
})