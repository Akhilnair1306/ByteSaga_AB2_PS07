import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledButton, StyledInputLabel, StyledTextInput, RightIcon, MsgBox, ButtonText, ExtraView, ExtraText, TextLinkContent, TextLink } from '../components/styles';
import { Formik } from 'formik';
import { View, Platform, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

//colors
import { Colors } from '../components/styles';
import KeyboardAvoidWrapper from '../components/KeyboardAvoidingWrapper';

const { brand, darkLight } = Colors;

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [dob, setDob] = useState(new Date()); // Date of birth state
  const [showDatePicker, setShowDatePicker] = useState(false); // Show date picker

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    setDob(currentDate);
  };

  return (
    <KeyboardAvoidWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Donate Us</PageTitle>
        <SubTitle>Account Signup</SubTitle>
        <Formik
          initialValues={{
            name: '',
            bloodgroup: '',
            location: '',
            dateofbirth: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Full Name"
                icon="file"
                placeholder="andyj@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="default"
              />

              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="andyj@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />

              <MyTextInput
                label="Blood Group"
                icon="code-of-conduct"
                placeholder="A+"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('bloodgroup')}
                onBlur={handleBlur('bloodgroup')}
                value={values.bloodgroup}
                keyboardType="default"
              />

              <MyTextInput
                label="Location"
                icon="location"
                placeholder="City"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('location')}
                onBlur={handleBlur('location')}
                value={values.location}
                keyboardType="default"
              />

              {/* Date of Birth Field with DateTime Picker */}
              {/* <StyledInputLabel> Date of Birth </StyledInputLabel> */}
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                {/* <StyledTextInput
                  value={dob.toLocaleDateString()}
                  editable={false}
                  placeholder="Select your date of birth"
                  placeholderTextColor={darkLight}
                /> */}
               <MyTextInput
                label="Date of Birth"
                icon="calendar"
                placeholder="Select your date of birth"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('dateofbirth')}
                onBlur={handleBlur('dateofbirth')}
                value={dob ? dob.toLocaleDateString() : ''} 
                editable={false}
              />
              </TouchableOpacity>

              {/* Date Picker Popup */}
              {showDatePicker && (
                <DateTimePicker
                  value={dob}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="*****"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />

              <MyTextInput
                label="Confirm Password"
                icon="lock"
                placeholder="*****"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />

              <MsgBox>...</MsgBox>

              <StyledButton onPress={handleSubmit}>
                <ButtonText>Sign Up</ButtonText>
              </StyledButton>

              <ExtraView>
                <ExtraText>Already have an Account?</ExtraText>
                <TextLink>
                  <TextLinkContent>Login</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
    </KeyboardAvoidWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons size={30} name={hidePassword ? 'eye-off' : 'eye'} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default SignUp;


