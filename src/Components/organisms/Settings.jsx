import { 
        StyleSheet, 
        Text, 
        View,
        SafeAreaView,
        FlatList 
        } from 'react-native'
import React, {useState,useEffect} from 'react'
import SettingsOption from '../atoms/SettingsOption'
import SignOutButton from '../atoms/SignOutButton'
import ConfirmationModal from '../atoms/ConfirmationModal'
import storage from '../../helpers/Storage'
import { useNavigation } from '@react-navigation/native'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import LocalizationModal from '../atoms/LocalizationModal'

const Settings = () => {
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
    const [confirmationOpen, setConfirmationOpen] = useState(false)
    const [locModalOpen, setLocModalOpen] = useState(false);
    const navigation = useNavigation()
    const signOut = () => {
        navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
            }   
        );
        storage.remove({
            key: 'userLoginInfo'
        });
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.upperContainer}>
                <SettingsOption 
                optionLabel={LanguageObject.SelectALanguage}
                onPress={() => setLocModalOpen(true)} 
                /> 
                <SettingsOption 
                optionLabel={LanguageObject.faqTitle}
                onPress={() => navigation.navigate('FAQ')}
                />
                {/* <Text style = {styles.faqTitle}>{LanguageObject.faqTitle}</Text> 
                <FlatList
                    data={LanguageObject.faq}
                    renderItem={({item}) => <View><Text style = {styles.title}>{item.title}</Text><Text style = {styles.description}>{item.body}</Text></View>}
                    keyExtractor={item => item.id}
                /> */}
            </View>
        <SignOutButton onPress={() => setConfirmationOpen(true)} />
        <ConfirmationModal 
            title={LanguageObject.signOutConfirmation}
            body={LanguageObject.signOutBody}
            visible={confirmationOpen}
            yesPress={signOut}
            noPress={() => setConfirmationOpen(false)}
        />
        <LocalizationModal 
            visible={locModalOpen}
            onCLosePress={() => setLocModalOpen(false)}
        />
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    description: {
        fontSize: 15,
        fontWeight: '300',
    },
    upperContainer: {
        flex : 1,
        gap: 10,
    },
    faqTitle: {
        fontSize:20,
        fontWeight: '600',
    }
    
})