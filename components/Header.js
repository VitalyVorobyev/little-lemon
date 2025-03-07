import { Image, View, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default Header = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require('../assets/Logo.png')}
        resizeMode='contain'
      />
      
      <Pressable style={styles.profileContainer} onPress={() => navigation.push('Profile')}>
        {props.avatar ? (
          <Image source={{ uri: props.avatar }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.placeholderImage]}>
            <Text style={styles.initials}>
              {(props.firstName[0] || '') + (props.lastName ? props.lastName[0] : '')}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures profile icon stays on the right
    paddingHorizontal: 20,
    height: 60,
    width: 400,
    position: 'relative',
  },
  logo: {
    height: 30,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -74 }], // Centers the logo
  },
  profileContainer: {
    marginLeft: 'auto', // Pushes the profile icon to the right
  },
  profileImage: {
    width: 26,
    height: 26,
    borderRadius: '50%',
  },
  placeholderImage: {
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  }
});
