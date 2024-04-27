import React, { useState, useEffect } from 'react';
import "./changePassword.css";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Divider, Alert, notification } from 'antd';
import backgroundLogin from "../../assets/image/login_background.png";
import { useParams } from "react-router-dom";
import axiosClient from '../../apis/axiosClient';

const ChangePassWord = () => {

    const [isLogin, setLogin] = useState(false);

    let history = useHistory();
    let { id } = useParams();

    const onFinish = async (values) => {
        const resetPassWord = {
            currentPassword: values.currentPassword,
            newPassword: values.password
        }
        const currentUser = JSON.parse(localStorage.getItem("user"));
        axiosClient.put("/user/changePassword/" + currentUser.id, resetPassWord)
            .then(function (response) {
                console.log(response);
                if (response.message == "Current password is incorrect") {
                    return notification["error"]({
                        message: `Notification`,
                        description:
                            'Incorrect current password!',

                    });
                }
                if (response === undefined) {
                    setLogin(true);
                }
                else {
                    notification["success"]({
                        message: `Notification`,
                        description:
                            'Password changed successfully',

                    });
                    history.push("/login");
                }
            })
            .catch(error => {
                console.log("password error" + error)
            });
    }
    useEffect(() => {

    }, [])

    return (
        <div className="imageBackground">
            <div id="formContainer" >
                <div id="form-Login">
                    <div className="formContentLeft"
                    >
                        <img className="formImg" src={backgroundLogin} alt='spaceship' />
                    </div>
                    <Form
                        style={{ width: 340, marginBottom: 8 }}
                        name="normal_login"
                        className="loginform"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item style={{ marginBottom: 3, marginTop: 65 }}>
                            <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">EduTrack!</Divider>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 16, textAlign: "center" }}>
                            <p className="text">Change Password</p>
                        </Form.Item>
                        <>
                            {isLogin === true ?
                                <Form.Item style={{ marginBottom: 16 }}>
                                    <Alert
                                        message="Error changing password"
                                        type="error"
                                        showIcon
                                    />

                                </Form.Item>
                                : ""}
                        </>
                        <Form.Item
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your current password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Current Password" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your new password!',
                                },
                                { max: 100, message: 'Maximum 100 characters' },
                                { min: 5, message: 'At least 5 characters' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="New Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your new password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm New Password" />
                        </Form.Item>

                        <Form.Item style={{ width: '100%', marginTop: 20 }}>
                            <Button className="button" type="primary" htmlType="submit"  >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassWord;
