import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import * as Location from 'expo-location';
import { colors, typography, spacing, buttons, containers, layout } from '../components/styles1';
import MapView, { Marker } from 'react-native-maps';

const SOSScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notificationAnim = useRef(new Animated.Value(-100)).current; // Start off-screen

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleEmergencyResponse = async (response) => {
    if (response === 'accept') {
      setIsSearching(true);

      Alert.alert(
        'Emergency Sent',
        'Your Emergency request has been sent to all the nearby Donors. Soon you will be contacted',
        [{ text: 'OK', onPress: () => simulateDonorSearch() }]
      );
    } else {
      navigation.goBack();
    }
  };

  const simulateDonorSearch = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsSearching(false);

    Alert.alert(
      'Donor Found',
      'A donor has been found nearby! The donor will be arriving soon. The donor details have been sent to your email.',
      [{ text: 'OK', onPress: () => simulateEmailNotification() }]
    );
  };

  const simulateEmailNotification = async () => {
    // Set state to show the notification
    setShowNotification(true);

    // Animate the notification in
    Animated.timing(notificationAnim, {
      toValue: 0, // Slide in from the top
      duration: 500, // Animation duration
      easing: Easing.easeOut,
      useNativeDriver: false, // Important for animating height
    }).start(() => {
      // After a delay, animate the notification out
      setTimeout(() => {
        Animated.timing(notificationAnim, {
          toValue: -100, // Slide out to the top
          duration: 500,
          easing: Easing.easeIn,
          useNativeDriver: false,
        }).start(() => {
          setShowNotification(false); // Hide after animation
          navigation.navigate('DonorDash');
        });
      }, 3000); // Display the notification for 3 seconds
    });
  };

  return (
    <View style={containers.screen}>
      {/* Notification Component */}
      {showNotification && (
        <Animated.View
          style={[
            styles.notificationContainer,
            { top: notificationAnim },
          ]}
        >
          <Text style={styles.notificationText}>
            Donor details have been sent to your email.
          </Text>
        </Animated.View>
      )}

      <View style={styles.container}>
        <Text style={styles.title}>Emergency Alert</Text>

        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : !location ? (
          <Text style={styles.loadingText}>Loading location...</Text>
        ) : isSearching ? (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Emergency Location"
              />
            </MapView>

            <View style={styles.searchingOverlay}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.searchingText}>Searching for nearby donors...</Text>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="Emergency Location"
                />
              </MapView>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>Emergency Details:</Text>
              <Text style={styles.locationText}>
                Location: {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[buttons.primary, styles.acceptButton]}
                onPress={() => handleEmergencyResponse('accept')}
              >
                <Text style={styles.buttonText}>Send Emergency</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    ...typography.heading,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  mapContainer: {
    height: 300,
    borderRadius: layout.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    marginBottom: spacing.lg,
  },
  detailsText: {
    ...typography.subheading,
    color: colors.dark,
    marginBottom: spacing.md,
  },
  locationText: {
    ...typography.caption,
    color: colors.grey,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  declineButton: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  buttonText: {
    ...typography.button,
    textAlign: 'center',
  },
  errorText: {
    ...typography.caption,
    color: 'red',
    textAlign: 'center',
  },
  loadingText: {
    ...typography.caption,
    color: colors.grey,
    textAlign: 'center',
  },
  searchingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingText: {
    ...typography.subheading,
    marginTop: spacing.md,
  },
  notificationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    padding: spacing.md,
    alignItems: 'center',
    zIndex: 10, // Ensure it's on top
  },
  notificationText: {
    ...typography.button,
    color: colors.white,
  },
});

export default SOSScreen;