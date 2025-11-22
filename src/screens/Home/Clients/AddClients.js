import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubHeader from '../../../components/SubHeader'
import styles from '../../../MainStyle'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ServerUrl } from '../../../services/ServerUrl'
import NavigationStrings from '../../../constants/NavigationStrings'
import { useDispatch } from 'react-redux'
import { addClient } from '../../../redux/slices/AddClientsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddClients = () => {
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [state, setState] = useState({ organization_name: "", owner_name: "", mobile: "", email: "", gst: "", pan: "", address: "" })
    const handleOrganizationName = (text) => setState(prevState => ({ ...prevState, organization_name: text }));
    const handleOwnerName = (text) => setState(prevState => ({ ...prevState, owner_name: text }));
    const handleMobile = (text) => setState(prevState => ({ ...prevState, mobile: text }));
    const handleEmail = (text) => setState(prevState => ({ ...prevState, email: text }));
    const handleGST = (text) => setState(prevState => ({ ...prevState, gst: text }));
    const handleAddress = (text) => setState(prevState => ({ ...prevState, address: text }));
    const handlePan = (text) => setState(prevState => ({ ...prevState, pan: text }));



    const handleClients = async () => {       
        try {
            const storedUserId = await AsyncStorage.getItem('user_id');
            if (!storedUserId) {
                ToastAndroid.show("User not found. Please log in again.", ToastAndroid.SHORT);
                return;
            }
            const { organization_name, owner_name, mobile, email, gst, address, pan, } = state;
            const clientData = { user_id: storedUserId, organization_name, owner_name, mobile, email, gst, address, pan, };
            console.log(clientData, "sending clientData");

            let response = await fetch(`https://motion.patiramproduction.com/api/v1/motion-parties-registration`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clientData),
            });

            const result = await response.json();
            console.log(result, "client result");
            if (result.status) {
                ToastAndroid.show("New Client Added Successfully.", ToastAndroid.SHORT);
                navigation.navigate(NavigationStrings.LISTCLIENTS);
            } else {
                ToastAndroid.show(result.message || "Something went wrong.", ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show(`Internal user error. ${error.message}`, ToastAndroid.SHORT);
            console.error("API error:", error);
        }
    };

    return (
        <>
            <View style={{ flex: 1 }}>
                <SubHeader title="Add New Client" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 0, paddingHorizontal: 0 }} >
                    <View style={{ paddingTop: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                        <TextInput
                            onChangeText={handleOrganizationName}
                            label="Organization Name"
                            placeholder='Enter Farm/Company Name'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType='default'
                            autoCapitalize="true"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            onChangeText={handleOwnerName}
                            label="Owner Name"
                            placeholder='Enter Owner Name'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType='default'
                            autoCapitalize="true"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            onChangeText={handleMobile}  // ✅ correct now
                            label="Mobile"
                            placeholder='Enter Contact Number'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            onChangeText={handleEmail}   // ✅ correct now
                            label="Email"
                            placeholder='Enter Email'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <Text style={styles.sectionTitle}>Business Details</Text>
                        <TextInput
                            onChangeText={handleGST}
                            label="GST"
                            placeholder='Enter GST Number'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType="ascii-capable"
                            autoCapitalize="characters"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            onChangeText={handleAddress}
                            label="Address"
                            placeholder='Enter Address'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            onChangeText={handlePan}
                            label="Pan"
                            placeholder='Enter Pan Number'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType="email-address"
                            autoCapitalize="characters"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />

                    </View>
                </ScrollView>
                <View style={styles.cardHeading}>
                    <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('ListClients')}>
                        <Text style={styles.cardText}>Get All Clients</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, top: 0 }}>
                    <View style={styles.bottomButtonBody}>
                        <View style={styles.bottomButtonCancel}>
                            <Text style={styles.bottomButtonText}>Cancel</Text>
                        </View>
                        <TouchableOpacity onPress={handleClients} style={styles.bottomButtonColumnSubmit}>
                            <Text style={styles.bottomButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default AddClients