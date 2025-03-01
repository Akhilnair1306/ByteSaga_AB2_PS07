import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";

import {
  colors,
  typography,
  spacing,
  buttons,
  containers,
  layout,
} from "../components/styles1"; // Import your styles
import FloatingNavigationBar from "../components/floatingNavigationBar";
// import FloatingNavigationBar from "../components/FloatingNavigationBar"; // Import the floating navbar

// Mock Data for Request History
const requestHistoryData = [
  {
    id: "1",
    bloodType: "A+",
    urgency: "Critical",
    hospitalLocation: "City Hospital",
    requestDate: "2025-02-20",
    status: "Fulfilled",
    tracking: [
      { stage: "Request Received", time: "2025-02-20 10:00 AM" },
      { stage: "Blood Collected", time: "2025-02-20 11:30 AM" },
      { stage: "Blood Delivered", time: "2025-02-20 02:00 PM" },
    ],
  },
  {
    id: "2",
    bloodType: "B-",
    urgency: "Normal",
    hospitalLocation: "Saint Mary's Hospital",
    requestDate: "2025-02-22",
    status: "Pending",
    tracking: [
      { stage: "Request Received", time: "2025-02-22 09:00 AM" },
      { stage: "Blood Collected", time: "Not yet" },
      { stage: "Blood Delivered", time: "Not yet" },
    ],
  },
  {
    id: "3",
    bloodType: "O+",
    urgency: "High",
    hospitalLocation: "Green Valley Medical Center",
    requestDate: "2025-02-25",
    status: "Pending",
    tracking: [
      { stage: "Request Received", time: "2025-02-25 12:00 PM" },
      { stage: "Blood Collected", time: "Not yet" },
      { stage: "Blood Delivered", time: "Not yet" },
    ],
  },
  {
    id: "4",
    bloodType: "AB+",
    urgency: "Critical",
    hospitalLocation: "Sunnydale Hospital",
    requestDate: "2025-02-27",
    status: "Fulfilled",
    tracking: [
      { stage: "Request Received", time: "2025-02-27 08:30 AM" },
      { stage: "Blood Collected", time: "2025-02-27 10:00 AM" },
      { stage: "Blood Delivered", time: "2025-02-27 03:30 PM" },
    ],
  },
  {
    id: "5",
    bloodType: "A-",
    urgency: "Normal",
    hospitalLocation: "Clearview Hospital",
    requestDate: "2025-02-28",
    status: "Pending",
    tracking: [
      { stage: "Request Received", time: "2025-02-28 07:45 AM" },
      { stage: "Blood Collected", time: "Not yet" },
      { stage: "Blood Delivered", time: "Not yet" },
    ],
  },
  {
    id: "6",
    bloodType: "B+",
    urgency: "High",
    hospitalLocation: "Lakefront Clinic",
    requestDate: "2025-03-01",
    status: "Fulfilled",
    tracking: [
      { stage: "Request Received", time: "2025-03-01 01:00 PM" },
      { stage: "Blood Collected", time: "2025-03-01 02:30 PM" },
      { stage: "Blood Delivered", time: "2025-03-01 05:00 PM" },
    ],
  },
  {
    id: "7",
    bloodType: "O-",
    urgency: "Normal",
    hospitalLocation: "Riverside Medical",
    requestDate: "2025-03-02",
    status: "Pending",
    tracking: [
      { stage: "Request Received", time: "2025-03-02 10:00 AM" },
      { stage: "Blood Collected", time: "Not yet" },
      { stage: "Blood Delivered", time: "Not yet" },
    ],
  },
  {
    id: "8",
    bloodType: "AB-",
    urgency: "Critical",
    hospitalLocation: "Bayview Hospital",
    requestDate: "2025-03-03",
    status: "Pending",
    tracking: [
      { stage: "Request Received", time: "2025-03-03 08:00 AM" },
      { stage: "Blood Collected", time: "Not yet" },
      { stage: "Blood Delivered", time: "Not yet" },
    ],
  },
  {
    id: "9",
    bloodType: "A+",
    urgency: "Normal",
    hospitalLocation: "Mountain View Clinic",
    requestDate: "2025-03-04",
    status: "Fulfilled",
    tracking: [
      { stage: "Request Received", time: "2025-03-04 09:30 AM" },
      { stage: "Blood Collected", time: "2025-03-04 11:00 AM" },
      { stage: "Blood Delivered", time: "2025-03-04 01:30 PM" },
    ],
  },
  {
    id: "10",
    bloodType: "B+",
    urgency: "Critical",
    hospitalLocation: "Lakeshore Medical Center",
    requestDate: "2025-03-05",
    status: "Pending",
    tracking: [
      { stage: "Request Received", time: "2025-03-05 11:00 AM" },
      { stage: "Blood Collected", time: "Not yet" },
      { stage: "Blood Delivered", time: "Not yet" },
    ],
  },
];

const RequestHistoryScreen = () => {
  const [requests, setRequests] = useState(requestHistoryData);
  const [trackingVisibility, setTrackingVisibility] = useState({});

  const handleTrackRequest = (status, id) => {
    if (status === "Fulfilled") {
      Alert.alert("Request Fulfilled", "This request has been fulfilled.");
    } else {
      setTrackingVisibility((prevState) => ({
        ...prevState,
        [id]: !prevState[id], // Toggle visibility of the tracking details
      }));
    }
  };

  const renderRequestItem = ({ item }) => {
    const {
      bloodType,
      urgency,
      hospitalLocation,
      requestDate,
      status,
      tracking,
      id,
    } = item;

    // Determine the color based on urgency
    let urgencyColor = colors.grey; // Default color
    if (urgency === "Critical") {
      urgencyColor = colors.primary;
    } else if (urgency === "High") {
      urgencyColor = colors.secondary;
    }

    return (
      <View style={styles.requestCard}>
        <Text style={styles.requestTitle}>Blood Type: {bloodType}</Text>
        <Text style={[styles.text, { color: urgencyColor }]}>
          Urgency: {urgency}
        </Text>
        <Text style={styles.text}>Hospital: {hospitalLocation}</Text>
        <Text style={styles.text}>Request Date: {requestDate}</Text>
        <Text style={styles.text}>Status: {status}</Text>

        {/* Conditionally render the "Track Request" or "View Less" button */}
        {status === "Fulfilled" ? (
          <Text style={styles.fulfilledText}>Request Fulfilled</Text>
        ) : (
          <TouchableOpacity
            style={[
              styles.trackButton,
              trackingVisibility[id] && styles.viewLessButton,
            ]} // Apply different styles for "View Less"
            onPress={() => handleTrackRequest(status, id)}
          >
            <Text
              style={[
                styles.trackButtonText,
                trackingVisibility[id] && styles.viewLessButtonText,
              ]}
            >
              {trackingVisibility[id] ? "View Less" : "Track Request"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Conditionally render the tracking progress only when track request is clicked and the request is not fulfilled */}
        {trackingVisibility[id] && status !== "Fulfilled" && (
          <View style={styles.timeline}>
            <Text style={styles.timelineTitle}>Tracking Progress:</Text>
            {tracking.map((stage, index) => (
              <View key={index} style={styles.timelineItem}>
                <Text style={styles.timelineText}>{stage.stage}</Text>
                <Text style={styles.timelineText}>{stage.time}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={containers.screen}>
      <Text style={styles.pageTitle}>Request History</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
        contentContainerStyle={{ paddingBottom: 80 }} // Add padding for the floating navbar
      />
      <FloatingNavigationBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    ...typography.heading,
    fontSize: 24,
    color: colors.primary,
    textAlign: "center",
    marginTop: 40,
    marginBottom: spacing.lg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background, // Use background color from styles1
    paddingTop: Platform.OS === "ios" ? 20 : 50, // Adds space for the top bar on iOS
    paddingHorizontal: spacing.md,
  },
  requestCard: {
    backgroundColor: colors.white,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderRadius: layout.borderRadius.medium,
    ...layout.shadow.small,
  },
  requestTitle: {
    ...typography.subheading,
    fontSize: 18,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  text: {
    ...typography.caption,
    fontSize: 14,
    color: colors.grey,
    marginVertical: spacing.xxs,
  },
  trackButton: {
    ...buttons.primary,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.full,
    marginVertical: spacing.md,
  },
  viewLessButton: {
    ...buttons.secondary,
  },
  trackButtonText: {
    ...typography.button,
    fontSize: 14,
  },
  viewLessButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  fulfilledText: {
    ...typography.caption,
    fontSize: 14,
    color: colors.primary,
    marginVertical: spacing.md,
  },
  timeline: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
    paddingTop: spacing.sm,
  },
  timelineTitle: {
    ...typography.subheading,
    fontSize: 16,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  timelineItem: {
    marginBottom: spacing.sm,
  },
  timelineText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.grey,
  },
});

export default RequestHistoryScreen;