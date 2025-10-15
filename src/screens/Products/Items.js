import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, StatusBar, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomHeader from '../../components/CustomeHeader'
import styles from '../../MainStyle';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AddNewItem from './AddNewItem';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/itemSlice';
import Colors from '../../constants/color';
import * as Animatable from 'react-native-animatable';



const Items = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [itemList, setItemList] = useState([]);

    // Use local fetch instead of Redux thunk
    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://868493e69f60.ngrok-free.app/api/users/v1/product-manufacturing-get"
            );
            const data = await response.json();
            if (data.status && Array.isArray(data.result.result)) {
                setItemList(data.result.result);
            } else {
                console.log("Unexpected API format:", data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );
    const scrollY = useRef(new Animated.Value(0)).current;

    const translateY = scrollY.interpolate({
        inputRange: [0, 50], // when scroll starts
        outputRange: [0, 100], // move button down
        extrapolate: "clamp",
    });

    return (
        <>
            <CustomHeader backgroundColor="#ffffff" textColor="#8a4949ff" />
            <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddNewItem')}>
                    <Text style={styles.purchaseButtonText}>{`New Product`}</Text>
                </TouchableOpacity>
            </Animatable.View>
            <View style={{ flex: 1, backgroundColor: Colors.screenBackground, padding: 10 }}>
                <FlatList
                    data={itemList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemBox}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                {item.product_name}
                            </Text>
                            <Text>Material: {item.material_type_one}</Text>
                            <Text>Quantity: {item.material_quantity}</Text>
                            <Text>Quality: {item.material_quality}</Text>
                            <Text>Batch: {item.batch_number}</Text>
                            <Text>Unit: {item.unit}</Text>
                            <Text>Supervisor: {item.supervisor_name}</Text>
                            <Text>Total Cost: ₹{item.total_cost}</Text>
                            <Text>Remarks: {item.remarks}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text>No items found</Text>}
                />
            </View>
        </>
    )
}

export default Items