import { View, Text } from 'react-native'
import React from 'react'
import SubHeader from '../../../components/SubHeader'
import { useNavigation } from '@react-navigation/native';


const ViewTasks = () => {
    const navigation = useNavigation();

    return (
        <>
            <View style={{ flex: 1 , backgroundColor: '#edf1e8ff' }}>
                <SubHeader title={"Routin Tasks"}  onRightPress={() => navigation.navigate("DailyTask")} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>ViewTasks</Text>
                </View>
            </View>
        </>
    )
}

export default ViewTasks