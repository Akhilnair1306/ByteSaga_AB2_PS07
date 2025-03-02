import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { colors, typography, spacing, buttons, containers, layout } from '../components/styles1';
import FloatingNavigationBar from '../components/floatingNavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = ({ navigation }) => {
  // Mock user data - in a real app, this would come from your backend
  const [userData] = useState({
    name: 'John Doe',
    bloodType: 'O+',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, NY',
    donationsCount: 5,
    lastDonation: '2024-02-15',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Default avatar URL
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+1 234 567 8901'
    }
  });

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    Alert.alert('Edit Profile', 'Edit Profile functionality will be implemented soon');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => navigation.navigate('Login'),
          style: 'destructive',
        },
      ]
    );
  };

  const ProfileSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const InfoRow = ({ label, value, icon }) => (
    <View style={styles.infoRow}>
      <Icon name={icon} size={20} color={colors.primary} style={styles.icon} />
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={containers.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: userData.profileImage }}
              style={styles.profileImage}
              // defaultSource={require('../assets/default-avatar.png')} // Fallback image if web image fails
            />
            <TouchableOpacity 
              style={styles.editImageButton}
              onPress={() => Alert.alert('Change Photo', 'Photo change functionality will be implemented soon')}
            >
              <Icon name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.bloodType}>{userData.bloodType}</Text>
        </View>

        {/* Donation Stats */}
        <ProfileSection title="Donation Statistics">
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.donationsCount}</Text>
              <Text style={styles.statLabel}>Donations</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {new Date(userData.lastDonation).toLocaleDateString()}
              </Text>
              <Text style={styles.statLabel}>Last Donation</Text>
            </View>
          </View>
        </ProfileSection>

        {/* Contact Information */}
        <ProfileSection title="Contact Information">
          <InfoRow icon="envelope" label="Email" value={userData.email} />
          <InfoRow icon="phone" label="Phone" value={userData.phone} />
          <InfoRow icon="map-marker" label="Location" value={userData.location} />
        </ProfileSection>

        {/* Emergency Contact */}
        <ProfileSection title="Emergency Contact">
          <InfoRow icon="user" label="Name" value={userData.emergencyContact.name} />
          <InfoRow icon="users" label="Relation" value={userData.emergencyContact.relation} />
          <InfoRow icon="phone" label="Phone" value={userData.emergencyContact.phone} />
        </ProfileSection>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[buttons.primary, styles.editButton]} 
            onPress={handleEditProfile}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[buttons.secondary, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <Text style={[styles.buttonText, { color: colors.primary }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FloatingNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100, // Space for floating navigation bar
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderBottomLeftRadius: layout.borderRadius.large,
    borderBottomRightRadius: layout.borderRadius.large,
    ...layout.shadow.small,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: layout.borderRadius.full,
    ...layout.shadow.small,
  },
  name: {
    ...typography.heading,
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  bloodType: {
    ...typography.subheading,
    color: colors.primary,
    fontWeight: '600',
  },
  section: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    ...layout.shadow.small,
  },
  sectionTitle: {
    ...typography.subheading,
    color: colors.dark,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.heading,
    fontSize: 20,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    marginRight: spacing.md,
    width: 24,
  },
  label: {
    ...typography.caption,
    color: colors.grey,
  },
  value: {
    ...typography.subheading,
    color: colors.dark,
  },
  buttonContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  editButton: {
    marginBottom: spacing.sm,
  },
  logoutButton: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  buttonText: {
    ...typography.button,
    textAlign: 'center',
  },
});

export default ProfileScreen; 