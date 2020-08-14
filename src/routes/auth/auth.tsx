import * as React from "react";
import styled from "styled-components";
import { setList, setCurrentShowing } from "../../modules/counter";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { useEffect } from "react";

const { Title, Paragraph , Link } = Typography;

const FullBtn = styled(Button)`
  width: 100%;
`;
const TermsLink = styled(Link)`
  margin-left:5px;
`;

// tslint:disable-next-line: typedef
function Auth(props) {
  useEffect(() => {
    message.info("Please login to continue");
  // tslint:disable-next-line: align
  }, []);

  const onFinish = values => {
    // tslint:disable-next-line: no-console
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    // tslint:disable-next-line: no-console
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="layout">
      <Row>
        <Col span={2} md={8}/>     
        <Col span={20} md={8}>
          <Title>Welcome back</Title>
        <p 
          onClick={() => {
              props.changePage("/");
          }}
        >
          home
        </p>
        <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Organisation ID"
            name="id"
            rules={[{ required: true, message: "Enter your Organisation ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <FullBtn type="primary" htmlType="submit">
              Submit
            </FullBtn>
          </Form.Item>
        </Form>
        <Paragraph>
            By logging in you are accepting our terms and conditions and privacy policy.You can read
            those  
             <TermsLink href="https://ant.design" target="_blank">
                here
             </TermsLink>
        </Paragraph>
        </Col>
        <Col span={2} md={8}/>    
      </Row>
    </div>
  );
}

const mapStateToProps = ({ counter }) => ({
  places: counter.placeList,
  isLoading: counter.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
      setList,
      setCurrentShowing
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((Auth));