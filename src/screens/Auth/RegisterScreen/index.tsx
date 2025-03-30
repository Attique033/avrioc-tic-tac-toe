import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthActions} from '../../../store/auth/useAuthActions';
import {REGEX} from '../../../utils/constants';
import {colors} from '../../../theme/colors';
import BackgroundImage from '../../../components/BackgroundImage';
import {BlurView} from 'expo-blur';
import Button from "../../../components/Button";

const RegisterScreen = ({navigation}: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const {registerUser} = useAuthActions();

    const handleRegister = () => {
        // Reset errors
        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        // Basic validation
        if (!name) {
            setErrors((prev) => ({...prev, name: 'Name is required'}));
            return;
        }
        if (!email) {
            setErrors((prev) => ({...prev, email: 'Email is required'}));
            return;
        }
        if (!REGEX.EMAIL.test(email)) {
            setErrors((prev) => ({...prev, email: 'Invalid email '}));
            return;
        }
        if (!password) {
            setErrors((prev) => ({...prev, password: 'Password is required'}));
            return;
        }
        if (password.length < 8) {
            setErrors((prev) => ({...prev, password: 'Password must be at least 8 characters long'}));
            return;
        }
        if (!confirmPassword) {
            setErrors((prev) => ({...prev, confirmPassword: 'Please confirm your password'}));
            return;
        }
        if (password !== confirmPassword) {
            setErrors((prev) => ({...prev, confirmPassword: 'Passwords do not match'}));
            return;
        }

        registerUser({name, email, password});
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundImage/>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <BlurView tint={'light'} intensity={60} style={styles.card}>
                    <Text variant="headlineMedium" style={styles.title}>
                        Create Account
                    </Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>
                        Sign up to get started
                    </Text>

                    <TextInput
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        error={!!errors.name}
                        style={styles.input}
                    />
                    {errors.name ? (
                        <Text variant="bodySmall" style={styles.errorText}>
                            {errors.name}
                        </Text>
                    ) : null}

                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        outlineStyle={{backgroundColor: colors.transparentWhite}}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={!!errors.email}
                        style={styles.input}
                    />
                    {errors.email ? (
                        <Text variant="bodySmall" style={styles.errorText}>
                            {errors.email}
                        </Text>
                    ) : null}

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        error={!!errors.password}
                        style={styles.input}
                    />
                    {errors.password ? (
                        <Text variant="bodySmall" style={styles.errorText}>
                            {errors.password}
                        </Text>
                    ) : null}

                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        error={!!errors.confirmPassword}
                        style={styles.input}
                    />
                    {errors.confirmPassword ? (
                        <Text variant="bodySmall" style={styles.errorText}>
                            {errors.confirmPassword}
                        </Text>
                    ) : null}

                    <Button text={'Sign Up'} onPress={handleRegister}>

                    </Button>

                    <View style={styles.footer}>
                        <Text variant="bodyMedium">Already have an account? </Text>
                        <Text variant="bodyMedium" style={styles.link} onPress={() => navigation.goBack()}>
                            Sign In
                        </Text>
                    </View>
                </BlurView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: '20%'
    },
    card: {
        padding: 20,
        margin: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    title: {
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 32,
        textAlign: 'center',
        opacity: 0.7,
    },
    input: {
        marginBottom: 8,
        backgroundColor: colors.transparent,
    },
    errorText: {
        color: colors.error,
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: colors.primary,
    },
});

export default RegisterScreen;
