import React, { useState } from 'react';
import { ScrollView, Modal, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { 
  StyledContainer, 
  InnerContainer, 
  PageLogo, 
  PageTitle, 
  SubTitle, 
  StyledFormArea, 
  StyledTextInput, 
  StyledInputLabel, 
  StyledButton, 
  ButtonText, 
  MsgBox, 
  Line 
} from '../components/styles';
import { Picker } from '@react-native-picker/picker';
import KeyboardAvoidWrapper from '../components/KeyboardAvoidingWrapper';
import { MyTextInput } from './Login';

// Validation Schema
const validationSchema = Yup.object({
  bloodType: Yup.string().required('Blood type is required'),
  urgencyLevel: Yup.string().required('Urgency level is required'),
  hospitalLocation: Yup.string().required('Hospital location is required'),
  additionalNotes: Yup.string().optional(),
});

const BloodRequestScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);  // State for modal visibility
  const [formValues, setFormValues] = useState(null);  // Store form values when the modal is opened

  // Function to handle form submission
  const handleSubmit = (values) => {
    console.log(values); // Replace with your form submission logic
    setModalVisible(false); // Close the modal after confirming the request
  };

  // Function to handle canceling the modal
  const handleCancel = () => {
    setModalVisible(false); // Simply close the modal if canceled
  };

  return (
    <KeyboardAvoidWrapper>
      <StyledContainer>
        <InnerContainer>
          <PageLogo />
          <PageTitle>Blood Request</PageTitle>
          <SubTitle>Request Blood for Immediate Need</SubTitle>

          <Formik
            initialValues={{
              bloodType: '',
              urgencyLevel: '',
              hospitalLocation: '',
              additionalNotes: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              // You can navigate or handle the values here
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <StyledFormArea>
                {/* Blood Type */}
                <StyledInputLabel>Select Blood Type</StyledInputLabel>
                <Picker
                  selectedValue={values.bloodType}
                  onValueChange={handleChange('bloodType')}
                  style={{
                    backgroundColor: '#E5E7EB',
                    padding: 15,
                    borderRadius: 5,
                    height: 60,
                  }}
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
                {touched.bloodType && errors.bloodType && (
                  <MsgBox>{errors.bloodType}</MsgBox>
                )}

                {/* Urgency Level */}
                <StyledInputLabel>Urgency Level</StyledInputLabel>
                <Picker
                  selectedValue={values.urgencyLevel}
                  onValueChange={handleChange('urgencyLevel')}
                  style={{
                    backgroundColor: '#E5E7EB',
                    padding: 15,
                    borderRadius: 5,
                    height: 60,
                  }}
                >
                  <Picker.Item label="Select Urgency" value="" />
                  <Picker.Item label="Normal" value="Normal" />
                  <Picker.Item label="Urgent" value="Urgent" />
                  <Picker.Item label="Critical" value="Critical" />
                </Picker>
                {touched.urgencyLevel && errors.urgencyLevel && (
                  <MsgBox>{errors.urgencyLevel}</MsgBox>
                )}

                {/* Hospital Location */}
                <MyTextInput
                  label="Hospital Location"
                  icon="location" // Icon for location
                  value={values.hospitalLocation}
                  onChangeText={handleChange('hospitalLocation')}
                  onBlur={handleBlur('hospitalLocation')}
                  isPassword={false} // Not a password field
                />
                {touched.hospitalLocation && errors.hospitalLocation && (
                  <MsgBox>{errors.hospitalLocation}</MsgBox>
                )}

                {/* Additional Notes */}
                <MyTextInput
                  label="Additional Notes"
                  icon="note" // Icon for additional notes
                  value={values.additionalNotes}
                  onChangeText={handleChange('additionalNotes')}
                  onBlur={handleBlur('additionalNotes')}
                  isPassword={false} // Not a password field
                />

                {/* Confirm Request Button */}
                <StyledButton
                  onPress={() => {
                    setFormValues(values);
                    handleSubmit();
                    navigation.navigate("DonorDash") // Store the form values when the modal is opened
                    // setModalVisible(true);  // Show the modal
                  }}
                >
                  <ButtonText>Confirm Request</ButtonText>
                </StyledButton>

                {/* Optionally, Display a Message */}
                <MsgBox>Note: Once you confirm, the request will be broadcasted to nearby donors.</MsgBox>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>

      {/* Confirmation Modal */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{
            backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Confirm Your Request</Text>
            <Text style={{ marginVertical: 10 }}>Are you sure you want to submit this blood request?</Text>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4CAF50',
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
                onPress={() => {
                  handleSubmit();  // Call form submission
                }}
              >
                <Text style={{ color: 'white' }}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#f44336',
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
                onPress={handleCancel}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </KeyboardAvoidWrapper>
  );
};

export default BloodRequestScreen;
