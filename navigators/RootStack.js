import React from 'react'

//React navigate
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/Signup';
import Login from '../screens/Login';
import { Colors } from '../components/styles';
import BloodRequestScreen from '../screens/BloodRequest';
// import SignUp from './screens/Signup';
// import Login from './screens/Login';
const { primary,tertiary} = Colors
const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent'
                },
                headerTintColor: tertiary,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                }
            }}
            initialRouteName= 'BloodReq'
            >
                <Stack.Screen name= "Login" component={Login}/>
                <Stack.Screen name= "SignUp" component={SignUp}/>
                <Stack.Screen name= "BloodReq" component={BloodRequestScreen}/>
                {/* <Stack.Screen name= "Login" component={Login}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack