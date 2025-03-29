import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthActions } from '../../../store/auth/useAuthActions';
import { REGEX } from '../../../utils/constants';

const RegisterScreen = ({ navigation }: any) => {
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

  const { registerUser } = useAuthActions();

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
      setErrors((prev) => ({ ...prev, name: 'Name is required' }));
      return;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!REGEX.EMAIL.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email ' }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      return;
    }
    if (password.length < 8) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      return;
    }
    if (!confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Please confirm your password' }));
      return;
    }
    if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    registerUser({ name, email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
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
            mode="outlined"
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
            mode="outlined"
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
            mode="outlined"
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
            mode="outlined"
            secureTextEntry
            error={!!errors.confirmPassword}
            style={styles.input}
          />
          {errors.confirmPassword ? (
            <Text variant="bodySmall" style={styles.errorText}>
              {errors.confirmPassword}
            </Text>
          ) : null}

          <Button mode="contained" onPress={handleRegister} style={styles.button}>
            Sign Up
          </Button>

          <View style={styles.footer}>
            <Text variant="bodyMedium">Already have an account? </Text>
            <Text variant="bodyMedium" style={styles.link} onPress={() => navigation.goBack()}>
              Sign In
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    padding: 20,
    margin: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 2,
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
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
  },
  errorText: {
    color: '#DC3545',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#4A90E2',
  },
});

export default RegisterScreen;
