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
import AddPurchaseItems from "./AddPurchaseItems"
import { useNavigation } from "@react-navigation/native"
import * as Animatable from 'react-native-animatable';


const PurchaseItems = () => {
    const navigation = useNavigation();

    const AddPurchaseItems = () => { navigation.navigate('AddPurchaseItems'); }
    return (
        <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
            <CustomHeader />
            <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" iterationCount="infinite" style={{ height: 65 }}>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddPurchaseItems')}>
                    <Text style={styles.purchaseButtonText}>{'Add New Purchase'}</Text>
                </TouchableOpacity>
            </Animatable.View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View></View>
            </ScrollView>
            {/* <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ"
            <TouchableOpacity style={styles.purchaseButton} onPress={AddPurchaseItems}>
                <Text style={styles.purchaseButtonText}>New Purchase</Text>
            </TouchableOpacity>
            <Animated.View/> */}
            
        </View>
    )
}



export default PurchaseItems
