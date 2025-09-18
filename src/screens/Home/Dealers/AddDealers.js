import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, Button } from "react-native-paper";
// import EditableHeader from '../../components/EditableHeader';
import CustomHeader from '../../../components/CustomeHeader';
import Colors from '../../../constants/color';
import styles from '../../../MainStyle';
import { useNavigation } from '@react-navigation/native';
import Home from '../../Home';
import NavigationStrings from '../../../constants/NavigationStrings';
import DropDown from "react-native-paper-dropdown";
import { getDealers } from '../../../redux/slices/addDealerSlice'; // reducer
import { useDispatch } from 'react-redux';
import ListDealers from './ListDealers';
// import { addDealerData } from '../../redux/slices/addDealerSlice';



const AddDealers = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const goToListDealers = () => {
        navigation.navigate('ListDealers')
    }
    const [state, setState] = useState({
        dealer_name: '', dealer_GST: '', mobile_number: '', adhar_number: '', pan: '', dealing_product: '',
        email: '', country: '', state: '', city: '', address: '', postal_code: ''
    });

    const handleDealerName = (text) => setState(prevState => ({ ...prevState, dealer_name: text }));
    const handleGST = (text) => setState(prevState => ({ ...prevState, dealer_GST: text }));
    const handleMobile = (text) => setState(prevState => ({ ...prevState, mobile_number: text }));
    const handleAdhar = (text) => setState(prevState => ({ ...prevState, adhar_number: text }));
    const handlePan = (text) => setState(prevState => ({ ...prevState, pan: text }));
    const handleDealingProduct = (text) => setState(prevState => ({ ...prevState, dealing_product: text }));
    const handleEmail = (text) => setState(prevState => ({ ...prevState, email: text }));
    const handleCountry = (text) => setState(prevState => ({ ...prevState, country: text }));
    const handleState = (text) => setState(prevState => ({ ...prevState, state: text }));
    const handleCity = (text) => setState(prevState => ({ ...prevState, city: text }));
    const handleAddress = (text) => setState(prevState => ({ ...prevState, address: text }));
    const handlePostalCode = (text) => setState(prevState => ({ ...prevState, postal_code: text }));

    const handleSubmit = async () => {
        const { dealer_name, dealer_GST, mobile_number, adhar_number, pan, dealing_product, email,
            country, state: addressState, city, address, postal_code } = state;
        const dealer_Code = Math.random().toString(36).substring(2, 9);
        const dealerData = {
            dealer_Code, dealer_name, dealer_GST, mobile_number, adhar_number, pan, dealing_product, email,
            country, state: addressState, city, address, postal_code
        };
        const response = await fetch(`https://8f923e25719a.ngrok-free.app/api/users/v1/motion-add-dealer-registration-post`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(dealerData),
        });
        const result = await response.json();
        console.log(result, "dealer result");
        if (result.status) {
            dispatch(getDealers(result));
            ToastAndroid.show("Dealer has been Registered Successfully", ToastAndroid.SHORT);
            navigation.navigate(NavigationStrings.LISTDEALERS);

        } else {
            ToastAndroid.show("Internal Error.", ToastAndroid.SHORT);
        }
    }
    return (
        <>
            <View style={{ flex: 1 }}>
                <CustomHeader />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 10 }}>
                    <View style={{ paddingTop: 10, justifyContent: "center", alignItems: "center" }}>

                        {/* 🔹 Business Details */}
                        <Text style={styles.sectionTitle}>Business Details</Text>
                        <TextInput
                            label="Dealer/Distributor"
                            placeholder="Enter Dealer/Distributor Name"
                            mode="outlined"
                            onChangeText={handleDealerName}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="Email"
                            placeholder="Enter Your Email"
                            mode="outlined"
                            onChangeText={handleGST}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="GST"
                            placeholder="Enter GST Number"
                            mode="outlined"
                            onChangeText={handleMobile}
                            keyboardType="visible-password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="Mobile"
                            placeholder="+91 Enter Mobile"
                            mode="outlined"
                            onChangeText={handleAdhar}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="Dealing Product"
                            placeholder="Enter Dealing Product Name"
                            mode="outlined"
                            onChangeText={handlePan}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />

                        {/* 🔹 Personal Details */}
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                        <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10 }}>
                            <TextInput
                                label="Adhar"
                                placeholder="Adhar Card No"
                                mode="outlined"
                                onChangeText={handleDealingProduct}
                                keyboardType="number-pad"
                                autoCapitalize="none"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
                            <TextInput
                                label="Pan Card"
                                placeholder="Enter Pan Card No"
                                mode="outlined"
                                onChangeText={handleEmail}
                                keyboardType="number-pad"
                                autoCapitalize="none"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                            />
                        </View>

                        {/* 🔹 Address Details */}
                        <Text style={styles.sectionTitle}>Address Details</Text>
                        <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10 }}>
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
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
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
                                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                            />
                        </View>

                        <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10 }}>
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
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
                            <TextInput
                                label="Address"
                                placeholder="Enter Address"
                                mode="outlined"
                                onChangeText={handleAddress}
                                keyboardType="ascii-capable"
                                autoCapitalize="none"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                            />
                        </View>

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
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.cardHeading}>
                        <TouchableOpacity style={styles.cardButton}  onPress={() => navigation.navigate('ListDealer')}>
                            <Text style={styles.cardText}>Get Your Dealers or Distributer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.bottomButtonBody}>
                    <View style={styles.bottomButtonCancel}>
                        <Text style={styles.bottomButtonText}>Cancel</Text>
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.bottomButtonColumnSubmit}>
                        <Text style={styles.bottomButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default AddDealers
