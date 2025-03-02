import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  colors,
  typography,
  spacing,
  containers,
  layout,
  buttons,
} from '../../components/styles1'; // Import your styles
import FloatingNavigationBar from '../../components/floatingNavigationBar';

const Profile = () => {
  // Dummy user data (replace with actual user data from your app)
  const user = {
    name: 'John Doe',
    bloodType: 'A+',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    location: 'New York, NY',
    donations: 12,
  };

  return (
    <SafeAreaView style={containers.screen}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/men/1.jpg', // Replace with actual avatar
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="tint" size={20} color={colors.primary} />
            <Text style={styles.detailText}>
              Blood Type: <Text style={styles.detailValue}>{user.bloodType}</Text>
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="envelope" size={20} color={colors.primary} />
            <Text style={styles.detailText}>
              Email: <Text style={styles.detailValue}>{user.email}</Text>
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="phone" size={20} color={colors.primary} />
            <Text style={styles.detailText}>
              Phone: <Text style={styles.detailValue}>{user.phone}</Text>
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="heart" size={20} color={colors.primary} />
            <Text style={styles.detailText}>
              Donations: <Text style={styles.detailValue}>{user.donations}</Text>
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={[buttons.primary, styles.actionButton]}>
          <Text style={typography.button}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[buttons.secondary, styles.actionButton]}>
          <Text style={[typography.button, { color: colors.primary }]}>
            Settings
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <FloatingNavigationBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingBottom: 80, // Adjust based on the height of the floating navbar
  },
  header: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    margin: spacing.md,
    marginTop: 60,
    borderRadius: layout.borderRadius.medium,
    ...layout.shadow.small,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: layout.borderRadius.full,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  name: {
    ...typography.heading,
    fontSize: 24,
    textAlign: 'center',
  },
  location: {
    ...typography.subheading,
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    margin: spacing.md,
    borderRadius: layout.borderRadius.medium,
    ...layout.shadow.small,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailText: {
    ...typography.subheading,
    fontSize: 16,
    color: colors.grey,
    marginLeft: spacing.sm,
  },
  detailValue: {
    color: colors.dark,
  },
  actionButton: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
});

export default Profile;