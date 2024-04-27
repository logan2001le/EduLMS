import {
    HomeOutlined,
    PlusOutlined,
    ShoppingOutlined,
    FormOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop, Breadcrumb,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Row,
    Typography,
    Space,
    Spin,
    notification,
    Table,
    Modal,
    Input,
    Rate
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import contractManagementApi from "../../../apis/contractManagementApi";
import { getItemFromLocalStorage } from '../../../apis/storageService';
import "./detailsClass.css";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const DetailsClass = () => {

    const [category, setCategory] = useState([]);
    const [student, setStudent] = useState([]);

    const [loading, setLoading] = useState(true);
    let { id } = useParams();

    const handleJoinStudentClass = async () => {
        console.log(id);
        const teacherId = getItemFromLocalStorage("user").id;
        try {
            // Perform addTeacherToContract API call with contractId
            const response = await contractManagementApi.addStudentToContract(id, teacherId);
            if (response.message == "Student added to contract successfully") {
                return notification["success"]({
                    message: `Notification`,
                    description:
                        'Joined class successfully!',

                });
            }

            if (response.message == "Sinh viên đã tồn tại trong lớp") {
                return notification["success"]({
                    message: `Notification`,
                    description:
                        'You have already joined this class!',

                });
            }
            // Handle response if needed
            console.log(response.data.message);
            handleCategoryList();
        } catch (error) {
            // Handle error
            console.error('Failed to join class:', error);
        }
    }

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

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    const handleGetReviews = async () => {
        try {
            const response = await contractManagementApi.getReviews(id);
            setReviews(response.reviews);
            setLoadingReviews(false);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await contractManagementApi.getDetailContract(id).then((res) => {
                    console.log(res);
                    setCategory(res.data);
                    setLoading(false);
                });

                await contractManagementApi.getAllStudentsInContract(id).then((res) => {
                    console.log(res);
                    setStudent(res.data);
                    setLoading(false);
                });

                handleGetReviews();

            } catch (error) {
                console.log('Failed to fetch category list:' + error);
            }
        })();
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
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
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
    ];

    const [visible, setVisible] = useState(false);
    const [form3] = Form.useForm();


    const showModal3 = () => {
        setVisible(true);
    };

    const handleCancel3 = () => {
        setVisible(false);
    };

    const onFinish = async (values) => {
        const studentId = getItemFromLocalStorage("user").id;
        try {
            const response = await contractManagementApi.addReview(id, { studentId, ...values });
            if (response) {
                notification["success"]({
                    message: `Notification`,
                    description: 'Review submitted successfully!'
                });
                form3.resetFields();
                setVisible(false);
                handleGetReviews();
            }
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    const columns3 = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Contract',
            dataIndex: 'contract_title',
            key: 'contract_title',
        },
        {
            title: 'Student',
            dataIndex: 'student_username',
            key: 'student_username',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
    ];


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

                    <div style={{ marginTop: 20, marginBottom: 20 }}>
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
                                                {getItemFromLocalStorage("user").role == "isStudent" ?
                                                    <Button onClick={handleJoinStudentClass} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Join class</Button> : null}

                                                {getItemFromLocalStorage("user").role == "isStudent" ?
                                                    <Button onClick={showModal3} icon={<FormOutlined />} style={{ marginLeft: 10 }} >Review</Button> : null}

                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>


                    <Modal
                        title="Class Review"
                        visible={visible}
                        onCancel={handleCancel3}
                        footer={null}
                    >
                        <Form form={form3} onFinish={onFinish} layout="vertical">
                            <Form.Item name="rating" label="Rating">
                                <Rate />
                            </Form.Item>
                            <Form.Item name="comment" label="Comment">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit Review</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Card title="Class Details">
                        <Title level={3}>{category.title}</Title>
                        <Paragraph>{category.description}</Paragraph>
                        <Divider />
                        <Paragraph><strong>Start Date:</strong> {category.start_date}</Paragraph>
                        <Paragraph><strong>End Date:</strong> {category.end_date}</Paragraph>
                        <Paragraph><strong>Value:</strong> {category.value}</Paragraph>
                        <Paragraph><strong>Status:</strong> {category.status}</Paragraph>
                        <Paragraph><strong>Created Date:</strong> {category.created_at}</Paragraph>
                        <Paragraph><strong>Updated Date:</strong> {category.updated_at}</Paragraph>
                        <Divider />
                        <a href={category.file_url} target="_blank" rel="noopener noreferrer">
                            View File
                        </a>
                    </Card>

                    <div>
                        <Title level={3}>Student List</Title>

                        <Table columns={columns} dataSource={student} />
                    </div>

                    <div>
                        <Title level={3}>Review List</Title>
                        <Table columns={columns3} dataSource={reviews} loading={loadingReviews} />
                    </div>
                </div>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default DetailsClass;