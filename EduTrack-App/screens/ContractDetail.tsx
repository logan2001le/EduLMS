import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList, Alert, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';

const ContractDetail = () => {
    const [contract, setContract] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [contractId, setContractId] = useState(null);
    const [studentId, setStudentId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Lấy id từ AsyncStorage khi màn hình được tải và gọi API để lấy chi tiết hợp đồng, danh sách học viên và danh sách review
    const fetchContractAndData = async () => {
        try {
            const id = await AsyncStorage.getItem('contractId');
            const contractResponse = await axios.get(`${config.API_BASE_URL}/contracts/${id}`);
            const studentListResponse = await axios.get(`${config.API_BASE_URL}/contracts/students/${id}`);
            const reviewListResponse = await axios.get(`${config.API_BASE_URL}/contracts/reviews/${id}`);

            setContract(contractResponse.data.data);
            setStudentList(studentListResponse.data.data);
            setReviewList(reviewListResponse.data.reviews);
            setContractId(id);
            const userId = await AsyncStorage.getItem('userId');
            setStudentId(userId);
        } catch (error) {
            console.error('Error retrieving contract details, student list, and review list:', error);
        }
    };

    useEffect(() => {
        fetchContractAndData();
    }, []);

    // Hàm xử lý khi người dùng nhấn vào nút "Join Class"
    const handleJoinClass = async () => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/contracts/students/${contractId}`, {
                studentId
            });

            console.log(response);

            if (response.data.message === "Student added to contract successfully") {
                Alert.alert('Joined class successfully!');
            } else if (response.data.message === "Sinh viên đã tồn tại trong lớp") {
                Alert.alert('You have already joined this class!');
            }
        } catch (error) {
            console.error('Error joining class:', error);
            Alert.alert('Error joining class. Please try again later.');
        }
    };

    // Hàm xử lý khi người dùng submit review
    const handleSubmitReview = async () => {
        try {
            const data = { studentId, rating, comment };
            const response = await axios.post(`${config.API_BASE_URL}/contracts/reviews/${contractId}`, data);
            console.log(response.data);
            if (response.data.message === "Review added successfully") {
                fetchContractAndData();
                setShowModal(false);
                
                Alert.alert('Review submitted successfully!');
            } else {
                Alert.alert('Failed to submit review. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            Alert.alert('Error submitting review. Please try again later.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Class Details</Text>
            <View style={styles.card}>
                <Text style={styles.title}>{contract?.title}</Text>
                <View style={styles.divider} />
                <Text>{contract?.description}</Text>
                <Text style={styles.label}>Start Date:</Text>
                <Text>{contract?.start_date}</Text>
                <Text style={styles.label}>End Date:</Text>
                <Text>{contract?.end_date}</Text>
                <Text style={styles.label}>Description:</Text>
                <Text>{contract?.description}</Text>
                {contract?.file_url && (
                    <Pressable onPress={() => handleViewAttachment(contract.file_url)}>
                        <Text style={styles.attachment}>View file</Text>
                    </Pressable>
                )}
                <Text style={styles.label}>Value:</Text>
                <Text style={styles?.value}>Value: {Number(contract?.value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                <Pressable onPress={handleJoinClass}>
                    <Text style={styles.joinButton}>Join Class</Text>
                </Pressable>
            </View>

            <Text style={styles.title}>Student List</Text>
            <FlatList
                data={studentList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.label}>Student Info:</Text>
                        <Text>ID: {item.id}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Phone: {item.phone}</Text>
                        <Text>Username: {item.username}</Text>
                    </View>
                )}
            />

            <Text style={styles.title}>Review List</Text>
            <FlatList
                data={reviewList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.label}>Review Info:</Text>
                        <Text>ID: {item.id}</Text>
                        <Text>Rating: {item.rating}</Text>
                        <Text>Comment: {item.comment}</Text>
                    </View>
                )}
            />

            {/* Button to show review modal */}
            <Pressable onPress={() => setShowModal(true)}>
                <Text style={styles.reviewButton}>Write a Review</Text>
            </Pressable>

            {/* Review Modal */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Submit Review</Text>
                        <Text style={styles.label}>Rating:</Text>
                        <View style={styles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map((rate) => (
                                <Pressable key={rate} onPress={() => setRating(rate)}>
                                    <Text style={[styles.rating, rating >= rate && styles.selectedRating]}>★</Text>
                                </Pressable>
                            ))}
                        </View>
                        <Text style={styles.label}>Comment:</Text>
                        <TextInput
                            style={styles.commentInput}
                            multiline
                            value={comment}
                            onChangeText={setComment}
                        /> 
                        <View style={styles.buttonContainer}>
                            <Pressable onPress={handleSubmitReview}>
                                <Text style={styles.submitButton}>Submit Review</Text>
                            </Pressable>
                            <Pressable onPress={() => setShowModal(false)}>
                                <Text style={styles.cancelButton}>Cancel</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        fontSize: 16,
        color: '#FF0000',
        textDecorationLine: 'underline',
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#F0F0F0',
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666666',
        marginBottom: 5,
    },
    attachment: {
        fontSize: 16,
        color: '#007BFF',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    joinButton: {
        fontSize: 16,
        color: '#007BFF',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    reviewButton: {
        fontSize: 16,
        color: '#007BFF',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    rating: {
        fontSize: 24,
        marginRight: 5,
    },
    selectedRating: {
        color: 'gold',
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
    },
    submitButton: {
        fontSize: 16,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
});

export default ContractDetail;
