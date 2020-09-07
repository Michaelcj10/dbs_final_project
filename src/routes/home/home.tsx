import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import { Row, Col, Typography, List, Avatar,  Divider, Skeleton , Button, Input, Pagination, message, Modal, Checkbox } from "antd";
import { UserOutlined, FlagOutlined, WarningOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import { makeGet, makeDelete, makePostWithAuth } from "../../api/apiRequest";
import { MessageItem } from "../../domain/interfaces";
import { getTimeFrameFromNow } from "../../services/date";
import { setViewedMsg } from "../../modules/counter";

const { Title } = Typography;
const { Search } = Input;

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
`;

const Flag = styled(FlagOutlined)`
  margin-left: 10px;
  color: #1890ff;
`;

enum MessageActionState {
  Flagging, Deleting, Unflagging
}

// tslint:disable-next-line: typedef
function Home(props) {
  const [messages, setMessages] = useState<MessageItem[]|null>(null);
  const [filter, setFilter] = useState<string>("");
  const colorAvatarPallete = ["#1de9b6", "#1890ff"];
  const email = props.userProfile && props.userProfile.user ? props.userProfile.user.email : "";
  const [skipped, setSkipped] = useState<number>(0);
  const [actionInProgress, setInProgress] = useState<boolean>(false);
  const [showFlagged, setShowFlagged] = useState<boolean>(false);
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
      const response = await makePostWithAuth("notifications", dataPost);
      if (response.errors) {
        message.error("Invalid details, try again");    

      }
    } catch (e) {
      message.error("Invalid details, try again");
    }
  };

  const modalAction = async (): Promise<void> => {

    const id = messageToAction?._id;

    if (actionState === MessageActionState.Deleting) {
      try {
        const response = await makeDelete("messages", id!);
        // tslint:disable-next-line: no-console
        console.log(response);
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
                >Show Flagged
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
                        <Button 
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
                  delete</Button> : 
                      messageItem.status![0] === "Flagged" ? <WarningOutlined style={{color: "red"}} /> :
                        <Button
                          type="link"
                          key="list-flag"  
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionState(MessageActionState.Flagging);
                            setAction(messageItem!);
                            setInProgress(true);
                          }} 
                        >
                  flag  </Button> , <Button type="link" key="list-view">view</Button>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={{backgroundColor: i % 2 === 0 ? colorAvatarPallete[0] :  colorAvatarPallete[1]}} icon={<UserOutlined />} />}
                    title={<StyledSpanHeading>{messageItem.title} <span>{getTimeFrameFromNow(messageItem.Created_date!)}</span></StyledSpanHeading>}
                    description={messageItem.username === email ? "You" : messageItem.username}
                    
                  />
                  {messageItem.status![0] === "Flagged" || messageItem.username === email ? null :
                  <Flag 
                      onClick={(e) => {
                          e.stopPropagation();
                          setActionState(MessageActionState.Flagging);
                          setAction(messageItem!);
                          setInProgress(true);
                      }} 
                  /> }
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
              onCancel={() => {
                 setInProgress(false);
              }}
          >
              {actionState === MessageActionState.Deleting ? 
              <p>Are you sure you want to delete this post?</p> : 
              <p>Are you sure you want to flag this post?</p> } 
          </Modal>
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
      setViewedMsg
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((Home));