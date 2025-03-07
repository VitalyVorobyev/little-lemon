import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from 'react-native-mask-text';
import { Checkbox } from 'react-native-paper';

import { useUserData } from '../hooks/UserDataContext';

export default ProfileScreen = (props) => {
  const { firstName, lastName, email, avatar, phone, notifications,
        setFirstName, setLastName, setEmail, setAvatar, setPhone, setNotifications,
        handleSaveChanges } = useUserData();

  const handleLogout = () => {
    const dologout = async () => await AsyncStorage.clear();
    dologout();
    props.setLoggedin(false);
  };

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const removeImage = () => { setAvatar(null); };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <View style={styles.profileSection}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.initials}>{(firstName[0] || '') + (lastName ? lastName[0] : '')}</Text>
          </View>
        )}
        <Pressable style={styles.changeButton} onPress={pickImage}>
          <Text style={styles.changeButtonText}>
            Change
          </Text>
        </Pressable>
        <Pressable style={styles.removeButton} onPress={removeImage}>
          <Text style={styles.removeButtonText}>
            Remove
          </Text>
        </Pressable>
      </View>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" />
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <MaskedTextInput
        style={styles.input}
        mask="(999) 999-9999"
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <View style={styles.notifications}>
        <Text style={styles.subtitle}>
          Email Notifications
        </Text>
        {Object.keys(notifications).map((key) => (
          <View key={key} style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <Checkbox
                status={notifications[key] ? 'checked' : 'unchecked'}
                onPress={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
              />
            </View>
          <Text>{key.replace(/([A-Z])/g, ' $1')}</Text>
          </View>
        ))}
      </View>
      <Pressable
        style={({ pressed }) => [ styles.logoutButton, pressed && styles.buttonPressed ]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>
          Log out
        </Text>
      </Pressable>
      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [ styles.discardButton, pressed && styles.buttonPressed ]}
          onPress={() => { Alert.alert('Not implemented!'); }}
        >
          <Text style={styles.discardButtonText}>
            Discard changes
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.saveButton, pressed && styles.buttonPressed,
          ]}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>
            Save changes
          </Text>
        </Pressable>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 0
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  initials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF'
  },
  changeButton: {
    marginLeft: 10,
    height: 36,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#495E57',
    borderRadius: 5
  },
  changeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  removeButton: {
    marginLeft: 10,
    height: 36,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#495E57',
    borderWidth: 2
  },
  removeButtonText: {
    color: '#495E57',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  notifications: {
    marginVertical: 10
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6
  },
  checkbox: {
    borderWidth: 1,
    borderRadius: '50%',
    borderColor: '#ccc'
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 8
  },
  logoutButtonText: {
    fontWeight: 'bold'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  discardButton: {
    width: '40%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#495E57',
    borderWidth: 2
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }]
  },
  discardButtonText: {
    color: '#495E57',
    fontWeight: 'bold'
  },
  saveButton: {
    width: '40%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#495E57',
    borderRadius: 8
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
