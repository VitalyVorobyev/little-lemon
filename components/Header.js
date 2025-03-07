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
      <Pressable onPress={() => navigation.push('Profile')}>
        { props.avatar ? (
            <Image source={{ uri: props.avatar }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.initials}>
                {(props.firstName[0] || '') + (props.lastName[0] || '')}
              </Text>
            </View>
          )
        }
      </Pressable>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    height: 60,
    width: '100%'
  },
  logo: {
    height: 40
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  placeholderImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  initials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF'
  }
});
