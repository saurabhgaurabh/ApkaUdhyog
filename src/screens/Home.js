import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import Settings from '../navigation/Drawer/PurchaseStack'
import CustomHeader from '../components/CustomeHeader'
import styles from '../MainStyle'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Colors from '../constants/color'
import ImagePath from '../constants/ImagePath'
import LinearGradient from 'react-native-linear-gradient';



const Home = ({ navigation }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [q, setQ] = React.useState("");
  const get = useSelector((state) => state.items.itemList);

  // Pressed states for all cards
  const [pressedStates, setPressedStates] = React.useState({
    addDealer: false,
    addClient: false,
    addSale: false,
    empRegistration: false,
    productManufacturing: false,
    partyRegistration: false,
  });

  const handlePressIn = (cardName) => {
    setPressedStates(prev => ({ ...prev, [cardName]: true }));
  };

  const handlePressOut = (cardName) => {
    setPressedStates(prev => ({ ...prev, [cardName]: false }));
  };

  return (
    <>
      <CustomHeader backgroundColor="#ffffff" textColor="#8a4949ff" />
      <View style={{ flex: 1, backgroundColor: '#ebebebff', gap: 10 }}>
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

        <ScrollView
          style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {/* Top Cards Section */}
          <View style={{ marginBottom: 20 }}>
            <View style={styles.homeTopCard}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={() => handlePressIn('addDealer')}
                onPressOut={() => handlePressOut('addDealer')}
                style={[styles.homeCardBodyLeft, {
                  backgroundColor: pressedStates.addDealer ? Colors.lightGreen : '#ffffff',
                  transform: [{ scale: pressedStates.addDealer ? 0.98 : 1 }],
                }]}
              >
                <Text style={styles.HomecardText}>New Dealer
                  {'\n'}
                  <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 10 }}>
                    Register New Dealers
                  </Text>
                </Text>
                <Image source={ImagePath.dealer} style={{ height: '45%', width: '35%', alignSelf: 'flex-end' }} resizeMode="contain" />
              </TouchableOpacity>
              <View style={styles.homeCardBodyRight}>
                <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', alignItems: 'center', }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={() => handlePressIn('addClient')}
                    onPressOut={() => handlePressOut('addClient')}
                    style={{
                      justifyContent: 'space-around',
                      backgroundColor: pressedStates.addClient ? Colors.sweetGreen : '#ffffff',
                      width: '100%',
                      height: '48%',
                      borderRadius: 15,
                      paddingHorizontal: 10,
                      transform: [{ scale: pressedStates.addClient ? 0.98 : 1 }],
                    }}
                  >
                    <Text style={styles.HomecardText}>Add New Client</Text>
                    <Image source={ImagePath.client} style={{ height: '33%', width: '25%', alignSelf: 'flex-end' }} resizeMode="contain" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={() => handlePressIn('addSale')}
                    onPressOut={() => handlePressOut('addSale')}
                    style={{
                      justifyContent: 'space-around',
                      backgroundColor: pressedStates.addSale ? Colors.sweetGreen : '#ffffff',
                      width: '100%',
                      height: '48%',
                      borderRadius: 15,
                      paddingHorizontal: 10,
                      transform: [{ scale: pressedStates.addSale ? 0.98 : 1 }],
                    }}
                  >
                    <Text style={styles.HomecardText}>Add New Sale</Text>
                    <Image source={ImagePath.sale} style={{ height: '33%', width: '25%', alignSelf: 'flex-end' }} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Menu Items Section */}
          <View style={styles.homeMenuBody} >
            <View style={{ alignItems: 'center' }}>
              <View style={styles.menuColumnCss} >
                <Image source={ImagePath.dealer} style={{ width: 30, height: 30 }} resizeMode="contain" />
              </View>
              <Text style={styles.HomecardText}>Dealer</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.menuColumnCss} >
                <Image source={ImagePath.dealer} style={{ width: 30, height: 30 }} resizeMode="contain" />
              </View>
              <Text style={styles.HomecardText}>Dealer</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.menuColumnCss} >
                <Image source={ImagePath.dealer} style={{ width: 30, height: 30 }} resizeMode="contain" />
              </View>
              <Text style={styles.HomecardText}>Dealer</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.menuColumnCss} >
                <Image source={ImagePath.dealer} style={{ width: 30, height: 30 }} resizeMode="contain" />
              </View>
              <Text style={styles.HomecardText}>Dealer</Text>
            </View>
          </View>



        </ScrollView>


      </View>
    </>
  )
}

export default Home