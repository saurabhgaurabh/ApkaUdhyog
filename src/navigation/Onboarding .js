import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../src/MainStyle";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    // title: "Welcome to ApkaUdhyog",
    // description: "Empowering your business with smart tools and seamless operations.",
    image: require("../assets/onboarding.png"),
  },
  {
    id: "2",
    // title: "Manage Everything Easily",
    // description: "Handle inventory, clients, and sales all in one place effortlessly.",
    image: require("../assets/onboarding2.png"),
  },
  {
    id: "3",
    // title: "Grow with Confidence",
    // description: "Take control of your business with data-driven insights and automation.",
    image: require("../assets/onboarding3.png"),
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace("Login");
    }
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.onboardingSlide}>
      <ImageBackground source={item.image} style={styles.fullScreenImage}  imageStyle={{ resizeMode: "stretch", }}>
        <View style={styles.textContainer}>
          <Text style={styles.onboardingTitle}>{item.title}</Text>
          <Text style={styles.onboardingDescription}>{item.description}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.onboardingContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        ref={flatListRef}
      />

      <View style={styles.onboardingIndicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.onboardingDot,
              { backgroundColor: index === currentIndex ? "#4CAF50" : "#bff1c2ff" },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.onboardingButton} onPress={handleNext}>
        <Text style={styles.onboardingButtonText}>
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;
