import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import Settings from '../navigation/Drawer/PurchaseStack'
import CustomHeader from '../components/CustomeHeader'
import styles from '../MainStyle'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Colors from '../constants/color'
import ImagePath from '../constants/ImagePath'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native'



const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const Home = () => {
  const navigation = useNavigation();

  const [showSearch, setShowSearch] = React.useState(false);
  const [q, setQ] = React.useState("");
  const get = useSelector((state) => state.items.itemList);

  // Pressed states for all cards
  const [pressedStates, setPressedStates] = React.useState({
    addDealer: false,
    listDealers: false,
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
      <CustomHeader backgroundColor="#ffffff" textColor="#8a4949ff" onSettingsPress={()=> ('SettingScreen')} />
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
                onPress={() => navigation.navigate('ListDealer')}
                activeOpacity={0.9}
                onPressIn={() => handlePressIn('listDealers')}
                onPressOut={() => handlePressOut('listDealers')}
                style={[styles.homeCardBodyLeft, {
                  backgroundColor: pressedStates.listDealers ? Colors.lightGreen : '#ffffff',
                  transform: [{ scale: pressedStates.listDealers ? 0.98 : 1 }],
                }]} >
                <Text style={styles.HomecardText}>New Dealer
                  {'\n'}
                  <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 10 }}>
                    or Suppliers/Venders
                  </Text>
                </Text>
                <Image source={ImagePath.dealer} style={{ height: '45%', width: '35%', alignSelf: 'flex-end' }} resizeMode="contain" />
              </TouchableOpacity>
              <View style={styles.homeCardBodyRight}>
                <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', alignItems: 'center', }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('ListClients')}
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
                    <Text style={styles.HomecardText}>Add New Client / {'\n'} Registration</Text>
                    <Image source={ImagePath.client} style={styles.homeImagesCss} resizeMode="contain" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('ListSales')}
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
                    <Image source={ImagePath.sale} style={styles.homeImagesCss} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Menu Items Section */}
          <View style={styles.homeMenuBody} >
            <TouchableOpacity style={styles.homeCardInnerBody} onPress={() => navigation.navigate('EmployeeList')}>
              <View style={styles.menuColumnCss} >
                <Image source={ImagePath.employeeRegistration} style={{ width: 30, height: 30 }} resizeMode="cover" />
              </View>
              <Text style={styles.menuCardHeading}  >Quick</Text>
              <Text style={styles.menuCardSubHeading}>Employee</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.homeCardInnerBody}>
              <View style={styles.menuColumnCss} >
                <Image source={ImagePath.partyRegistration} style={{ width: 30, height: 30 }} resizeMode="contain" />
              </View>
              <Text style={styles.menuCardHeading}   >Client </Text>
              <Text style={styles.menuCardSubHeading}>Registration</Text>

            </TouchableOpacity> */}
            <TouchableOpacity style={styles.homeCardInnerBody} onPress={()=> navigation.navigate('ListProductManufacturing')}>
              <View style={styles.menuColumnCss} >
                <Image source={ImagePath.manufacturing} style={{ width: 30, height: 30 }} resizeMode="contain" />
              </View>
              <Text style={styles.menuCardHeading} >Products </Text>
              <Text style={styles.menuCardSubHeading}>Manufacture</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: height * 0.25, width: width * 0.95 }}>
            <Swiper
              loop
              showsPagination={true}
              dotStyle={styles.dot}
              activeDotStyle={styles.activeDot}
              autoplay
            >
              <TouchableOpacity style={styles.slide} activeOpacity={0.8} onPress={() => navigation.navigate('ViewTasks')} >
                <Image source={ImagePath.dailyTask} resizeMode='cover' style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.slide} activeOpacity={0.8} onPress={() => navigation.navigate('ListDispatch')} >
                <Image source={ImagePath.productDispatch} resizeMode='cover' style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.slide} activeOpacity={0.8} onPress={() => alert("Go to Payments")}>
                <Image source={ImagePath.payments} resizeMode='cover' style={styles.image} />
              </TouchableOpacity>
            </Swiper>
          </View>

        </ScrollView>
      </View>
    </>
  )
}

export default Home