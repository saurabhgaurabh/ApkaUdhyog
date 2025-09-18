import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import SubHeader from '../../../components/SubHeader'
import styles from '../../../MainStyle'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'


const AddClients = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flex: 1 }}>
                <SubHeader title="Add New Client" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 0 }} >
                    <View style={{ paddingTop: 20, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                        <TextInput
                            label="Organization Name"
                            placeholder='Enter Farm/Company Name'
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
                            label="Owner Name"
                            placeholder='Enter Owner Name'
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
                        <TextInput
                            label="Mobile"
                            placeholder='Enter Contact Number'
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
                            label="GST"
                            placeholder='Enter GST Number'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            style={styles.input}
                        />
                        <TextInput
                            label="Pan"
                            placeholder='Enter Pan Number'
                            mode='outlined'
                            keyboardAppearance='next'
                            keyboardType="email-address"
                            autoCapitalize="none"
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
                <View style={{ flex: 1, top: 5 }}>
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

export default AddClients