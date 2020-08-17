import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsAuthenticated from "../../components/authentication/isAuthenticated";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

// tslint:disable-next-line: typedef
function Home(props) {
  return (
    <IsAuthenticated>
      <div className="layout">
        <Row>
          <Col span={2} lg={8}/>     
          <Col span={20} lg={8}>
           <Title>Dashboard</Title>
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