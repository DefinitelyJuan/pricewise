import { Text, StyleSheet } from "react-native"
import { COLORS } from "../../constants"

export const Header = ({ text }) =>
{
    return (
        <Text style={style.text}>{text}</Text>
    )
}


const style = StyleSheet.create({

    text: {
        color: COLORS.DarkBlue,
        fontSize: 45,
        textAlign: "center",
        fontWeight: "bold",
    }
})