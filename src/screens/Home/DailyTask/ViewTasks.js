import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    RefreshControl,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { Text, ActivityIndicator, Divider, Button, TextInput } from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../MainStyle";
import Colors from "../../../constants/color";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ViewTasks = () => {
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedRemark, setSelectedRemark] = useState(null);
    const [session, setSession] = useState("");

    const fetchTasks = async (uid) => {
        try {
            setLoading(true);
            if (!uid) {
                Alert.alert("Session Expired", "Please login again.");
                return;
            }
            const response = await fetch(
                `https://motion.patiramproduction.com/api/v1/motion-daily-tasks-get?user_id=${uid}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: uid }),
                }
            );
            const result = await response.json();
            setTasks(result?.result || []);
            setFilteredTasks(result?.result?.result);
        } catch (error) {
            console.error("Error fetching tasks:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchTasks();
    // }, []);

    useEffect(() => {
        const loadSession = async () => {
            const stored_user_id = await AsyncStorage.getItem("user_id");
            const stored_otp_secret = await AsyncStorage.getItem("otp_secret");

            if (!stored_user_id || !stored_otp_secret) {
                Alert.alert("Session expired", "Please login again.");
                navigation.replace("Login");
                return;
            }

            setSession({
                user_id: stored_user_id,
                otp_secret: stored_otp_secret,
            });

            fetchTasks(stored_user_id);
        };

        loadSession();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchTasks(session.user_id);
        setRefreshing(false);
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        const query = text.toLowerCase();
        const filtered = tasks.filter(
            (item) =>
                item.employee_name?.toLowerCase().includes(query) ||
                item.shift?.toLowerCase().includes(query)
        );
        setFilteredTasks(filtered);
    };


    const renderHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>Employee</Text>
            <Text style={[styles.headerCell, { flex: 1.2 }]}>Shift</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Hours</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Remarks</Text>
            <Text style={[styles.headerCell, { flex: 1.2 }]}>Date</Text>
        </View>
    );

    const renderRow = ({ item, index }) => {
        const shiftColor =
            item.shift === "Morning" || "morning"
                ? "#f59e0b"
                : item.shift === "Evening" || "evening"
                    ? "#6366f1"
                    : "#10b981";

        const truncated = item.remarks && item.remarks.length > 20;
        const displayText = truncated
            ? `${item.remarks.substring(0, 20)}...`
            : item.remarks || "No remarks";

        return (
            <View style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff" },]}  >
                <Text style={[styles.tableCell, {}]}>{item?.task_id}.</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item?.employee_name}</Text>
                <Text style={[styles.tableCell, { flex: 1.1, color: shiftColor, fontWeight: "600" },]}> {item?.shift}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.total_hours || "-"}</Text>
                <TouchableOpacity style={[styles.tableCell, { flex: 1.2 }]} onPress={() => setSelectedRemark(item?.remarks || "No remarks")} >
                    <Text numberOfLines={1} ellipsizeMode="tail"> {displayText}</Text>
                </TouchableOpacity>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>{new Date(item?.created_at || item?.task_date).toLocaleDateString()}</Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
            <SubHeader title={"Routine Tasks"} onRightPress={() => navigation.navigate("DailyTask")} />
            <View style={styles.taskcontainer}>
                {/* 🔍 Search Bar */}
                <TextInput
                    // mode="outlined"
                    placeholder="Search by employee or shift..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={styles.searchBar}
                // theme={{ roundness: 10 }}
                />
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color="#4CAF50" size="large" />
                        <Text style={styles.loadingText}>Loading tasks...</Text>
                    </View>
                ) : tasks.length === 0 ? (
                    <Text style={styles.emptyText}>No tasks available yet.</Text>
                ) : (
                    <>
                        {renderHeader()}
                        <Divider />
                        <FlatList
                            data={searchQuery ? filteredTasks : tasks}
                            renderItem={renderRow}
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[Colors.primary]}      // ✅ Spinner color (Android)
                                    tintColor={Colors.primary}     // ✅ Spinner color (iOS)
                                    title="Refreshing..."
                                    titleColor={Colors.primary}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                        />
                    </>
                )}
            </View>
            <Modal
                transparent
                animationType="slide"
                visible={!!selectedRemark}
                onRequestClose={() => setSelectedRemark(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>🗒 Full Remarks</Text>
                        <ScrollView style={{ maxHeight: 200 }}>
                            <Text style={styles.modalText}>{selectedRemark}</Text>
                        </ScrollView>
                        <Button
                            mode="contained"
                            onPress={() => setSelectedRemark(null)}
                            style={styles.modalButton}
                        >
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ViewTasks;
