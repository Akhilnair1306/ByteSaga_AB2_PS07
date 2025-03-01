import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledButton,StyledInputLabel, StyledTextInput, RightIcon, MsgBox, ButtonText, ExtraView, ExtraText, TextLinkContent, TextLink } from '../components/styles';
import { Formik } from 'formik';
import { View } from 'react-native';

//colors
import { Colors } from '../components/styles';

//icons
import {Ionicons, Octicons} from '@expo/vector-icons'
import KeyboardAvoidWrapper from '../components/KeyboardAvoidingWrapper';

const {brand, darkLight} = Colors;
const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    return(
        <KeyboardAvoidWrapper>
        <StyledContainer>
            <StatusBar style ='dark' />
            <InnerContainer>
            <PageLogo />
            <PageTitle>Donate Us</PageTitle>
            <SubTitle> Login</SubTitle>
            <Formik initialValues={{ email: '', password: ''}}
                    onSubmit={( values) => {
                        console.log(values);
                        navigation.navigate("SignUp");
                    }}
            >{({handleChange, handleBlur, handleSubmit, values}) => (
                <StyledFormArea>
                     <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="andyj@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType= "email-address"
              />
                    <MyTextInput  
                    label= "Password"
                    icon="lock"
                    placeholder="*****"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry = {hidePassword}
                    isPassword = {true}
                    hidePassword = {hidePassword}
                    setHidePassword={setHidePassword}
                    />
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>
                            Login
                        </ButtonText>
                    </StyledButton>
                    <ExtraView>
                        <ExtraText>
                            Don't Have An Account already?
                        </ExtraText>
                        <TextLink onPress={() => navigation.navigate("BloodReq")}>
                            <TextLinkContent>
                                SignUp
                            </TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
            )}
            </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidWrapper>
    );
}

export const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel
             keyboardType="default"
             focusable={true}
             >{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            { isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons size ={30} name={hidePassword ? 'eye-off' : 'eye'} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}
export default Login;