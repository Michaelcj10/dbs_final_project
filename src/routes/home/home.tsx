import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import { Row, Col, Typography, List, Avatar, Space, Divider, Skeleton , Button } from "antd";
import { UserOutlined, MessageOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import { makeGet } from "../../api/apiRequest";
import { MessageItem } from "../../domain/interfaces";
import { getTimeFrameFromNow } from "../../services/date";

const { Title } = Typography;

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

// tslint:disable-next-line: typedef
function Home(props) {
  const [messages, setMessages] = useState<MessageItem[]|null>(null);
  const colorAvatarPallete = ["#87d068", "#f56a00", "#1890ff"];
 
  React.useEffect( () => {
    async function fetchMyAPI() {
      try {
        const response = await makeGet("messages");
        setMessages(response.reverse());
      } catch (error) {
        setMessages([]);
      }
    }

    fetchMyAPI();
  },               [] );

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <IsAuthenticated>
      <div className="layout">
        <Row>
          <Col span={2} lg={6}/>     
          <Col span={20} lg={12}>
            <Title>Message center</Title>
            <Divider orientation="left" plain={true} >{`Messages total (${messages?.length})`}</Divider>
                <AddButton 
                    type="link" 
                    size="large" 
                    onClick={() => {
                      props.changePage("/add-message");
                    }}
                >
                    Add new message
                </AddButton>
            {messages === null  ? <div> {[1, 2, 3, 4].map( (x, y) => {
                return <Skeleton key={y} loading={true} active={true} avatar={true} />;
            })} </div> : 
           <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(message, i) => (
                <List.Item
                   
                   style={{cursor: "pointer"}}
                   onClick={() => {
                     // tslint:disable-next-line: no-console
                     console.log("go somewhere");
                   }}
                   actions={[
                  <IconText icon={MessageOutlined} text={message.replies.length} key="list-vertical-message" />,
                ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={{backgroundColor: i % 3 === 0 ? colorAvatarPallete[2] :  i % 2 === 0 ?  colorAvatarPallete[1] : colorAvatarPallete[0]}} icon={<UserOutlined />} />}
                    title={<StyledSpanHeading>{message.title} <span>{getTimeFrameFromNow(message.Created_date)}</span></StyledSpanHeading>}
                    description={message.username}
                    
                  />
                  {message.comment}
                </List.Item>
              )}
           />}
          </Col>
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
)((Home));