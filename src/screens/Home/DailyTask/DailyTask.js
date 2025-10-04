import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Text, Menu, Divider } from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import styles from "../../../MainStyle";

const DailyTask = () => {
    const [empName, setEmpName] = useState("");
    const [shift, setShift] = useState("");
    const [taskType, setTaskType] = useState("");
    const [remarks, setRemarks] = useState("");

    const handleSubmit = () => {
        console.log({ empName, shift, taskType, remarks, date });
        // API call or state saving logic here
    };


    return (
        <View style={{ flex: 1, backgroundColor: "#f9fafb", }}>
            <SubHeader />
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#f9fafb", padding: 16 }}>
                <Card style={styles.dailycard}>
                    <Card.Title title="Daily Task Manager" titleStyle={styles.dailycardTitle} />
                    <Card.Content>

                        {/* Employee Name */}
                        <View style={localStyles.inputContainer}>
                            <View style={[localStyles.colorBadge, { backgroundColor: '#4f46e5' }]} />
                            <TextInput
                                label="Employee Name"
                                value={empName}
                                mode="outlined"
                                onChangeText={setEmpName}
                                style={localStyles.input}
                            />
                        </View>

                        {/* Shift */}
                        <View style={localStyles.inputContainer}>
                            <View style={[localStyles.colorBadge, { backgroundColor: '#f59e0b' }]} />
                            <TextInput
                                label="Shift"
                                value={shift}
                                mode="outlined"
                                placeholder="Morning / Noon / Evening / Night"
                                onChangeText={setShift}
                                style={localStyles.input}
                            />
                        </View>
                        {/* Remarks */}
                        <View style={localStyles.inputContainer}>
                            <View style={[localStyles.colorBadge, { backgroundColor: '#6366f1' }]} />
                            <TextInput
                                label="Remarks"
                                value={remarks}
                                mode="outlined"
                                multiline
                                numberOfLines={3}
                                onChangeText={setRemarks}
                                style={localStyles.input}
                            />
                        </View>
                    </Card.Content>
                </Card>
            </ScrollView>
            <View style={styles.bottomButtonBody}>
                <View style={styles.bottomButtonCancel}>
                    <Text style={styles.bottomButtonText}>Cancel Task</Text>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.bottomButtonColumnSubmit}>
                    <Text style={styles.bottomButtonText}>Add Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DailyTask;

const localStyles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    colorBadge: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
