import { CheckCircleOutlined, CopyOutlined, HomeOutlined, PlusOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { BackTop, Breadcrumb, Button, Modal, Form, Card, Col, Input, Popconfirm, Row, Space, Spin, Table, Tag, notification, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import userApi from "../../apis/userApi";
import "./accountManagement.css";
import axiosClient from '../../apis/axiosClient';

const { Option } = Select;

const AccountManagement = () => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedInput, setSelectedInput] = useState();
    const [form] = Form.useForm();

    const history = useHistory();

    const titleCase = (str) => {
        var splitStr = str?.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'index',
            render: (value, item, index) => (
                (page - 1) * 10 + (index + 1)
            ),
        },
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => (
                <Space size="middle">
                    {
                        text == null || text === undefined ? "" :
                            <p style={{ margin: 0 }}>{titleCase(text)}</p>
                    }

                </Space>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: '12%',
            render: (text, record) => (
                <Space size="middle">
                    {
                        text === "isAdmin" ?
                            <Tag color="blue" key={text} style={{ width: 120, textAlign: "center" }} icon={<CopyOutlined />}>
                                Admin
                            </Tag> : text === "isTeacher" ?
                                <Tag color="green" key={text} style={{ width: 120, textAlign: "center" }} icon={<CheckCircleOutlined />}>
                                    Teacher
                                </Tag> :  text === "isStudent" ?
                                        <Tag color="geekblue" key={text} style={{ width: 120, textAlign: "center" }} icon={<UserOutlined />}>
                                            Student
                                        </Tag> : null
                    }
                </Space>
            ),
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Space size="middle">
                    {

                        text === "actived" ?
                            <Tag color="green" key={text} style={{ width: 80, textAlign: "center" }}>
                                Active
                            </Tag> : text == "newer" ? <Tag color="blue" key={text} style={{ width: 80, textAlign: "center" }}>
                                New
                            </Tag>

                                : <Tag color="default" key={text} style={{ width: 80, textAlign: "center" }}>
                                    Blocked
                                </Tag>
                    }

                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Row>
                        {record.status !== "actived" ? <Popconfirm
                            title="Do you want to unblock this account?"
                            onConfirm={() => handleUnBanAccount(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                size="small"
                                icon={<CheckCircleOutlined />}
                                style={{ width: 160, borderRadius: 15, height: 30 }}
                            >{"Unblock Account"}
                            </Button>
                        </Popconfirm> : <Popconfirm
                            title="Do you want to block this account?"
                            onConfirm={() => handleBanAccount(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                size="small"
                                icon={<StopOutlined />}
                                style={{ width: 160, borderRadius: 15, height: 30 }}
                            >{"Block Account"}
                            </Button>
                        </Popconfirm>}
                    </Row>

                </div >
            ),
        },
    ];

    const handleListUser = async () => {
        try {
            const response = await userApi.listUserByAdmin({ page: 1, limit: 1000 });
            console.log(response);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleUnBanAccount = async (data) => {
        const params = {
            "username": data.username,
            "email": data.email,
            "phone": data.phone,
            "password": data.password,
            "role": data.role,
            "status": "actived"
        }
        try {
            await userApi.unBanAccount(params, data.id).then(response => {
                if (response.message === "Email already exists") {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Failed to unblock account',

                    });
                }
                else {
                    notification["success"]({
                        message: `Notification`,
                        description:
                            'Unblock account successfully',

                    });
                    handleListUser();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleBanAccount = async (data) => {
        console.log(data);
        const params = {
            "username": data.username,
            "email": data.email,
            "phone": data.phone,
            "password": data.password,
            "role": data.role,
            "status": "noactive"
        }
        try {
            await userApi.banAccount(params, data.id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Failed to block account',

                    });
                }
                else {
                    notification["success"]({
                        message: `Notification`,
                        description:
                            'Block account successfully',

                    });
                    handleListUser();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleFilterEmail = async (email) => {
        try {
            const response = await userApi.searchUser(email);
            setUser(response.data);
        } catch (error) {
            console.log('search to fetch user list:' + error);
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const accountCreate = async (values) => {
        try {
            const formatData = {
                "username": values.name,
                "email": values.email,
                "phone": values.phone,
                "password": values.password,
                "role": values.role,
                "status": "actived"
            }
            await axiosClient.post("/user", formatData)
                .then(response => {
                    console.log(response)
                    if (response == "User with this phone number already exists") {
                        return message.error('Phone number must be unique');
                    }

                    if (response == "User with this email already exists") {
                        return message.error('Email must be unique');
                    }

                    if (response == "User already exists") {
                        return message.error('User already exists');
                    } else
                        if (response.message == "Validation failed: Email has already been taken") {
                            message.error('Email has already been taken');
                        } else
                            if (response.message == "Validation failed: Phone has already been taken") {
                                message.error('Phone has already been taken');
                            } else
                                if (response == undefined) {
                                    notification["error"]({
                                        message: `Notification`,
                                        description:
                                            'Failed to create account',

                                    });
                                }
                                else {
                                    notification["success"]({
                                        message: `Notification`,
                                        description:
                                            'Account created successfully',
                                    });
                                    form.resetFields();
                                    handleList();
                                    history.push("/account-management");
                                }
                }
                );

            setIsModalVisible(false);

        } catch (error) {
            throw error;
        }
        setTimeout(function () {
            setLoading(false);
        }, 1000);
    }

    const CancelCreateRecruitment = () => {
        form.resetFields();
        history.push("/account-management");
    }

    const handleList = () => {
        (async () => {
            try {
                const response = await userApi.listUserByAdmin({ page: 1, limit: 1000 });
                console.log(response);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch user list:' + error);
            }
        })();
    }

    useEffect(() => {
        handleList();
        window.scrollTo(0, 0);

    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ marginTop: 20, marginLeft: 24 }}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <UserOutlined />
                            <span>Account Management</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div id="account">
                    <div id="account_container">
                        <PageHeader
                            subTitle=""
                            style={{ fontSize: 14, paddingTop: 20, paddingBottom: 20 }}
                        >
                            <Row>
                                <Col span="12">
                                    <Input
                                        placeholder="Search by email"
                                        allowClear
                                        style={{ width: 300 }}
                                        onChange={handleFilterEmail}
                                        value={selectedInput}
                                    />
                                </Col>
                                <Col span="12">
                                    <Row justify="end">
                                        <Button style={{ marginLeft: 10 }} icon={<PlusOutlined />} size="middle" onClick={showModal}>{"Create Account"}</Button>
                                    </Row>
                                </Col>
                            </Row>

                        </PageHeader>
                    </div>
                </div>
                <div style={{ marginTop: 20, marginRight: 5 }}>
                    <div id="account">
                        <div id="account_container">
                            <Card title="Account Management" bordered={false} >
                                <Table columns={columns} dataSource={user} pagination={{ position: ['bottomCenter'] }}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Create Account"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={accountCreate}
                        name="accountCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name!',
                                },
                                { max: 100, message: 'Name must be at most 100 characters' },
                                { min: 5, message: 'Name must be at least 5 characters' },
                            ]
                            }
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            hasFeedback
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email is not valid!',
                                },
                                {
                                    required: true,
                                    message: 'Please input email!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input password!',
                                },
                                { max: 20, message: 'Password must be at most 20 characters' },
                                { min: 6, message: 'Password must be at least 5 characters' },
                            ]
                            }
                            style={{ marginBottom: 10 }}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input phone number!',
                                },
                                {
                                    pattern: /^[0-9]{10}$/,
                                    message: "Phone number must have 10 digits and contain only numbers",
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >

                            <Input placeholder="Phone" />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Role"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select role!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Select role">
                                <Option value="isAdmin">Admin</Option>
                                <Option value="isTeacher">Teacher</Option>
                                <Option value="isStudent">Student</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item >
                            <Button style={{ background: "#FF8000", color: '#FFFFFF', float: 'right', marginTop: 20, marginLeft: 8 }} htmlType="submit">
                                Finish
                            </Button>
                            <Button style={{ background: "#FF8000", color: '#FFFFFF', float: 'right', marginTop: 20 }} onClick={CancelCreateRecruitment}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div>
    )
}

export default AccountManagement;