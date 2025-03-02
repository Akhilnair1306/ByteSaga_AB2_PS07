import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { colors, typography, spacing, buttons, containers, layout } from '../components/styles1';
import MapView, { Marker } from 'react-native-maps';

const SOSScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  const handleEmergencyResponse = (response) => {
    if (response === 'accept') {
      Alert.alert(
        'Emergency Accepted',
        'You have accepted to respond to this emergency. Please proceed to the location.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={containers.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Emergency Alert</Text>
        
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : !location ? (
          <Text style={styles.loadingText}>Loading location...</Text>
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
                <Text style={styles.buttonText}>Accept Emergency</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[buttons.secondary, styles.declineButton]}
                onPress={() => handleEmergencyResponse('decline')}
              >
                <Text style={[styles.buttonText, { color: colors.primary }]}>Decline</Text>
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
});

export default SOSScreen; 