import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Settings from '../navigation/Drawer/PurchaseStack'
import CustomHeader from '../components/CustomeHeader'
import styles from '../MainStyle'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Home = ({ navigation }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [q, setQ] = React.useState("");

  return (
    <>
      <CustomHeader backgroundColor="#ffffff" textColor="#8a4949ff" />
      <View style={{ flex: 1, backgroundColor: '#DCEDC8', gap: 10 }}>
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
        {/* this is card section */}
        <ScrollView style={{ flex: 1, top: 0 }} horizontal={false} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            {/* Top Row: Party Name + Tag + Date */}
            <View style={styles.topRow}>
              <Text style={styles.partyName}>Gaurav Kumar</Text>
              <Text style={styles.date}>#1</Text>
            </View>
            <View style={styles.topRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>PURCHASE</Text>
              </View>
              <Text style={styles.date}>31 Aug, 25</Text>
            </View>

            {/* Bottom Row: Total + Balance (Left) and Icons (Right) */}
            <View style={styles.bottomRow}>
              <View style={styles.rowLeft}>
                <View style={styles.column}>
                  <Text style={styles.label}>Total</Text>
                  <Text style={styles.value}>₹ 2,500.00</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Balance</Text>
                  <Text style={styles.value}>₹ 2,500.00</Text>
                </View>
              </View>

              <View style={styles.rowRight}>
                <TouchableOpacity>
                  <Text style={styles.icon}>🖨️</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.icon}>↗️</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.icon}>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default Home