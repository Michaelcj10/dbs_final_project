import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import { Row, Col, Typography, List, Divider, Skeleton, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { makeGet } from "../../api/apiRequest";
import { ConversationItem, UserProfile } from "../../domain/interfaces";
import { setViewedConversation } from "../../modules/safehub";
import styled from "styled-components";
import { getTimeFrameFromNow } from "../../services/date";

const { Title } = Typography;

const StyledSpanHeading = styled.span`
  font-weight: bold;

  span {
    font-weight: normal;
    font-size: 12px;
  }
`;

function Conversations(props: {
  userProfile: { user: UserProfile; userId: string };
  setViewedConversation: (arg0: ConversationItem) => void;
  changePage: (arg0: string) => void;
}) {
  const userId =
    props.userProfile && props.userProfile.user ? props.userProfile.userId : "";
  const email =
    props.userProfile && props.userProfile.user
      ? props.userProfile.user.email
      : "";
  const [conversations, setConversations] = useState<ConversationItem[] | null>(
    null
  );

  const getConversations = async () => {
    try {
      const response = await makeGet(`conversations/${userId}`);

      if (response && response.found) {
        setConversations(response.found);
      }
    } catch (error) {
      setConversations([]);
    }
  };

  React.useEffect(() => {
    async function fetchMyAPI() {
      await getConversations();
    }

    fetchMyAPI();
  }, []);

  return (
    <IsAuthenticated>
      <div className="layout">
        <Row>
          <Col span={2} lg={6} />
          <Col span={20} lg={12}>
            <Title>Conversations</Title>
            <Divider orientation="left" plain={true}>
              {!conversations ? (
                <Skeleton.Input
                  style={{ width: 100, height: "10px" }}
                  active={true}
                />
              ) : (
                <div>{`Conversations total (${conversations.length})`}</div>
              )}
            </Divider>
            {conversations === null ? (
              <div>
                {[1, 2, 3, 4].map((_x, y) => {
                  return (
                    <Skeleton
                      key={y}
                      loading={true}
                      active={true}
                      avatar={true}
                    />
                  );
                })}
              </div>
            ) : (
              <React.Fragment>
                <List
                  itemLayout="horizontal"
                  dataSource={conversations.reverse()}
                  renderItem={(convoItem, _i) => (
                    <List.Item
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        props.setViewedConversation(convoItem);
                        props.changePage("/view-conversation");
                      }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={
                          <StyledSpanHeading>
                            {convoItem.from === email
                              ? `${convoItem.to}`
                              : `${convoItem.title}`}
                          </StyledSpanHeading>
                        }
                        description={`${
                          convoItem.replies[convoItem.replies.length - 1].reply
                        } ${getTimeFrameFromNow(convoItem.Created_date!)}`}
                      />
                    </List.Item>
                  )}
                />
              </React.Fragment>
            )}
          </Col>
        </Row>
      </div>
    </IsAuthenticated>
  );
}

const mapStateToProps = ({ safehub }) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
