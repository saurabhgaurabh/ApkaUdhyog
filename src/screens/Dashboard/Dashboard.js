import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomeHeader'
import Colors from '../../constants/color'
import Fonts from '../../constants/fonts'
import styles from '../../MainStyle'

const Dashboard = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
            <CustomHeader />
            <View style={styles.dashTopBox}>
                <View style={styles.dashBoxes}>
                    <Text style={styles.dashTextOne}>You'll Get</Text>
                    <Text style={styles.dashTextOne}>0.00</Text>
                </View>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: Colors.light, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text style={styles.dashTextTwo}>You'll Give</Text>
                    <Text style={styles.dashTextTwo}>0.00</Text>
                </View>
            </View>
        </View>
    )
}

export default Dashboard