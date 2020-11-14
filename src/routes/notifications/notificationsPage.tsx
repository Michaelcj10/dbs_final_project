import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Typography,
  List,
  Skeleton,
  Button,
  message,
  Divider,
} from "antd";
import styled from "styled-components";
import { NotificationItem, UserProfile } from "../../domain/interfaces";
import { makePostWithAuth, makeGet } from "../../api/apiRequest";
import { useState } from "react";
import { setNotifications } from "../../modules/safehub";

const { Title } = Typography;

const SwitchLink = styled(Button)`
  padding: 0px;
  font-weight: bold;
`;

function Notifications(props: {
  notifications: NotificationItem[] | (() => NotificationItem[]);
  userProfile: UserProfile;
  setNotifications: (arg0: NotificationItem[]) => void;
}) {
  const [notifications, setNotificationsItems] = useState<NotificationItem[]>(
    props.notifications
  );
  const userId =
    props.userProfile && props.userProfile.user ? props.userProfile.userId : "";

  const getNotifications = async () => {
    try {
      const response = await makeGet(`notifications/${userId}`);
      // tslint:disable-next-line: no-console
      console.log(response);
      props.setNotifications(response.found);
      setNotificationsItems(response.found);
    } catch (error) {
      setNotificationsItems([]);
    }
  };

  const onMarkedRead = async (item: NotificationItem) => {
    const readVal = item.status![0] === "Unread" ? "Read" : "Unread";

    const dataPost = {
      ...item,
      status: [readVal],
    };
    try {
      await makePostWithAuth(`notifications/${item._id}`, dataPost, true);
      getNotifications();
      message.success(`Marked ${readVal}`);
    } catch (e) {
      message.error("Invalid , try again");
    }
  };

  return (
    <div className="layout">
      <Row>
        <Col span={2} lg={6} />
        <Col span={20} lg={12}>
          <Title>Notifications</Title>
          <Divider orientation="left" plain={true}>
            {!notifications ? (
              <Skeleton.Input
                style={{ width: 100, height: "10px" }}
                active={true}
              />
            ) : (
              <div>{`Notifications unread (})`}</div>
            )}
          </Divider>
          {notifications === null ? (
            <div>
              {" "}
              {[1, 2].map((_x, y) => {
                return <Skeleton key={y} loading={true} active={true} />;
              })}{" "}
            </div>
          ) : (
            <List
              header={<div>Your notifications</div>}
              bordered={true}
              dataSource={notifications ? notifications : []}
              renderItem={(item) => (
                <List.Item
                  style={{ opacity: item.status![0] === "Read" ? 0.5 : 1 }}
                >
                  <Typography.Text mark={true}>
                    {item.status![0] === "Unread" ? "[UNREAD]" : "Read"}
                  </Typography.Text>{" "}
                  {item.comment}
                  <SwitchLink
                    type="link"
                    key="list-del"
                    onClick={() => {
                      onMarkedRead(item);
                    }}
                  >
                    &nbsp;
                    {item.status![0] === "Unread" ? "mark read" : "mark unread"}
                  </SwitchLink>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = ({ safehub }) => ({
  userProfile: safehub.userProfile,
  notifications: safehub.notifications,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePage: (value) => push(value),
      setNotifications,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
