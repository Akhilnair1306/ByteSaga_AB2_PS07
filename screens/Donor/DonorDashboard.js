import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Text, TouchableOpacity, Switch, Dimensions, StyleSheet, ScrollView } from 'react-native';

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
    <ScrollView style={styles.container}>
      {/* Donor Dashboard Main Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.dashboardTitle}>Donor Dashboard</Text>
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>Availability: </Text>
          <Switch
            value={isAvailable}
            onValueChange={toggleAvailability}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAvailable ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Notifications Section - Render only if donor is available */}
      {isAvailable && (
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
          contentContainerStyle={{ flexGrow: 1 }} // Ensure FlatList grows and doesn't push the availability switch
        />
      )}

      {/* History Section */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Donation History</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 80
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  availabilityText: {
    fontSize: 16,
    color: '#666',
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: width * 0.7,
    height: 180,
  },
  notificationTitle: {
    fontSize: 18,
    color: '#333',
  },
  notificationText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    width: '45%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  historyContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  historyCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  historyCardTitle: {
    fontSize: 18,
    color: '#333',
  },
  historyCardText: {
    fontSize: 16,
    color: '#666',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DonorDashboard;
