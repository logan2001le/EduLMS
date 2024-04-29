import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TextInput, Alert, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Border, FontFamily, FontSize, Padding, Color } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import config from '../config'; 
import axios from 'axios';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = () => {
    if (username && password && email) {
      const userData = {
        username: username,
        password: password,
        email: email,
        phone: "0938283923",
        role: "isClient"
      };
  
      axios.post(`${config.API_BASE_URL}/auth/register`, userData)
        .then(response => {
          console.log(response);
          Alert.alert('Đăng ký thành công');
          navigation.navigate('Login');
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Đăng ký thất bại', 'vui lòng kiểm tra lại');
        });
    } else {
      Alert.alert('Đăng ký thất bại','Vui lòng nhập đầy đủ thông tin');
    }
  };

  return (
    <LinearGradient
      style={styles.signup}
      locations={[0, 1]}
      colors={["#f3f9ff", "#daf2ef"]}
      useAngle={true}
      angle={169.71}
    >
      <View style={styles.form}>
        <LinearGradient
          style={[styles.btnsignin, styles.btnsigninLayout]}
          locations={[0, 1]}
          colors={["#f6fffc", "#eefbf7"]}
          useAngle={true}
          angle={94.12}
        >
          <Text style={[styles.ngNhp, styles.ngNhpTypo]} onPress={() => navigation.navigate('Login')}>ĐĂNG NHẬP</Text>
        </LinearGradient>
        <Text style={[styles.bnC, styles.bnCLayout]}>
          Bạn đã có tài khoản rồi?
        </Text>
        <LinearGradient
          style={[styles.btnsignup, styles.nhpSTnLayout]}
          locations={[0, 1]}
          colors={["#4beebd", "#3ddaaa"]}
          useAngle={true}
          angle={101.93}
        >
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.ngKTi, styles.ngNhpTypo]}>
              ĐĂNG KÝ tài khoản
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.input}>
          <Text style={[styles.hin, styles.hinTypo]}>Hiện</Text>
          <Image
            style={styles.icPasswordIcon}
            resizeMode="cover"
            source={require("../assets/ic-password.png")}
          />
          <TextInput
            style={[styles.anatsweet3, styles.bnCTypo]}
            placeholder="Nhập mật khẩu"
            placeholderTextColor={Color.mediumaquamarine}
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={[styles.input1, styles.inputLayout]}>
          <Image
            style={styles.icUserIcon}
            resizeMode="cover"
            source={require("../assets/ic-user.png")}
          />
          <TextInput
            style={[styles.anatsweet, styles.bnCTypo]}
            placeholder="Nhập tên tài khoản"
            placeholderTextColor={Color.mediumaquamarine}
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={[styles.input2, styles.inputLayout]}>
          <Image
            style={styles.icUserIcon}
            resizeMode="cover"
            source={require("../assets/mail-1-1.png")}
          />
          <TextInput
            style={[styles.anatsweet2, styles.bnCTypo]}
            placeholder="Nhập email"
            placeholderTextColor={Color.mediumaquamarine}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <Text style={[styles.nhpSTn, styles.hinTypo]}>
          Nhập số tên tài khoản, email và mật khẩu để đăng ký
        </Text>
        <Text style={[styles.cngBtU, styles.timeTypo]}>
          Cùng bắt đầu sử dụng
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
  btnsigninLayout: {
    height: 60,
    borderRadius: Border.br_31xl,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "transparent",
  },
  ngNhpTypo: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: FontFamily.sFProRegular,
    fontSize: FontSize.size_base,
  },
  bnCLayout: {
    lineHeight: 22,
    textAlign: "center",
  },
  nhpSTnLayout: {
    width: 318,
    left: 1,
  },
  hinTypo: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.sFProRegular,
    position: "absolute",
  },
  inputLayout: {
    paddingHorizontal: Padding.p_xl,
    flexDirection: "row",
    backgroundColor: Color.mintcream,
    width: 318,
    height: 60,
    borderRadius: Border.br_31xl,
    left: 0,
    position: "absolute",
  },
  bnCTypo: {
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
  ngNhp: {
    color: Color.dimgray,
  },
  btnsignin: {
    top: 508,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    width: 319,
  },
  bnC: {
    top: 467,
    left: 69,
    color: Color.gray,
    fontFamily: FontFamily.sFProRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  ngKTi: {
    color: Color.white,
  },
  btnsignup: {
    top: 388,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_xl,
    alignItems: "center",
    height: 60,
    borderRadius: Border.br_31xl,
    position: "absolute",
    backgroundColor: "transparent",
  },
  hin: {
    top: 20,
    left: 264,
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
    height: 6,
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
    top: 298,
    backgroundColor: Color.mintcream,
    width: 318,
    height: 60,
    borderRadius: Border.br_31xl,
    left: 0,
    position: "absolute",
  },
  icUserIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  anatsweet: {
    color: Color.black,
    textAlign: "left",
    marginLeft: 20,
    height: 65
  },
  anatsweet2: {
    color: Color.black,
    textAlign: "left",
    marginLeft: 20,
    height: 37
  },
  anatsweet3: {
    color: Color.black,
    textAlign: "left",
    marginLeft: 65,
    marginTop: 5
  },
  input1: {
    top: 148,
    paddingTop: Padding.p_mini,
    paddingBottom: 21,
    alignItems: "center",
  },
  input2: {
    top: 223,
    paddingVertical: Padding.p_mini,
  },
  nhpSTn: {
    top: 86,
    color: Color.darkgray,
    width: 318,
    left: 1,
    lineHeight: 22,
    textAlign: "center",
  },
  cngBtU: {
    left: 42,
    fontSize: 24,
    fontFamily: FontFamily.sFProSemibold,
    color: Color.darkslategray_200,
    width: 234,
    top: 0,
  },
  form: {
    top: 184,
    height: 568,
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
    paddingBottom: 2,
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: Color.lightgray,
    width: 134,
    height: 5,
    marginTop: -14,
  },
  btnhome: {
    top: 777,
    justifyContent: "flex-end",
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  healthyFood2Icon: {
    top: 65,
    width: 98,
    height: 98,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  signup: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 812,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});

export default SignUp;