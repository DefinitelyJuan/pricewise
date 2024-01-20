import { Header } from "../atoms/Header"
import { HeaderLogo } from "../atoms/HeaderLogo"
import { View, StyleSheet, Text, Image } from "react-native"

export const FirstHeader = ({ title }) =>
{
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/logo.png')} 
                style={styles.image}    
            />
            <Header text={title} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 0
    },
    image: {
        resizeMode: "cover",
        width: 180,
        height: 120,
    }
})