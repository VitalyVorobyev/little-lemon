import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/Home';
import Header from '../components/Header';

import { useUserData } from '../hooks/UserDataContext';

const Stack = createNativeStackNavigator();

export default Navigation = () => {
  const { isLoading, firstName, avatar, lastName, email } = useUserData();

  if (isLoading) {
    return <SplashScreen />;
  }

  // Determine if the user is logged in.
  const isLoggedIn = firstName && email;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerTitle: (props) => (
              <Header {...props} avatar={avatar} firstName={firstName} lastName={lastName} />
            ),
            headerStyle: { height: 100 },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
