import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography } from "antd";
import IsAuthenticated from "../../components/authentication/isAuthenticated";

const { Title } = Typography;

// tslint:disable-next-line: typedef
function ViewMessage(props) {

    // tslint:disable-next-line: no-console
    console.log(props);

    return (
    <IsAuthenticated>
        <div className="layout">
        <Row>
            <Col span={2} lg={8}/>     
            <Col span={20} lg={8}>
            <Title>Add new message</Title>
                    {props.message.title}
            </Col>
            <Col span={2} lg={8}/>    
        </Row>
        </div>
    </IsAuthenticated>
    );
}

const mapStateToProps = ({ counter }) => ({
  message: counter.message
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
)((ViewMessage));