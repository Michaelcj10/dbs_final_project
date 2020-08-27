import { PageHeader, Button } from "antd";
import { setUserProfile } from "../../modules/counter";
import * as React from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteCookie, deleteSession } from "../../services/cookie";

const HeaderStyle = styled.div`
    border: 1px solid rgb(235, 237, 240);
`;

const StyledSpanHeading = styled(Button)`
  font-weight:bold;
  padding: 0px;
`;

// tslint:disable-next-line: typedef
function Header(props) {
  const loggedIn = props.userProfile && props.userProfile.user && props.userProfile.user.email;
  return (
    <HeaderStyle>
        <PageHeader
            className="site-page-header"
            title="Safe Hub"
            subTitle={props.userProfile && props.userProfile.email ? "" : "Organisation Dashboard"}
            extra={loggedIn ?  [
              <StyledSpanHeading 
                  key="1"
                  type="link" 
                  onClick={() => {
                    props.changePage("/profile");
                  }}
              >{props.userProfile.user.email}
              </StyledSpanHeading>,
              <Button 
                  onClick={() => {
                    props.setUserProfile({});
                    deleteSession();
                    deleteCookie("token");
                    props.changePage("/auth");
                  }}
                  key="2"
              >Logout
              </Button>,
            ] : []}
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