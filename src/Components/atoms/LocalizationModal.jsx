import { 
            StyleSheet, 
            Text, 
            View,
            TouchableWithoutFeedback,
            Modal,
            TouchableOpacity,
            ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../../constants'
import { AntDesign } from '@expo/vector-icons'; 
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'



const LocalizationModal = ({visible, onCLosePress}) => {
    const { language, setLanguage } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const LanguageObject = language === 'en' ? en : es;

    const changeLanguage = (lang) => {
        setIsLoading(true);
        
        setTimeout(() => {
            setLanguage(lang);
            setIsLoading(false);
        },1200);
    }
    return (
        <Modal 
            visible={visible}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.title}>{LanguageObject.SelectALanguage}</Text>
                        <TouchableOpacity onPress={onCLosePress}>
                            <AntDesign name="close" size={24} color={COLORS.Black} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonsContainer}>
                    {
                        !isLoading 
                        ?
                        <>
                            <TouchableOpacity 
                                style={{...styles.option, ...isSelectedLanguage(language === 'en')}}
                                onPress={async () => await changeLanguage('en')}
                            >
                                <Text style={styles.text}>{LanguageObject.English}   🇺🇸</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{...styles.option, ...isSelectedLanguage(language === 'es')}}
                                onPress={async () => await changeLanguage('es')}
                            >
                                <Text style={styles.text}>{LanguageObject.Spanish}   🇪🇸</Text>
                            </TouchableOpacity>
                        </>
                        :
                        <ActivityIndicator 
                            color={COLORS.Blue}
                            size={70}
                        />
                    }
                    </View>
                </View>
            </View>
        </Modal>
    )
    }

export default LocalizationModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.transparent,
        flex: 1,
        justifyContent: 'flex-end',
      },
    
      modalContainer: {
        width: '100%',
        height: '20%',
        backgroundColor: COLORS.gray,
        padding: 20,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      
      title: {
        fontSize: 20,
        fontWeight: '500'
      },

      option: {
        padding: 20,
        borderRadius: 15,
      },
      buttonsContainer: {
        flexDirection: 'row',
        gap: 30
      },
      text: {
        fontSize: 16,
        color: COLORS.White
      },
      TitleContainer: {
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        width: '100%',
      }
})

const isSelectedLanguage = (isSelected) => {
    if(isSelected) {
        return {
            backgroundColor: COLORS.Blue,
        }
    } else {
        return {
            backgroundColor: COLORS.darkGray
        }
    }
}