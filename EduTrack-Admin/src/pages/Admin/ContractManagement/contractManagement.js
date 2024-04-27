import {
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    PlusOutlined,
    ShoppingOutlined,
    FormOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop, Breadcrumb,
    Button,
    Col,
    Form,
    Input,
    Modal, Popconfirm,
    Row,
    Space,
    Spin,
    Table,
    notification,
    Rate,
    DatePicker,
    InputNumber,
} from 'antd';
import React, { useEffect, useState } from 'react';
import contractManagementApi from "../../../apis/contractManagementApi";
import "./contractManagement.css";
import dayjs from 'dayjs';
import moment from 'moment';
import uploadFileApi from '../../../apis/uploadFileApi';
import { getItemFromLocalStorage } from '../../../apis/storageService';
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const ContractManagement = () => {

    const [category, setCategory] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [id, setId] = useState();
    const [file, setUploadFile] = useState();
    let history = useHistory();

    const showModal = () => {
        setOpenModalCreate(true);
    };

    const handleOkUser = async (values) => {
        setLoading(true);
        try {
            const startDate = values.start_date;
            const endDate = values.end_date;

            // Check if the end date is greater than or equal to the start date
            if (endDate.isBefore(startDate)) {
                notification.error({
                    message: 'Notification',
                    description: 'End date must be greater than or equal to start date',
                });
                setLoading(false);
                return;
            }

            const categoryList = {
                title: values.title,
                startDate: values.start_date.format("YYYY-MM-DD"),
                endDate: values.end_date.format("YYYY-MM-DD"),
                description: values.description,
                value: values.value,
                fileUrl: file
            };
            return contractManagementApi.createContract(categoryList).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Failed to create class',
                    });
                }
                else {
                    notification["success"]({
                        message: `Notification`,
                        description:
                            'Class created successfully',
                    });
                    setOpenModalCreate(false);
                    handleCategoryList();
                }
            })

        } catch (error) {
            throw error;
        }
    }

    const handleUpdateCategory = async (values) => {
        setLoading(true);
        try {
            const startDate = values.start_date;
            const endDate = values.end_date;

            // Check if the end date is greater than or equal to the start date
            if (endDate.isBefore(startDate)) {
                notification.error({
                    message: 'Notification',
                    description: 'End date must be greater than or equal to start date',
                });
                setLoading(false);
                return;
            }

            const categoryList = {
                title: values.title,
                startDate: values.start_date.format("YYYY-MM-DD"),
                endDate: values.end_date.format("YYYY-MM-DD"),
                description: values.description,
                value: values.value,
                fileUrl: file
            }
            return contractManagementApi.updateContract(categoryList, id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Failed to edit class',
                    });
                }
                else {
                    notification["success"]({
                        message: `Notification`,
                        description:
                            'Class edited successfully',
                    });
                    handleCategoryList();
                    setOpenModalUpdate(false);
                }
            })

        } catch (error) {
            throw error;
        }
    }

    const handleJoinTeacherClass = async (contractId) => {
        console.log(contractId);
        const teacherId = getItemFromLocalStorage("user").id;
        try {
            // Call API addTeacherToContract with contractId
            const response = await contractManagementApi.addTeacherToContract(contractId, teacherId);
            if (response) {
                notification["success"]({
                    message: `Notification`,
                    description:
                        'Joined class successfully!',

                });
            }
        } catch (error) {
            console.error('An error occurred while joining the class:', error);
        }
    }

    const handleReviewsTeacherClass = async (data) => {
        console.log(data);
        const studentId = getItemFromLocalStorage("user").id;
        try {
            // Call API addTeacherToContract with contractId
            const response = await contractManagementApi.addReview(studentId, data);
            if (response) {
                notification["success"]({
                    message: `Notification`,
                    description:
                        'Review submitted successfully!',

                });
            }
        } catch (error) {
            console.error('An error occurred while reviewing:', error);
        }
    }

    
    const handleViewClass = (contractId) => {
        history.push("/details-class/" + contractId);

    }


    const handleCancel = (type) => {
        if (type === "create") {
            setOpenModalCreate(false);
        } else {
            setOpenModalUpdate(false)
        }
        console.log('Clicked cancel button');
    };

    const handleCategoryList = async () => {
        try {
            await contractManagementApi.listContract().then((res) => {
                setCategory(res.data);
                setLoading(false);
            });
        } catch (error) {
            console.log('Failed to fetch class list:' + error);
        };
    }

    const handleDeleteCategory = async (id) => {
        setLoading(true);
        try {
            await contractManagementApi.deleteContract(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Failed to delete class',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Notification`,
                        description:
                            'Class deleted successfully',

                    });
                    handleCategoryList();
                    setLoading(false);
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch class list:' + error);
        }
    }

    const handleEditCategory = (id) => {
        setOpenModalUpdate(true);
        (async () => {
            try {
                const response = await contractManagementApi.getDetailContract(id);
                setId(id);
                form2.setFieldsValue({
                    title: response.data.title,
                    start_date: dayjs(response.data.start_date),
                    end_date: dayjs(response.data.end_date),
                    description: response.data.description,
                    value: response.data.value,
                });

                console.log(form2);
                setLoading(false);
            } catch (error) {
                throw error;
            }
        })();
    }

    const columns = [
        {
            title: 'ID',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (text) => moment(text).format('YYYY-MM-DD'),

        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (text) => moment(text).format('YYYY-MM-DD'),

        },
        {
            title: 'Teacher Name',
            dataIndex: 'teacher_username',
            key: 'teacher_username',
        },
        {
            title: 'Teacher Phone',
            dataIndex: 'teacher_phone',
            key: 'teacher_phone',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Attachment',
            dataIndex: 'file_url',
            key: 'file_url',
            render: (attachment) => (
                <a href={attachment} target="_blank" rel="noopener noreferrer">
                    {"View file"}
                </a>
            ),
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => {
                // Format number as Vietnamese currency
                const formattedCost = Number(record.value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                return formattedCost;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Row>
                        {getItemFromLocalStorage("user").role === "isAdmin" ? (
                            <>
                                <Button
                                    size="small"
                                    icon={<EditOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                    onClick={() => handleEditCategory(record.id)}
                                >
                                    {"Edit"}
                                </Button>
                                <div style={{ marginLeft: 10 }}>
                                    <Popconfirm
                                        title="Are you sure to delete this class?"
                                        onConfirm={() => handleDeleteCategory(record.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            style={{ width: 150, borderRadius: 15, height: 30 }}
                                        >
                                            {"Delete"}
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </>
                        ) : getItemFromLocalStorage("user").role === "isTeacher" ? (
                            <>
                                <Button
                                    size="small"
                                    icon={<FormOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                    onClick={() => handleJoinTeacherClass(record.id)}
                                    disabled={record.teacher_id === getItemFromLocalStorage("user").id} // Check if id is equal to teacher_id then disable the button
                                >
                                    {"Join class"}
                                </Button>
                                <Button
                                    size="small"
                                    icon={<EyeOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30, marginLeft: 10 }}
                                    onClick={() => handleViewClass(record.id)}
                                >
                                    {"View"}
                                </Button>
                            </>
                        ) : <>

                            <Button
                                size="small"
                                icon={<EyeOutlined />}
                                style={{ width: 150, borderRadius: 15, height: 30, marginLeft: 10 }}
                                onClick={() => handleViewClass(record.id)}
                            >
                                {"View"}
                            </Button>
                        </>}
                    </Row>
                </div>
            ),
        }

    ];

    const handleChangeImage = async (e) => {
        setLoading(true);
        const response = await uploadFileApi.uploadFile(e);
        if (response) {
            setUploadFile(response);
        }
        setLoading(false);
    }


    useEffect(() => {
        (async () => {
            try {
                await contractManagementApi.listContract().then((res) => {
                    console.log(res);
                    setCategory(res.data);
                    setLoading(false);
                });

            } catch (error) {
                console.log('Failed to fetch class list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <ShoppingOutlined />
                                <span>Class Management</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div id="my__event_container__list">
                            <PageHeader
                                subTitle=""
                                style={{ fontSize: 14 }}
                            >
                                <Row>
                                    <Col span="18">
                                    </Col>
                                    <Col span="6">
                                        <Row justify="end">
                                            <Space>
                                                {getItemFromLocalStorage("user").role === "isAdmin" ? <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Create Class</Button> : null}
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={category} />
                    </div>
                </div>

                <Modal
                    title="Create New Class"
                    visible={openModalCreate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                handleOkUser(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={() => handleCancel("create")}
                    okText="Complete"
                    cancelText="Cancel"
                    width={600}
                >
                    <Form
                        form={form}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Spin spinning={loading}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input title!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>
                            <Form.Item
                                name="start_date"
                                label="Start Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select start date!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Select start date" />
                            </Form.Item>
                            <Form.Item
                                name="end_date"
                                label="End Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select end date!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Select end date" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input description!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <TextArea placeholder="Description" autoSize={{ minRows: 6, maxRows: 10 }} />
                            </Form.Item>
                            <Form.Item
                                name="value"
                                label="Value"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input value!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Value"
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} // Use dot as a thousand separator
                                    parser={(value) => value.replace(/\./g, '')} // Remove dots for parsing
                                />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Attachment"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please attach file!',
                                    },
                                ]}
                            >
                                <input
                                    type="file"
                                    onChange={handleChangeImage}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>
                        </Spin>
                    </Form>

                </Modal>

                <Modal
                    title="Edit Class"
                    visible={openModalUpdate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form2
                            .validateFields()
                            .then((values) => {
                                form2.resetFields();
                                handleUpdateCategory(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={handleCancel}
                    okText="Complete"
                    cancelText="Cancel"
                    width={600}
                >
                    <Form
                        form={form2}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Spin spinning={loading}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input title!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>
                            <Form.Item
                                name="start_date"
                                label="Start Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select start date!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Select start date" />
                            </Form.Item>
                            <Form.Item
                                name="end_date"
                                label="End Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select end date!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Select end date" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input description!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <TextArea placeholder="Description" autoSize={{ minRows: 6, maxRows: 10 }} />
                            </Form.Item>
                            <Form.Item
                                name="value"
                                label="Value"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input value!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Value"
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} // Use dot as a thousand separator
                                    parser={(value) => value.replace(/\./g, '')} // Remove dots for parsing
                                />
                            </Form.Item>
                            <Form.Item
                                name="image"
                                label="Attachment"
                            >
                                <input
                                    type="file"
                                    onChange={handleChangeImage}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>
                        </Spin>
                    </Form>
                </Modal>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default ContractManagement;