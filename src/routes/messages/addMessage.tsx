import * as React from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { useState } from "react";
import { makePostWithAuth } from "../../api/apiRequest";
import IsAuthenticated from "../../components/authentication/isAuthenticated";

const { Title } = Typography;

const FullBtn = styled(Button)`
  width: 100%;
`;

function AddMessage(props: { userProfile: { user: { email: string; }; }; }) {

 const [form] = Form.useForm();
 const [formLoading, setLoading] = useState(false);

 const resetForm = (): void => {
  setLoading(false);
  form.resetFields();
 };

 const onFinish = async (values) => {
    const dataPost = {
      title: values.title,
      comment: values.comment,
      username: props.userProfile.user.email
    };
    setLoading(true);
    try {
      const response = await makePostWithAuth("messages", dataPost);
      // tslint:disable-next-line: no-console
      console.log(response);
      message.success("Message posted");
      resetForm();
    } catch (e) {
      message.error("Invalid , try again");
      resetForm();
    }
 };

 return (
   <IsAuthenticated>
     <div className="layout">
      <Row>
        <Col span={2} lg={8}/>     
        <Col span={20} lg={8}>
        <Title>Add new message</Title>
        <Form
            form={form}
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input
              disabled={formLoading} 
            />
          </Form.Item>
          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Please enter a comment" }]}
          >
            <Input
              disabled={formLoading} 
            />
          </Form.Item>
          <Form.Item>
            <FullBtn type="primary" htmlType="submit" loading={formLoading}>
                Add
            </FullBtn>
          </Form.Item>
        </Form>
        </Col>
        <Col span={2} lg={8}/>    
      </Row>
    </div>
   </IsAuthenticated>
  );
}

const mapStateToProps = ({ counter }) => ({
  userProfile: counter.userProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((AddMessage));