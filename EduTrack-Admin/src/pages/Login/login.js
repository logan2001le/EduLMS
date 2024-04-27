import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import userApi from "../../apis/userApi";
import backgroundLogin from "../../assets/image/login_background.png";
import "./login.css";

const Login = () => {
  const [isLogin, setLogin] = useState(true);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);
  const [forgotPasswordForm] = Form.useForm(); // Add this line

  let history = useHistory();

  const onFinish = (values) => {
    userApi
      .login(values.email, values.password)
      .then(function (response) {
        if (!response.status) {
          setLogin(false);
        } else {
          (async () => {
            try {
              console.log(response);
              if (response.user.status !== "noactive") {
                history.push("/contracts-management");
              } else {
                notification["error"]({
                  message: `Notification`,
                  description: "You are not authorized to access this system",
                });
              }
            } catch (error) {
              console.log("Failed to fetch ping role:" + error);
            }
          })();
        }
      })
      .catch((error) => {
        console.log("email or password error" + error);
      });
  };

  const showForgotPasswordModal = () => {
    setForgotPasswordModalVisible(true);
  };

  const handleForgotPasswordCancel = () => {
    setForgotPasswordModalVisible(false);
  };

  const handleForgotPasswordSubmit = async () => {
    const values = await forgotPasswordForm.validateFields();
    console.log(values.email);

    try {
      const data = {
        email: values.email,
      };
      await userApi.forgotPassword(data);
      notification.success({
        message: "Message",
        description: "Reset Password Link sent via email",
      });
      setForgotPasswordModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error when sending link reset password via email",
      });
      console.error("Forgot password error:", error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="imageBackground">
      <div id="formContainer">
        <div id="form-Login">
          <div className="formContentLeft">
            <img className="formImg" src={backgroundLogin} alt="spaceship" />
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
              <Divider
                style={{ marginBottom: 5, fontSize: 19 }}
                orientation="center"
              >
                WELCOME TO THE EDUTRACK SYSTEM
              </Divider>
            </Form.Item>
            <Form.Item style={{ marginBottom: 16, textAlign: "center" }}>
              <p className="text"></p>
            </Form.Item>
            <>
              {isLogin === false ? (
                <Form.Item style={{ marginBottom: 16 }}>
                  <Alert
                    message="Incorrect email or password"
                    type="error"
                    showIcon
                  />
                </Form.Item>
              ) : (
                ""
              )}
            </>
            <Form.Item
              style={{ marginBottom: 20 }}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Invalid email!",
                },
              ]}
            >
              <Input
                style={{ height: 34, borderRadius: 5 }}
                prefix={<UserOutlined className="siteformitemicon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 8 }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="siteformitemicon" />}
                type="password"
                placeholder="Password"
                style={{ height: 34, borderRadius: 5 }}
              />
            </Form.Item>

            <Form.Item
              style={{ width: "100%", marginTop: 20, marginBottom: 5 }}
            >
              <Button className="button" type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <a
                onClick={showForgotPasswordModal}
                style={{ color: "black", textDecoration: "none" }}
                className="forgotPasswordLink"
              >
                Forgot password?
              </a>
            </Form.Item>
          </Form>
        </div>

        <Modal
          title="Forgot Password"
          visible={forgotPasswordModalVisible}
          onCancel={handleForgotPasswordCancel}
          footer={[
            <Button key="back" onClick={handleForgotPasswordCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleForgotPasswordSubmit}
            >
              Send password reset link
            </Button>,
          ]}
        >
          <Form
            name="forgot_password"
            onFinish={handleForgotPasswordSubmit}
            form={forgotPasswordForm}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Invalid email",
                },
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
