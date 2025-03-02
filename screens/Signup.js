import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { colors, typography, spacing, buttons, containers, layout } from '../components/styles1';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // References for TextInput fields
  const nameRef = useRef(null);  // Reference for the name field
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const locationRef = useRef(null);

  const handleSignUp = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword || !location || !bloodGroup || !dateOfBirth) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // In a real app, you'd make an API call here
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Signing up with:', { name, email, password, location, bloodGroup, dateOfBirth });

      navigation.navigate('DonorDash');
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', err);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const showMode = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView style={containers.screen}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled" // Prevent taps on the keyboard from blurring inputs
        >
          <Text style={styles.title}>Sign Up</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            ref={nameRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            ref={confirmPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => locationRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            ref={locationRef}
            returnKeyType="done"
            onSubmitEditing={handleSignUp}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Blood Group:</Text>
            <Picker
              selectedValue={bloodGroup}
              style={styles.picker}
              onValueChange={setBloodGroup}
            >
              <Picker.Item label="Select Blood Group" value="" />
              {bloodGroups.map((group) => (
                <Picker.Item key={group} label={group} value={group} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.datePickerButton} onPress={showMode}>
            <Text style={styles.datePickerButtonText}>
              Date of Birth: {dateOfBirth.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <TouchableOpacity style={buttons.primary} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
  loginText: {
    ...typography.caption,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  loginLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: spacing.md,
    width: '100%',
  },
  pickerLabel: {
    ...typography.subheading,
    marginBottom: spacing.sm,
  },
  picker: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    ...layout.shadow.small,
    color: colors.dark,
  },
  datePickerButton: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...layout.shadow.small,
    width: '100%',
    alignItems: 'flex-start',
  },
  datePickerButtonText: {
    fontSize: 16,
    color: colors.dark,
  },
});

export default SignUp;