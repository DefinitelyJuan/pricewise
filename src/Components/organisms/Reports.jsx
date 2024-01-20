import { StyleSheet,
         SafeAreaView,
         ActivityIndicator,
         View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PrincipalHeaderTitle from '../atoms/PrincipalHeaderTitle'
import ReportsContainer from '../molecules/ReportsContainer'
import { useRoute } from '@react-navigation/native'
import { RouteMenuNames } from '../../constants'
import MenuModal from '../atoms/MenuModal'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import CreateReport from '../atoms/CreateReport'
import storage from '../../helpers/Storage'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { COLORS } from '../../constants'

 

const Reports = () => {
    const [data, setData] = useState();
    const [userData, setUserData] = useState();
    const [reportsLoading, setReportsLoading] = useState(true)
    const { language, setLanguage } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
    const navigation = useNavigation();
    const route = useRoute();
    const currentRouteName = route.name;
    const shouldShouMenu = RouteMenuNames.includes(currentRouteName);

    useEffect(() =>
    {
     storage
        .load({
            key: 'userLoginInfo',
            autoSync: true,
            syncInBackground: true,
        })
        .then((response) =>
        {
            axios
                .get(`https://pricewiseapi.azurewebsites.net/api/ReporteIncongruencia/GetReporteIncongruenciaByIdUsuario?idUsuario=${response.idUsuario}`)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
            });
            setUserData(response);
        })
        .catch((err) =>
        {
            switch (err.name)
            {
            case 'NotFoundError':
                console.log('User not found');
                break;
            case 'ExpiredError':
                console.log('Expired session');
                break;
            default:
                console.error('Error loading user data:', err);
            }
        });
    }, [userData, data]);
    return (
        <SafeAreaView style={styles.container}>
            <PrincipalHeaderTitle title={LanguageObject.reports} />
            <CreateReport
                onPress={() => {navigation.navigate('Report')}}
                text={LanguageObject.createReport}
            />
            {
                data
                ? <ReportsContainer data={data} />
                : 
                <View style={styles.reportLoadingContainer}>
                    <ActivityIndicator size={60} color={COLORS.Blue}/>
                </View>
            }
            
            {shouldShouMenu && <MenuModal 
                activeOption={currentRouteName}
            />}
        </SafeAreaView>
    )
}

export default Reports

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1
    },
    reportLoadingContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})