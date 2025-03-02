import React, { useState } from 'react';
import { ScrollView, Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  colors,
  typography,
  spacing,
  buttons,
  containers,
  layout,
} from '../components/styles1'; // Use your existing styles
import { Picker } from '@react-native-picker/picker';
import KeyboardAvoidWrapper from '../components/KeyboardAvoidingWrapper';
import { TextInput } from 'react-native-gesture-handler'; // Correct import
import FloatingNavigationBar from '../components/floatingNavigationBar';

// Validation Schema
const validationSchema = Yup.object({
  bloodType: Yup.string().required('Blood type is required'),
  urgencyLevel: Yup.string().required('Urgency level is required'),
  hospitalLocation: Yup.string().required('Hospital location is required'),
  additionalNotes: Yup.string().optional(),
});

const BloodRequestScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [formValues, setFormValues] = useState(null); // Store form values when the modal is opened
  const [formError, setFormError] = useState('');

  // Function to handle form submission
  const handleSubmit = (values) => {
    console.log(values); // Replace with your form submission logic
    setModalVisible(false); // Close the modal after confirming the request
  };

  // Function to handle canceling the modal
  const handleCancel = () => {
    setModalVisible(false); // Simply close the modal if canceled
  };

  const handleConfirmRequest = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });

      // Display confirmation alert
      Alert.alert(
        "Confirm Request",
        "The request will be broadcasted to nearby donors.",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to DonorDashboard after clicking OK
              handleSubmit(values); // Optionally submit the form
              navigation.navigate("DonorDash");
            },
          },
        ],
        { cancelable: false } // Prevent dismissing the alert by tapping outside
      );

      setFormValues(values);

      setFormError("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Set Formik error message if validation fails
        setFormError("Please Fill in All Fields");
      } else {
        console.error('Validation failed with an unexpected error:', error);
        setFormError("Validation has an unexpected error");
      }
    }
  };

  return (
    <KeyboardAvoidWrapper>
      <View style={containers.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.pageTitle}>Blood Request</Text>
          <Text style={styles.subTitle}>Request Blood for Immediate Need</Text>

          <Formik
            initialValues={{
              bloodType: '',
              urgencyLevel: '',
              hospitalLocation: '',
              additionalNotes: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleConfirmRequest}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <View style={styles.formArea}>
                {/* Blood Type */}
                <Text style={styles.inputLabel}>Select Blood Type</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.bloodType}
                    onValueChange={handleChange('bloodType')}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Blood Type" value="" />
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="O-" value="O-" />
                    <Picker.Item label="AB-" value="AB-" />
                  </Picker>
                </View>
                {touched.bloodType && errors.bloodType && (
                  <Text style={styles.errorMsg}>{errors.bloodType}</Text>
                )}

                {/* Urgency Level */}
                <Text style={styles.inputLabel}>Urgency Level</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.urgencyLevel}
                    onValueChange={handleChange('urgencyLevel')}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Urgency" value="" />
                    <Picker.Item label="Normal" value="Normal" />
                    <Picker.Item label="Urgent" value="Urgent" />
                    <Picker.Item label="Critical" value="Critical" />
                  </Picker>
                </View>
                {touched.urgencyLevel && errors.urgencyLevel && (
                  <Text style={styles.errorMsg}>{errors.urgencyLevel}</Text>
                )}

                {/* Hospital Location */}
                <Text style={styles.inputLabel}>Hospital Location</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Hospital Location"
                  value={values.hospitalLocation}
                  onChangeText={handleChange('hospitalLocation')}
                  onBlur={handleBlur('hospitalLocation')}
                />
                {touched.hospitalLocation && errors.hospitalLocation && (
                  <Text style={styles.errorMsg}>{errors.hospitalLocation}</Text>
                )}

                {/* Additional Notes */}
                <Text style={styles.inputLabel}>Additional Notes</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Additional Notes"
                  value={values.additionalNotes}
                  onChangeText={handleChange('additionalNotes')}
                  onBlur={handleBlur('additionalNotes')}
                  multiline={true} // Allow multiple lines
                  numberOfLines={4}  // Set the number of lines
                />
                {formError ? <Text style={styles.errorMsg}>{formError}</Text> : null}
                {/* Confirm Request Button */}
                <TouchableOpacity style={buttons.primary} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Confirm Request</Text>
                </TouchableOpacity>

                {/* Optionally, Display a Message */}
                <Text style={styles.note}>
                  Note: Once you confirm, the request will be broadcasted to nearby donors.
                </Text>
              </View>
            )}
          </Formik>
        </ScrollView>
        <FloatingNavigationBar />
      </View>

      {/* Confirmation Modal */}
      {/* Remove Modal for now */}
    </KeyboardAvoidWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containers.centered,
    paddingHorizontal: spacing.xl,
  },
  pageTitle: {
    ...typography.heading,
    marginBottom: spacing.md,
    textAlign: 'center',
    color: colors.primary,
  },
  subTitle: {
    ...typography.subheading,
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.grey,
  },
  formArea: {
    width: '100%',
  },
  inputLabel: {
    ...typography.subheading,
    fontSize: 18,
    marginBottom: spacing.sm,
    color: colors.dark,
  },
  textInput: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.md,
    fontSize: 16,
    color: colors.dark,
    ...layout.shadow.small,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    marginBottom: spacing.md,
    ...layout.shadow.small,
  },
  picker: {
    color: colors.dark,
  },
  buttonText: {
    ...typography.button,
    textAlign: 'center'
  },
  note: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.md,
    color: colors.grey,
  },
  errorMsg: {
    color: 'red',
    marginBottom: spacing.md,
    textAlign: 'left',
  },
});

export default BloodRequestScreen;