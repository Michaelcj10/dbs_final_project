import { PageHeader, Button, Menu  } from "antd";
import { setUserProfile } from "../../modules/counter";
import * as React from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteCookie, deleteSession } from "../../services/cookie";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useState } from "react";
import logo from "../../images/logo.png";

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
  width: 30px;
  cursor:pointer;
`;

// tslint:disable-next-line: typedef
function Header(props) {
  const loggedIn = props.userProfile && props.userProfile.user && props.userProfile.user.email;
  const [current, setCurrent] = useState<string>("");

  const handleClick = e => {
    setCurrent(e.key);
  };
  
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
                    props.setUserProfile({});
                    deleteSession();
                    deleteCookie("token");
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

const mapStateToProps = ({ counter }) => ({
    userProfile: counter.userProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
      setUserProfile
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((Header));