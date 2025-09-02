import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Settings from '../navigation/Drawer/PurchaseStack'
import CustomHeader from '../components/CustomeHeader'
import styles from '../MainStyle'

const Home = ({ navigation }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [q, setQ] = React.useState("");

  return (
    <>
      <CustomHeader backgroundColor="#ffffff" textColor="#8a4949ff" />
      <View style={{ flex: 1, backgroundColor: '#DCEDC8' }}>
        <View style={styles.FlexContainer}>
          <View style={styles.FlexItems}>
            <TouchableOpacity onPress={{}}>
              <Text style={styles.FlexText}>Transaction Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.FlexItems}>
            <TouchableOpacity onPress={{}}>
              <Text style={styles.FlexText}>Party Details</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </>
  )
}

export default Home