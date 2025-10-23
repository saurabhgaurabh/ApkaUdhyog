import { View, Text, ScrollView, Image, TouchableOpacity, Linking, useRef } from 'react-native'
import React from 'react'
import EditableHeader from '../../../components/SubHeader'
import Colors from '../../../constants/color'
import ImagePath from '../../../constants/ImagePath'
import styles from '../../../MainStyle'
import { useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'


const DealersInfo = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { dealer } = route.params;
    const [refreshing, setRefreshing] = useState(false);

    const handleCall = (phone) => {
        if (phone) {
            Linking.openURL(`tel:${phone}`);
        }
    };

    const handleMail = (email) => {
        if (email) {
            Linking.openURL(`mailto:${email}`);
        }
    };

    const handleWhatsApp = (phone) => {
        if (phone) {
            let url = `whatsapp://send?phone=${phone}`;
            Linking.openURL(url).catch(() => {
                alert("Make sure WhatsApp is installed on your device");
            });
        }
    };
    const capitalizeFirst = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


    return (
        <>
            <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: 35 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.backheader}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()} activeOpacity={0.7} >
                            <Image source={ImagePath.arrowsBack} style={{ width: 20, height: 25, marginRight: 5 }} resizeMode="contain" />
                            <Text style={styles.cardInfoHeader}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log("Edit pressed")} activeOpacity={0.7} >
                            <Text style={{ fontSize: 20, color: Colors.primary }}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoPhotoContainer}>
                        <Image source={ImagePath.coverBanner} style={styles.coverPhoto} resizeMode='cover' />
                        <View style={styles.profileContainer}>
                            <Image source={{ uri: "https://picsum.photos/200" }} style={styles.profileImage} />
                        </View>
                    </View>
                    <View style={styles.infocard}>
                        <Text style={styles.clientName}>{capitalizeFirst(dealer.dealer_name)}</Text>
                        <Text style={styles.clientSub}>Client ID: {dealer.dealer_Code}</Text>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>GSTIN:</Text>
                            <Text style={styles.value}>{capitalizeFirst(dealer.dealer_GST)}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Dealer Type:</Text>
                            <Text style={styles.value}>{capitalizeFirst(dealer.dealer_type)}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Dealing Product:</Text>
                            <Text style={styles.value}>{capitalizeFirst(dealer.dealing_product)}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{capitalizeFirst(dealer.email)}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Mobile:</Text>
                            <Text style={styles.value}>+91 {dealer.mobile_number}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Pan:</Text>
                            <Text style={styles.value}>{dealer.pan}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Adhar:</Text>
                            <Text style={styles.value}>{dealer.adhar_number}</Text>
                        </View>
                    </View>
                    <View style={styles.socialBody}>
                        <TouchableOpacity onPress={() => handleCall(dealer.mobile_number)} style={{ alignItems: "center" }}>
                            <Image source={ImagePath.phone} resizeMode='cover' style={styles.infocardImage} />
                            <Text style={{ marginTop: 5, fontSize: 14 }}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleMail(dealer.email)} style={{ alignItems: "center" }}>
                            <Image source={ImagePath.gmail} resizeMode='cover' style={styles.infocardImage} />
                            <Text style={{ marginTop: 5, fontSize: 14 }}>Mail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleWhatsApp(dealer.mobile_number)} style={{ alignItems: "center" }}>
                            <Image source={ImagePath.whats} resizeMode='cover' style={styles.infocardImage} />
                            <Text style={{ marginTop: 5, fontSize: 14 }}>WhatsApp</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default DealersInfo