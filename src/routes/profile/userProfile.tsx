import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {  Row, Col, Typography, Card, Skeleton, Input, Button, message, Alert , Form } from "antd";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import { useState, useEffect } from "react";
import { Organisation } from "../../domain/interfaces";
import { makeGet, makePostWithAuth } from "../../api/apiRequest";
import { UserOutlined, FacebookOutlined , TwitterOutlined, ChromeOutlined } from "@ant-design/icons";

const { Title } = Typography;

// tslint:disable-next-line: typedef
function UserProfile(props) {
    const email = props.userProfile.user.email;
    const id = props.userProfile.userId;
    const [profile, setProfile] = useState<Organisation|null>(null);
    const [orgRegistered, setOrgRegistered] = useState<boolean>(true);
    const [form] = Form.useForm();
    const [formLoading, setLoading] = useState(false);

    useEffect( () => {
      async function fetchMyAPI() {
        try {
          const response = await makeGet(`organisations/${id}`);
          if (!response.created) {
            setOrgRegistered(false);
          } else {
            // tslint:disable-next-line: no-console
            console.log(response.found[0]);
            setProfile(response.found[0]);
          }
        } catch (error) {
          message.error("Something went wrong , try again");
        }
      }
  
      fetchMyAPI();
    },         [] );

    const setFormVal = (val: string): string => {
      return val ? val : "";
    };

    const onFinish = async (values) => {
      const dataPost: Organisation = {
        address: setFormVal(values.address),
        location: setFormVal(values.location),
        contactNumber: setFormVal(values.number),
        facebook: setFormVal(values.facebook),
        twitter: setFormVal(values.twitter),
        website: setFormVal(values.twitter),
        name: setFormVal(values.name),
        userId: id
      };

      try {
        setLoading(true);
        const url = orgRegistered ? `organisations/${profile?._id}` : "organisations";
        const response = await makePostWithAuth(url, dataPost, orgRegistered);
        // tslint:disable-next-line: no-console
        console.log(response, "res");
        setLoading(false);
        message.success("Sucessfully updated");
        } catch (e) {
          message.error("Invalid details, try again");
          setLoading(false);
      }
    };

    return (
   <IsAuthenticated>
     <div className="layout">
      <Row>
        <Col span={2} lg={4}/>     
        <Col span={20} lg={16}>
        <Title>Profile</Title>
        {!orgRegistered ? <Alert message="Please register your organisation" type="warning" /> : null}
        <Card size="small">
        {profile === null ? 
        <Skeleton active={true} /> :
        <Form
          initialValues={{
            name: profile.name,
            number: profile.contactNumber,
            location: profile.location,
            address: profile.address,
            website: profile.website,
            facebook: profile.facebook,
            twitter: profile.twitter

          }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="Username">
          <Input prefix={<UserOutlined />} value={email} disabled={true} />
          </Form.Item>
          <Form.Item label="Org name" name="name">
          <Input placeholder={profile.name} disabled={formLoading} />
          </Form.Item>
          <Form.Item label="Contact No" name="number">
            <Input value={profile.contactNumber} disabled={formLoading} />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input value={profile.location} disabled={formLoading} />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input value={profile.address} disabled={formLoading} />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input prefix={<ChromeOutlined />} value={profile.website} disabled={formLoading} />
          </Form.Item>
          <Form.Item label="Facebook" name="facebook">
            <Input prefix={<FacebookOutlined />} value={profile.facebook} disabled={formLoading} />
          </Form.Item>
          <Form.Item label="Twitter" name="twitter">
            <Input prefix={<TwitterOutlined />} value={profile.twitter} disabled={formLoading} />
          </Form.Item>
          <Form.Item>
          <Button disabled={formLoading} type="primary" htmlType="submit">Update</Button>
          </Form.Item>
        </Form>
        }
        </Card>
        </Col>
        <Col span={2} lg={4}/> 
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
)((UserProfile));