import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';

import {
  colors,
  typography,
  spacing,
  buttons,
  containers,
  layout,
} from "../../components/styles1"; // Import your styles
import FloatingNavigationBar from '../../components/floatingNavigationBar';
// import FloatingNavigationBar from "../../components/FloatingNavigationBar"; // Import the floating navbar

const { width } = Dimensions.get('window'); // For handling the slide width dynamically

const notifications = [
  {
    id: '1',
    bloodType: 'A+',
    urgency: 'High',
    location: 'Hospital X, Downtown',
    time: '2 hours ago',
  },
  {
    id: '2',
    bloodType: 'O-',
    urgency: 'Medium',
    location: 'Clinic Y, Uptown',
    time: '1 hour ago',
  },
  {
    id: '3',
    bloodType: 'B+',
    urgency: 'Low',
    location: 'Hospital Z, Central Park',
    time: '30 mins ago',
  },
];

const historyItems = [
  {
    id: '1',
    bloodType: 'O+',
    location: 'Hospital A, Downtown',
    date: '2025-02-25',
    status: 'Completed',
  },
  {
    id: '2',
    bloodType: 'A-',
    location: 'Clinic B, Uptown',
    date: '2025-02-20',
    status: 'Completed',
  },
  {
    id: '3',
    bloodType: 'B+',
    location: 'Hospital C, Midtown',
    date: '2025-02-18',
    status: 'Pending',
  },
];

const DonorDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);  // Donor availability toggle
  const flatListRef = useRef(null); // Reference for FlatList
  
  // Function to toggle donor availability
  const toggleAvailability = () => setIsAvailable(prevState => !prevState);

  // Function to accept the request
  const acceptRequest = (request) => {
    alert(`You accepted the request for ${request.bloodType} at ${request.location}`);
  };

  // Function to decline the request
  const declineRequest = (request) => {
    alert(`You declined the request for ${request.bloodType} at ${request.location}`);
  };

  // Auto-slide notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: Math.floor(Math.random() * notifications.length), // Randomly select the next item
          animated: true,
        });
      }
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, []);

  return (
    <SafeAreaView style={containers.screen}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Donor Dashboard Main Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.dashboardTitle}>Donor Dashboard</Text>
          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityText}>Availability: </Text>
            <Switch
              value={isAvailable}
              onValueChange={toggleAvailability}
              trackColor={{ false: colors.grey, true: colors.primary }}
              thumbColor={isAvailable ? colors.white : colors.lightGrey}
            />
          </View>
        </View>

        {/* Notifications Section - Render only if donor is available */}
        {isAvailable && (
          <View style={styles.notificationListContainer}>
            <Text style={styles.sectionTitle}>Urgent Requests</Text>
            <FlatList
              ref={flatListRef}
              data={notifications}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false} // Hide the scroll indicator
              renderItem={({ item }) => (
                <View style={styles.notificationCard}>
                  <Text style={styles.notificationTitle}>Blood Type: {item.bloodType}</Text>
                  <Text style={styles.notificationText}>Urgency: {item.urgency}</Text>
                  <Text style={styles.notificationText}>Location: {item.location}</Text>
                  <Text style={styles.notificationText}>Posted: {item.time}</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => acceptRequest(item)}
                      style={[styles.button, styles.acceptButton]}
                    >
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => declineRequest(item)}
                      style={[styles.button, styles.declineButton]}
                    >
                      <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.notificationListContent}
            />
          </View>
        )}

        {/* History Section */}
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Donation History</Text>
          {historyItems.length === 0 ? (
            <Text style={styles.noHistoryText}>No previous donations available.</Text>
          ) : (
            <FlatList
              data={historyItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.historyCard}>
                  <Text style={styles.historyCardTitle}>Blood Type: {item.bloodType}</Text>
                  <Text style={styles.historyCardText}>Location: {item.location}</Text>
                  <Text style={styles.historyCardText}>Date: {item.date}</Text>
                  <Text style={styles.historyCardText}>Status: {item.status}</Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
      <FloatingNavigationBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingBottom: 80, // Adjust based on the height of the floating navbar
  },
  headerContainer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    ...layout.shadow.small,
    borderRadius: layout.borderRadius.medium,
    margin: spacing.md,
  },
  dashboardTitle: {
    ...typography.heading,
    fontSize: 24,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  availabilityText: {
    ...typography.subheading,
    fontSize: 16,
    color: colors.dark,
  },
  sectionTitle: {
    ...typography.subheading,
    fontSize: 20,
    color: colors.primary,
    marginLeft: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  notificationListContainer: {
    marginTop: spacing.md,
  },
  notificationListContent: {
    paddingHorizontal: spacing.md,
  },
  notificationCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    marginHorizontal: spacing.sm,
    borderRadius: layout.borderRadius.medium,
    marginVertical: spacing.sm,
    ...layout.shadow.small,
    width: width * 0.7,
    height: 200, // Adjusted height to fit content better
  },
  notificationTitle: {
    ...typography.subheading,
    fontSize: 18,
    color: colors.dark,
  },
  notificationText: {
    ...typography.caption,
    fontSize: 14,
    color: colors.grey,
    marginVertical: spacing.xxs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  button: {
    ...buttons.primary,
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: layout.borderRadius.full,
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  declineButton: {
    backgroundColor: colors.secondary, // Using secondary color for decline
  },
  buttonText: {
    ...typography.button,
    fontSize: 14,
  },
  historyContainer: {
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  historyCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: layout.borderRadius.medium,
    ...layout.shadow.small,
  },
  historyCardTitle: {
    ...typography.subheading,
    fontSize: 16,
    color: colors.dark,
  },
  historyCardText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.grey,
  },
  noHistoryText: {
    ...typography.caption,
    fontSize: 14,
    color: colors.grey,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

export default DonorDashboard;