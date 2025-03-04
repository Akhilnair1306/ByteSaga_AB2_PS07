import React, { useState, useRef, useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { colors, typography, spacing, layout, buttons, containers } from '../components/styles1';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Find Blood Donors Nearby',
    description: 'Connect with blood donors in your area who match your blood type requirements. Fast and effective.',
    image: require('../assets/donor_illustration.png'),
  },
  {
    id: '2',
    title: 'Request Blood Donations',
    description: 'Create blood donation requests and share your needs with potential donors in your community.',
    image: require('../assets/request_illustration.png'),
  },
  {
    id: '3',
    title: 'Save Lives Together',
    description: 'Join our community of donors and recipients working together to save lives through blood donation.',
    image: require('../assets/community_illustration.png'),
  },
];

const Welcome = ({ navigation }) => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useEffect(() => {
    // Increased display time to 4 seconds
    if (showWelcomeScreen) {
      const timer = setTimeout(() => {
        setShowWelcomeScreen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeScreen]);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNextSlide = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const skipToEnd = () => {
    const lastIndex = onboardingData.length - 1;
    slidesRef.current.scrollToIndex({ index: lastIndex, animated: true });
    setCurrentIndex(lastIndex);
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const Paginator = () => (
    <View style={styles.paginationContainer}>
      {onboardingData.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index.toString()}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );

  if (showWelcomeScreen) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>BloodLink</Text>
                <Text style={styles.welcomeSubtitle}>Donate Blood, Save Lives</Text>
            </View>
        </SafeAreaView>
    );
}


  return (
    <View style={styles.container}>
      {currentIndex !== onboardingData.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={skipToEnd}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={onboardingData}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEventThrottle={32}
      />
      <Paginator />
      <View style={styles.bottomContainer}>
        {currentIndex === onboardingData.length - 1 ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={scrollToNextSlide}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 60,
},
  welcomeTitle: {
    ...typography.heading,
    fontSize: 34,
    color: colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  welcomeSubtitle: {
    ...typography.subheading,
    fontSize: 15,
    color: colors.grey,
    textAlign: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    ...typography.caption,
    color: colors.grey,
    fontWeight: '500',
  },
  slide: {
    width: layout.screenWidth,
    alignItems: 'center',
    padding: spacing.xl,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  title: {
    ...typography.heading,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.subheading,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 8,
  },
  bottomContainer: {
    marginBottom: 50,
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
  primaryButton: {
    ...buttons.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryButton: {
    ...buttons.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});

export default Welcome;