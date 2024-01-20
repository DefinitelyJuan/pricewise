import { View, StyleSheet } from "react-native"
import { LoginSignUp } from "../atoms/LoginSignUp";

export const LoginFooter = () =>
{
    return (
        <View style={styles.container}>
            <LoginSignUp />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
        marginTop: 25,
        gap: 16
    }
})