import {
    UserOutlined,
    DashboardOutlined,
    UsergroupAddOutlined,
    HomeOutlined,
    ContactsOutlined
  } from "@ant-design/icons";
  import { BackTop, Breadcrumb, Card, Col, Row, Spin } from "antd";
  import React, { useEffect, useState } from "react";
  import dashBoardApi from "../../apis/dashBoardApi";
  import userApi from "../../apis/userApi";
  import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
  
  import "./dashBoard.css";
  
  const DashBoard = () => {
    const [statisticList, setStatisticList] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
  
    const countUsersByRole = (userList) => {
      const counts = {
        students: 0,
        teachers: 0,
      };
  
      userList.forEach((user) => {
        if (user.role === "isStudent") {
          counts.students++;
        } else if (user.role === "isTeacher") {
          counts.teachers++;
        }
      });
  
      return counts;
    };
  
    useEffect(() => {
      // Fetch initial data
      fetchData();
  
      // Set up interval to update data every 5 minutes (for demonstration purposes)
      const interval = setInterval(fetchData, 5 * 60 * 1000);
  
      // Clean up interval on unmount
      return () => clearInterval(interval);
    }, []);
  
    const fetchData = async () => {
      try {
        const statisticRes = await dashBoardApi.getAssetStatistics();
        setStatisticList(statisticRes);
  
        const userRes = await userApi.listUserByAdmin();
        const { students, teachers } = countUsersByRole(userRes.data);
        setStudents(students);
        setTeachers(teachers);
  
        // Simulate user registrations data for the last 7 days
        const userRegistrationsData = Array.from({ length: 7 }, (_, index) => ({
          date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
          registrations: Math.floor(Math.random() * 100) // Random number of registrations
        }));
        setUserRegistrations(userRegistrationsData);
  
        // Simulate active users data
        const activeUsersData = Array.from({ length: 7 }, (_, index) => ({
          date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
          active: Math.floor(Math.random() * 50) // Random number of active users
        }));
        setActiveUsers(activeUsersData);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    };
  
    return (
      <div>
        <Spin spinning={false}>
          <div className="container">
            <div style={{ marginTop: 20 }}>
              <Breadcrumb>
                <Breadcrumb.Item href="">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <DashboardOutlined />
                  <span>Dashboard</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Row gutter={12} style={{ marginTop: 20 }}>
              <Col span={6}>
                <Card className="card_total" bordered={false}>
                  <div className="card_number">
                    <div>
                      <div className="number_total">
                        {statisticList?.userCount}
                      </div>
                      <div className="title_total">Total members</div>
                    </div>
                    <div>
                      <UsergroupAddOutlined style={{ fontSize: 48, color: '#1f3b48' }} />
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="card_total" bordered={false}>
                  <div className="card_number">
                    <div>
                      <div className="number_total">
                        {teachers ? teachers : 0}
                      </div>
                      <div className="title_total">Total teachers</div>
                    </div>
                    <div>
                      <ContactsOutlined style={{ fontSize: 48, color: '#1f3b48' }} />
                    </div>
                  </div>
                </Card>
              </Col>
  
              <Col span={6}>
                <Card className="card_total" bordered={false}>
                  <div className="card_number">
                    <div>
                      <div className="number_total">
                        {students ? students : 0}
                      </div>
                      <div className="title_total">Total students</div>
                    </div>
                    <div>
                      <UserOutlined style={{ fontSize: 48, color: '#1f3b48' }} />
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
  
            <Row gutter={12} style={{ marginTop: 20 }}>
              <Col span={12}>
                <Card title="User Distribution" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie dataKey="value" data={[{ name: 'Teachers', value: teachers }, { name: 'Students', value: students }]} fill="#1f3b48" label />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="User Registrations (Last 7 Days)" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userRegistrations}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="registrations" stroke="#1f3b48" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
  
            <Row gutter={12} style={{ marginTop: 20 }}>
              <Col span={12}>
                <Card title="Active Users (Last 7 Days)" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={activeUsers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="active" fill="#1f3b48" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="User Distribution (Bar Chart)" bordered={false}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[{ name: 'Teachers', value: teachers }, { name: 'Students', value: students }]}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#1f3b48" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </div>
          <BackTop style={{ textAlign: "right" }} />
        </Spin>
      </div>
    );
  };
  
  export default DashBoard;
  