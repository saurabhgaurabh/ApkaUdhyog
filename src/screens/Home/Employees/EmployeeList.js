import { View, Text, TouchableOpacity, ActivityIndicator, RefreshControl, FlatList, TextInput, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../../components/CustomeHeader'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../MainStyle';
import { Card, Divider } from "react-native-paper";
import Colors from '../../../constants/color';

const EmployeeList = () => {
    const navigation = useNavigation();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://motion.patiramproduction.com/api/v1/motion-employee-registration-get`
            );
            const result = await response.json();
            console.log(result?.result, ".............")
            setEmployees(result?.result || []);
            setFilteredEmployees(result?.result || []);
        } catch (error) {
            console.error("Error fetching employees:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchEmployees();
        setRefreshing(false);
    };

    const handleSearch = (text) => {
        setSearch(text);
        if (text.trim() === "") {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter(
                (emp) =>
                    emp.employee_name?.toLowerCase().includes(text.toLowerCase()) ||
                    emp.department?.toLowerCase().includes(text.toLowerCase()) ||
                    emp.mobile?.includes(text)
            );
            setFilteredEmployees(filtered);
        }
    };
    const capitalizeFirst = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    const capitalizeAll = (str) => {
        if (!str) return '';
        return str.toUpperCase();
    };


    const renderHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 1.3 }]}>Name</Text>
            <Text style={[styles.headerCell, { flex: 1.2 }]}>Department</Text>
            <Text style={[styles.headerCell, { flex: 1.5 }]}> </Text>
            <Text style={[styles.headerCell, { flex: 1.8 }]}> </Text>
        </View>
    );

    const renderRow = ({ item, index }) => (
        <View
            style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff" },
            ]}
        >
            <Text style={[styles.tableCell, { flex: 0.2 }]}> {item?.emp_id}. </Text>
            <Text style={[styles.tableCell, { flex: 0.5 }]}> {capitalizeFirst(item.employee_name)} </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{capitalizeFirst(item.department)}</Text>

            <TouchableOpacity
                onPress={() => {
                    setSelectedEmployee(item);
                    setModalVisible(true);
                }}
                style={{
                    flex: 0.8,
                    alignItems: 'center',
                    paddingVertical: 4,
                    backgroundColor: "#e7e2feff", borderRadius: 6, marginHorizontal: 3
                }}
            >
                <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 0.8, alignItems: "center", paddingVertical: 4, backgroundColor: "#fee2e2", borderRadius: 6, marginHorizontal: 3,
                //   onPress={} 
            }}   >
                <Text style={{ color: "#dc2626", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 0.8, alignItems: "center", paddingVertical: 4, backgroundColor: "#e4fee2ff", borderRadius: 6, marginHorizontal: 3,
                //   onPress={} 
            }}   >
                <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>Edit</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader />
            <Animatable.View
                animation="slideInRight"
                duration={800}
                easing="ease-in-circ"
                style={{ height: 65 }}
            >
                <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={() => navigation.navigate('EmployeeRegistration')}
                >
                    <Text style={styles.purchaseButtonText}>
                        {'Employee Registration'}
                    </Text>
                </TouchableOpacity>
            </Animatable.View>

            <TextInput
                placeholder="Search by name, department, or mobile..."
                value={search}
                onChangeText={handleSearch}
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    marginBottom: 10,
                    borderColor: "#ddd",
                    borderWidth: 1,
                }}
            />

            {loading ? (
                <ActivityIndicator color="#4CAF50" size="large" style={{ marginTop: 50 }} />
            ) : filteredEmployees.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 40, color: "#6b7280", fontSize: 16 }}>
                    No employees found.
                </Text>
            ) : (
                <>
                    {renderHeader()}
                    <Divider />
                    <FlatList
                        data={filteredEmployees}
                        renderItem={renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[Colors.primary]}      // ✅ Spinner color (Android)
                                tintColor={Colors.primary}     // ✅ Spinner color (iOS)
                                title="Refreshing..."
                                titleColor={Colors.primary}
                            />
                        }
                    />
                </>
            )}

            {/* ===================== MODAL ===================== */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <View style={{
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        padding: 20,
                        width: "90%",
                        maxHeight: "80%"
                    }}>
                        <ScrollView>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: 'center' }}>
                                Employee Details
                            </Text>
                            <Divider style={{ marginBottom: 10 }} />
                            {selectedEmployee && (
                                <>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Status:</Text> {capitalizeFirst(selectedEmployee?.status)}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Name:</Text> {capitalizeFirst(selectedEmployee?.employee_name)}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Department:</Text> {capitalizeFirst(selectedEmployee?.department)}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Mobile:</Text> {selectedEmployee?.mobile}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {selectedEmployee?.email || "N/A"}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Address:</Text> {selectedEmployee?.address || "N/A"}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>City:</Text> {capitalizeFirst(selectedEmployee?.city) || "N/A"}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>State:</Text> {capitalizeFirst(selectedEmployee?.state) || "N/A"}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Country:</Text> {capitalizeFirst(selectedEmployee?.country) || "N/A"}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Postal Code:</Text> {capitalizeFirst(selectedEmployee?.postal_code) || "N/A"}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Adhar No:</Text> {capitalizeFirst(selectedEmployee?.adhar) || "N/A"}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>PAN:</Text> {capitalizeAll(selectedEmployee?.pan) || "N/A"}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Created Date:</Text> {new Date(selectedEmployee.created_at).toLocaleDateString()}</Text>
                                </>
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                backgroundColor: "#4CAF50",
                                paddingVertical: 10,
                                borderRadius: 8,
                                marginTop: 15,
                            }}
                        >
                            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default EmployeeList;
