import { 
          StyleSheet, 
          Text, 
          View,
          TouchableOpacity,
          Modal,
          TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../Localization/LanguageContext';
import { en, es } from '../Localization';


const ConfirmationModal = ({visible = false, yesPress, title, body, noPress}) => {
  const { language } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  return (
    <Modal
      visible={visible}
      animationType={'slide'}
      transparent={true}
    >
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationText}>{LanguageObject.confirmation}</Text>
              <MaterialCommunityIcons name="frequently-asked-questions" size={24} color={COLORS.DarkBlue} />
            </View>
            <View style={styles.titleAndBodyContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={{textAlign: 'center'}}>{body}</Text>
            </View>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity onPress={noPress} style={styles.noButton}>
                <Text style={styles.buttonsText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={yesPress} style={styles.yesButton}>
                <Text style={styles.buttonsText}>{LanguageObject.yes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ConfirmationModal

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContainer: {
    width: '100%',
    height: '25%',
    backgroundColor: COLORS.gray,
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    gap: 20
  },

  confirmationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmationText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 25,
    color: COLORS.DarkBlue,
  },

  titleAndBodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.Black,
    textAlign: 'center',
  },

  confirmationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  yesButton: {
    backgroundColor: COLORS.darkGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  noButton: {
    backgroundColor: COLORS.DarkBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },

  buttonsText: {
    color: COLORS.White
  }
})