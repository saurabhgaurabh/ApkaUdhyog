import React, { useEffect, useState } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import Colors from "../constants/color";
import { useNavigation } from "@react-navigation/native";


const  EditableHeader = ()=> {
    const navigation = useNavigation();

  const handleBackButtonClick = () => {
    navigation.goBack(); // go back to previous screen
    return true; // prevent app from exiting
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);
    return (
          <>
      {/* Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackButtonClick} />
        <Appbar.Content title="Dealer Registration" />
      </Appbar.Header>

      {/* Your Form Screen */}
      {/* <DealerRegistrationForm /> */}
    </>
    );
}
export default EditableHeader

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.background, // Paper default primary color
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "white",
        flex: 1,
        marginRight: 16,
        height: 40,
        justifyContent: "center",
    },
});
