import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Card, Text, Dropdown } from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import styles from "../../../MainStyle";

const DailyTask = () => {
    const [empName, setEmpName] = useState("");
    const [shift, setShift] = useState("");
    const [remarks, setRemarks] = useState("");

    const handleSubmit = () => {
        console.log({ empName, shift, remarks });
        // save to API or state
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
            <SubHeader />
            <ScrollView contentContainerStyle={{flexGrow: 1,backgroundColor: "#f9fafb", padding: 16,justifyContent: "center", }}>
                <Card style={styles.dailycard}>
                    <Card.Title title="Daily Task Manager" titleStyle={styles.dailycardTitle} />
                    <Card.Content>

                        {/* Employee Name */}
                        <TextInput
                            label="Employee Name"
                            value={empName}
                            mode="outlined"
                            onChangeText={setEmpName}
                            style={styles.input}
                        />

                        {/* Shift */}
                        <TextInput
                            label="Shift"
                            value={shift}
                            mode="outlined"
                            placeholder="Morning / Noon / Evening / Night"
                            onChangeText={setShift}
                            style={styles.input}
                        />

                        {/* Remarks */}
                        <TextInput
                            label="Remarks"
                            value={remarks}
                            mode="outlined"
                            multiline
                            numberOfLines={3}
                            onChangeText={setRemarks}
                            style={styles.input}
                        />

                        {/* Submit Button */}
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={styles.button}>
                            Save Task
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
};

export default DailyTask;

// const styles = StyleSheet.create({

//     input: {
//         marginBottom: 15,
//         backgroundColor: "#fff",
//     },
//     button: {
//         marginTop: 10,
//         paddingVertical: 6,
//         borderRadius: 8,
//     },
// });
