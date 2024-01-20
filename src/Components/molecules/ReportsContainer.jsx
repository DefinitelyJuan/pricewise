import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import ReportCard from '../atoms/ReportCard';
import ChainOption from '../atoms/ChainOption'
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const ReportsContainer = ({data}) =>
{
  const { language, setLanguage } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  const [filteredReportsData, setFilteredReportsData] = useState([]);
  const [isSelected, setIsSelected] = useState(0);
  const navigation = useNavigation();

  const reportTypes = [
    {
      id: 0,
      name: LanguageObject.all
    },
    {
      id: 2,
      name: LanguageObject.defectiveProduct,
    },
    {
      id: 3,
      name: LanguageObject.deliveryIssues
    },
    {
      id: 4,
      name: LanguageObject.wrongItem
    }
  ]

  useEffect(() => {
    if (data.length > 0) {
      if (isSelected === 0) {
        setFilteredReportsData(data);
      } else {
        const filteredData = data.filter(report => report.idTipoProblema === isSelected);
        setFilteredReportsData(filteredData);
      }
    }
  }, [data, isSelected]);

  
  return (

    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.filterContainer}>
        <FlatList
          data={reportTypes}
          renderItem={({ item }) => (
            <ChainOption
              text={item.name}
              isSelected={item.id === isSelected}
              onPress={() => setIsSelected(item.id)}
              key={item.id}
            />
          )}
          horizontal
          keyExtractor={item => `reporte${item.id}`}
          contentContainerStyle={{ columnGap: 10 }}
          showsHorizontalScrollIndicator = {false}
        />
      </View>
      {
        <View style={styles.reportsCardContainer}>
          {
            filteredReportsData.length > 0 ?
              filteredReportsData?.map((report) => (
                <ReportCard
                  title={report.tipoProblema}
                  body={report.detalleProblema}
                  key={report.idReporte}
                  onPress={() => navigation.navigate('ReportView', {report: {...report}})}
                />
              ))
            :
              <View style={styles.noDataFoundContainer}>
                <AntDesign name="exclamationcircleo" size={24} color={COLORS.DarkBlue} />
                <Text style={styles.noDataFoundText}>{LanguageObject.noDataFound}</Text>
              </View>
          }
        </View>
      }      
    </ScrollView>
  );
};

export default ReportsContainer;

const styles = StyleSheet.create({

  reportsCardContainer: {
    gap: 10
  },
  filterContainer: {
    paddingVertical: 10
  },
  container: {
    flex: 1
  },
  noDataFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 500,
    gap: 8
  },
  noDataFoundText: {
    color: COLORS.LightBlue,
    fontWeight: 'bold',
    fontSize: 20
  }
});
