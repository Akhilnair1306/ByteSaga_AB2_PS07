import React from 'react'

//React navigate
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/Signup';
import Login from '../screens/Login';
import WelcomeScreen from '../screens/Welcome';
import { Colors } from '../components/styles';
import BloodRequestScreen from '../screens/BloodRequest';
import DonorDashboard from '../screens/Donor/DonorDashboard';
import RequestHistoryScreen from '../screens/RequestHistoryScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import SignUp from './screens/Signup';
// import Login from './screens/Login';
const { primary,tertiary} = Colors
const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
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
            initialRouteName= 'Welcome'
            >
                <Stack.Screen name= "Login" component={Login}/>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name= "SignUp" component={SignUp}/>
                <Stack.Screen name= "BloodReq" component={BloodRequestScreen}/>
                <Stack.Screen name= "DonorDash" component={DonorDashboard}/>
                <Stack.Screen name= "ReqHisScreen" component={RequestHistoryScreen}/>
                {/* <Stack.Screen name= "Login" component={Login}/> */}
            </Stack.Navigator>
        </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default RootStack