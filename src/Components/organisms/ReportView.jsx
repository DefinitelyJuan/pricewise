import { 
            StyleSheet, 
            Text, 
            View,
            ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../constants'
import PrincipalHeaderTitle from '../atoms/PrincipalHeaderTitle'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { useRoute } from '@react-navigation/native'
import ReportViewContainer from '../molecules/ReportViewContainer'

const ReportView = () => {
    const route = useRoute();
    const report = route.params.report;
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
    

    return (
        <View style={styles.container}>
            <PrincipalHeaderTitle title={LanguageObject.reportDetails} />
            <ReportViewContainer report={report} />
        </View>
    )
}

export default ReportView

const styles = StyleSheet.create({
        container: {
            padding: 20,
            backgroundColor: COLORS.White,
            flex: 1,
            gap: 10
        }
})