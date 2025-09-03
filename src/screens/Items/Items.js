import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, StatusBar } from 'react-native'
import React, { useRef } from 'react'
import CustomHeader from '../../components/CustomeHeader'
import styles from '../../MainStyle';
import { useNavigation } from '@react-navigation/native';
import AddNewItem from './AddNewItem';

const Items = () => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;

    // Button slide animation
    const translateY = scrollY.interpolate({
        inputRange: [0, 50], // when scroll starts
        outputRange: [0, 100], // move button down
        extrapolate: "clamp",
    });

    return (
        <>
            <CustomHeader backgroundColor="#ffffff" textColor="#8a4949ff" />
            {/* <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} /> */}
            <View style={{ flex: 1, top: 0, backgroundColor: '#DCEDC8' }}>
                <Animated.ScrollView
                    style={{ flex: 1, backgroundColor: "#DCEDC8" }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                >
                    {/* Example items */}
                    {Array.from({ length: 5 }, (_, i) => (
                        <View key={i} style={styles.itemBox}>
                            <Text>Item {i + 1}</Text>
                        </View>
                    ))}
                </Animated.ScrollView>

                {/* Floating Add Button */}
                <Animated.View
                    style={[styles.floatingBtn, { transform: [{ translateY }] }]}
                >
                    <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('AddNewItem') }}>
                        <Text style={styles.btnText}>📦 Add Item</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </>
    )
}

export default Items