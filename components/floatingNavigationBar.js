import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any icon library you prefer
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../components/styles1';

const { width } = Dimensions.get('window'); // Get screen width

const FloatingNavigationBar = () => {
  const navigation = useNavigation();
  const route = useRoute();  // Get the current route

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const isActive = (screenName) => {
    return route.name === screenName;  // Check if the current screen matches the button's target
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation('DonorDash')}
      >
        <Icon name="home" size={25} color={colors.primary} />
        {isActive('DonorDash') && <View style={styles.activeUnderline} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation('BloodReq')}
      >
        <Icon name="tint" size={25} color={colors.primary} />
        {isActive('BloodReq') && <View style={styles.activeUnderline} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation('ReqHisScreen')}
      >
        <Icon name="history" size={25} color={colors.primary} />
        {isActive('ReqHisScreen') && <View style={styles.activeUnderline} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation('Profile')}
      >
        <Icon name="user" size={25} color={colors.primary} />
        {isActive('Profile') && <View style={styles.activeUnderline} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20, // Adjust distance from the bottom as needed
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
  activeUnderline: {
    height: 3,  // Height of the underline
    backgroundColor: colors.primary, // Underline color
    width: '80%',   // Width of the underline
    marginTop: 5,   // Spacing between the icon and underline
  },
});

export default FloatingNavigationBar;