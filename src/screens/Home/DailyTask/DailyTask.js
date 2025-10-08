import React from "react";
import {  View, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid, Alert,} from "react-native";
import { TextInput, Card, Text,} from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import styles from "../../../MainStyle";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

const DailyTask = () => {
    const navigation = useNavigation();
    const { control, handleSubmit,reset,formState: { errors },} = useForm({defaultValues: {
         employee_name: "", shift: "", total_hours: "", remarks: "", },
    });
    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                "https://30e48ae68ae9.ngrok-free.app/api/users/v1/motion-daily-tasks",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();

            if (response.ok) {
                ToastAndroid.show("✅ Task added successfully!", ToastAndroid.SHORT);
                reset();
                navigation.navigate("ViewTasks");
            } else {
                Alert.alert("Error", result?.message || "Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
            <SubHeader title={"Add Daily Task"} />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: "#f9fafb",
                    padding: 16,
                }}
            >
                <Card style={styles.dailycard}>
                    <Card.Title
                        title="🗓️ Daily Task Manager"
                        titleStyle={styles.dailycardTitle}
                    />
                    <Card.Content>
                        <View style={localStyles.inputContainer}>
                            <View
                                style={[localStyles.colorBadge, { backgroundColor: "#4f46e5" }]}
                            />
                            <Controller
                                control={control}
                                name="employee_name"
                                rules={{
                                    required: "Employee name is required",
                                    minLength: {
                                        value: 5,
                                        message: "Minimum 5 characters required",
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        label="Employee Name"
                                        mode="outlined"
                                        placeholder="Enter employee name"
                                        value={value}
                                        onChangeText={onChange}
                                        keyboardType="default"
                                        autoCapitalize="words"
                                        activeOutlineColor="#4CAF50"
                                        outlineColor="#7f8378ff"
                                        style={styles.input}
                                    />
                                )}
                            />
                        </View>
                        {errors.employee_name && (
                            <Text style={localStyles.errorText}>
                                {errors.employee_name.message}
                            </Text>
                        )}
                        <View style={localStyles.row}>
                            <View style={{ flex: 1, marginRight: 5 }}>
                                <View style={localStyles.inputContainer}>
                                    <View
                                        style={[
                                            localStyles.colorBadge,
                                            { backgroundColor: "#f59e0b" },
                                        ]}
                                    />
                                    <Controller
                                        control={control}
                                        name="shift"
                                        rules={{ required: "Shift is required" }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                label="Shift"
                                                mode="outlined"
                                                placeholder="Morning / Evening"
                                                value={value}
                                                onChangeText={onChange}
                                                keyboardType="default"
                                                autoCapitalize="words"
                                                activeOutlineColor="#4CAF50"
                                                outlineColor="#7f8378ff"
                                                style={styles.input}
                                            />
                                        )}
                                    />
                                </View>
                                {errors.shift && (
                                    <Text style={localStyles.errorText}>
                                        {errors.shift.message}
                                    </Text>
                                )}
                            </View>

                            <View style={{ flex: 1, marginRight: 5 }}>
                                <View style={localStyles.inputContainer}>
                                    <View
                                        style={[
                                            localStyles.colorBadge,
                                        ]}
                                    />
                                    <Controller
                                        control={control}
                                        name="total_hours"
                                        rules={{
                                            required: "Hours required",
                                            pattern: {
                                                value: /^[0-9:]+$/,
                                                message: "Enter valid time format (e.g. 08:30)",
                                            },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                label="Hours"
                                                mode="outlined"
                                                placeholder="00:00"
                                                value={value}
                                                onChangeText={onChange}
                                                keyboardType="numeric"
                                                activeOutlineColor="#4CAF50"
                                                outlineColor="#7f8378ff"
                                                style={styles.input}
                                            />
                                        )}
                                    />
                                </View>
                                {errors.total_hours && (
                                    <Text style={localStyles.errorText}>
                                        {errors.total_hours.message}
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Remarks */}
                        <View style={localStyles.inputContainer}> 
                            <View
                                style={[localStyles.colorBadge, { backgroundColor: "#6366f1" }]}
                            />
                            <Controller
                                control={control}
                                name="remarks"
                                rules={{
                                    maxLength: {
                                        value: 200,
                                        message: "Remarks must be under 200 characters",
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        label="Remarks"
                                        mode="outlined"
                                        placeholder="Enter remarks (optional)"
                                        value={value}
                                        onChangeText={onChange}
                                        multiline
                                        numberOfLines={3}
                                        activeOutlineColor="#4CAF50"
                                        outlineColor="#7f8378ff"
                                        style={styles.input}
                                    />
                                )}
                            />
                        </View>
                        {errors.remarks && (
                            <Text style={localStyles.errorText}>
                                {errors.remarks.message}
                            </Text>
                        )}
                    </Card.Content>
                </Card>
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtonBody}>
                <TouchableOpacity
                    onPress={() => reset()}
                    style={styles.bottomButtonCancel}
                >
                    <Text style={styles.bottomButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={styles.bottomButtonColumnSubmit}
                >
                    <Text style={styles.bottomButtonText}>Add Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DailyTask;

const localStyles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    errorText: {
        color: "red",
        marginBottom: 8,
        marginLeft: 18,
        fontSize: 13,
    },
});
