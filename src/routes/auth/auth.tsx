import * as React from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  message,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import { makePost } from "../../api/apiRequest";
import { deleteSession, setCookie } from "../../services/cookie";

const { Title, Paragraph } = Typography;

const FullBtn = styled(Button)`
  width: 100%;
`;

const SwitchLink = styled(Button)`
  padding: 0px;
  font-weight: bold;
`;

function Auth(props: {
  userProfile: { user: { email: string } };
  changePage: (arg0: string) => void;
}) {
  const loggedIn = false;
  const [hasAccount, setHasAccount] = useState(true);
  const [formLoading, setLoading] = useState(false);

  useEffect(() => {
    deleteSession();
    if (!loggedIn) {
      message.info("Please login or register to continue");
    }
  }, []);

  const onFinish = async (values: { id: string; password: string }) => {
    setLoading(true);

    const dataPost = {
      email: values.id,
      password: values.password,
    };

    try {
      const response = await makePost(
        hasAccount ? "login" : "register",
        dataPost
      );
      if (response.errors) {
        message.error("Invalid details, try again");
        setLoading(false);
      } else {
        setCookie("token", response.token);
        props.changePage("/dashboard");
      }
    } catch (e) {
      message.error("Invalid details, try again");
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Row>
        <Col span={2} lg={8} />
        <Col span={20} lg={8}>
          <Title>{hasAccount ? "Welcome back" : "Register now"}</Title>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="id"
              data-cy="email-enter"
              rules={[{ required: true, message: "Enter your email address" }]}
            >
              <Input disabled={formLoading} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              data-cy="password-enter"
              rules={[{ required: true, message: "Enter your password" }]}
            >
              <Input.Password disabled={formLoading} />
            </Form.Item>
            <Form.Item>
              <FullBtn
                data-cy="submit"
                size="large"
                type="primary"
                htmlType="submit"
                loading={formLoading}
              >
                {hasAccount ? "Login" : "Register"}
              </FullBtn>
            </Form.Item>
            <SwitchLink
              data-cy="switch-link"
              type="link"
              size="large"
              onClick={() => {
                setHasAccount(!hasAccount);
              }}
            >
              {hasAccount
                ? "New to the site? Register now"
                : "Have an account? Login now"}
            </SwitchLink>
          </Form>
          <Divider>Our terms</Divider>
          <Paragraph>
            By logging in you are accepting our terms and conditions and privacy
            policy. You can read those &nbsp;
            <SwitchLink
              type="link"
              onClick={() => {
                props.changePage("/privacy-policy");
              }}
            >
              here
            </SwitchLink>
          </Paragraph>
        </Col>

        <Col span={2} lg={8} />
      </Row>
    </div>
  );
}

const mapStateToProps = ({ safehub }) => ({
  userProfile: safehub.userProfile,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePage: (value) => push(value),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
