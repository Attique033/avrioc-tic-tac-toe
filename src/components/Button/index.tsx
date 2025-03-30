import {BlurView} from "expo-blur";

import {Text, TouchableRipple} from "react-native-paper";
import React from "react";
import {StyleSheet} from "react-native";

type ButtonProps = {
    text: string;
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({text, onPress}: ButtonProps) => {
    return (
        <TouchableRipple onPress={onPress} style={styles.container}>
            <BlurView tint={"light"} intensity={60} style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </BlurView>
        </TouchableRipple>

    )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        borderRadius: 12,
        width: '100%',
        overflow: 'hidden',
    },
    button: {
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default Button;
