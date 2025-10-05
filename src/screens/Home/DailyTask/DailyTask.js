import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { TextInput, Button, Card, Text, Menu, Divider } from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import styles from "../../../MainStyle";
import { useNavigation } from "@react-navigation/native";

const DailyTask = () => {
    const navigation = useNavigation();
    const [state, setState] = useState({ employee_name: "", shift: "", remarks: "" });
    const handleEmployee = (text) => setState(prevState => ({ ...prevState, employee_name: text }));
    const handleShift = (text) => setState(prevState => ({ ...prevState, shift: text }));
    const handleRemarks = (text) => setState(prevState => ({ ...prevState, remarks: text }));
    const handleHours = (text) => setState(prevState => ({ ...prevState, total_hours: text }));

    const handleSubmit = async () => {
        try {
            const { employee_name, shift, total_hours, remarks } = state;
            const taskData = { employee_name, shift, total_hours, remarks };
            let response = await fetch("https://30e48ae68ae9.ngrok-free.app/api/users/v1/motion-daily-tasks", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData),
            });
            const result = await response.json();
            console.log(result, "result");
            if (response.ok) {
                ToastAndroid.show("Task added successfully!", ToastAndroid.SHORT);
                navigation.navigate("ViewTasks");
            } else {
                console.log("Error Response:", result);
                Alert.alert("Error", result?.message || "Failed to add task. Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to add task. Please try again.");
            console.error("Error adding task:", error);
        }
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
                                mode="outlined"
                                placeholder="Enter Employee Name"
                                onChangeText={handleEmployee}
                                keyboardType="default"
                                autoCapitalize="true"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
                            />
                        </View>
                        <View style={localStyles.inputContainer}>
                            <View style={[localStyles.colorBadge, { backgroundColor: '#f59e0b' }]} />
                            <TextInput
                                label="Shift"
                                mode="outlined"
                                placeholder="Morning / Evening "
                                onChangeText={handleShift}
                                keyboardType="default"
                                autoCapitalize="true"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
                            <TextInput
                                label="Hours"
                                mode="outlined"
                                placeholder="00:00"
                                onChangeText={handleHours}
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                            />
                        </View>
                        {/* Remarks */}
                        <View style={localStyles.inputContainer}>
                            <View style={[localStyles.colorBadge, { backgroundColor: '#6366f1' }]} />
                            <TextInput
                                label="Remarks"
                                mode="outlined"
                                placeholder="Enter Remarks"
                                multiline
                                numberOfLines={3}
                                onChangeText={handleRemarks}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                activeOutlineColor="#4CAF50"
                                outlineColor="#7f8378ff"
                                style={styles.input}
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
