import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import EditableHeader from '../../components/EditableHeader'
import Colors from '../../constants/color'
import ImagePath from '../../constants/ImagePath'
import styles from '../../MainStyle'

const DealersInfo = () => {
    return (
        <>
            <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: 35 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={ImagePath.arrowsBack} style={{ width: 20, height: 25, marginRight: 5 }} resizeMode="contain" />
                            <Text style={styles.cardInfoHeader}>Back</Text>
                        </View>
                        <Text style={{ fontSize: 20, color: Colors.primary }}>Edit</Text>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default DealersInfo