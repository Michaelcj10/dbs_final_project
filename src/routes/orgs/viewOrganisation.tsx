import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Descriptions,
  Input,
  Form,
  Button,
  message,
} from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  ChromeOutlined,
} from "@ant-design/icons";
import placeholder from "../../images/placeholder.png";
import { Organisation } from "../../domain/interfaces";
import styled from "styled-components";
import { useState } from "react";
import { makePostWithAuth } from "../../api/apiRequest";

const { Title } = Typography;
const { TextArea } = Input;

const Img = styled.img`
  width: 100px;
  margin-bottom: 25px;
`;

const StyledTextArea = styled(TextArea)`
  resize: none;
`;

const CommentTitle = styled(Title)`
  margin-top: 50px;
`;

const SwitchLink = styled.a`
  padding: 0px;
  font-weight: bold;
`;

function ViewOrganisation(props: {
  viewedOrganisation: Organisation;
  userProfile: { user: { email: string } };
}) {
  const [replyComment, setComment] = useState<string>("");
  const org: Organisation = props.viewedOrganisation;
  const [actionInProgress, setInProgress] = useState<boolean>(false);
  const email =
    props.userProfile && props.userProfile.user
      ? props.userProfile.user.email
      : "";

  const setVal = (e: { target: { value: React.SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  const setAsNotification = async (user: string, msg: string) => {
    const dataPost = {
      comment: msg,
      username: user,
    };

    try {
      await makePostWithAuth("notifications", dataPost);
    } catch (e) {
      message.error("Invalid details, try again");
    }
  };

  const submitComment = async () => {
    if (replyComment === "") {
      message.error("Please enter a comment");
      return;
    }

    const newReply = {
      from: email,
      title: `Message from ${props.userProfile.user.email}`,
      to: org.email,
      replies: [
        {
          reply: replyComment,
          username: email,
        },
      ],
    };

    try {
      setInProgress(true);
      await makePostWithAuth(`conversations`, newReply, false);
      setComment("");
      setAsNotification(org.email, `${email} has sent you a message`);
      message.success("Comment posted!");
      setInProgress(false);
    } catch (error) {
      setComment("");
      message.error("Something went wrong");
      setInProgress(false);
    }
  };

  return (
    <div className="layout">
      <Row>
        <Col span={2} lg={6} />
        <Col span={20} lg={12}>
          <Title>{org.name}</Title>
          <Img src={placeholder} alt="placeholder" />
          <Descriptions title="Organisation Info">
            <Descriptions.Item label="Telephone">
              {org.contactNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{org.email}</Descriptions.Item>
            <Descriptions.Item label="FB">
              <FacebookOutlined
                onClick={() => {
                  window.location.href = org.facebook;
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Twitter">
              <TwitterOutlined
                onClick={() => {
                  window.location.href = org.twitter;
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Web">
              <ChromeOutlined
                onClick={() => {
                  window.location.href = org.website;
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Address">{org.address}</Descriptions.Item>
            <Descriptions.Item label="Location">
              {org.location}
            </Descriptions.Item>
          </Descriptions>
          <SwitchLink href={`tel:${org.contactNumber}`}>Call now</SwitchLink>
          <Form.Item>
            <CommentTitle level={4}>
              {`Send ${org.name} a message`}
            </CommentTitle>
            <StyledTextArea
              disabled={actionInProgress}
              rows={4}
              value={replyComment}
              onChange={setVal}
            />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              htmlType="submit"
              loading={actionInProgress}
              onClick={submitComment}
              type="primary"
            >
              Add Comment
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = ({ safehub }) => ({
  userProfile: safehub.userProfile,
  viewedOrganisation: safehub.viewedOrganisation,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePage: (value) => push(value),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrganisation);
