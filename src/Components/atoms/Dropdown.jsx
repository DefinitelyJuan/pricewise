import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../../constants"
import DropDownPicker from "react-native-dropdown-picker";
import { SelectList } from "react-native-dropdown-select-list";
import { useLanguage } from '../Localization/LanguageContext'
import { en, es } from '../Localization'

export const Dropdown = ({ text, items, setSelected, placeholder, isReportPage = false}) =>
{
	const { language } = useLanguage();
	const LanguageObject = language === 'en' ? en : es;
	return (
		<View style={
			isReportPage
			? {...styles.ddpContainer, width: '100%'}
			: {...styles.ddpContainer}
		}>
			<Text style={styles.text}>{text}</Text>
			<SelectList
				setSelected={setSelected}
				data={items}
				placeholder={placeholder}
				maxHeight={100}
				boxStyles={{ borderColor: COLORS.Blue}}
				dropdownStyles={{ borderColor: COLORS.Blue }}
				dropdownTextStyles={{ color: COLORS.SignUpLabels, textAlign: 'center' }}
				inputStyles={{ color: COLORS.SignUpLabels }}
				itemTextStyle={{ color: COLORS.SignUpLabels }}
				searchPlaceholder={LanguageObject.search}
				notFoundText={LanguageObject.noDataFound}
			/>
		</View>

	)
}


const styles = StyleSheet.create({
	ddpContainer: {
		width: '83%',
		borderRadius: 10,
		marginTop: 5,
	},
	ddp: {
		borderColor: COLORS.Blue,
		textAlign: 'auto',
	},
	text: {
		fontWeight: 'bold',
		color: COLORS.SignUpLabels,
		textAlign: 'left',
	}
})