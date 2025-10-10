import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    RefreshControl,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Text, ActivityIndicator, Divider, Button, TextInput } from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../MainStyle";

const ViewTasks = () => {
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedRemark, setSelectedRemark] = useState(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://426f7502c717.ngrok-free.app/api/users/v1/motion-daily-tasks-get"
            );
            const result = await response.json();
            setTasks(result?.result?.result || []);
        } catch (error) {
            console.error("Error fetching tasks:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchTasks();
        setRefreshing(false);
    };

    // 🔍 Search logic
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
            <Text style={[styles.headerCell, { flex: 1 }]}>Shift</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Hours</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Remarks</Text>
            <Text style={[styles.headerCell, { flex: 1.2 }]}>Date</Text>
        </View>
    );

    const renderRow = ({ item, index }) => {
        const shiftColor =
            item.shift === "Morning"
                ? "#f59e0b"
                : item.shift === "Evening"
                    ? "#6366f1"
                    : "#10b981";

        const truncated = item.remarks && item.remarks.length > 20;
        const displayText = truncated
            ? `${item.remarks.substring(0, 20)}...`
            : item.remarks || "No remarks";

        return (
            <View style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff" },]}  >
                <Text style={[styles.tableCell, {  }]}>{item?.task_id}.</Text>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>{item?.employee_name}</Text>
                <Text style={[styles.tableCell, { flex: 1, color: shiftColor, fontWeight: "600" },]}> {item?.shift}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.total_hours || "-"}</Text>
                <TouchableOpacity style={[styles.tableCell, { flex: 2 }]} onPress={() => setSelectedRemark(item?.remarks || "No remarks")} >
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
                            data={tasks}
                            renderItem={renderRow}
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
