import { View, Text, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Card, TextInput } from 'react-native-paper'
import Colors from '../../constants/color'
import CustomHeader from '../../components/CustomeHeader'
import Fonts from '../../constants/fonts'
import styles from '../../MainStyle'
import { ServerUrl } from '../../services/ServerUrl'
import { useNavigation } from '@react-navigation/native'
import PurchaseItems from './PurchaseItems'


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
        material_amount_pending: ''
    });

    const handleDealerName = (text) => setState(prevState => ({ ...prevState, dealer_name: text }));
    const handleMaterial = (text) => setState(prevState => ({ ...prevState, material_type: text }));
    const handlePostalCode = (text) => setState(prevState => ({ ...prevState, postal_code: text }));
    const handleCountry = (text) => setState(prevState => ({ ...prevState, country: text }));
    const handleState = (text) => setState(prevState => ({ ...prevState, state: text }));
    const handleCity = (text) => setState(prevState => ({ ...prevState, city: text }));
    const handleAddress = (text) => setState(prevState => ({ ...prevState, address: text }));
    const handleFreight = (text) => setState(prevState => ({ ...prevState, freight: text }));
    const handleAmount = (text) => {
        setState(prevState => {
            const amount = parseFloat(text) || 0;
            const totalAmount = parseFloat(prevState.totalAmount) || 0;
            const pending = totalAmount - amount;
            return { ...prevState, material_amount: text, material_amount_pending: pending.toString() };
        });
    };
    const handleTotalAmount = (text) => {
        setState(prevState => {
            const totalAmount = parseFloat(text) || 0;
            const amount = parseFloat(prevState.material_amount) || 0;
            const pending = totalAmount - amount;
            return { ...prevState, totalAmount: text, material_amount_pending: pending.toString() };
        });
    };

    const AddPurchaseHandle = async () => {
        try {
            const { dealer_name, material_type, postal_code,
                country, state: addressState, city, address, freight, material_amount, material_amount_pending } = state;

            const order_id = Math.random().toString(36).substring(2, 9);
            console.log(dealer_name, material_type, postal_code, country, addressState, city, address, freight, material_amount, material_amount_pending, order_id);
            const response = await fetch(`https://d5021510c8e8.ngrok-free.app/api/users/v1/motion-purchase-row-material-post`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dealer_name, material_type, postal_code, country, state: addressState, city, address, freight, material_amount, material_amount_pending, order_id }),
            })
            const result = await response.json();
            console.log(result, " add purchase result..")
            if (result.status) {
                navigation.navigate(PurchaseItems);
            } else {
                ToastAndroid.show("Data not Inserted via user.", ToastAndroid.SHORT);
            }

        } catch (error) {
            ToastAndroid.show('Internal error', ToastAndroid.SHORT);
            console.log(error, "internal");
        }
    }
    return (
        <View style={{ backgroundColor: Colors.dashboardGreen, flex: 1, }}>
            <CustomHeader />
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View style={{ padding: 10 }}>
                    <TextInput
                        label="Dealer Name"
                        placeholder="Enter Dealer name"
                        mode="outlined"
                        value={state.dealer_name}
                        onChangeText={handleDealerName}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        activeOutlineColor="#4CAF50"
                        outlineColor="#7f8378ff"
                        textColor="#7f8378ff"
                        outlineStyle={{ borderWidth: 1, borderRadius: 5 }}
                        style={styles.input}
                    />
                    <TextInput
                        label="Material"
                        placeholder="Enter Material"
                        mode="outlined"
                        value={state.material_type}
                        onChangeText={handleMaterial}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        activeOutlineColor="#4CAF50"
                        outlineColor="#7f8378ff"
                        textColor="#000"
                        outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                        style={styles.input}
                    />
                    <TextInput
                        label="Postal Code"
                        placeholder="Enter Postal Code"
                        mode="outlined"
                        value={state.postal_code}
                        onChangeText={handlePostalCode}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        autoCorrect={false}
                        activeOutlineColor="#4CAF50"
                        outlineColor="#7f8378ff"
                        textColor="#000"
                        outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                        style={styles.input}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            label="Country"
                            placeholder="Enter Country"
                            mode="outlined"
                            value={state.country}
                            onChangeText={handleCountry}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={[styles.input, { width: '48%' }]}
                        />
                        <TextInput
                            label="State"
                            placeholder="Enter State"
                            mode="outlined"
                            value={state.state}
                            onChangeText={handleState}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={[styles.input, { width: '48%' }]}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            label="City"
                            placeholder="Enter City"
                            mode="outlined"
                            value={state.city}
                            onChangeText={handleCity}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={[styles.input, { width: '48%' }]}
                        />
                        <TextInput
                            label="Address"
                            placeholder="Enter Address"
                            mode="outlined"
                            value={state.address}
                            onChangeText={handleAddress}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={[styles.input, { width: '48%' }]}
                        />
                    </View>
                    <TextInput
                        label="Freight"
                        placeholder="Enter Freight"
                        mode="outlined"
                        value={state.freight}
                        onChangeText={handleFreight}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        autoCorrect={false}
                        activeOutlineColor="#4CAF50"
                        outlineColor="#7f8378ff"
                        textColor="#000"
                        outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                        style={styles.input}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            label="Total Amount"
                            placeholder="Enter Total Amount"
                            mode="outlined"
                            value={state.totalAmount}
                            onChangeText={handleTotalAmount}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={[styles.input, { width: '48%' }]}
                        />
                        <TextInput
                            label="Amount"
                            placeholder="Enter Amount"
                            mode="outlined"
                            value={state.material_amount}
                            onChangeText={handleAmount}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={[styles.input, { width: '48%' }]}
                        />

                    </View>
                    <TextInput
                        label="Pending Amount"
                        placeholder="Pending Amount"
                        mode="outlined"
                        value={state.material_amount_pending}
                        onChangeText={(text) => setState(prevState => ({ ...prevState, material_amount_pending: text }))}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        autoCorrect={false}
                        activeOutlineColor="#4CAF50"
                        outlineColor="#7f8378ff"
                        textColor="#000"
                        outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                        style={styles.input}
                    />
                </View>
                <View style={styles.cardHeading}>
                    <TouchableOpacity style={styles.cardButton}>
                        <Text style={styles.cardText}>Get Your Purchase</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ height: 60 }} />
            <View style={styles.bottomButtonBody}>
                <View style={styles.bottomButtonCancel}>
                    <Text style={styles.bottomButtonText}>Cancel</Text>
                </View>
                <TouchableOpacity onPress={AddPurchaseHandle} style={styles.bottomButtonColumnSubmit}>
                    <Text style={styles.bottomButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddPurchaseItems
