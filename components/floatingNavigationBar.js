import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any icon library you prefer
import { useNavigation } from '@react-navigation/native';
import { colors } from '../components/styles1';

const { width } = Dimensions.get('window'); // Get screen width

const FloatingNavigationBar = () => {
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Home')}>
        <Icon name="home" size={25} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Search')}>
        <Icon name="search" size={25} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Request')}>
        <Icon name="plus-circle" size={30} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Profile')}>
        <Icon name="user" size={25} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5, // Adjust distance from the bottom as needed
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white, // Adjust background color
    paddingVertical: 15,
    borderRadius: width * 0.3, // 30% border radius (width-based)
    marginHorizontal: width * 0.05, // Add horizontal margin
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingNavigationBar;