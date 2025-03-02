//Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { colors, typography, spacing, buttons, containers, layout } from '../components/styles1';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // In a real app, you'd make an API call here
    // to authenticate the user.  For now, we'll just
    // simulate a successful login.
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Replace this with your actual login logic
      if (email === 'zoro5onigiri@gmail.com' && password === 'Password') {
        // Successful login - navigate to DonorDashboard
        navigation.navigate('DonorDash');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);  // Log the error for debugging
    }
  };

  return (
    <SafeAreaView style={containers.screen}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0} // Adjust as needed
      >
        <View style={styles.container}>
          <Text style={styles.title}>Log In</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={buttons.primary} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containers.centered,
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.heading,
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.md,
    fontSize: 16,
    color: colors.dark,
    ...layout.shadow.small,
    width: '100%',
  },
  buttonText: {
    ...typography.button,
  },
  signUpText: {
    ...typography.caption,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  signUpLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: spacing.md,
    textAlign: 'center',
  }
});

export default Login;

