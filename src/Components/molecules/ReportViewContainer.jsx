import { 
        StyleSheet, 
        Text, 
        View,
        ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { formatPrice } from '../../constants';

const convertDate = (dateString) => {
    const dateObject = new Date(dateString);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
}

const ReportViewContainer = ({report}) => {
    const { language } = useLanguage();
    const LanguageObject = language === 'en' ? en : es;
    const problemTypes = [
        {
          key: 2,
          value: LanguageObject.defectiveProduct
        },
        {
          key: 3,
          value: LanguageObject.wrongItem
        },
        {
          key: 4,
          value: LanguageObject.deliveryIssues
        }
    ]
    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.title}>{LanguageObject.reportId}</Text>
                    <Text style={styles.info}># {report.idReporte}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.problemType}</Text>
                    <Text style={styles.info}>{problemTypes.find(item => item.key === report.idTipoProblema).value}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.product}</Text>
                    <Text style={styles.info}>{report.nombreProducto}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.price}</Text>
                    <Text style={styles.info}>{formatPrice(report.montoCompra)}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.store}</Text>
                    <Text style={styles.info}>{report.nombreTienda}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.extraDetails}</Text>
                    <Text style={styles.info}>{report.detalleProblema}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.purchaseDateLabel}</Text>
                    <Text style={styles.info}>
                    {
                        convertDate(report.fechaCompra)
                    }
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.problemDateLabel}</Text>
                    <Text style={styles.info}>
                    {
                        convertDate(report.fechaProblema)
                    }
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.itemRepaired}</Text>
                    <Text style={styles.info}>
                    {
                        report.articuloReparado === true ? LanguageObject.yes : 'No'
                    }
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.warrantyInformed}</Text>
                    <Text style={styles.info}>
                    {
                        report.informacionGarantia === true ? LanguageObject.yes : 'No'
                    }
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.complaintsBook}</Text>
                    <Text style={styles.info}>
                    {
                        report.libroReclamaciones === true ? LanguageObject.yes : 'No'
                    }
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.payInCash}</Text>
                    <Text style={styles.info}>
                    {
                        report.tipoPago === 'Efectivo' ? LanguageObject.yes : 'No'
                    }
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.ownItem}</Text>
                    <Text style={styles.info}>
                    {
                        report.poseeArticulo ? LanguageObject.yes : 'No'
                    }
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>{LanguageObject.complaintSubmitted}</Text>
                    <Text style={styles.info}>
                    {
                        report.presentoReclamo ? LanguageObject.yes : 'No'
                    }
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default ReportViewContainer

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray,
        borderRadius: 12,
        padding: 20,
        paddingHorizontal: 25,
        elevation: 3,
        shadowColor: COLORS.Black,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    info: {
        fontSize: 18
    },
    infoContainer: {
        paddingBottom: 35,
        gap: 20
    }
})