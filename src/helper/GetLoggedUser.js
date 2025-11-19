import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetLoggedUser = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    const otp_secret = await AsyncStorage.getItem("otp_secret");

    return { user_id, otp_secret };
};
