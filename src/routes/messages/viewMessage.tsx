import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography, Comment, Avatar, Button, Input, Form, message, Modal } from "antd";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import styled from "styled-components";
import { getTimeFrameFromNow } from "../../services/date";
import { UserOutlined, FrownOutlined } from "@ant-design/icons";
import { CommentReply } from "../../domain/interfaces";
import { useState } from "react";
import { makeDelete, makeGet, makePostWithAuth } from "../../api/apiRequest";
import { setViewedMsg } from "../../modules/safehub";
import Panel from "../../components/infoPanel/panel";

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

const StyledAlert = styled.div`
    margin-bottom: 25px;
`;

// tslint:disable-next-line: typedef
function ViewMessage(props) {
    const [replyComment, setComment] = useState<string>("");
    const email = props.userProfile && props.userProfile.user ? props.userProfile.user.email : "";
    const [showLearnMore, setShowLearnMore] = useState<boolean>(false);
    const [actionInProgress, setInProgress] = useState<boolean>(false);

    const isYours = props.message.username === email;

    const getUpdatedMessage = async () => {

        setInProgress(true);

        try {
            const response = await makeGet(`messages/${props.message._id}`);
            // tslint:disable-next-line: no-console
            console.log(response);

            props.setViewedMsg(response);
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

        let newReplies = props.message.replies;
        newReplies.push({"reply": replyComment , "username" : props.userProfile.user.email});

        const newReply = {
             title: props.message.title,
             comment: props.message.comment,
             replies: newReplies,
         };

        try {
             setInProgress(true);
             await makePostWithAuth(`messages/${props.message._id}`, newReply, true);
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

    const setVal = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setComment(e.target.value);
    };

    const deleteMsg = async () => {
      try {
        setInProgress(true);
        await makeDelete("messages", props.message._id);
        message.success("Deleted");
        props.changePage("/dashboard");
        return;
        
      } catch (error) {
        message.error("Cannot delete, try again");
        setInProgress(false);
      }
    };

    return (
    <IsAuthenticated>
        <div className="layout">
        {props.message && props.message !== {} &&
        <Row>
            <Col span={2} lg={8}/>     
            <Col span={20} lg={10}>
            {props.message.status[0] === "Flagged" &&
            <StyledAlert>
            <Panel 
                  title=" Flagged message" 
                  icon={<FrownOutlined style={{marginRight: "10px"}} />}
                  linkTitle="Learn more" 
                  onClick={() => {
                    setShowLearnMore(!showLearnMore);
                  }}  
            />       
            </StyledAlert>}
       
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
                    disabled={actionInProgress}
                    rows={4} 
                    value={replyComment} 
                    onChange={setVal} 
                />
                </Form.Item>
                <Form.Item>
                <Button size="large" htmlType="submit" loading={actionInProgress} onClick={submitComment} type="primary">
                    Add Comment
                </Button>
              </Form.Item>
              <Form.Item>
                {isYours && 
                   <Button size="large" htmlType="submit" danger={true} loading={actionInProgress} onClick={deleteMsg} type="primary">
                       Delete
                   </Button>}
              </Form.Item>
            </Col>
            <Col span={2} lg={8}/>    
        </Row>}
        </div>
        <Modal
              title=""
              visible={showLearnMore}
              okText="Dashboard"
              onOk={() => {
                props.changePage("/profile");
             }}
              onCancel={() => {
                setShowLearnMore(false);
             }}
        >
              <Title level={4}>Why has this happened?</Title>
              <Paragraph>
                A message can be flagged if it contains info that can make a client identifiable.
                Such as a name, address, email or phone number of a client.
              </Paragraph>
              <Title level={4}>What happens now?</Title>
              <Paragraph>
                An admin is reviewing the message and will contact you if the message is removed from the website.
              </Paragraph>
        </Modal>
    </IsAuthenticated>
    );
}

const mapStateToProps = ({ safehub }) => ({
  message: safehub.message,
  userProfile: safehub.userProfile
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