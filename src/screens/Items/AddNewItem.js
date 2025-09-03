import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomeHeader'

const AddNewItem = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader />
            </SafeAreaView>
        </>
    )
}

export default AddNewItem