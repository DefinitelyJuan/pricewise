import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

const ReportCard = ({title, body, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text 
        style={styles.body}
        numberOfLines={4}>
            {body}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ReportCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray,
        padding: 18,
        flexDirection: "column",
        gap: 16,
        borderRadius: 18,
        shadowOffset: {width: 2, height: 25},
        shadowOpacity: 0.4,
    },
    title: {
        color: COLORS.Black,
        fontWeight: 'bold',
        fontSize: 32,
    },
    body: {
        fontSize: 16,
        paddingLeft: 16,
    }
})