import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [phone, setPhone] = useState(null);
  const [notifications, setNotifications] = useState({
    OrderStatus: false,
    PasswordChanges: false,
    SpecialOffers: false,
    Newsletter: false,
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedFirstName = await AsyncStorage.getItem('firstName');
        const savedLastName = await AsyncStorage.getItem('lastName');
        const savedEmail = await AsyncStorage.getItem('email');
        const savedAvatar = await AsyncStorage.getItem('avatar');
        const savedPhone = await AsyncStorage.getItem('phone');
        const savedNotifications = await AsyncStorage.getItem('notifications');

        if (savedFirstName) setFirstName(savedFirstName);
        if (savedEmail) setEmail(savedEmail);
        if (savedAvatar) setAvatar(savedAvatar);
        if (savedPhone) setPhone(savedPhone);
        if (savedLastName) setLastName(savedLastName);
        if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      if (firstName) await AsyncStorage.setItem('firstName', firstName);
      if (lastName) await AsyncStorage.setItem('lastName', lastName);
      if (email) await AsyncStorage.setItem('email', email);
      if (phone) await AsyncStorage.setItem('phone', phone);
      if (avatar) await AsyncStorage.setItem('avatar', avatar);
      if (notifications) await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const clearState = async () => {
    await AsyncStorage.clear();
    setFirstName('');
    setEmail(null);
    setAvatar(null);
    setPhone(null);
    setLastName('');
    setNotifications({
      OrderStatus: false,
      PasswordChanges: false,
      SpecialOffers: false,
      Newsletter: false,
    });
  }

  return (
    <UserDataContext.Provider
      value={{
        isLoading,
        firstName,
        lastName,
        email,
        avatar,
        phone,
        notifications,
        setFirstName,
        setLastName,
        setEmail,
        setAvatar,
        setPhone,
        setNotifications,
        handleSaveChanges,
        clearState
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
