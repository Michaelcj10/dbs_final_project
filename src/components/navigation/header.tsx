import { PageHeader, Button, Tag } from "antd";
import { setUserProfile } from "../../modules/counter";
import * as React from "react";
import styled from "styled-components";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteCookie } from "../../services/cookie";

const HeaderStyle = styled.div`
    border: 1px solid rgb(235, 237, 240);
`;

// tslint:disable-next-line: typedef
function Header(props) {
  return (
    <HeaderStyle>
        <PageHeader
            className="site-page-header"
            title="Safe Hub"
            tags={props.userProfile && props.userProfile.email ? <Tag color="blue">{props.userProfile.email}</Tag> : undefined}
            extra={ props.userProfile.email ?  [
              <Button 
                  key="1" 
                  onClick={() => {
                    props.setUserProfile({});
                    deleteCookie("token");
                    props.changePage("/auth");
                  }}
              >Logout
              </Button>
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