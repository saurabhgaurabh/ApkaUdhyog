import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../components/CustomeHeader'
import { TextInput } from 'react-native-paper'
import styles from '../../MainStyle'
import { useNavigation } from '@react-navigation/native'
import Home from '../Home'
import Items from './Items'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/slices/itemSlice'

const AddNewItem = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        product_name: '',
        material_type_one: '',
        material_quantity: '',
        material_quality: '',
        batch_number: '',
        unit: '',
        supervisor_name: '',
        total_cost: '',
        remarks: ''
    });
    const handleProductName = (text) => { setState({ ...state, product_name: text }); };
    const handleMaterialTypeOne = (text) => { setState({ ...state, material_type_one: text }); };
    const handleMaterialQuantity = (text) => { setState({ ...state, material_quantity: text }); };
    const handleMaterialQuality = (text) => { setState({ ...state, material_quality: text }); };
    const handleBatchNumber = (text) => { setState({ ...state, batch_number: text }); };
    const handleUnit = (text) => { setState({ ...state, unit: text }); };
    const handleSuperviser = (text) => { setState({ ...state, supervisor_name: text }); };
    const handleCost = (text) => { setState({ ...state, total_cost: text }); };
    const handleRemarks = (text) => { setState({ ...state, remarks: text }); };

    const handleNewItem = async () => {
        try {
            console.log('api responding')
            const { product_name, material_type_one, material_quantity, material_quality, batch_number, unit, supervisor_name, total_cost, remarks } = state;
            console.log(product_name, material_type_one, material_quantity, material_quality, batch_number, unit, supervisor_name, total_cost, remarks, "product_name, material_type_one, material_quantity, material_quality, batch_number, unit, supervisor_name, total_cost, remarks")
            const response = await fetch(`https://b2f34b664c3c.ngrok-free.app/api/users/v1/motion-product-manufacturing`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ product_name, material_type_one, material_quantity, material_quality, batch_number, unit, supervisor_name, total_cost, remarks }),
            })
            console.log("Response status: ", response.status, "ok: ", response.ok);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Response data in adding new item: ", data);
            if (data.status) {
                ToastAndroid.show("New item added successfully!", ToastAndroid.SHORT);
                dispatch(addItem(data.result || state)); // Add the new item from API response to Redux store
                navigation.navigate('Items'); // Navigate to Items screen
            } else {
                ToastAndroid.show("Failed to add new item", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("Error in adding new item: ", error.message);
            ToastAndroid.show("An error occurred while adding the items", ToastAndroid.SHORT);
        }

    }
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader />
                <View style={{ flex: 1, backgroundColor: '#DCEDC8', gap: 10 }}>
                    <View style={{ display: 'flex', top: 10, paddingLeft: 10, backgroundColor: '#fff', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#7f8378ff', }}>Create New Items</Text>
                        <View style={{ paddingTop: 10 }}></View>
                        <TextInput
                            label="New Item" // product_name
                            placeholder="Enter item name"
                            mode="outlined"
                            onChangeText={handleProductName}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="next"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#7f8378ff"
                            outlineStyle={{ borderWidth: 1, borderRadius: 5 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Product Material"
                            placeholder="Enter product material"
                            mode="outlined"
                            // value={itemCode}
                            onChangeText={handleMaterialTypeOne}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Material Quantity"
                            placeholder="Enter material quantity"
                            mode="outlined"
                            // value={itemCategory}
                            onChangeText={handleMaterialQuantity}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Material Quality"
                            placeholder="Enter material quality"
                            mode="outlined"
                            // value={itemCategory}
                            onChangeText={handleMaterialQuality}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="HNS/SAC Code" //hsn_sac_code OR batch number
                            placeholder="Enter HNS/SAC code"
                            mode="outlined"
                            // value={itemCategory}
                            onChangeText={handleBatchNumber}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Unit" //unit
                            placeholder="Enter unit"
                            mode="outlined"
                            // value={itemCategory}
                            onChangeText={handleUnit}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Superviser" //superviser or product handler
                            placeholder="Enter superviser"
                            mode="outlined"
                            // value={itemCategory}
                            onChangeText={handleSuperviser}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="total cost"
                            placeholder="Enter total cost"
                            mode="outlined"
                            // value={itemCategory}
                            onChangeText={handleCost}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="remarks"
                            placeholder="Enter remarks"
                            mode="outlined"
                            // value={itemCategory}
                            onChangeText={handleRemarks}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                    </View>
                </View>
                
                <View style={styles.btnBody}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => console.log("Cancel pressed")}           >
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitBtn} onPress={handleNewItem} >
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </>
    )
}

export default AddNewItem