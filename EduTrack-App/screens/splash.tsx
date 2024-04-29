import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.homeV3}>
            <View style={styles.backgroundPosition1}>
                <LinearGradient
                    style={[styles.pagebackground, styles.backgroundPosition1]}
                    locations={[0, 1]}
                    colors={["#f3f9ff", "#daf2ef"]}
                    useAngle={true}
                    angle={169.71}
                />
                <LinearGradient
                    style={[styles.pagebackground, styles.backgroundPosition1]}
                    locations={[0, 1]}
                    colors={["#f3f9ff", "#daf2ef"]}
                    useAngle={true}
                    angle={169.71}
                />
                <LinearGradient
                    style={[styles.pagebackground, styles.backgroundPosition1]}
                    locations={[0, 1]}
                    colors={["rgba(243, 249, 255, 0.92)", "rgba(218, 242, 239, 0.92)"]}
                    useAngle={true}
                    angle={169.71}
                />
            </View>

            <View style={[styles.content, styles.contentLayout]}>
                <View style={[styles.btnsigninParent, styles.contentLayout]}>
                    <View style={[styles.btnsignin, styles.btnsigninPosition]}>
                        <LinearGradient
                            style={[styles.background1, styles.backgroundPosition]}
                            locations={[0, 1]}
                            colors={["#4beebd", "#3ddaaa"]}
                            useAngle={true}
                            angle={101.93}
                        />
                        <Text style={[styles.ngNhp, styles.timeFlexBox]} onPress={() => navigation.navigate('Login')}>Log In</Text>
                    </View>
                   
                    <View style={styles.dotslider}>
                        <View style={[styles.view, styles.viewLayout]} />
                        <View style={[styles.view1, styles.viewLayout]} />
                        <LinearGradient
                            style={[styles.lineargradient, styles.viewLayout]}
                            locations={[0, 1]}
                            colors={["#6ceec6", "#57d8b1"]}
                            useAngle={true}
                            angle={101.93}
                        />
                    </View>
                    <Text style={[styles.bngCchLa, styles.timeFlexBox]}>
                    Optimal student learning experience.
                    </Text>
                    <Text style={[styles.giGnSc, styles.timeFlexBox]}>
                    MyEduTrack
                    </Text>

                </View>
            </View>
            <View style={[styles.swipeUp, styles.swipeUpPosition]}>
                <View style={[styles.btnhome, styles.swipeUpPosition]}>
                    <Image
                        style={[styles.backgroundIcon, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/background.png")}
                    />
                    <View style={styles.view2} />
                </View>
            </View>
            <View style={[styles.foodthyParent, styles.foodthyLayout]}>

                <Image
                    style={styles.healthyFood1Icon}
                    resizeMode="cover"
                    source={require("../assets/393165597-368988352388994-6454052415328874638-n.png")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundPosition1: {
        width: '100%',
        left: 0,
        top: 0,
        position: "absolute",
        height: 812,
    },
    contentLayout: {
        height: 369,
        width: 319,
        position: "absolute",
    },
    btnsigninPosition: {
        height: 60,
        left: 0,
        position: "absolute",
    },
    backgroundPosition: {
        borderRadius: Border.br_31xl,
        height: 60,
        backgroundColor: "transparent",
        left: 0,
        top: 0,
        position: "absolute",
    },
    timeFlexBox: {
        textAlign: "center",
        position: "absolute",
    },
    viewLayout: {
        width: 23,
        height: 6,
        borderRadius: Border.br_31xl,
        top: 0,
        position: "absolute",
    },
    headerPosition: {
        right: 0,
        left: 0,
    },
    iconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
    },
    swipeUpPosition: {
        bottom: 0,
        right: 0,
        left: 0,
        position: "absolute",
    },
    foodthyLayout: {
        width: 186,
        position: "absolute",
    },
    pagebackground: {
        backgroundColor: "transparent",
    },
    background1: {
        width: 318,
    },
    ngNhp: {
        top: 19,
        left: 111,
        color: Color.primaryContrast,
        fontFamily: FontFamily.sFProRegular,
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: FontSize.size_base,
    },
    btnsignin: {
        top: 231,
        width: 318,
    },
    background2: {
        width: 319,
    },
    ngK: {
        top: 20,
        color: "#646464",
        left: 123,
        textAlign: "center",
        fontFamily: FontFamily.sFProRegular,
        textTransform: "uppercase",
        fontSize: FontSize.size_base,
        position: "absolute",
    },
    btnsignup: {
        top: 309,
        width: 319,
    },
    view: {
        backgroundColor: Color.paleturquoise,
        width: 23,
        left: 0,
    },
    view1: {
        backgroundColor: Color.paleturquoise,
        width: 23,
        left: 28,
    },
    lineargradient: {
        left: 56,
        backgroundColor: "transparent",
    },
    dotslider: {
        top: 160,
        width: 79,
        height: 6,
        left: 123,
        position: "absolute",
    },
    bngCchLa: {
        top: 99,
        left: 1,
        fontSize: 14,
        lineHeight: 22,
        color: "rgba(0, 0, 0, 0.7)",
        fontFamily: FontFamily.sFProRegular,
        textAlign: "center",
        width: 318,
    },
    giGnSc: {
        fontSize: 24,
        fontWeight: "700",
        fontFamily: FontFamily.sFProBold,
        color: "#2e5254",
        width: 319,
        left: 0,
        top: 0,
    },
    btnsigninParent: {
        left: 0,
        top: 0,
    },
    content: {
        top: 382,
        left: 48,
    },
    border: {
        height: "100%",
        width: "90.43%",
        top: "0%",
        right: "9.57%",
        bottom: "0%",
        left: "0%",
        borderRadius: 3,
        borderStyle: "solid",
        borderColor: "#384144",
        borderWidth: 1,
        opacity: 0.35,
        position: "absolute",
    },
    capIcon: {
        height: "35.29%",
        width: "5.46%",
        top: "32.35%",
        right: "0%",
        bottom: "32.35%",
        left: "94.54%",
        opacity: 0.4,
    },
    capacity: {
        height: "64.71%",
        width: "73.99%",
        top: "17.65%",
        right: "17.79%",
        bottom: "17.65%",
        left: "8.22%",
        borderRadius: 1,
        backgroundColor: Color.darkslategray_200,
        position: "absolute",
    },
    battery: {
        height: "25.76%",
        width: "6.49%",
        top: "39.39%",
        right: "3.82%",
        bottom: "34.85%",
        left: "89.69%",
        position: "absolute",
    },
    wifiIcon: {
        width: 15,
        height: 11,
    },
    cellularConnectionIcon: {
        width: 17,
        height: 11,
    },
    time: {
        marginTop: -9,
        width: "14.4%",
        top: "50%",
        left: "5.6%",
        fontSize: FontSize.sFSubheadlineSemibold_size,
        letterSpacing: 0,
        lineHeight: 20,
        fontWeight: "600",
        fontFamily: FontFamily.sFSubheadlineSemibold,
        color: Color.darkslategray_200,
    },
    header: {
        height: 44,
        top: 0,
        position: "absolute",
    },
    backgroundIcon: {
        bottom: -777,
        top: 777,
        right: 0,
        left: 0,
    },
    view2: {
        marginLeft: -66.5,
        bottom: 9,
        left: "50%",
        backgroundColor: "#cbcbcb",
        width: 134,
        height: 5,
        position: "absolute",
    },
    btnhome: {
        top: 0,
    },
    swipeUp: {
        top: 777,
        left: 48
    },
    foodthyIcon: {
        top: 128,
        height: 45,
        left: 0,
    },
    healthyFood1Icon: {
        left: 41,
        width: 104,
        height: 104,
        top: 0,
        position: "absolute",
    },
    foodthyParent: {
        top: 183,
        left: 120,
        height: 173,
    },
    homeV3: {
        backgroundColor: Color.primaryContrast,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        height: 812,
    }
});

export default Splash;
