import { PageHeader, Button, Menu , Dropdown } from "antd";
import { setUserProfile } from "../../modules/counter";
import * as React from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteCookie, deleteSession } from "../../services/cookie";
import { HomeOutlined, EllipsisOutlined } from "@ant-design/icons";

const HeaderStyle = styled.div`
    border: 1px solid rgb(235, 237, 240);
`;

const StyledSpanHeading = styled(Button)`
  font-weight:bold;
  padding: 0px;
`;

const SwitchLink = styled(Button)`
  padding: 0px;
  color: rgba(0, 0, 0, 0.65);
`;

// tslint:disable-next-line: typedef
function Header(props) {
  const loggedIn = props.userProfile && props.userProfile.user && props.userProfile.user.email;
  
  const menu = (
    <Menu>
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
    </Menu>
  );

  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={menu}>
        <Button
          style={{
            border: "none",
            padding: 0,
          }}
        >
          <EllipsisOutlined
            style={{
              fontSize: 20,
              verticalAlign: "top",
            }}
          />
        </Button>
      </Dropdown>
    );
  };

  return (
    <HeaderStyle>
        <PageHeader
            onBack={() => {
              props.changePage("/");
            }}
            backIcon={<HomeOutlined />}
            className="site-page-header"
            title="Safe Hub"
            subTitle={props.userProfile && props.userProfile.email ? "" : "Dashboard"}
            extra={loggedIn ?  [
              <StyledSpanHeading 
                  key="1"
                  type="link" 
                  onClick={() => {
                    props.changePage("/profile");
                  }}
              >{props.userProfile.user.email}
              </StyledSpanHeading>,
               <DropdownMenu key="more" />
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