import { View, StyleSheet,Image } from 'react-native';

export default SplashScreen = () => {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  logo: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  }
});
