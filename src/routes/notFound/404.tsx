import * as React from "react";
import { Row, Col, Typography, Button } from "antd";
import notfound from "../../images/notfound.svg";
import styled from "styled-components";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const { Title, Paragraph } = Typography;

const SmallIllustration = styled.img`
    max-width: 80%;
    margin-bottom: 50px;
`;

const CenteredCol = styled(Col)`
    text-align: center;
`;

function NotFoundPage(props: { changePage: (arg0: string) => void; }) {
  return (
    <div className="layout">
        <Row>
           <Col span={2} lg={8}/>  
           <CenteredCol span={20} lg={8}>
            <Title>Not found</Title>
            <SmallIllustration src={notfound} alt="404 image" />
            <Title level={3}>Why?</Title>
            <Paragraph>
                The location you searched for doesn't seem to exist on this website. Maybe the link has expired.
            </Paragraph>
                <Button 
                  type="primary"
                  onClick={() => {
                    props.changePage("/");
                  }} 
                  key="console"
                >
                  Home
                </Button>
           </CenteredCol>
        </Row>
      </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value)
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)((NotFoundPage));
