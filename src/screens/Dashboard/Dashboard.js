import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomeHeader'
import Colors from '../../constants/color'
import Fonts from '../../constants/fonts'
import styles from '../../MainStyle'
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit'
import { Card } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

const Dashboard = () => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground, }}>
            <CustomHeader />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.dashTopBox}>
                    <TouchableOpacity style={styles.dashGetBoxes}>
                        <Text style={styles.dashTextOne}>You'll Get</Text>
                        <Text style={styles.dashTextOne}>0.00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dashGiveBoxes}>
                        <Text style={styles.dashTextTwo}>You'll Give</Text>
                        <Text style={styles.dashTextTwo}>0.00</Text>
                    </TouchableOpacity>
                </View>
                <Card style={{ margin: 20, padding: 0 }}>
                    <LinearGradient
                        colors={[Colors.lightGreen, Colors.sweetGreen]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 7 }}
                    >
                        <Card.Content>
                            <Text style={styles.cardText}>Total Sales</Text>
                            <Text style={styles.cardText}>₹150</Text>
                        </Card.Content>
                    </LinearGradient>
                </Card>
                <View style={{ padding: 20 }}>
                    <Card style={{ marginBottom: 20 }}>
                        <Card.Content>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Last 3 Months Sales</Text>
                            <BarChart
                                data={{
                                    labels: ['Jan', 'Feb', 'Mar'],
                                    datasets: [{
                                        data: [60, 40, 50]
                                    }]
                                }}
                                width={Dimensions.get('window').width - 80}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#ffffff',
                                    backgroundGradientFrom: Colors.lightGreen,
                                    backgroundGradientTo: Colors.sweetGreen,
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: '6',
                                        strokeWidth: '2',
                                        stroke: Colors.warning
                                    }
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Sales by Category</Text>
                            <PieChart
                                data={[
                                    {
                                        name: 'Product A',
                                        population: 50,
                                        color: Colors.primary,
                                        legendFontColor: Colors.text,
                                        legendFontSize: 15
                                    },
                                    {
                                        name: 'Product B',
                                        population: 30,
                                        color: Colors.secondary,
                                        legendFontColor: Colors.text,
                                        legendFontSize: 15
                                    },
                                    {
                                        name: 'Product C',
                                        population: 20,
                                        color: Colors.warning,
                                        legendFontColor: Colors.text,
                                        legendFontSize: 15
                                    }
                                ]}
                                width={Dimensions.get('window').width - 68}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#ffffff',
                                    backgroundGradientFrom: '#ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    }
                                }}
                                accessor="population"
                                backgroundColor="transparent"
                                paddingLeft="15"
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </View>
    )
}

export default Dashboard
