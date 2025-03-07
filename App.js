import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/Home';
import Header from './components/Header'

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedin, setLoggedin] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [email, setEmail] = useState(null);
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [screens, setScreens] = useState([]);
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const savedFirstName = await AsyncStorage.getItem('firstName');
      const savedLastName = await AsyncStorage.getItem('lastName');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedAvatar = await AsyncStorage.getItem('avatar');

      if (savedFirstName) setFirstName(savedFirstName);
      if (savedLastName) setLastName(savedLastName);
      if (savedEmail) setEmail(savedEmail);
      if (savedAvatar) setAvatar(savedAvatar);
    };

    loadUserData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setLoggedin(firstName !== null && email !== null);
  }, [firstName, email]);

  useEffect(() => {
    const getHeader = (props) => <Header {...props} avatar={avatar} firstName={firstName} lastName={lastName} />;
    console.log('loggedin', loggedin);
    if (loggedin) {
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
          children={(props) => <ProfileScreen {...props} setLoggedin={setLoggedin} />}
          options={{headerTitle: getHeader,}}
        />
      ]);
    } else {
      setInitialRouteName('Onboarding');
      setScreens([
        <Stack.Screen
          name="Onboarding"
          children={(props) => <OnboardingScreen {...props} setLoggedin={setLoggedin} />}
          options={{ headerShown: false }} />
      ]);
    }
  }, [loggedin, firstName, avatar, lastName]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>{screens}</Stack.Navigator>
    </NavigationContainer>
  );
}
