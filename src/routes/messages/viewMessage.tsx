import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography, Comment, Avatar, Button, Input, Form, message } from "antd";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import styled from "styled-components";
import { getTimeFrameFromNow } from "../../services/date";
import { UserOutlined } from "@ant-design/icons";
import { CommentReply } from "../../domain/interfaces";
import { useState } from "react";
import { makeGet, makePostWithAuth } from "../../api/apiRequest";
import { setViewedMsg } from "../../modules/counter";

const { Title , Paragraph } = Typography;
const { TextArea } = Input;

const StyledInfo = styled.span`
  font-weight:bold;

  span{
    font-weight: normal;
    font-size: 12px;
  }
`;

const StyledTextArea = styled(TextArea)`
    resize: none;
`;

// tslint:disable-next-line: typedef
function ViewMessage(props) {
    const [replyComment, setComment] = useState<string>("");
    const email = props.userProfile && props.userProfile.user ? props.userProfile.user.email : "";
    // tslint:disable-next-line: no-console
    console.log(props);

    const getUpdatedMessage = async () => {

        try {
            const response = await makeGet(`messages/${props.message._id}`);
            // tslint:disable-next-line: no-console
            console.log(response);

            props.setViewedMsg(response);
        } catch (error) {
            message.error("Something went wrong");
        }
    };

    const submitComment = async () => {

        if (replyComment === "") {
            message.error("Please enter a comment");
            return;
        }

        let newReplies = props.message.replies;
        newReplies.push({"reply": replyComment , "username" : props.userProfile.user.email});

        const newReply = {
             title: props.message.title,
             comment: props.message.comment,
             replies: newReplies,
         };

        try {
             const response = await makePostWithAuth(`messages/${props.message._id}`, newReply, true);
             // tslint:disable-next-line: no-console
             console.log(response);
             getUpdatedMessage();
             setComment("");
             message.success("Comment posted!");
         } catch (error) {
             setComment("");
             message.error("Something went wrong");
         }
    };

    const setVal = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setComment(e.target.value);
    };

    return (
    <IsAuthenticated>
        <div className="layout">
        <Row>
            <Col span={2} lg={6}/>     
            <Col span={20} lg={12}>
            <Title>{props.message.title}</Title>
            <StyledInfo>
                {getTimeFrameFromNow(props.message.Created_date)}
            </StyledInfo>
            <Paragraph>
                {props.message.comment}
            </Paragraph>
            {props.message.replies.map((comment: CommentReply) => {
                return (
                   <Comment
                        key={`${comment._id}`}
                        author={comment.username === email ? "You" : comment.username}
                        avatar={<Avatar style={{backgroundColor: "f56a00" }} icon={<UserOutlined />} />}
                        content={comment.reply}
                        datetime={getTimeFrameFromNow(comment.Created_date)}
                   />
                );
            })}
              <Form.Item>
              <Title level={4}>Leave a comment</Title>
                <StyledTextArea 
                    rows={4} 
                    value={replyComment} 
                    onChange={setVal} 
                />
                </Form.Item>
                <Form.Item>
                <Button htmlType="submit" loading={false} onClick={submitComment} type="primary">
                    Add Comment
                </Button>
              </Form.Item>
            </Col>
            <Col span={2} lg={6}/>    
        </Row>
        </div>
    </IsAuthenticated>
    );
}

const mapStateToProps = ({ counter }) => ({
  message: counter.message,
  userProfile: counter.userProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
      setViewedMsg
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((ViewMessage));