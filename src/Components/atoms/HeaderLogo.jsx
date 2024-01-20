import { View, Image, StyleSheet } from "react-native"

export const HeaderLogo = () =>
{
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../../assets/logo.png')}
            />
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        width: '40%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'fill',
    }
})