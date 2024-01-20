import
{
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'

const ResultModal = ({ visible, buttonPress, body, isError = false }) =>
{
    const { language } = useLanguage();
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
                        <Text style={styles.headerText}>{LanguageObject.result}</Text>
                        <Text style={!isError ? styles.resultTextSuccesfully
                            : styles.resultTextError}>
                            {!isError ? LanguageObject.success : LanguageObject.error}
                        </Text>
                    </View>
                    <View style={styles.modalBody}>
                        <Text>{body}</Text>
                    </View>
                    <TouchableOpacity style={styles.modalFooter} onPress={buttonPress}>
                        <Text style={styles.okayButton}>{LanguageObject.okay}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ResultModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.transparent,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '60%',
        height: '28%',
        padding: 10,
        backgroundColor: COLORS.gray,
        borderRadius: 15,
        gap: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    headerText: {
        fontSize: 22,
        fontWeight: '800',
    },
    modalBody: {
        alignItems: 'center',
        gap: 10
    },
    text: {
        width: '100%',
        borderRadius: 20,
        paddingLeft: 10,
        padding: 2,
    },
    modalFooter: {
        backgroundColor: COLORS.Blue,
        borderRadius: 15,
        width: '70%',
        alignItems: 'center',
    },
    okayButton: {
        color: COLORS.White,
        padding: 5
    },
    resultTextSuccesfully: {
        backgroundColor: COLORS.successGreen,
        padding: 5,
        borderRadius: 8,
        color: COLORS.White,
        fontWeight: '400',
        paddingHorizontal: 25,
    },
    resultTextError: {
        backgroundColor: COLORS.Red,
        padding: 5,
        borderRadius: 8,
        color: COLORS.White,
        fontWeight: '400',
        paddingHorizontal: 25,
    }
})