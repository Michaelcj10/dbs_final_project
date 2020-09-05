import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import { Row, Col, Typography, List, Avatar, Space, Divider, Skeleton , Button, Input, Pagination, message, Modal } from "antd";
import { UserOutlined, MessageOutlined, DeleteOutlined, FlagOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import { makeGet, makeDelete } from "../../api/apiRequest";
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

const Delete = styled(DeleteOutlined)`
  margin-left: 10px;
  color: #c73737;
`;

const Flag = styled(FlagOutlined)`
  margin-left: 10px;
  color: #1890ff;
`;

enum MessageActionState {
  Flagging, Deleting
}

// tslint:disable-next-line: typedef
function Home(props) {
  const [messages, setMessages] = useState<MessageItem[]|null>(null);
  const [filter, setFilter] = useState<string>("");
  const colorAvatarPallete = ["#1de9b6", "#1890ff", "#d9d9d9"];
  const email = props.userProfile && props.userProfile.user ? props.userProfile.user.email : "";
  const [skipped, setSkipped] = useState<number>(0);
  const [actionInProgress, setInProgress] = useState<boolean>(false);
  const [idToDelete, setAction] = useState<string>("");
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

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const getFiltered = (): MessageItem[] => {
    let filtered: MessageItem[] = messages ? messages?.slice(skipped, skipped + 10) : [];

    if (filter !== "") {

       if (filtered) {
          filtered = filtered!.filter(x => x.username.indexOf(filter) > -1);
       }

       return filtered;  
     }

    return filtered;
  };

  const modalAction = async (): Promise<void> => {

    const id = idToDelete;

    if (actionState === MessageActionState.Deleting) {
      try {
        const response = await makeDelete("messages", id);
        // tslint:disable-next-line: no-console
        console.log(response);
        getMessages();
        setInProgress(false);
        message.success("Deleted");
      } catch (error) {
        message.error("Something went wrong");
      }
    } else { 
      // tslint:disable-next-line: no-console
      console.log("BLAH");
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
                {`Messages total (${messages?.length ? messages.length : "0"})`}
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
                  <IconText icon={MessageOutlined} text={messageItem.replies.length} key="list-vertical-message" />
                ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={{backgroundColor: i % 3 === 0 ? colorAvatarPallete[2] :  i % 2 === 0 ?  colorAvatarPallete[1] : colorAvatarPallete[0]}} icon={<UserOutlined />} />}
                    title={<StyledSpanHeading>{messageItem.title} <span>{getTimeFrameFromNow(messageItem.Created_date!)}</span></StyledSpanHeading>}
                    description={messageItem.username === email ? "You" : messageItem.username}
                    
                  />
                  {messageItem.comment}
                  {messageItem.username === email ? 
                  <Delete 
                      onClick={(e) => {
                          e.stopPropagation();
                          setActionState(MessageActionState.Deleting);
                          setAction(messageItem!._id!);
                          setInProgress(true);
                      }} 
                  /> : 
                  <Flag 
                      onClick={(e) => {
                          e.stopPropagation();
                          setActionState(MessageActionState.Flagging);
                          setAction(messageItem!._id!);
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
              title={actionState === MessageActionState.Deleting ? "Delete Post" : "Flag Post"}
              visible={actionInProgress}
              onOk={modalAction}
              onCancel={() => {
                 setInProgress(false);
              }}
          >
              {actionState === MessageActionState.Deleting ? 
              <p>Are you sure you want to delete this post?</p> : 
              <p>Are you sure you want to flag this post?</p>}
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