import {
    ContactsTwoTone,
    DashboardOutlined,
    EnvironmentTwoTone,
    HomeOutlined,
    NotificationTwoTone
} from '@ant-design/icons';
import {
    BackTop,
    Breadcrumb,
    Card,
    Col,
    Row,
    Spin
} from 'antd';
import React, { useEffect, useState } from 'react';
import dashBoardApi from "../../apis/dashBoardApi";
import userApi from "../../apis/userApi";

import "./dashBoard.css";


const DashBoard = () => {
    const [statisticList, setStatisticList] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    const countUsersByRole = (userList) => {
        const counts = {
          students: 0,
          teachers: 0
        };
      
        userList.forEach(user => {
          if (user.role === 'isStudent') {
            counts.students++;
          } else if (user.role === 'isTeacher') {
            counts.teachers++;
          }
        });
      
        return counts;
      };

    useEffect(() => {
        (async () => {
            try {
                await dashBoardApi.getAssetStatistics().then((res) => {
                    console.log(res);
                    setStatisticList(res);
                });

                await userApi.listUserByAdmin().then((res) => {
                    console.log(res);
                    const { students, teachers } = countUsersByRole(res.data);
                    setStudents(students);
                    setTeachers(teachers);
                });
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={false}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <DashboardOutlined />
                                <span>DashBoard</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row gutter={12} style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{statisticList?.userCount}</div>
                                        <div className='title_total'>Số thành viên</div>
                                    </div>
                                    <div>
                                        <ContactsTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{teachers ? teachers : 0}</div>
                                        <div className='title_total'>Số giáo viên</div>
                                    </div>
                                    <div>
                                        <NotificationTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{students ? students : 0}</div>
                                        <div className='title_total'>Số sinh viên</div>
                                    </div>
                                    <div>
                                        <EnvironmentTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default DashBoard;