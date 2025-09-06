import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Card, TextInput } from 'react-native-paper'
import Colors from '../../constants/color'
import CustomHeader from '../../components/CustomeHeader'
import Fonts from '../../constants/fonts'
import styles from '../../MainStyle'

const AddPurchaseItems = () => {
    const [state, setState] = useState({
        dealerName: '',
        material: '',
        postalCode: '',
        country: '',
        state: '',
        city: '',
        address: '',
        freight: '',
        amount: '',
        totalAmount: '',
        pendingAmount: ''
    });

    const handleDealerName = (text) => setState({ ...state, dealerName: text });
    const handleMaterial = (text) => setState({ ...state, material: text });
    const handlePostalCode = (text) => setState({ ...state, postalCode: text });
    const handleCountry = (text) => setState({ ...state, country: text });
    const handleState = (text) => setState({ ...state, state: text });
    const handleCity = (text) => setState({ ...state, city: text });
    const handleAddress = (text) => setState({ ...state, address: text });
    const handleFreight = (text) => setState({ ...state, freight: text });
    const handleAmount = (text) => {
        const amount = parseFloat(text) || 0;
        const totalAmount = parseFloat(state.totalAmount) || 0;
        const pending = totalAmount - amount;
        setState({ ...state, amount: text, pendingAmount: pending.toString() });
    };
    const handleTotalAmount = (text) => {
        const totalAmount = parseFloat(text) || 0;
        const amount = parseFloat(state.amount) || 0;
        const pending = totalAmount - amount;
        setState({ ...state, totalAmount: text, pendingAmount: pending.toString() });
    };

    return (
        <View style={{ backgroundColor: Colors.dashboardGreen, flex: 1, }}>
            <CustomHeader />
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View style={{ padding: 10 }}>
                    <TextInput
                        label="Dealer Name"
                        placeholder="Enter Dealer name"
                        mode="outlined"
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            label="Postal Code"
                            placeholder="Enter Postal Code"
                            mode="outlined"
                            onChangeText={handlePostalCode}
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
                            label="Country"
                            placeholder="Enter Country"
                            mode="outlined"
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
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            label="State"
                            placeholder="Enter State"
                            mode="outlined"
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
                        <TextInput
                            label="City"
                            placeholder="Enter City"
                            mode="outlined"
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
                    </View>
                    <TextInput
                        label="Address"
                        placeholder="Enter Address"
                        mode="outlined"
                        onChangeText={handleAddress}
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
                        label="Freight"
                        placeholder="Enter Freight"
                        mode="outlined"
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
                        value={state.pendingAmount}
                        editable={false}
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
                <View style={styles.bottomButtonColumnSubmit}>
                    <Text style={styles.bottomButtonText}>Submit</Text>
                </View>
            </View>
        </View>
    )
}

export default AddPurchaseItems
