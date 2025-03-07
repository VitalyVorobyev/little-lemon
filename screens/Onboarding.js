import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Keyboard, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default OnboardingScreen = (props) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [buttunDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const isFirstNameValid = /^[A-Za-z]+$/.test(firstName) && firstName.trim() !== '';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setButtonDisabled(!isFirstNameValid || !isEmailValid);
  }, [firstName, email]);

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('email', email);
      props.setLoggedin(true);
    } catch(e) {
      Alert.alert(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput 
          style={styles.input} 
          value={firstName} 
          onChangeText={setFirstName} 
          placeholder="Enter your first name"
          placeholderTextColor="#A9A9A9"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
          placeholder="Enter your email"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
        />
        <Pressable
          style={[styles.button, buttunDisabled && styles.buttonDisabled]} disabled={buttunDisabled}
          onPress={saveUserData}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    height: 50,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: '#D3D8DC',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginBottom: 5,
    color: '#2C3E50',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#2C3E50',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  button: {
    backgroundColor: '#F4CE14',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 8,
    width: 80
  },
  buttonText: {
    fontWeight: 'bold'
  },
});
