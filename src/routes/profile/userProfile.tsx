import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Card,
  Skeleton,
  Input,
  Button,
  message,
  Alert,
  Form,
  Descriptions,
} from "antd";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import { useState, useEffect, Fragment } from "react";
import { Organisation } from "../../domain/interfaces";
import { makeGet, makePostWithAuth } from "../../api/apiRequest";
import {
  UserOutlined,
  FacebookOutlined,
  TwitterOutlined,
  ChromeOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import styled from "styled-components";

const basicOrg: Organisation = {
  facebook: "",
  twitter: "",
  website: "",
  contactNumber: "",
  address: "",
  location: "",
  name: "",
  bedsAvailable: 0,
  postCode: 0,
};
const { Title } = Typography;

const StyledCard = styled(Card)`
  margin-top: 25px;
`;

const StyledTitle = styled(Title)`
  margin-top: 25px;
`;

function UserProfile(props: {
  userProfile: { user: { email: string }; userId: string };
}) {
  const email = props.userProfile.user.email;
  const id = props.userProfile.userId;
  const [profile, setProfile] = useState<Organisation | null>(null);
  const [orgRegistered, setOrgRegistered] = useState<boolean>(true);
  const [form] = Form.useForm();
  const [formLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const response = await makeGet(`organisations/${id}`);

        if (!response.created) {
          setOrgRegistered(false);
          setProfile(basicOrg);
        } else {
          setProfile(response.found[0]);
        }
      } catch (error) {
        message.error("Something went wrong , try again");
        setProfile(basicOrg);
      }
    }

    fetchMyAPI();
  }, []);

  const setFormVal = (val: string): string => {
    return val ? val : "";
  };

  const onFinish = async (values: {
    address: string;
    location: string;
    number: string;
    facebook: string;
    twitter: string;
    website: string;
    name: string;
    bedsAvailable: number;
    postCode: number;
  }) => {
    const dataPost: Organisation = {
      address: setFormVal(values.address),
      location: setFormVal(values.location),
      contactNumber: setFormVal(values.number),
      facebook: setFormVal(values.facebook),
      twitter: setFormVal(values.twitter),
      website: setFormVal(values.website),
      name: setFormVal(values.name),
      bedsAvailable: values.bedsAvailable,
      userId: id,
      postCode: values.postCode,
    };

    try {
      setLoading(true);
      const url = orgRegistered
        ? `organisations/${profile?._id}`
        : "organisations";
      const response = await makePostWithAuth(url, dataPost, orgRegistered);
      setLoading(false);
      setProfile(response);
      message.success("Sucessfully updated");
    } catch (e) {
      message.error("Invalid details, try again");
      setLoading(false);
    }
  };

  const getFieldPrefix = (val: string): React.ReactNode => {
    return (
      <CheckCircleTwoTone
        twoToneColor={val && val !== "" ? "#52c41a" : "#f5f5f5"}
      />
    );
  };

  return (
    <IsAuthenticated>
      <div className="layout">
        <Row>
          <Col span={2} lg={6} />
          <Col span={20} lg={12}>
            <Title>Profile</Title>
            {!orgRegistered ? (
              <Alert
                message="Please register your organisation"
                type="warning"
              />
            ) : null}
            <Fragment>
              {profile === null ? (
                <Skeleton active={true} />
              ) : (
                <Fragment>
                  <Card size="small">
                    <Descriptions title="User Info">
                      <Descriptions.Item label="UserName">
                        {profile.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Telephone">
                        {profile.contactNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="fb">
                        {profile?.facebook !== "" ? <FacebookOutlined /> : "NA"}{" "}
                      </Descriptions.Item>
                      <Descriptions.Item label="Twitter">
                        {profile?.twitter !== "" ? <TwitterOutlined /> : "NA"}{" "}
                      </Descriptions.Item>
                      <Descriptions.Item label="Web">
                        {profile?.website !== "" ? <ChromeOutlined /> : "NA"}{" "}
                      </Descriptions.Item>
                      <Descriptions.Item label="Beds">
                        {profile?.bedsAvailable > 0 ? (
                          <ChromeOutlined />
                        ) : (
                          "No beds"
                        )}{" "}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                  <div style={{ marginTop: "50px" }}>
                    <Title>Beds</Title>
                    <Card size="small">
                      <Row>
                        <Title level={4}>
                          {`You have ${profile.bedsAvailable} ${
                            profile.bedsAvailable === 1 ? "bed" : "beds"
                          } available`}
                        </Title>
                      </Row>
                    </Card>
                  </div>
                  <StyledTitle>Info</StyledTitle>
                  <StyledCard size="small">
                    <Form
                      initialValues={{
                        name: profile.name,
                        number: profile.contactNumber,
                        location: profile.location,
                        address: profile.address,
                        website: profile.website,
                        facebook: profile.facebook,
                        twitter: profile.twitter,
                        bedsAvailable: profile.bedsAvailable,
                        postCode: profile.postCode,
                      }}
                      layout="vertical"
                      form={form}
                      onFinish={onFinish}
                    >
                      <Form.Item label="Username">
                        <Input
                          prefix={<UserOutlined />}
                          value={email}
                          disabled={true}
                        />
                      </Form.Item>
                      <Form.Item label="Org name" name="name">
                        <Input
                          prefix={getFieldPrefix(profile.name)}
                          placeholder={profile.name}
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item label="Contact No" name="number">
                        <Input
                          prefix={getFieldPrefix(profile.contactNumber)}
                          value={profile.contactNumber}
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item label="Location" name="location">
                        <Input
                          prefix={getFieldPrefix(profile.location)}
                          value={profile.location}
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item label="Address" name="address">
                        <Input
                          prefix={getFieldPrefix(profile.address)}
                          value={profile.address}
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item label="Postcode" name="postCode">
                        <Input
                          min={0}
                          type="number"
                          value={profile.postCode}
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item label="Website" name="website">
                        <Input
                          prefix={getFieldPrefix(profile.website)}
                          value={profile.website}
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item label="Facebook" name="facebook">
                        <Input
                          prefix={getFieldPrefix(profile.facebook)}
                          value={profile.facebook}
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item label="Twitter" name="twitter">
                        <Input
                          prefix={getFieldPrefix(profile.twitter)}
                          value={profile.twitter}
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item label="Beds" name="bedsAvailable">
                        <Input
                          min={0}
                          value={profile.bedsAvailable}
                          type="number"
                          disabled={formLoading}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size="large"
                          disabled={formLoading}
                          type="primary"
                          htmlType="submit"
                        >
                          Update
                        </Button>
                      </Form.Item>
                    </Form>
                  </StyledCard>
                </Fragment>
              )}
            </Fragment>
          </Col>
          <Col span={2} lg={4} />
        </Row>
      </div>
    </IsAuthenticated>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
