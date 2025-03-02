import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { colors, typography, layout } from '../components/styles1';
import { useNavigation } from '@react-navigation/native';

const SOSButton = () => {
  const navigation = useNavigation();
  const scaleValue = new Animated.Value(1);

  const handlePress = () => {
    // Animate the button press
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to SOS screen
    navigation.navigate('SOSScreen');
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={styles.sosButton}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    right: 20,
    bottom: 100, // Position above the navigation bar
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...layout.shadow.medium,
  },
  sosText: {
    ...typography.button,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SOSButton; 