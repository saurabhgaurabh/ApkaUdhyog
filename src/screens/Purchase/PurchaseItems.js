// import { View, Text, ScrollView } from 'react-native'
// import React from 'react'
// import CustomHeader from '../../components/CustomeHeader'

// const PurchaseItems = () => {
//     return (
//         <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
//             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
//                 <CustomHeader />

//             </ScrollView>
//         </View>
//     )
// }

// export default PurchaseItems

"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from "react-native"
import { TextInput, Text, Card, Button, HelperText } from "react-native-paper"
import CustomHeader from "../../components/CustomeHeader"
import styles from "../../MainStyle"


const PurchaseItems = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
            <CustomHeader />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Content goes here */}
            </ScrollView>
            <TouchableOpacity style={styles.purchaseButton}>
                <Text style={styles.purchaseButtonText}>New Purchase</Text>
            </TouchableOpacity>
        </View>
    )
}



export default PurchaseItems
