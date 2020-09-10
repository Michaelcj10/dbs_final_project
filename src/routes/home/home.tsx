import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import Panel from "../../components/infoPanel/panel";
import { Row, Col, Typography, List, Avatar,  Divider, Skeleton , Button, Input, Pagination, message, Modal, Checkbox, Timeline } from "antd";
import { UserOutlined, WarningOutlined, SmileOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import { makeGet, makeDelete, makePostWithAuth } from "../../api/apiRequest";
import { MessageItem } from "../../domain/interfaces";
import { getTimeFrameFromNow } from "../../services/date";
import { setViewedMsg } from "../../modules/safehub";
import logo from "../../images/logo.png";

const { Title, Paragraph } = Typography;
const { Search } = Input;

const Logo = styled.img`
  width: 70px;
  cursor:pointer;
  margin-bottom: 25px;
`;

const StyledSpanHeading = styled.span`
  font-weight:bold;

  span{
    font-weight: normal;
    font-size: 12px;
  }
`;

const AddButton = styled(Button)`
  margin-bottom: 25px;
  font-weight:bold;
`;

const SearchInput = styled(Search)`
  margin-bottom: 25px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SwitchLink = styled(Button)`
  padding: 0px;
  font-weight: bold;
`;

enum MessageActionState {
  Flagging, Deleting, Unflagging
}

function Home(props: { userProfile: { user: { email: string; }; }; changePage: (arg0: string) => void; setViewedMsg: (arg0: MessageItem) => void; }) {
  const [messages, setMessages] = useState<MessageItem[]|null>(null);
  const [filter, setFilter] = useState<string>("");
  const colorAvatarPallete = ["#1de9b6", "#1890ff"];
  const email = props.userProfile && props.userProfile.user ? props.userProfile.user.email : "";
  const [skipped, setSkipped] = useState<number>(0);
  const [actionInProgress, setInProgress] = useState<boolean>(false);
  const [showFlagged, setShowFlagged] = useState<boolean>(false);
  const [showLearnMore, setShowLearnMore] = useState<boolean>(false);
  const [messageToAction, setAction] = useState<MessageItem|null>(null);
  const [actionState, setActionState] = useState<MessageActionState|null>(null);

  const getMessages = async () => {
    try {
      const response = await makeGet("messages");
      setMessages(response.reverse());
    } catch (error) {
      setMessages([]);
    }
  };

  React.useEffect( () => {
    async function fetchMyAPI() {
        await getMessages();
    }

    fetchMyAPI();
  },               [] );

  const getFiltered = (): MessageItem[] => {
    const notFlagged = messages ? messages.filter(x => x.status![0] !== "Flagged") : [];
    const toShow = showFlagged ? messages : notFlagged;
    let filtered: MessageItem[] = toShow ? toShow?.slice(skipped, skipped + 10) : [];

    if (filter !== "") {

       if (filtered) {
          filtered = filtered!.filter(x => x.username.indexOf(filter) > -1);
       }

       return filtered;  
     }

    return filtered;
  };

  const setAsNotification = async (user: string, msg: string) => {
    const dataPost = {
      "notifications": [{"notification": msg, "userId": user}],
      "userId": user
    };

    try {
      await makePostWithAuth("notifications", dataPost);
    } catch (e) {
      message.error("Invalid details, try again");
    }
  };

  const modalAction = async (): Promise<void> => {

    const id = messageToAction?._id;

    if (actionState === MessageActionState.Deleting) {
      try {
        await makeDelete("messages", id!);
        getMessages();
        setInProgress(false);
        message.success("Deleted");
      } catch (error) {
        message.error("Something went wrong");
      }
    } else {

      const newReply = {
        title: messageToAction!.title,
        comment: messageToAction!.comment,
        replies: messageToAction!.replies,
        userName: messageToAction?.username,
        status: actionState === MessageActionState.Flagging ? ["Flagged"] : ["Ok"],
        Created_date: messageToAction?.Created_date
      };

      try {
            const response = await makePostWithAuth(`messages/${messageToAction!._id}`, newReply, true);
            // tslint:disable-next-line: no-console
            console.log(response);
            message.warning("Comment flagged!");
            getMessages();
            setInProgress(false);

            if (actionState === MessageActionState.Flagging) {
               setAsNotification(messageToAction?.username ? messageToAction.username : "" , "Message has been flagged");
            }

        } catch (error) {
            message.error("Something went wrong", error);
            getMessages();
            setInProgress(false);
        }
    }
  };

  return (
    <IsAuthenticated>
      <div className="layout">
        <Row>
          <Col span={2} lg={6}/>     
          <Col span={20} lg={12}>
            <Panel 
                  title=" Welcome to Safe Hub!" 
                  icon={<SmileOutlined style={{marginRight: "10px"}} />}
                  linkTitle="Learn more" 
                  onClick={() => {
                    setShowLearnMore(!showLearnMore);
                  }}  
            />
            <Title>Message center</Title>
            <Divider orientation="left" plain={true} >
              {!messages ? <Skeleton.Input style={{ width: 100, height: "10px"}} active={true} /> :             
              <div>
                {`Messages total (${getFiltered()?.length ? getFiltered().length : "0"})`}
              </div>}
            </Divider>
                <Flex>
                  {messages && messages!.length > 0 ?
                  <SearchInput
                    allowClear={true}
                    onChange={(e) => {
                      setFilter(e.currentTarget.value); 
                    }}
                    placeholder="Search username"
                    style={{ width: 200 }}
                  /> : null }
                  <AddButton 
                    size="large" 
                    onClick={() => {
                      props.changePage("/add-message");
                    }}
                  >
                    Add new
                  </AddButton>
                </Flex>
                <Flex>
                <Checkbox 
                      checked={showFlagged}
                      onChange={() => {
                        setShowFlagged(!showFlagged);
                      }}
                >Show Flagged (Hidden by default)
                </Checkbox>
                </Flex>
            {messages === null  ? <div> {[1, 2, 3, 4].map( (x, y) => {
                return <Skeleton key={y} loading={true} active={true} avatar={true} />;
            })} </div> : 
            <React.Fragment>
            <List
              itemLayout="horizontal"
              dataSource={getFiltered()}
              renderItem={(messageItem, i) => (
                <List.Item
                   style={{cursor: "pointer"}}
                   onClick={() => {
                     props.setViewedMsg(messageItem);
                     props.changePage("/view-message");
                   }}
                   actions={[
                        messageItem.username === email ? 
                        <SwitchLink 
                          type="link"
                          key="list-del"  
                          danger={true}
                          onClick={(e) => {
                          e.stopPropagation();
                          setActionState(MessageActionState.Deleting);
                          setAction(messageItem!);
                          setInProgress(true);
                          }} 
                        >
                     del</SwitchLink> : 
                      messageItem.status![0] === "Flagged" ? <WarningOutlined style={{color: "red"}} /> :
                        <SwitchLink
                          type="link"
                          key="list-flag"
                          danger={true}  
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionState(MessageActionState.Flagging);
                            setAction(messageItem!);
                            setInProgress(true);
                          }} 
                        >
                  flag  </SwitchLink> , <SwitchLink type="link" key="list-view">view</SwitchLink>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={{backgroundColor: i % 2 === 0 ? colorAvatarPallete[0] :  colorAvatarPallete[1]}} icon={<UserOutlined />} />}
                    title={<StyledSpanHeading>{`${messageItem.title} (${messageItem.replies.length} ${messageItem.replies.length === 1 ? "reply" : "replies"})`}</StyledSpanHeading>}
                    description={`${messageItem.username === email ? "You" : messageItem.username} ${getTimeFrameFromNow(messageItem.Created_date!)}`}
                  />
                </List.Item>
              )}
            />
            {messages.length > 10 ? 
           <Pagination 
                defaultCurrent={1}  
                total={messages!.length} 
                defaultPageSize={10} 
                onChange={(page: number) => {
                  setSkipped((page - 1) * 10 );
                }} 
           /> : null }
            </React.Fragment>
      
           }
          </Col>
          <Modal
              title={actionState === MessageActionState.Deleting ? "Delete Post" : "Flag pos"}
              visible={actionInProgress}
              onOk={modalAction}
              okText={actionState === MessageActionState.Deleting ? "Delete" : "Flag"}
              onCancel={() => {
                 setInProgress(false);
              }}
          >
              {actionState === MessageActionState.Deleting ? 
              <p>Are you sure you want to delete this post?</p> : 
              <p>Are you sure you want to flag this post?</p> } 
          </Modal>
          <Modal
              title=""
              visible={showLearnMore}
              okText="Profile"
              onOk={() => {
                props.changePage("/profile");
             }}
              onCancel={() => {
                setShowLearnMore(false);
             }}
          >
              <Logo src={logo} alt="logo" />
              <Title level={4}>Welcome to Safe Hub</Title>
              <Paragraph>
                Good to have you aboard. Here is some useful info to get you up and running.
              </Paragraph>
              <Timeline>
                <Timeline.Item>Fill in your profile</Timeline.Item>
                <Timeline.Item>Send some updates about your service to others</Timeline.Item>
                <Timeline.Item>Collaborate between organisations</Timeline.Item>
                <Timeline.Item>Make a difference!</Timeline.Item>
              </Timeline>
          </Modal>
        </Row>
      </div>
    </IsAuthenticated>
  );
}

const mapStateToProps = ({ safehub }) => ({
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
)((Home));