import React, { useState, useEffect } from 'react';

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
  const [screens, setScreens] = useState([]);
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    const getHeader = (props) => <Header {...props} avatar={avatar} firstName={firstName} lastName={lastName} />;
    if (firstName && email) {
      setInitialRouteName('Home');
      setScreens([
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: getHeader,
            headerStyle: { height: 100 },
          }}
        />,
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerTitle: getHeader,}}
        />
      ]);
    } else {
      setInitialRouteName('Onboarding');
      setScreens([
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }} />
      ]);
    }
  }, [firstName, avatar, lastName, email]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>{screens}</Stack.Navigator>
    </NavigationContainer>
  );
};
