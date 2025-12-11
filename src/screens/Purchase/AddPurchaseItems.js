import React, { useState } from 'react';
import {
  View, ScrollView, TouchableOpacity, ToastAndroid, KeyboardAvoidingView, Text, Platform,
} from 'react-native';
import { Card, TextInput, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/color';
import CustomHeader from '../../components/CustomeHeader';
import styles from '../../MainStyle';
import { ServerUrl } from '../../services/ServerUrl';
import PurchaseItems from './ListPurchase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPurchaseItems = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    dealer_name: '',
    postal_code: '',
    country: '',
    state: '',
    city: '',
    address: '',
    freight: '',
    payment_status: '',
    totalAmount: '0',
    paidAmount: '0',
    pendingAmount: '0',
  });

  const [products, setProducts] = useState([
    { product_name: '', quantity: '', price: '', total_amount: '' },
  ]);

  // Add new product row
  const addProductRow = () => {
    setProducts(prev => [...prev, { product_name: '', quantity: '', price: '', total_amount: '' }]);
  };

  // Handle product change
  const handleProductChange = (index, key, value) => {
    const updated = [...products];
    updated[index][key] = value;

    // Auto calculate total_amount per product
    const quantity = parseFloat(updated[index].quantity) || 0;
    const price = parseFloat(updated[index].price) || 0;
    updated[index].total_amount = (quantity * price).toString();

    setProducts(updated);
    calculateGrandTotal(updated);
  };

  // Calculate grand total
  const calculateGrandTotal = (productList) => {
    const total = productList.reduce(
      (sum, item) => sum + (parseFloat(item.total_amount) || 0), 0
    );
    const paid = parseFloat(state.paidAmount) || 0;
    setState(prev => ({
      ...prev,
      totalAmount: total.toString(),
      pendingAmount: (total - paid).toString(),
    }));
  };

  // Handle paid amount
  const handlePaidAmountChange = (text) => {
    const paid = parseFloat(text) || 0;
    const total = parseFloat(state.totalAmount) || 0;
    setState(prev => ({
      ...prev,
      paidAmount: text,
      pendingAmount: (total - paid).toString(),
    }));
  };
const handleSubmit = async () => {
  try {
    const storedUserId = await AsyncStorage.getItem('user_id');
    console.log("Stored User ID:", storedUserId);

    if (!storedUserId) {
      ToastAndroid.show("User not found. Please log in again.", ToastAndroid.SHORT);
      return;
    }

    const {
      dealer_name, postal_code, country, state: addressState, city, address,
      freight, paidAmount, pendingAmount, totalAmount, payment_status
    } = state;

    const purchaseData = {
      user_id: storedUserId,
      dealer_name,
      postal_code,
      country,
      state: addressState,
      city,
      address,
      freight,
      payment_status,
      total_amount: totalAmount,
      material_amount: paidAmount,
      material_amount_pending: pendingAmount,
      products,
    };

    console.log("Submitting Purchase Data:", purchaseData);

    const response = await fetch(
      "https://motion.patiramproduction.com/api/v1/motion-purchase-row-material-post",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      }
    );

    const result = await response.json();
    console.log("API Response:", result);

    if (result.status) {
      ToastAndroid.show("Purchase added successfully!", ToastAndroid.SHORT);
      navigation.navigate("ListPurchase", {
        screen: "ListPurchase",
        params: { refresh: true },
      });
    } else {
      ToastAndroid.show(result.message || "Failed to insert data.", ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log("Error:", error);
    ToastAndroid.show("Internal Server Error", ToastAndroid.SHORT);
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: Colors.screenBackground }}>
      <CustomHeader title="Add Purchase Items" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.salescontainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Dealer Info */}
          <Card style={styles.salescard}>
            <Card.Title title="Dealer Details" titleStyle={styles.sectionTitle} />
            <Card.Content>
              <TextInput label="Dealer Name" mode="outlined" value={state.dealer_name} onChangeText={text => setState({ ...state, dealer_name: text })} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={styles.input} />
              <TextInput label="Postal Code" mode="outlined" keyboardType="numeric" value={state.postal_code} onChangeText={text => setState({ ...state, postal_code: text })} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={styles.input} />
            </Card.Content>
          </Card>

          {/* Address Info */}
          <Card style={[styles.salescard, { marginTop: 10 }]}>
            <Card.Title title="Address Details" titleStyle={styles.sectionTitle} />
            <Card.Content>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput label="City" mode="outlined" value={state.city} onChangeText={text => setState({ ...state, city: text })} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={[styles.input, { width: '48%' }]} />
                <TextInput label="Address" mode="outlined" value={state.address} onChangeText={text => setState({ ...state, address: text })} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={[styles.input, { width: '48%' }]} />
              </View>
            </Card.Content>
          </Card>

          {/* Products Info */}
          <Card style={[styles.salescard, { marginTop: 10 }]}>
            <Card.Title title="Products" titleStyle={styles.sectionTitle} />
            <Card.Content>
              {products.map((p, index) => (
                <View key={index}>
                  <TextInput label={`Product Name ${index + 1}`} mode="outlined" value={p.product_name} onChangeText={text => handleProductChange(index, 'product_name', text)} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={styles.input} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput label="Quantity" mode="outlined" keyboardType="numeric" value={p.quantity} onChangeText={text => handleProductChange(index, 'quantity', text)} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={[styles.input, { width: '48%' }]} />
                    <TextInput label="Price" mode="outlined" keyboardType="numeric" value={p.price} onChangeText={text => handleProductChange(index, 'price', text)} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={[styles.input, { width: '48%' }]} />
                  </View>
                  <TextInput label="Total" mode="outlined" value={p.total_amount} editable={false} style={styles.input} />
                  {index < products.length - 1 && <Divider />}
                </View>
              ))}

              <TouchableOpacity onPress={addProductRow} style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Add Product</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* Payment Info */}
          <Card style={[styles.salescard, { marginTop: 10 }]}>
            <Card.Title title="Payment Details" titleStyle={styles.sectionTitle} />
            <Card.Content>
              <TextInput label="Freight" mode="outlined" keyboardType="numeric" value={state.freight} onChangeText={text => setState({ ...state, freight: text })} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={styles.input} />
              <TextInput label="Grand Total" mode="outlined" value={state.totalAmount} editable={false} style={styles.input} />
              <TextInput label="Paid Amount" mode="outlined" keyboardType="numeric" value={state.paidAmount} onChangeText={handlePaidAmountChange} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" style={styles.input} />
              <TextInput label="Pending Amount" mode="outlined" value={state.pendingAmount} editable={false} style={styles.input} />
            </Card.Content>
          </Card>
          <Card style={[styles.salescard, { marginTop: 10 }]}>
            <Card.Title title="Payment Status" titleStyle={styles.sectionTitle} />
            <Card.Content>
              <TextInput label="Payment Status" placeholder='Paid/Unpaid/Pending' mode="outlined" value={state.payment_status} onChangeText={text => setState({ ...state, payment_status: text })} style={styles.input} activeOutlineColor="#4CAF50" outlineColor="#7f8378ff" />
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomButtonBody}>
        <TouchableOpacity onPress={() => navigation.navigate('ListPurchase')} style={styles.bottomButtonCancel}>
          <Text style={styles.bottomButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.bottomButtonColumnSubmit}>
          <Text style={styles.bottomButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPurchaseItems;
