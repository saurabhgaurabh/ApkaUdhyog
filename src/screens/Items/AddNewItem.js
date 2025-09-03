import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomeHeader'
import { TextInput } from 'react-native-paper'
import styles from '../../MainStyle'

const AddNewItem = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader />
                <View style={{ flex: 1, backgroundColor: '#DCEDC8', gap: 10 }}>
                    <View style={{ display: 'flex', top: 10, paddingLeft: 10, backgroundColor: '#fff', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#7f8378ff', }}>Create New Items</Text>  
                        <View style={{paddingTop: 10}}></View>                      
                        <TextInput
                            label="New Item"
                            placeholder="Enter item name"
                            mode="outlined"
                            onChangeText={{}}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="next"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#7f8378ff"
                            outlineStyle={{ borderWidth: 1, borderRadius: 5 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Item Code"
                            placeholder="Enter item code"
                            mode="outlined"
                            // value={itemCode}
                            // onChangeText={(text) => setItemCode(text)}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Item Category"
                            placeholder="Enter item category"
                            mode="outlined"
                            // value={itemCategory}
                            // onChangeText={(text) => setItemCategory(text)}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                        <TextInput
                            label="HNS/SAC Code"
                            placeholder="Enter HNS/SAC code"
                            mode="outlined"
                            // value={itemCategory}
                            // onChangeText={(text) => setItemCategory(text)}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyLabel="done"
                            activeOutlineColor="#4CAF50"
                            outlineColor="#7f8378ff"
                            textColor="#000"
                            outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
                            style={styles.input}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default AddNewItem