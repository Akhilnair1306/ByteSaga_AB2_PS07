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
  Platform,
  ScrollView
} from 'react-native';
import { colors, typography, spacing, buttons, containers, layout } from '../components/styles1';
import { Picker } from '@react-native-picker/picker'; // Install this: npm install @react-native-picker/picker
import DateTimePicker from '@react-native-community/datetimepicker'; // Install this: npm install @react-native-community/datetimepicker
import { useNavigation } from '@react-navigation/native'; // Import the hook

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

  const navigation = useNavigation(); // Use the hook to get the navigation object

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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
    // to create the user account.  For now, we'll just
    // simulate a successful signup.
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Replace this with your actual signup logic
      console.log('Signing up with:', { name, email, password, location, bloodGroup, dateOfBirth });

      // Simulate successful signup
      navigation.navigate('Login');  // Navigate to Login after successful signup
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', err);  // Log the error for debugging
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios'); // Hide picker on iOS after selection
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
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Blood Group:</Text>
            <Picker
              selectedValue={bloodGroup}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setBloodGroup(itemValue)
              }>
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