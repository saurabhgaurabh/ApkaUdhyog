import { View, Text } from 'react-native'
import React from 'react'
import SubHeader from '../../../components/SubHeader'

const AddClients = () => {
    return (
        <>
            <View style={{ flex: 1 }}>
                <SubHeader title="Add New Client" />
                <View style={{flex: 1, top: 15}}>

                <Text>AddClients</Text>
                </View>
            </View>
        </>
    )
}

export default AddClients