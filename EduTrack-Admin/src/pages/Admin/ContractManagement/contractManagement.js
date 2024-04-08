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
    Select,
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
    const [categoryList, setCategoryList] = useState([]);
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

            // Kiểm tra ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu
            if (endDate.isBefore(startDate)) {
                notification.error({
                    message: 'Thông báo',
                    description: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu',
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
                        message: `Thông báo`,
                        description:
                            'Tạo lớp thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Tạo lớp thành công',
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

            // Kiểm tra ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu
            if (endDate.isBefore(startDate)) {
                notification.error({
                    message: 'Thông báo',
                    description: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu',
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
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa lớp thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa lớp thành công',
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
            // Thực hiện gọi API addTeacherToContract với contractId
            const response = await contractManagementApi.addTeacherToContract(contractId, teacherId);
            if (response) {
                notification["success"]({
                    message: `Thông báo`,
                    description:
                        'Tham gia lớp thành công!',

                });
            }
            // Xử lý kết quả trả về nếu cần
            console.log(response.data.message); // In ra thông báo từ server nếu muốn

            // Nếu bạn muốn thực hiện các hành động khác sau khi thêm giáo viên vào hợp đồng thành công, bạn có thể thực hiện ở đây
        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Đã xảy ra lỗi khi tham gia lớp:', error);
        }
    }

    const handleJoinStudentClass = async (contractId) => {
        console.log(contractId);
        const teacherId = getItemFromLocalStorage("user").id;
        try {
            // Thực hiện gọi API addTeacherToContract với contractId
            const response = await contractManagementApi.addStudentToContract(contractId, teacherId);
            if (response) {
                notification["success"]({
                    message: `Thông báo`,
                    description:
                        'Tham gia lớp thành công!',

                });
            }
            // Xử lý kết quả trả về nếu cần
            console.log(response.data.message); 

        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Đã xảy ra lỗi khi tham gia lớp:', error);
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
            ;
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }

    const handleDeleteCategory = async (id) => {
        setLoading(true);
        try {
            await contractManagementApi.deleteContract(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Xóa lớp thất bại',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Xóa lớp thành công',

                    });
                    handleCategoryList();
                    setLoading(false);
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
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
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (text) => moment(text).format('YYYY-MM-DD'),

        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (text) => moment(text).format('YYYY-MM-DD'),

        },
        {
            title: 'Tên giáo viên',
            dataIndex: 'teacher_username',
            key: 'teacher_username',
        },
        {
            title: 'Số điện thoại GV',
            dataIndex: 'teacher_phone',
            key: 'teacher_phone',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'File đính kèm',
            dataIndex: 'file_url',
            key: 'file_url',
            render: (attachment) => (
                <a href={attachment} target="_blank" rel="noopener noreferrer">
                    {"Xem file"}
                </a>
            ),
        },
        {
            title: 'Giá trị',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => {
                // Định dạng số theo format tiền Việt Nam
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
                        {getItemFromLocalStorage("user").role == "isAdmin" ? (
                            <>
                                <Button
                                    size="small"
                                    icon={<EditOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                    onClick={() => handleEditCategory(record.id)}
                                >
                                    {"Chỉnh sửa"}
                                </Button>
                                <div style={{ marginLeft: 10 }}>
                                    <Popconfirm
                                        title="Bạn có chắc chắn xóa lớp này?"
                                        onConfirm={() => handleDeleteCategory(record.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            style={{ width: 150, borderRadius: 15, height: 30 }}
                                        >
                                            {"Xóa"}
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </>
                        ) : getItemFromLocalStorage("user").role == "isTeacher" ? (
                            <>
                                <Button
                                    size="small"
                                    icon={<FormOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                    onClick={() => handleJoinTeacherClass(record.id)}
                                    disabled={record.teacher_id === getItemFromLocalStorage("user").id} // Kiểm tra nếu id bằng với teacher_id thì disable nút
                                >
                                    {"Tham gia lớp"}
                                </Button>
                                <Button
                                    size="small"
                                    icon={<EyeOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30, marginLeft: 10 }}
                                    onClick={() => handleViewClass(record.id)}
                                >
                                    {"Xem"}
                                </Button>
                            </>
                        ) : <>

                            <Button
                                size="small"
                                icon={<EyeOutlined />}
                                style={{ width: 150, borderRadius: 15, height: 30, marginLeft: 10 }}
                                onClick={() => handleViewClass(record.id)}
                            >
                                {"Xem"}
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
                console.log('Failed to fetch category list:' + error);
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
                                <span>Quản lý lớp</span>
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
                                                {getItemFromLocalStorage("user").role == "isAdmin" ? <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tạo lớp</Button> : null}
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
                    title="Tạo lớp mới"
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
                    okText="Hoàn thành"
                    cancelText="Hủy"
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
                                label="Tiêu đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tiêu đề!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tiêu đề" />
                            </Form.Item>
                            <Form.Item
                                name="start_date"
                                label="Ngày bắt đầu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập ngày bắt đầu!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày bắt đầu" />
                            </Form.Item>
                            <Form.Item
                                name="end_date"
                                label="Ngày kết thúc"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập ngày kết thúc!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày kết thúc" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <TextArea placeholder="Mô tả" autoSize={{ minRows: 6, maxRows: 10 }} />
                            </Form.Item>
                            <Form.Item
                                name="value"
                                label="Giá trị"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá trị!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Giá trị"
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} // Use dot as a thousand separator
                                    parser={(value) => value.replace(/\./g, '')} // Remove dots for parsing
                                />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Đính kèm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng đính kèm!',
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
                    title="Chỉnh sửa lớp"
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
                    okText="Hoàn thành"
                    cancelText="Hủy"
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
                                label="Tiêu đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tiêu đề!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tiêu đề" />
                            </Form.Item>
                            <Form.Item
                                name="start_date"
                                label="Ngày bắt đầu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập ngày bắt đầu!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày bắt đầu" />
                            </Form.Item>
                            <Form.Item
                                name="end_date"
                                label="Ngày kết thúc"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập ngày kết thúc!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày kết thúc" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <TextArea placeholder="Mô tả" autoSize={{ minRows: 6, maxRows: 10 }} />
                            </Form.Item>
                            <Form.Item
                                name="value"
                                label="Giá trị"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá trị!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Giá trị"
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} // Use dot as a thousand separator
                                    parser={(value) => value.replace(/\./g, '')} // Remove dots for parsing
                                />
                            </Form.Item>
                            <Form.Item
                                name="image"
                                label="Đính kèm"
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