import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import SubHeader from '../../../components/SubHeader'
import styles from '../../../MainStyle'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import NavigationStrings from '../../../constants/NavigationStrings'
import AsyncStorage from '@react-native-async-storage/async-storage'


const EmployeeRegistration = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    employee_name: "",
    email: "",
    mobile: "",
    department: "",
    address: "",
    postal_code: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: "" })); // clear error on typing
  };

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!state.employee_name.trim()) newErrors.employee_name = "Employee name is required.";
    if (!state.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(state.email)) newErrors.email = "Invalid email address.";
    if (!state.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!mobileRegex.test(state.mobile)) newErrors.mobile = "Mobile number must be 10 digits.";
    if (!state.department.trim()) newErrors.department = "Department is required.";
    if (!state.address.trim()) newErrors.address = "Address is required.";
    if (!state.postal_code.trim()) newErrors.postal_code = "Postal code is required.";
    else if (state.postal_code.length < 5) newErrors.postal_code = "Postal code must be at least 5 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      ToastAndroid.show("Please fix validation errors.", ToastAndroid.SHORT);
      return;
    }

    try {
      const storedUserId = await AsyncStorage.getItem('user_id');
      if (!storedUserId) {
        ToastAndroid.show("User not found. Please log in again.", ToastAndroid.SHORT);
        return;
      }
      const payload = { ...state, user_id: storedUserId };
      const response = await fetch(
        `https://motion.patiramproduction.com/api/v1/motion-employee-registration`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log(result, "new Emp");

      if (response.ok) {
        ToastAndroid.show("Employee details submitted successfully.", ToastAndroid.SHORT);
        navigation.navigate(NavigationStrings.EMPLOYEELIST);
        setState({ employee_name: "", email: "", mobile: "", department: "", address: "", postal_code: "" });
      } else {
        ToastAndroid.show("Submission failed. Please try again.", ToastAndroid.SHORT);
        Alert.alert("Error", result?.message || "Failed to submit employee details.");
      }

    } catch (error) {
      ToastAndroid.show(`Submission failed. Please try again.`, ToastAndroid.SHORT);
      Alert.alert("Error", "Failed to submit employee details. Please try again later.");
      console.error("Submission error:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SubHeader title="Employee Registration" />
      <View style={{ flex: 1, backgroundColor: '#FDFBF4' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.sectionTitle}>Business Details</Text>

            <TextInput
              label="Employee Name"
              placeholder="Enter Employee Name"
              mode="outlined"
              value={state.employee_name}
              onChangeText={(text) => handleChange("employee_name", text)}
              style={styles.input}
              outlineColor={errors.employee_name ? "red" : "#7f8378ff"}
              activeOutlineColor="#4CAF50"
            />
            {errors.employee_name ? <Text style={{ color: "red", fontSize: 12 }}>{errors.employee_name}</Text> : null}

            <TextInput
              label="Email"
              placeholder="Enter Email"
              mode="outlined"
              value={state.email}
              onChangeText={(text) => handleChange("email", text)}
              style={styles.input}
              keyboardType="email-address"
              outlineColor={errors.email ? "red" : "#7f8378ff"}
              activeOutlineColor="#4CAF50"
            />
            {errors.email ? <Text style={{ color: "red", fontSize: 12 }}>{errors.email}</Text> : null}

            <TextInput
              label="Mobile"
              placeholder="Enter Contact Number"
              mode="outlined"
              value={state.mobile}
              onChangeText={(text) => handleChange("mobile", text)}
              keyboardType="number-pad"
              style={styles.input}
              outlineColor={errors.mobile ? "red" : "#7f8378ff"}
              activeOutlineColor="#4CAF50"
            />
            {errors.mobile ? <Text style={{ color: "red", fontSize: 12 }}>{errors.mobile}</Text> : null}

            <TextInput
              label="Department"
              placeholder="Enter Department"
              mode="outlined"
              value={state.department}
              onChangeText={(text) => handleChange("department", text)}
              style={styles.input}
              outlineColor={errors.department ? "red" : "#7f8378ff"}
              activeOutlineColor="#4CAF50"
            />
            {errors.department ? <Text style={{ color: "red", fontSize: 12 }}>{errors.department}</Text> : null}

            <Text style={styles.sectionTitle}>Personal Details</Text>

            <TextInput
              label="Address"
              placeholder="Enter Address"
              mode="outlined"
              value={state.address}
              onChangeText={(text) => handleChange("address", text)}
              style={styles.input}
              outlineColor={errors.address ? "red" : "#7f8378ff"}
              activeOutlineColor="#4CAF50"
            />
            {errors.address ? <Text style={{ color: "red", fontSize: 12 }}>{errors.address}</Text> : null}

            <TextInput
              label="Postal Code"
              placeholder="Enter Postal Code"
              mode="outlined"
              value={state.postal_code}
              onChangeText={(text) => handleChange("postal_code", text)}
              keyboardType="number-pad"
              style={styles.input}
              outlineColor={errors.postal_code ? "red" : "#7f8378ff"}
              activeOutlineColor="#4CAF50"
            />
            {errors.postal_code ? <Text style={{ color: "red", fontSize: 12 }}>{errors.postal_code}</Text> : null}
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtonBody}>
          <TouchableOpacity style={styles.bottomButtonCancel} onPress={() => navigation.goBack()}>
            <Text style={styles.bottomButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.bottomButtonColumnSubmit}>
            <Text style={styles.bottomButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmployeeRegistration;
