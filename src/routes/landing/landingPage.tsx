import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography, Divider, Button } from "antd";
import styled from "styled-components";
import landingImg from "../../images/landing.svg";
import landingAvatar from "../../images/landing-1.svg";

const { Title, Paragraph } = Typography;

const Container = styled.div`
  width: 100%;
  padding-bottom: 100px;
`;

const StyledRow = styled(Row)`
    margin-top: 25px;
`;

const SmallCol = styled(Col)`
    text-align: center;
`;

const MainIllustration = styled.img`
    max-width: 100%;
    margin-bottom: 50px;
`;

const SmallIllustration = styled.img`
    max-width: 40%;
    margin-bottom: 50px;
`;

const SwitchLink = styled(Button)`
  padding: 0px;
  font-weight: bold;
`;

function Landing(props: { changePage: (arg0: string) => void; }) {
  return (
      <div className="layout">
        <Container>
            <Row>
            <Col span={2} lg={6}/>  
            <Col span={20} lg={12}>
                <MainIllustration src={landingImg} alt="landing woman image"/>
            </Col>
            </Row>
            <StyledRow>
            <Col span={2} lg={6}/>  
            <Col span={20} lg={6}>
                <Title>Safe Hub</Title>
                <Title level={3}>Who are we
                </Title>
                <Paragraph>
                    We are a company striving to provide a safe, collaborative enviornment for domestic
                    vioelnce organisations to communicate and provide a high level of support and care for the 
                    clients they are working with. Security and ease of access are two main threads in our application
                    software.
                </Paragraph>
            </Col>
            <SmallCol span={20} lg={6}>
                <SmallIllustration src={landingAvatar} alt="landing woman image"/>
            </SmallCol>
            </StyledRow>
            <StyledRow>
            <Col span={2} lg={6}/>  
            <Col span={20} lg={12}>
                <Title level={3}>What is Safe Hub 
                </Title>
                <Paragraph>
                    Safe Hub is an online application where organisations can communicate via a central dahsboard.
                    Messages can be sent between organisations and information shared privately and securly between
                    refuges instantly. Key information is available such as the number of places available at 
                    a particular refuge as well as any security breaches or potential breaches a refuge has.
                    All data is encrypted and we are GDPR compliant.
                </Paragraph>
                <Divider />
                <Title level={3}>Get involved
                </Title>
                <Paragraph>
                    To avail of the service, please either register your organisation and we will contact you
                    to confirm your details, or if you are already a valued client &nbsp;
                    <SwitchLink 
                        type="link"
                        onClick={() => {
                            props.changePage("/auth");
                        }}
                    >
                    login now
                    </SwitchLink>  
                </Paragraph>
                <Button 
                    type="primary" 
                    onClick={() => {
                         props.changePage("/auth");
                    }}
                >
                    Register
                </Button>  
            </Col>
            </StyledRow>
        </Container>
      </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)((Landing));