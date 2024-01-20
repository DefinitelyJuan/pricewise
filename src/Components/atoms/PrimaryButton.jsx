import { StyleSheet, Pressable, View, Text, TouchableOpacity } from "react-native"
import { COLORS } from "../../constants"


export const PrimaryButton = ({ screenUse = 'Login', text = 'Access', onPressFunction, enable = true }) =>
{
    const width = screenUse === 'Login' ? 170 : 240;
    const padding = screenUse === 'Login' ? 10 : 7;
    const borderRadius = screenUse === 'Login' ? 35 : screenUse === 'report' ? 15 : 30;

    return (
        <View>
            <TouchableOpacity
                style={styles(width, padding, borderRadius, enable).pressable}
                onPress={onPressFunction}>
                <Text style={styles(width, padding, borderRadius).text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = (width, padding, borderRadius, enable = true) => 
{
    return (
        StyleSheet.create({
            pressable: {
                backgroundColor: enable ? COLORS.Yellow : COLORS.lightGray,
                padding: padding,
                width: width,
                borderRadius: borderRadius,
            },
            text: {
                fontWeight: '800',
                color: COLORS.White,
                textAlign: 'center',
                fontSize: 16
            }
        })
    )
}