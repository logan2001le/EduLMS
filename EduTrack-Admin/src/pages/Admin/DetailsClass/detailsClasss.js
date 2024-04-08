import {
    HomeOutlined,
    PlusOutlined,
    ShoppingOutlined
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
    Table
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import contractManagementApi from "../../../apis/contractManagementApi";
import { getItemFromLocalStorage } from '../../../apis/storageService';
import "./detailsClass.css";

const { Title, Paragraph } = Typography;

const DetailsClass = () => {

    const [category, setCategory] = useState([]);
    const [student, setStudent] = useState([]);

    const [loading, setLoading] = useState(true);
    let { id } = useParams();

    const handleJoinStudentClass = async () => {
        console.log(id);
        const teacherId = getItemFromLocalStorage("user").id;
        try {
            // Thực hiện gọi API addTeacherToContract với contractId
            const response = await contractManagementApi.addStudentToContract(id, teacherId);
            if (response.message == "Student added to contract successfully") {
               return notification["success"]({
                    message: `Thông báo`,
                    description:
                        'Tham gia lớp thành công!',

                });
            }

            if (response.message == "Sinh viên đã tồn tại trong lớp") {
               return notification["success"]({
                    message: `Thông báo`,
                    description:
                        'Bạn đã tham gia lớp này!',

                });
            }
            // Xử lý kết quả trả về nếu cần
            console.log(response.data.message);
            handleCategoryList();
        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.error('Đã xảy ra lỗi khi tham gia lớp:', error);
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
                                                {getItemFromLocalStorage("user").role == "isStudent" ? <Button onClick={handleJoinStudentClass} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tham gia lớp</Button> : null}
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>

                    <Card title="Chi tiết lớp">
                        <Title level={3}>{category.title}</Title>
                        <Paragraph>{category.description}</Paragraph>
                        <Divider />
                        <Paragraph><strong>Ngày bắt đầu:</strong> {category.start_date}</Paragraph>
                        <Paragraph><strong>Ngày kết thúc:</strong> {category.end_date}</Paragraph>
                        <Paragraph><strong>Giá trị:</strong> {category.value}</Paragraph>
                        <Paragraph><strong>Trạng thái:</strong> {category.status}</Paragraph>
                        <Paragraph><strong>Ngày tạo:</strong> {category.created_at}</Paragraph>
                        <Paragraph><strong>Ngày cập nhật:</strong> {category.updated_at}</Paragraph>
                        <Divider />
                        <a href={category.file_url} target="_blank" rel="noopener noreferrer">
                            Xem file
                        </a>
                    </Card>

                    <div>
                    <Title level={3}>Danh sách sinh viên</Title>

                        <Table columns={columns} dataSource={student} />
                    </div>
                </div>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default DetailsClass;