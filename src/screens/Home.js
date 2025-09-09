import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import React from 'react'
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
  // const cards = [
  //   { id: 1, title: 'Emp Registration', icon: '👤', colors: ['#83e2beff', '#bff1c2ff'] },
  //   { id: 2, title: 'Dealer', icon: '🏢', colors: ['#eed695ff', '#bff1c2ff'] },
  //   { id: 3, title: 'Stock', icon: '📦', colors: ['#a3f0a7ff', '#bff1c2ff'] },
  //   { id: 4, title: 'Reports', icon: '📊', colors: ['#84bdebff', '#bff1c2ff'] },
  // ];

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

        <ScrollView style={{ flex: 1, top: 0 }} horizontal={false} showsVerticalScrollIndicator={false}>
          {/* <View style={styles.card}>
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
          </View> */}

          {/* <View style={styles.Cardcontainer}>
            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={styles.cardWrapper}
                activeOpacity={0.8}
                onPress={() => console.log(`${card.title} pressed`)}
              >
                <LinearGradient
                  colors={card.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.card}
                >
                  <Text style={styles.icon}>{card.icon}</Text>
                  <Text style={styles.HomecardText}>{card.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View> */}

          <View style={styles.homeTopCard}>
            <View style={styles.homeCardBodyLeft}>
              <Text>Add New Sale</Text>
            </View>
            <View style={styles.homeCardBodyRight}>
              <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
                <View style={{ backgroundColor: 'red', width: '100%', height: '48%', borderRadius: 10 }}><Text>Add New Client</Text></View>
                <View style={{ backgroundColor: 'yellow', width: '100%', height: '48%', borderRadius: 10 }}><Text>Add New Dealer</Text></View>
              </View>
            </View>
          </View>

        </ScrollView>


      </View>
    </>
  )
}

export default Home