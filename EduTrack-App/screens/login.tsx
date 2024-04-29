import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TextInput, Alert, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Border, FontFamily, FontSize, Color } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'; // Đường dẫn đến file config.js

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${config.API_BASE_URL}/auth/login`, {
        email: email,
        password: password
      });

      const { user, token } = response.data;

      // Lưu token xuống local storage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', user.id.toString());

      navigation.navigate('Home');
      Alert.alert('Đăng nhập thành công', "Mời bạn trải nghiệm ứng dụng");

    } catch (error) {
      console.error(error);
      Alert.alert('Đăng nhập không thành công', 'Vui lòng kiểm tra lại email và mật khẩu.');
    }
  };

  return (
    <LinearGradient
      style={styles.login}
      locations={[0, 1]}
      colors={["#f3f9ff", "#daf2ef"]}
      useAngle={true}
      angle={169.71}
    >
      <View style={styles.form}>
        
        <Image
          style={[styles.btnsigninIcon, styles.btnsigninPosition]}
          resizeMode="cover"
          source={require("../assets/btnsignin.png")}
        />
        <LinearGradient
          style={[styles.btnsignin, styles.btnsigninPosition]}
          locations={[0, 1]}
          colors={["#4beebd", "#3ddaaa"]}
          useAngle={true}
          angle={101.93}
        >
          <Text style={[styles.ngNhp, styles.ngKTiTypo]} onPress={handleLogin}>ĐĂNG NHẬP</Text>
        </LinearGradient>
        <View style={[styles.input, styles.inputLayout]}>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={[styles.hin, styles.hinTypo]}>{showPassword ? "Ẩn" : "Hiện"}</Text>
          </TouchableOpacity>
          <Image
            style={styles.icPasswordIcon}
            resizeMode="cover"
            source={require("../assets/ic-password.png")}
          />
          <TextInput
            style={[styles.anatsweet2, styles.bnChaCTypo]}
            secureTextEntry={!showPassword}
            placeholder="Nhập mật khẩu"
            placeholderTextColor={Color.mediumaquamarine}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={[styles.input1, styles.input1FlexBox]}>
          <Image
            style={styles.icUserIcon}
            resizeMode="cover"
            source={require("../assets/ic-user.png")}
          />
          <TextInput
            style={[styles.anatsweet, styles.bnChaCTypo]}
            placeholder="Nhập email"
            placeholderTextColor={Color.mediumaquamarine}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Text style={[styles.nhpSTn, styles.hinTypo]}>
          Nhập số tên tài khoản và mật khẩu để đăng nhập
        </Text>
        <Text style={[styles.choMngTr, styles.timeTypo]}>
          Chào mừng trở lại
        </Text>
      </View>

      <Image
        style={styles.healthyFood2Icon}
        resizeMode="cover"
        source={require("../assets/393165597-368988352388994-6454052415328874638-n.png")}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  btnsigninFlexBox: {
    justifyContent: "center",
    borderRadius: Border.br_31xl,
    backgroundColor: "transparent",
  },
  ngKTiTypo: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: FontFamily.sFProRegular,
    fontSize: FontSize.size_base,
  },
  bnChaCLayout: {
    lineHeight: 22,
    textAlign: "center",
  },
  btnsigninPosition: {
    top: 284,
    height: 60,
    position: "absolute",
  },
  inputLayout: {
    width: 318,
    backgroundColor: Color.mintcream,
    height: 60,
    borderRadius: Border.br_31xl,
    left: 0,
  },
  hinTypo: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.sFProRegular,
    position: "absolute",
  },
  input1FlexBox: {
    flexDirection: "row",
    position: "absolute",
  },
  bnChaCTypo: {
    fontFamily: FontFamily.sFProRegular,
    fontSize: FontSize.size_base,
  },
  timeTypo: {
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  btnhomeLayout: {
    height: 35,
    width: 375,
  },
  ngKTi: {
    color: "#646464",
  },
  btnregister: {
    top: 460,
    alignItems: "center",
    height: 60,
    justifyContent: "center",
    borderRadius: Border.br_31xl,
    left: 0,
    width: 319,
    position: "absolute",
  },
  bnChaC: {
    top: 419,
    left: 73,
    color: "rgba(0, 0, 0, 0.5)",
    fontFamily: FontFamily.sFProRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  btnsigninIcon: {
    width: 60,
    left: 0,
  },
  ngNhp: {
    color: "#fff",
  },
  btnsignin: {
    left: 78,
    width: 241,
    paddingHorizontal: 72,
    paddingVertical: 0,
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: Border.br_31xl,
    backgroundColor: "transparent",
    top: 284,
  },
  hin: {
    top: 21,
    left: 265,
    color: Color.mediumaquamarine,
    textAlign: "right",
  },
  cursor: {
    top: 18,
    left: 144,
    backgroundColor: Color.mediumaquamarine,
    width: 2,
    height: 25,
    position: "absolute",
  },
  passworddotsIcon: {
    top: 27,
    left: 66,
    width: 78,
    height: 20,
    position: "absolute",
  },
  icPasswordIcon: {
    height: "40%",
    width: "7.55%",
    top: "30%",
    right: "86.16%",
    bottom: "30%",
    left: "6.29%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  input: {
    top: 194,
    position: "absolute",
  },
  icUserIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  anatsweet: {
    color: "#000",
    textAlign: "left",
    marginLeft: 20,
  },
  anatsweet2: {
    color: "#000",
    textAlign: "left",
    marginLeft: 65,
    marginTop: 5
  },
  input1: {
    top: 119,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: 318,
    backgroundColor: Color.mintcream,
    height: 69,
    borderRadius: Border.br_31xl,
    left: 0,
  },
  nhpSTn: {
    top: 44,
    left: 26,
    color: "#97b6bd",
    width: 267,
    lineHeight: 22,
    textAlign: "center",
  },
  choMngTr: {
    left: 43,
    fontSize: 28,
    fontFamily: FontFamily.sFProSemibold,
    color: "#2e5254",
    width: 234,
    top: 0,
  },
  form: {
    top: 232,
    height: 520,
    width: 319,
    position: "absolute",
  },
  capacity: {
    borderRadius: 1,
    backgroundColor: Color.darkslategray_100,
    width: 16,
    height: 7,
  },
  capIcon: {
    width: 1,
    height: 4,
    opacity: 0.4,
    marginLeft: 2,
  },
  battery: {
    height: "25.76%",
    width: "5.87%",
    top: "39.39%",
    right: "4.44%",
    bottom: "34.85%",
    left: "89.69%",
    borderRadius: 3,
    borderStyle: "solid",
    borderColor: "rgba(56, 65, 68, 0.35)",
    borderWidth: 1,
    paddingLeft: 2,
    paddingRight: 4,
    paddingBottom: 1,
    alignItems: "center",
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
    fontFamily: FontFamily.sFSubheadlineSemibold,
    color: Color.darkslategray_100,
  },
  statusbar: {
    right: 0,
    height: 44,
    top: 0,
    left: 0,
    position: "absolute",
  },
  view: {
    backgroundColor: "#cbcbcb",
    width: 134,
    height: 5,
    marginTop: -5,
  },
  btnhome: {
    top: 777,
    justifyContent: "flex-end",
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  healthyFood2Icon: {
    top: 77,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 132,
    height: 132,
    position: "absolute",
  },
  login: {
    width: "100%",
    height: 812,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});

export default Login;
