import React, { useState } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView,
    Text,
    Platform,
} from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/color';
import CustomHeader from '../../components/CustomeHeader';
import styles from '../../MainStyle';
import { ServerUrl } from '../../services/ServerUrl';
import PurchaseItems from './ListPurchase';

const AddPurchaseItems = () => {
    const navigation = useNavigation();
    const [state, setState] = useState({
        dealer_name: '',
        material_type: '',
        postal_code: '',
        country: '',
        state: '',
        city: '',
        address: '',
        freight: '',
        material_amount: '',
        totalAmount: '',
        material_amount_pending: '',
    });

    const handleChange = (key, value) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    // 🔹 Auto calculate pending amount
    const handleAmount = (text) => {
        setState(prev => {
            const amount = parseFloat(text) || 0;
            const total = parseFloat(prev.totalAmount) || 0;
            const pending = total - amount;
            return { ...prev, material_amount: text, material_amount_pending: pending.toString() };
        });
    };

    const handleTotalAmount = (text) => {
        setState(prev => {
            const total = parseFloat(text) || 0;
            const amount = parseFloat(prev.material_amount) || 0;
            const pending = total - amount;
            return { ...prev, totalAmount: text, material_amount_pending: pending.toString() };
        });
    };

    const AddPurchaseHandle = async () => {
        try {
            const {
                dealer_name,
                material_type,
                postal_code,
                country,
                state: addressState,
                city,
                address,
                freight,
                material_amount,
                material_amount_pending,
                totalAmount
            } = state;

            if (!dealer_name || !material_type || !city || !totalAmount) {
                ToastAndroid.show('Please fill all required fields.', ToastAndroid.SHORT);
                return;
            }

            // const order_id = Math.random();

            const response = await fetch(`${ServerUrl()}api/users/v1/motion-purchase-row-material-post`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dealer_name,
                    material_type,
                    postal_code,
                    country,
                    state: addressState,
                    city,
                    address,
                    freight,
                    material_amount,
                    material_amount_pending,
                    totalAmount,
                    // order_id,
                }),
            });

            const result = await response.json();
            // console.log('Add Purchase Result:', result);

            if (result.status) {
                ToastAndroid.show('Purchase added successfully!', ToastAndroid.SHORT);
                navigation.navigate(PurchaseItems);
            } else {
                ToastAndroid.show('Failed to insert data.', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log('Error:', error);
            ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground }}>
            <CustomHeader title="Add Purchase Items" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.salescontainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {/* Dealer Info */}
                    <Card style={styles.salescard}>
                        <Card.Title title="Dealer Details" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            <TextInput
                                label="Dealer Name"
                                mode="outlined"
                                value={state.dealer_name}
                                onChangeText={text => handleChange('dealer_name', text)}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                            <TextInput
                                label="Material"
                                mode="outlined"
                                value={state.material_type}
                                onChangeText={text => handleChange('material_type', text)}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                            <TextInput
                                label="Postal Code"
                                mode="outlined"
                                keyboardType="numeric"
                                value={state.postal_code}
                                onChangeText={text => handleChange('postal_code', text)}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                        </Card.Content>
                    </Card>

                    {/* Address Info */}
                    <Card style={[styles.salescard, { marginTop: 10 }]}>
                        <Card.Title title="Address Details" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    label="City"
                                    mode="outlined"
                                    value={state.city}
                                    onChangeText={text => handleChange('city', text)}
                                    activeOutlineColor="#4CAF50"
                                    outlineColor="#7f8378ff"
                                    style={[styles.input, { width: '48%' }]}
                                />
                                <TextInput
                                    label="Address"
                                    mode="outlined"
                                    value={state.address}
                                    onChangeText={text => handleChange('address', text)}
                                    activeOutlineColor="#4CAF50"
                                    outlineColor="#7f8378ff"
                                    style={[styles.input, { width: '48%' }]}
                                />
                            </View>
                        </Card.Content>
                    </Card>

                    {/* Payment Info */}
                    <Card style={[styles.salescard, { marginTop: 10 }]}>
                        <Card.Title title="Payment Details" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            <TextInput
                                label="Freight"
                                mode="outlined"
                                keyboardType="numeric"
                                value={state.freight}
                                onChangeText={text => handleChange('freight', text)}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    label="Total Amount"
                                    mode="outlined"
                                    keyboardType="numeric"
                                    value={state.totalAmount}
                                    onChangeText={handleTotalAmount}
                                    activeOutlineColor="#4CAF50"
                                    outlineColor="#7f8378ff"
                                    style={[styles.input, { width: '48%' }]}
                                />
                                <TextInput
                                    label="Paid Amount"
                                    mode="outlined"
                                    keyboardType="numeric"
                                    value={state.material_amount}
                                    onChangeText={handleAmount}
                                    activeOutlineColor="#4CAF50"
                                    outlineColor="#7f8378ff"
                                    style={[styles.input, { width: '48%' }]}
                                />
                            </View>
                            <TextInput
                                label="Pending Amount"
                                mode="outlined"
                                keyboardType="numeric"
                                value={state.material_amount_pending}
                                onChangeText={text => handleChange('material_amount_pending', text)}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                        </Card.Content>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtonBody}>
                <TouchableOpacity style={styles.bottomButtonCancel}>
                    <Text style={styles.bottomButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={AddPurchaseHandle} style={styles.bottomButtonColumnSubmit}>
                    <Text style={styles.bottomButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddPurchaseItems;
