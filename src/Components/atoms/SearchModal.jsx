import { StyleSheet, 
    Text, 
    View, 
    Modal,  
    TextInput,
   } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';
import SearchButton from './SearchButton';
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'


const SearchModal = ({ visible, handleSearchPress, handleClosePress, setSearch }) =>
{
    const { language, setLanguage } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
return (
   <Modal
       visible={visible}
       animationType='fade'
       transparent={true}
   >
       <View style={styles.container}>                
           <View style={styles.modalContainer}>
               <View style={styles.headerContainer}>
                   <Text style={styles.headerText}>{LanguageObject.search}</Text>
                   <TouchableOpacity onPress={handleClosePress}>
                       <Ionicons name='close-circle-sharp' color={COLORS.Red} size={22}/>
                   </TouchableOpacity>
               </View>
               <View style={styles.modalBody}>
                   <TextInput 
                       style={styles.textInput}
                       placeholder={LanguageObject.searchLoading}
                       onChangeText={setSearch}
                   />
                   <View style={styles.searchContainer}>
                       <SearchButton handlePress={handleSearchPress}/>
                   </View>
               </View>
           </View>
       </View>
   </Modal>
)
}

export default SearchModal

const styles = StyleSheet.create({
container: {
   backgroundColor: COLORS.transparent,
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
},
modalContainer: {
   width: '60%',
   padding: 10,
   backgroundColor: COLORS.gray,
   borderRadius: 15,
   gap: 20
},
headerContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
},
headerText: {
   fontSize: 18,
   fontWeight: '600',
},
searchContainer: {
   width: '50%',
},
modalBody: {
   alignItems: 'center',
   gap: 10
},
textInput: {
   backgroundColor: COLORS.White,
   width: '100%',
   borderRadius: 20,
   paddingLeft: 10,
   padding: 2,
   shadowOffset: {width: 0, height:4},
   elevation: 3,
}
})