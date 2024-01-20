import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { COLORS, RouteMenuNames } from '../../constants';
import { formatPrice } from "../../constants";

// const ptData = [
//     {value: 160, date: '1 Apr 2022'},
//     {value: 180, date: '2 Apr 2022'},
//     {value: 190, date: '3 Apr 2022'},
//     {value: 180, date: '4 Apr 2022'},
//     {value: 140, date: '5 Apr 2022'},
//     {value: 145, date: '6 Apr 2022'},
//     {value: 160, date: '7 Apr 2022'},
//     {value: 200, date: '8 Apr 2022'},
  
//     {value: 220, date: '9 Apr 2022'},
//     {
//       value: 240,
//       date: '10 Apr 2022',
//       label: '10 Apr',
//       labelTextStyle: {color: 'lightgray', width: 60},
//     },
//     {value: 280, date: '11 Apr 2022'},
//     {value: 260, date: '12 Apr 2022'},
//     {value: 340, date: '13 Apr 2022'},
//     {value: 385, date: '14 Apr 2022'},
//     {value: 280, date: '15 Apr 2022'},
//     {value: 390, date: '16 Apr 2022'},
  
//     {value: 370, date: '17 Apr 2022'},
//     {value: 285, date: '18 Apr 2022'},
//     {value: 295, date: '19 Apr 2022'},
//     {
//       value: 300,
//       date: '20 Apr 2022',
//       label: '20 Apr',
//       labelTextStyle: {color: 'lightgray', width: 60},
//     },
//     {value: 280, date: '21 Apr 2022'},
//     {value: 295, date: '22 Apr 2022'},
//     {value: 260, date: '23 Apr 2022'},
//     {value: 255, date: '24 Apr 2022'},
  
//     {value: 190, date: '25 Apr 2022'},
//     {value: 220, date: '26 Apr 2022'},
//     {value: 205, date: '27 Apr 2022'},
//     {value: 230, date: '28 Apr 2022'},
//     {value: 210, date: '29 Apr 2022'},
//     {
//       value: 200,
//       date: '30 Apr 2022',
//       label: '30 Apr',
//       labelTextStyle: {color: 'lightgray', width: 60},
//     },
//     {value: 240, date: '1 May 2022'},
//     {value: 250, date: '2 May 2022'},
//     {value: 280, date: '3 May 2022'},
//     {value: 250, date: '4 May 2022'},
//     {value: 210, date: '5 May 2022'}]

const ProductDetailsChart = ({productId}) => {
	const [ptData, setPtData] = useState([{value: 100, date:'5 may 2022'}]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(()=> {
		setIsLoading(true);
		axios.get(`https://pricewiseapi.azurewebsites.net/api/Producto/GetProductosGrafico?idProducto=${productId}`)
			.then((response) => {
				setPtData(response.data);
				console.log(response.data)
				setIsLoading(false);
			})
	  }, []);
	const { language } = useLanguage();
  	const LanguageObject = language === 'en' ? en : es;
	const getMax = (arr) => 
	{
		const obj = arr.reduce((maxObj, currentObj) => {
		return currentObj.value > maxObj.value ? currentObj : maxObj;
		}, arr[0]);
		return obj.value;
	}
    return (
		<View>
			<View style={styles.header}>
			<Text style={styles.titleHome}>{LanguageObject.chartTitle}</Text> 
			</View>
			<View style={styles.container}>
				{isLoading ? <ActivityIndicator size={38} color={COLORS.Blue} /> : 
				<LineChart
					areaChart
					data={ptData}
					width={300}
					hideDataPoints
					color="#004AAD"
					thickness={2}
					startFillColor="#004AAD"
					endFillColor="rgba(185,193,217, 0.01)"
					startOpacity={1}
					endOpacity={0.2}
					initialSpacing={0}
					endSpacing={0}
					noOfSections={6}
					maxValue={getMax(ptData) + 500}
					animationDuration={1000}
					onDataChangeAnimationDuration={300}
					isAnimated={true}
					yAxisThickness={0}
					rulesColor="transparent"
					yAxisTextStyle={{color: 'black'}}
					yAxisSide='right'
					xAxisColor="black"
					curved
					pointerConfig={{
						pointerStripHeight: 160,
						pointerStripColor: 'lightgray',
						pointerStripWidth: 2,
						pointerColor: 'lightgray',
						radius: 6,
						pointerLabelWidth: 100,
						pointerLabelHeight: 90,
						activatePointersOnLongPress: true,
						autoAdjustPointerLabelPosition: false,
						pointerLabelComponent: items => {
						return (
							<View
							style={{
								height: 90,
								width: 100,
								justifyContent: 'center',
								marginTop: -20,
								marginLeft: -40,
							}}>
							<Text style={{color: 'black', fontSize: 14, marginBottom:6,textAlign:'center'}}>
								{items[0].date}
							</Text>
			
							<View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
								<Text style={{fontWeight: 'bold',textAlign:'center'}}>
								{'$' + items[0].value + '.0'}
								</Text>
							</View>
							</View>
						);
					},
				}}
				/>}
			</View>
		</View>
			
     
    );
  }
export default ProductDetailsChart

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titleHome: {
    fontSize: 22,
    fontWeight: '600'
  },
  header : {
	flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',  }
});