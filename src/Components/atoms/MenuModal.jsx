import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        Modal } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { FontAwesome5, MaterialIcons, Fontisto, Octicons  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';


const MenuModal = ({activeOption}) => {
    const navigation = useNavigation();
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={activeOption === 'Home' 
                    ? styles.menuOptionContainerSelected
                    : styles.menuOptionContainer  }
                onPress={() => navigation.navigate('Home')}>
                <MaterialIcons name="home" size={30} color={
                    activeOption === 'Home' 
                        ? COLORS.Blue
                        : 'black'
                } />
                <Text
                    style={
                        activeOption === 'Home'
                            ? styles.selectedOptionText
                            : styles.text
                    }
                >{LanguageObject.home}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={activeOption === 'Stores' 
                    ? styles.menuOptionContainerSelected
                    : styles.menuOptionContainer  }
                onPress={() => navigation.navigate('Stores')}>
                <MaterialIcons name="store" size={30} color={
                    activeOption === 'Stores' 
                        ? COLORS.Blue
                        : 'black'
                } />
                <Text
                    style={
                        activeOption === 'Stores'
                            ? styles.selectedOptionText
                            : styles.text
                    }
                >{LanguageObject.stores}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={activeOption === 'Products' 
                    ? styles.menuOptionContainerSelected
                    : styles.menuOptionContainer  }
                onPress={() => navigation.navigate('Products')}>
                <Fontisto name="shopping-basket" size={24} color={
                    activeOption === 'Products' 
                        ? COLORS.Blue
                        : 'black'
                } />
                <Text
                    style={
                        activeOption === 'Products'
                            ? styles.selectedOptionText
                            : styles.text
                    }
                >{LanguageObject.products}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={activeOption === 'Reports' 
                    ? styles.menuOptionContainerSelected
                    : styles.menuOptionContainer  }
                onPress={() => navigation.navigate('Reports')}>
                <Octicons name="report" size={24} color={
                    activeOption === 'Reports' 
                        ? COLORS.Blue
                        : 'black'
                } />
                <Text
                    style={
                        activeOption === 'Reports'
                            ? styles.selectedOptionText
                            : styles.text
                    }
                >{LanguageObject.reports}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuModal

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    modalContainer: {
        width: '60%',
        height: '28%',
        padding: 11,
        backgroundColor: COLORS.gray,
        borderRadius: 15,
        gap: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    menuOptionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        opacity: .5
    },

    menuOptionContainerSelected: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        opacity: 1
    },

    selectedOptionText: {
        color: COLORS.Blue
    },

    text: {
        color: 'black'
    }
})