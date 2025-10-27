import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import SubHeader from "../../components/SubHeader";
import Colors from "../../constants/color";
import { ServerUrl } from "../../services/ServerUrl";
import Fonts from "../../constants/fonts";


const ProductCategoryScreen = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const baseUrl = ServerUrl();
            const response = await fetch(baseUrl + "api/v1/motion-product-category-get");
            const data = await response.json();
            console.log("Fetched Categories:", data?.result);
            setCategories(data?.result || []);
        } catch (error) {
            console.log("Category fetch error:", error);
            Alert.alert("Error", "Failed to fetch Categories");
        } finally {
            setLoading(false);
        }
    };

    // Fetch subcategories
    const fetchSubcategories = async (category_id) => {
        try {
            const baseUrl = ServerUrl();
            const response = await fetch(`${baseUrl}api/v1/motion-product-subcategories-get?category_id=${category_id}`);
            const data = await response.json();
            console.log("Fetched Subcategories:", data);
            if (Array.isArray(data?.result)) {
                setSubcategories(data?.result);
            } else {
                setSubcategories([]);
            }
        } catch (error) {
            console.log("Subcategory fetch error:", error);
            Alert.alert("Error", "Failed to fetch subcategories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryPress = (category) => {
        setSelectedCategory(category.category_id);
        fetchSubcategories(category.category_id);
    };

    const renderCategory = ({ item }) => {
        const isSelected = selectedCategory === item.category_id;
        return (
            <TouchableOpacity
                style={[styles.categoryCard, isSelected && styles.selectedCategoryCard,]}
                onPress={() => handleCategoryPress(item)}
                activeOpacity={0.8} >
                <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText,]} >
                    {item.category_name}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderSubcategory = ({ item }) => (
        <Animatable.View animation="fadeInUp" duration={500} style={styles.subCard}>
            <Text style={styles.subText}>{item.sub_category_name}</Text>
        </Animatable.View>
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={{ marginTop: 10, color: Colors.primary }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SubHeader title="Item Management" />

            {/* Header and Add Button */}
            <Animatable.View animation="slideInRight" duration={500} style={styles.headerContainer}>
                <Text style={styles.header}>Product Categories</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("AddNewItem")}
                >
                    <Text style={styles.addButtonText}>+ Add New Item</Text>
                </TouchableOpacity>
            </Animatable.View>

            {/* Categories */}
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item, index) =>
                    item.category_id?.toString() || index.toString()
                }
                numColumns={3}
                // horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryListContainer}
            />

            {/* Subcategories */}
            {selectedCategory && (
                <>
                    <Text style={styles.subHeader}>Subcategories</Text>

                    {subcategories.length > 0 ? (
                        <FlatList
                            data={subcategories}
                            renderItem={renderSubcategory}
                            keyExtractor={(item, index) =>
                                item.sub_category_id?.toString() || index.toString()
                            }
                            contentContainerStyle={styles.subListContainer}
                        />
                    ) : (
                        <Text style={styles.noDataText}>
                            No subcategories available for this category.
                        </Text>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F8",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 30,
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.primary,
    },
    addButton: {
        backgroundColor: "#E5F9E0",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: '#3BA55D'
    },
    addButtonText: {
        color: '#3BA55D',
        fontFamily: Fonts.large,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    categoryListContainer: {
        padding: 10,
        justifyContent: "center",
    },
    categoryCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D6DEE5",
        flex: 1, // important for equal spacing in numColumns
        margin: 5,
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    selectedCategoryCard: {
        backgroundColor: "transparent",
        borderColor: Colors.primary,
        transform: [{ scale: 1.05 }],

    },
    categoryText: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.primary,
    },
    selectedCategoryText: {
        color: Colors.primary,
        fontSize: 20
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.primary,
        marginTop: 10,
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    subCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E1E8ED",
    },
    subText: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.primary,
    },
    subListContainer: {
        paddingBottom: 20,
    },
    noDataText: {
        textAlign: "center",
        color: "#888",
        fontSize: 16,
        marginTop: 20,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F6F8",
    },
});

export default ProductCategoryScreen;
