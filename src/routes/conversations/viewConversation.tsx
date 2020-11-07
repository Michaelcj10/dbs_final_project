import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Comment,
  Avatar,
  Button,
  Input,
  Form,
  message,
} from "antd";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import styled from "styled-components";
import { getTimeFrameFromNow } from "../../services/date";
import { UserOutlined, FrownOutlined } from "@ant-design/icons";
import { CommentReply } from "../../domain/interfaces";
import { useState } from "react";
import { makeGet, makePostWithAuth } from "../../api/apiRequest";
import { setViewedConversation } from "../../modules/safehub";
import Panel from "../../components/infoPanel/panel";

const { Title } = Typography;
const { TextArea } = Input;

const StyledInfo = styled.span`
  font-weight: bold;

  span {
    font-weight: normal;
    font-size: 12px;
  }
`;

const StyledTextArea = styled(TextArea)`
  resize: none;
`;

const StyledAlert = styled.div`
  margin-bottom: 25px;
`;

// tslint:disable-next-line: typedef
function ViewConversation(props) {
  const [replyComment, setComment] = useState<string>("");
  const email =
    props.userProfile && props.userProfile.user
      ? props.userProfile.user.email
      : "";
  const [showLearnMore, setShowLearnMore] = useState<boolean>(false);
  const [actionInProgress, setInProgress] = useState<boolean>(false);

  // tslint:disable-next-line: no-console
  console.log(props);

  const getUpdatedMessage = async () => {
    setInProgress(true);

    try {
      const response = await makeGet(
        `conversationsdetail/${props.conversation._id}`
      );
      props.setViewedConversation(response);
      setInProgress(false);
    } catch (error) {
      message.error("Something went wrong");
      setInProgress(false);
    }
  };

  const submitComment = async () => {
    if (replyComment === "") {
      message.error("Please enter a comment");
      return;
    }

    let newReplies = props.conversation.replies;
    newReplies.push({
      reply: replyComment,
      username: props.userProfile.user.email,
    });

    const newReply = {
      from: props.conversation.from,
      title: props.conversation.title,
      to: props.conversation.to,
      replies: newReplies,
    };

    try {
      setInProgress(true);
      await makePostWithAuth(
        `conversations/${props.conversation._id}`,
        newReply,
        true
      );
      getUpdatedMessage();
      setComment("");
      message.success("Comment posted!");
      setInProgress(false);
    } catch (error) {
      setComment("");
      message.error("Something went wrong");
      setInProgress(false);
    }
  };

  const setVal = (e: { target: { value: React.SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  return (
    <IsAuthenticated>
      <div className="layout">
        {props.conversation && props.conversation !== {} && (
          <Row>
            <Col span={2} lg={8} />
            <Col span={20} lg={10}>
              {props.conversation.status[0] === "Flagged" && (
                <StyledAlert>
                  <Panel
                    title=" Flagged message"
                    icon={<FrownOutlined style={{ marginRight: "10px" }} />}
                    linkTitle="Learn more"
                    onClick={() => {
                      setShowLearnMore(!showLearnMore);
                    }}
                  />
                </StyledAlert>
              )}

              <Title level={4}>{props.conversation.title}</Title>
              <StyledInfo>
                {getTimeFrameFromNow(props.conversation.Created_date)}
              </StyledInfo>

              {props.conversation.replies.map((comment: CommentReply) => {
                return (
                  <Comment
                    key={`${comment._id}`}
                    author={
                      comment.username === email ? "You" : comment.username
                    }
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            comment.username === email
                              ? "rgb(29, 233, 182)"
                              : "f56a00",
                        }}
                        icon={<UserOutlined />}
                      />
                    }
                    content={comment.reply}
                    datetime={getTimeFrameFromNow(comment.Created_date)}
                  />
                );
              })}
              <Form.Item>
                <Title level={4}>Reply</Title>
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
            <Col span={2} lg={8} />
          </Row>
        )}
      </div>
    </IsAuthenticated>
  );
}

const mapStateToProps = ({ safehub }) => ({
  conversation: safehub.viewedConversation,
  userProfile: safehub.userProfile,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePage: (value) => push(value),
      setViewedConversation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewConversation);
