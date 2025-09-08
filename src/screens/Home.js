import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Settings from '../navigation/Drawer/PurchaseStack'
import CustomHeader from '../components/CustomeHeader'
import styles from '../MainStyle'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Colors from '../constants/color'




const Home = ({ navigation }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [q, setQ] = React.useState("");
  const get = useSelector((state) => state.items.itemList);

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

        {/* New Cards Section */}
        <View style={{ padding: 10, paddingTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, textAlign: 'center' }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {/* Add Dealer Card */}
            <TouchableOpacity
              style={{
                backgroundColor: Colors.lightGreen,
                width: '48%',
                padding: 20,
                borderRadius: 12,
                marginBottom: 15,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                alignItems: 'center',
                opacity: 0.9
              }}
              activeOpacity={0.7}
            // onPress={() => navigation.navigate('AddDealer')}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>👥</Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Add Dealer
              </Text>
            </TouchableOpacity>

            {/* Employee Registration Card */}
            <TouchableOpacity
              style={{
                backgroundColor: '#cecfc1ff',
                width: '48%',
                padding: 20,
                borderRadius: 12,
                marginBottom: 15,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                alignItems: 'center',
                opacity: 0.9
              }}
              activeOpacity={0.7}
            // onPress={() => navigation.navigate('EmpRegistration')}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>👤</Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Emp Registration
              </Text>
            </TouchableOpacity>

            {/* Product Manufacturing Card */}
            <TouchableOpacity
              style={{
                backgroundColor: '#acecf5ff',
                width: '48%',
                padding: 20,
                borderRadius: 12,
                marginBottom: 15,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                alignItems: 'center',
                opacity: 0.9
              }}
              activeOpacity={0.7}
            // onPress={() => navigation.navigate('ProductManufacturing')}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>🏭</Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Product Manufacturing
              </Text>
            </TouchableOpacity>

            {/* Party Registration Card */}
            <TouchableOpacity
              style={{
                backgroundColor: '#8bf7cdff',
                width: '48%',
                padding: 20,
                borderRadius: 12,
                marginBottom: 15,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                alignItems: 'center',
                opacity: 0.9
              }}
              activeOpacity={0.7}
            // onPress={() => navigation.navigate('PartyRegistration')}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>🎭</Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Party Registration
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default Home