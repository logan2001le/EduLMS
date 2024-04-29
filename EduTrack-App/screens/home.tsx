import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Pressable, Button, StyleSheet } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const Home = () => {
    const navigation = useNavigation();
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        // Phương thức GET để lấy dữ liệu từ API 'contracts'
        axios.get(`${config.API_BASE_URL}/contracts`)
            .then(response => {
                // Lưu trữ danh sách hợp đồng vào state
                console.log(response.data.data)
                setContracts(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Hàm xử lý khi người dùng nhấn vào nút "Xem" để xem chi tiết hợp đồng
    const handleViewClass = async (id) => {
        // Navigation đến màn hình chi tiết hợp đồng với ID của hợp đồng
        console.log(id);
        await AsyncStorage.setItem('contractId', id.toString());
        navigation.navigate('ContractDetail', { contractId: id });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Class Management</Text>
            <FlatList
                data={contracts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.date}>Start Date: {item.start_date}</Text>
                        <Text style={styles.date}>End Date: {item.end_date}</Text>
                        <Text style={styles.teacher}>Teacher Name: {item.teacher_username}</Text>
                        <Text style={styles.teacher}>Teacher Phone: {item.teacher_phone}</Text>
                        <Text style={styles.description}>Description: {item.description}</Text>
                        <Pressable onPress={() => handleViewClass(item.id)}>
                            <Text style={styles.attachment}>{item.file_url ? "View file" : "No attachment"}</Text>
                        </Pressable>
                        <Text style={styles.value}>Value: {Number(item.value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                        <Button
                            title="View"
                            onPress={() => handleViewClass(item.id)}
                        />
                    </View>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#F0F0F0',
    },
    itemContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5,
    },
    date: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 5,
    },
    teacher: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 5,
    },
    attachment: {
        fontSize: 16,
        color: '#007BFF',
        marginBottom: 5,
        textDecorationLine: 'underline',
    },
    value: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 5,
    },
});

export default Home;
