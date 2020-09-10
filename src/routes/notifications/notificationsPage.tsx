import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography, List, Skeleton, Button, message, Divider } from "antd";
import styled from "styled-components";
import { NotificationItem, UserProfile } from "../../domain/interfaces";
import { makePostWithAuth, makeGet } from "../../api/apiRequest";
import { useState } from "react";
import { setNotifications } from "../../modules/counter";

const { Title } = Typography;

const SwitchLink = styled(Button)`
  padding: 0px;
  font-weight: bold;
`;

function Notifications(props: { notifications: NotificationItem[] | (() => NotificationItem[]); userProfile: UserProfile; setNotifications: (arg0: NotificationItem[]) => void; }) {

  const [notifications, setNotificationsItems] = useState<NotificationItem[]>(props.notifications);

  const getNotifications = async () => {
    try {
      const response = await makeGet("notifications");
      const mine = response.filter(x => x.username === props.userProfile!.user!.email);
      props.setNotifications(mine);
      setNotificationsItems(mine);
    } catch (error) {
      setNotificationsItems([]);
    }
  };

  const onMarkedRead = async (item: NotificationItem) => {

    const readVal =  item.status![0] === "Unread" ? "Read" : "Unread";

    const dataPost = {
      ...item,
      status: [readVal]
    };
    try {
      await makePostWithAuth(`notifications/${item._id}`, dataPost, true);
      getNotifications();
      message.success(`Marked ${readVal}`);
    } catch (e) {
      message.error("Invalid , try again");
    }
  };

  const unread = notifications.filter(x => x.status![0] === "Unread").length;

  // tslint:disable-next-line: no-console
  console.log(notifications);

  return (
    <div className="layout">
        <Row>
        <Col span={2} lg={6}/>     
            <Col span={20} lg={12}>
            <Title>Notifications</Title>
            <Divider orientation="left" plain={true} >
              {!notifications ? <Skeleton.Input style={{ width: 100, height: "10px"}} active={true} /> :             
              <div>
                {`Notifications unread (${unread ? unread : "0"})`}
              </div>}
            </Divider>
            {notifications === null  ? <div> {[1, 2].map( (_x, y) => {
                return <Skeleton key={y} loading={true} active={true} />;
            })} </div> : 
            <List
                header={<div>Your notifications</div>}
                bordered={true}
                dataSource={notifications ? notifications : []}
                renderItem={item => (
                    <List.Item style={{opacity: item.status![0] === "Read" ? 0.5 : 1}}>
                    <Typography.Text mark={true}>{item.status![0] === "Unread" ? "[UNREAD]" : "Read"}</Typography.Text> {item.comment} 
                    <SwitchLink 
                            type="link"
                            key="list-del"  
                            onClick={() => {
                                onMarkedRead(item);
                            }} 
                    >
                           &nbsp;{item.status![0] === "Unread" ? "mark read" : "mark unread"}
                    </SwitchLink>
                    </List.Item>
                )}
            />}
           </Col>
        </Row>
      </div>
  );
}

const mapStateToProps = ({ counter }) => ({
    userProfile: counter.userProfile,
    notifications: counter.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
      setNotifications
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((Notifications));