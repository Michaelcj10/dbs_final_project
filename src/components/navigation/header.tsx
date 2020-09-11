import { PageHeader, Button, Menu, Badge, Avatar  } from "antd";
import { setUserProfile, setNotifications, setViewedOrganisation, orginitial } from "../../modules/safehub";
import * as React from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteCookie, deleteSession } from "../../services/cookie";
import { MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useState } from "react";
import logo from "../../images/logo.png";
import { makeGet } from "../../api/apiRequest";
import { NotificationItem } from "../../domain/interfaces";

const HeaderStyle = styled.div`
    border: 1px solid rgb(235, 237, 240);
`;

const StyledSpanHeading = styled(Button)`
  font-weight:bold;
  padding: 0px;
  color: #272727;
`;

const SwitchLink = styled(Button)`
  padding: 0px;
  color: rgba(0, 0, 0, 0.65);
`;

const Logo = styled.img`
  width: 70px;
  cursor:pointer;
`;

const NotificationLink = styled.div`
  cursor: pointer;
`;

function SiteHeader(props: { userProfile: { user: { email: string; }; }; setNotifications: (arg0: NotificationItem[]) => void; changePage: (arg0: string) => void; notifications: NotificationItem[]; setUserProfile: (arg0: {}) => void; }) {
  const loggedIn = props.userProfile && props.userProfile.user && props.userProfile.user.email;
  const [current, setCurrent] = useState<string>("");

  const handleClick = e => {
    setCurrent(e.key);
  };

  const getNotifications = async () => {
    try {
      const response = await makeGet("notifications");
      const mine = response.filter(x => x.username === props.userProfile!.user!.email);
      props.setNotifications(mine);
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log("Get notification error");
    }
  };

  React.useEffect( () => {

    async function fetchMyAPI() {
        await getNotifications();
    }

    fetchMyAPI();
  },               [] );

  return (
       <HeaderStyle>
        <PageHeader
            className="site-page-header"
            title={
              <Logo 
                  src={logo} 
                  alt="site logo" 
                  onClick={() => {
                     props.changePage("/");
              }} 
              />}
            subTitle={
              loggedIn ? 
                <StyledSpanHeading 
                    key="1"
                    type="link" 
                    onClick={() => {
                      props.changePage("/profile");
                    }}
                >{`${props.userProfile.user.email}`}
                </StyledSpanHeading> : null
            }
            extra={loggedIn ?  [
              <NotificationLink 
                  key="notifications" 
                  onClick={() => {
                    props.changePage("/notifications");
                  }}
              >
              <Badge count={props.notifications.filter(x => x.status![0] !== "Read").length} key="msg-count">
                <Avatar shape="square" icon={<UserOutlined />} />
              </Badge>
              </NotificationLink>
            ] : [
              <StyledSpanHeading 
                  key="3"
                  type="link" 
                  onClick={() => {
                    props.changePage("/auth");
                  }}
              >Login|Register
              </StyledSpanHeading>
            ]}
        />
        {loggedIn &&
        <React.Fragment>
               <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="mail" icon={<MailOutlined />}>
              <SwitchLink 
                  type="link"
                  onClick={() => {
                    props.changePage("/dashboard");
                  }}
              >
                Dashboard
              </SwitchLink>
          </Menu.Item>
          <SubMenu icon={<SettingOutlined />} title="Options">
            <Menu.ItemGroup title="Pages">
                  <Menu.Item>
              <SwitchLink 
                  type="link"
                  onClick={() => {
                    props.changePage("/dashboard");
                  }}
              >
                Dashboard
              </SwitchLink>
            </Menu.Item>
            <Menu.Item>
              <SwitchLink 
                  type="link"
                  onClick={() => {
                    props.changePage("/profile");
                  }}
              >
                Profile
              </SwitchLink>
            </Menu.Item>
            <Menu.Item>
              <SwitchLink 
                  type="link"
                  onClick={() => {
                    props.changePage("/organisations");
                  }}
              >
                Organisations
              </SwitchLink>
            </Menu.Item>
            <Menu.Item>
              <SwitchLink 
                  type="link"
                  onClick={() => {

                    props.setNotifications([]);
                    props.setUserProfile({});
                    deleteSession();
                    deleteCookie("token");
                    setViewedOrganisation(orginitial);
                    props.changePage("/auth");
                  }}
              >
                Logout
              </SwitchLink>
            </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
      </Menu>
       </React.Fragment>
      }
    </HeaderStyle>
  );
}

const mapStateToProps = ({ safehub }) => ({
    userProfile: safehub.userProfile,
    notifications: safehub.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
      setUserProfile,
      setNotifications,
      setViewedOrganisation
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((SiteHeader));