import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SOSButton from '../components/SOSButton';
import SignUp from '../screens/Signup';
import Login from '../screens/Login';
import WelcomeScreen from '../screens/Welcome';
import BloodRequestScreen from '../screens/BloodRequest';
import DonorDashboard from '../screens/Donor/DonorDashboard';
import RequestHistoryScreen from '../screens/RequestHistoryScreen';
import SOSScreen from '../screens/SOSScreen';
// import Profile from '../screens/Profile'; // Import the Profile screen
import ProfileScreen from '../screens/ProfileScreen';

import { Colors } from '../components/styles';

// import Profile from '../screens/Profile';

const { primary, tertiary } = Colors;
const Stack = createNativeStackNavigator();

const HIDDEN_SCREENS = ['Welcome', 'Login', 'SignUp'];

const RootStack = () => {
    const [currentScreen, setCurrentScreen] = useState('Welcome');  // Initial screen name

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer
                onStateChange={(state) => {
                    if (state) {
                        const currentRoute = state.routes[state.index];
                        setCurrentScreen(currentRoute.name);
                    }
                }}
            >
                <View style={{ flex: 1 }}>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20,
                            },
                        }}
                        initialRouteName="Welcome"
                    >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="BloodReq" component={BloodRequestScreen} />
                        <Stack.Screen name="DonorDash" component={DonorDashboard} />
                        <Stack.Screen name="ReqHisScreen" component={RequestHistoryScreen} />
                        <Stack.Screen name="SOSScreen" component={SOSScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        
                    </Stack.Navigator>

                    {/* Conditionally show SOSButton */}
                    {!HIDDEN_SCREENS.includes(currentScreen) && <SOSButton />}
                </View>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default RootStack;