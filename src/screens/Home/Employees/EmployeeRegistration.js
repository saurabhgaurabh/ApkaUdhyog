import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import SubHeader from '../../../components/SubHeader'
import styles from '../../../MainStyle'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

const EmployeeRegistration = () => {
    const navigation = useNavigation();
    
    return (
        <>
            <View style={{ flex: 1, }}>
                <SubHeader title="Employee Registration" />
                <View style={{ flex: 1, backgroundColor: '#FDFBF4', }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 0, paddingHorizontal: 0 }} >
                        <View style={{ paddingTop: 0, justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.sectionTitle}>Business Details</Text>
                            <TextInput
                                onChangeText={{}}
                                label="Employee Name"
                                placeholder='Enter Employee Name'
                                mode='outlined'
                                keyboardAppearance='next'
                                keyboardType='default'
                                autoCapitalize="none"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                            <TextInput
                                onChangeText={{}}
                                label="Email"
                                placeholder='Enter Email'
                                mode='outlined'
                                keyboardAppearance='next'
                                keyboardType='default'
                                autoCapitalize="none"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                            <TextInput
                                onChangeText={{}}  // ✅ correct now
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
                                onChangeText={{}}  // ✅ correct now
                                label="Education"
                                placeholder='EMployee Education'
                                mode='outlined'
                                keyboardAppearance='next'
                                keyboardType="number-pad"
                                autoCapitalize="none"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                            <Text style={styles.sectionTitle}>Personal Details</Text>
                            <View style={{ flexDirection: "column", width: "100%", paddingHorizontal: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        onChangeText={{}}  // ✅ correct now
                                        label="State"
                                        placeholder='Enter State'
                                        mode='outlined'
                                        keyboardAppearance='next'
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        activeOutlineColor="#4CAF50"
                                        outlineColor="#7f8378ff"
                                        style={[styles.input, { flex: 1, marginLeft: 5 }]}
                                    />
                                    <TextInput
                                        onChangeText={{}}  // ✅ correct now
                                        label="City"
                                        placeholder='Enter City'
                                        mode='outlined'
                                        keyboardAppearance='next'
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        activeOutlineColor="#4CAF50"
                                        outlineColor="#7f8378ff"
                                        style={[styles.input, { flex: 1, marginLeft: 5 }]}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        onChangeText={{}}  // ✅ correct now
                                        label="Address"
                                        placeholder='Enter Address'
                                        mode='outlined'
                                        keyboardAppearance='next'
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        activeOutlineColor="#4CAF50"
                                        outlineColor="#7f8378ff"
                                        style={[styles.input, { flex: 1, marginLeft: 5 }]}
                                    />
                                    <TextInput
                                        onChangeText={{}}  // ✅ correct now
                                        label="Postal Code"
                                        placeholder='Postal Code'
                                        mode='outlined'
                                        keyboardAppearance='next'
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        activeOutlineColor="#4CAF50"
                                        outlineColor="#7f8378ff"
                                        style={[styles.input, { flex: 1, marginLeft: 5 }]}
                                    />
                                </View>
                            </View>
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
            </View>
        </>
    )
}

export default EmployeeRegistration