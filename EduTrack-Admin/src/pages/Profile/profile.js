import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Col, Divider, Row, Spin, notification, Form, Input, Button, Modal } from 'antd';
import { FormOutlined, HomeOutlined } from '@ant-design/icons';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { useHistory } from 'react-router-dom';
import userApi from "../../apis/userApi";
import "./profile.css";
import uploadFileApi from '../../apis/uploadFileApi';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [isVisibleModal, setVisibleModal] = useState(false);
    const [file, setUploadFile] = useState();

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '03b81b9c18944e6495d890b189357388',
        lat: '16.060094749570567',
        lon: '108.2097695823264',
        lang: 'en',
        unit: 'metric',
    });

    const handleList = () => {
        (async () => {
            try {
                const response = await userApi.getProfile();
                console.log(response);
                setUserData(response.user);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch profile user:' + error);
            }
        })();
    }

    useEffect(() => {
        (async () => {
            handleList();
        })();
        window.scrollTo(0, 0);
    }, []);

    const handleFormSubmit = async (values) => {
        try {
            const formatData = {
                "email": values.email,
                "phone": values.phone,
                "username": values.username,
                "image": file,
            };
            console.log(userData);
            await userApi.updateProfile(formatData, userData.id)
                .then(response => {
                    console.log(response);
                    if (response === '' || response === undefined) {
                        notification.error({
                            message: 'Notification',
                            description: 'Failed to update profile',
                        });
                    } else {
                        notification.success({
                            message: 'Notification',
                            description: 'Profile updated successfully',
                        });
                        setVisibleModal(false)
                    }
                });
            handleList();
        } catch (error) {
            throw error;
        }
    };

    const handleChangeImage = async (e) => {
        setLoading(true);
        const response = await uploadFileApi.uploadFile(e);
        if (response) {
            setUploadFile(response);
        }
        setLoading(false);
    }

    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ marginTop: 20, marginLeft: 24 }}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <FormOutlined />
                            <span>Profile</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div>
                    <div>
                        <Row justify="center">
                            <Col span="9" style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                                <Card hoverable={true} className="profile-card" style={{ padding: 0, margin: 0 }}>
                                    <Row justify="center">
                                        <img
                                            src={userData?.image}
                                            style={{
                                                width: 150,
                                                height: 150,
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </Row>
                                    <Row justify="center">
                                        <Col span="24">
                                            <Row justify="center">
                                                <strong style={{ fontSize: 18 }}>{userData?.username}</strong>
                                            </Row>
                                            <Row justify="center">
                                                <p style={{ padding: 0, margin: 0, marginBottom: 5 }}>{userData?.email}</p>
                                            </Row>
                                            <Row justify="center">
                                                <p style={{ padding: 0, margin: 0, marginBottom: 0 }}>{userData?.birthday}</p>
                                            </Row>
                                            <Row justify="center">
                                                <p style={{ padding: 0, margin: 0, marginBottom: 5 }}>{userData?.phone}</p>
                                            </Row>
                                            <Divider style={{ padding: 0, margin: 0 }} ></Divider>
                                        </Col>
                                        <Button type="primary" style={{ marginTop: 15 }} onClick={() => setVisibleModal(true)}>Update Profile</Button>
                                    </Row>
                                </Card>
                            </Col>

                            <Col span="6" style={{ marginTop: 20 }}>
                                {/* Additional content if needed */}
                            </Col>
                        </Row>
                    </div>
                </div>

                <div>
                    <Modal
                        title="Update Profile Information"
                        visible={isVisibleModal}
                        onCancel={() => setVisibleModal(false)}
                        footer={null}
                    >
                        <Form
                            initialValues={{
                                username: userData?.username,
                                email: userData?.email,
                                phone: userData?.phone,
                            }}
                            onFinish={handleFormSubmit}
                        >
                            <Spin spinning={loading}>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email" name="email" rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Invalid email!',
                                    },
                                ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Phone number" name="phone" rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                    {
                                        pattern: /^[0-9]{10}$/,
                                        message: "Phone number must be 10 digits and contain only numbers",
                                    },
                                ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="image"
                                    label="Choose image"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChangeImage}
                                        id="avatar"
                                        name="file"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Update
                                    </Button>
                                </Form.Item>
                            </Spin>
                        </Form>
                    </Modal>
                </div>
            </Spin>
        </div >
    )
}

export default Profile;
