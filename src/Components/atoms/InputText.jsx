import { Text, View, TextInput, StyleSheet } from 'react-native'
import { COLORS } from '../../constants';

export const InputText = ({ placeholder, labelText, type, screenUse = 'Login', onChangeText, keyboardType = 'default', isValid = true, errorMessage = 'Error'}) =>
{

    const labelColor = screenUse === 'Login' ? COLORS.Black : (isValid ? COLORS.SignUpLabels : COLORS.Yellow);
    const textAlign = screenUse === 'Login' ? 'center' : 'left';
    const padding = screenUse === 'Login' ? 8 : 5;
    const width = screenUse === 'Login' ? '60%' : '83%';
    const borderColor = screenUse === 'Login' ? null : (isValid ? COLORS.Blue : COLORS.Yellow);
    const borderWidth = screenUse === 'Login' ? 0 : 1;
    const backgroundColor = screenUse === 'Login' ? COLORS.Blue : COLORS.White;
    const textColor = screenUse === 'Login' ? COLORS.White : COLORS.SignUpLabels;
    const placeholderColor = screenUse === 'Login' ? COLORS.White : COLORS.SignUpLabels;

    return (
        <View>
            <Text style={styles(textAlign, labelColor).text}>{isValid ? labelText : errorMessage}</Text>
            {
                type === 'password' ?
                    <TextInput
                        style={styles(
                            textAlign,
                            labelColor,
                            padding,
                            width,
                            borderColor,
                            backgroundColor,
                            borderWidth,
                            textColor).input}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderColor}
                        secureTextEntry={true}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                    /> :
                    <TextInput
                        style={styles(textAlign,
                            labelColor,
                            padding,
                            width,
                            borderColor,
                            backgroundColor,
                            borderWidth,
                            textColor).input}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderColor}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                    />
            }

        </View>
    )
}

const styles = (textAlign,
    labelColor,
    padding,
    width,
    borderColor,
    backgroundColor,
    borderWidth,
    textColor) =>
{
    return (
        StyleSheet.create({
            input: {
                padding: padding,
                minWidth: width,
                textAlign: 'center',
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                color: textColor,
                borderRadius: 10,
                marginTop: 5,
                borderWidth: borderWidth,
            },
            text: {
                fontWeight: 'bold',
                color: labelColor,
                textAlign: textAlign,
            }
        })
    )

} 