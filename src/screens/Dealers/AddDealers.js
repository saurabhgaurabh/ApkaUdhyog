import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput, Button } from "react-native-paper";
import EditableHeader from '../../components/EditableHeader';
import CustomHeader from '../../components/CustomeHeader';
import Colors from '../../constants/color';
import styles from '../../MainStyle';


const AddDealers = () => {
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
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="Email"
                            placeholder="Enter Your Email"
                            mode="outlined"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="GST"
                            placeholder="Enter GST Number"
                            mode="outlined"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="Mobile"
                            placeholder="+91 Enter Mobile"
                            mode="outlined"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="Dealing Product"
                            placeholder="Enter Dealing Product Name"
                            mode="outlined"
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
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
                            <TextInput
                                label="Pan Card"
                                placeholder="Enter Pan Card No"
                                mode="outlined"
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
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
                            <TextInput
                                label="State"
                                placeholder="Enter State"
                                mode="outlined"
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
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
                            <TextInput
                                label="Address"
                                placeholder="Enter Address"
                                mode="outlined"
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                            />
                        </View>

                        <TextInput
                            label="Postal Code"
                            placeholder="Enter Postal Code"
                            mode="outlined"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.cardHeading}>
                        <TouchableOpacity style={styles.cardButton}>
                            <Text style={styles.cardText}>Get Your Dealers or Distributer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.bottomButtonBody}>
                    <View style={styles.bottomButtonCancel}>
                        <Text style={styles.bottomButtonText}>Cancel</Text>
                    </View>
                    <TouchableOpacity onPress={{}} style={styles.bottomButtonColumnSubmit}>
                        <Text style={styles.bottomButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default AddDealers