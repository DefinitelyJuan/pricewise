import { 
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    FlatList
    } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'

const FAQ = () => {
const { language } = useLanguage();
const LanguageObject = language === 'en' ? en : es;
return (
    <SafeAreaView style={styles.container}>
            <FlatList
                data={LanguageObject.faq}
                renderItem={({item}) => <View><Text style = {styles.title}>{item.title}</Text><Text style = {styles.description}>{item.body}</Text></View>}
                keyExtractor={item => item.id}
            />         
    </SafeAreaView>
)
}

export default FAQ

const styles = StyleSheet.create({
container: {
    flex : 1,
    gap: 10,
    padding: 20,
},
title: {
    fontSize: 16,
    fontWeight: '500',
},
description: {
    fontSize: 15,
    fontWeight: '300',
},
faqTitle: {
    fontSize:20,
    fontWeight: '600',
}

})