import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

function Privacy() {
  return (
    <div className="layout">
        <Row>
           <Col span={2} lg={8}/>  
           <Col span={20} lg={8}>
            <Title>Privacy policy</Title>
            <Title level={3}>Common</Title>
            <Paragraph>
                In common with other websites, log files are stored on the web server saving details such as the visitor's IP address, browser type,
                referring page and time of visit.
                Cookies may be used to remember visitor preferences when interacting with the website.
                Where registration is required, the visitor's email and a username will be stored on the server.
            </Paragraph>
            <Title level={3}>Stored info</Title>
            <Paragraph>
                The information is used to enhance the vistor's experience when using the website to display personalised content and possibly advertising.
                E-mail addresses will not be sold, rented or leased to 3rd parties.
                E-mail may be sent to inform you of news of our services or offers by us or our affiliates.
            </Paragraph>
            <Title level={3}>Cookies</Title>
            <Paragraph>
            Cookies are small digital signature files that are stored by your web browser that allow your preferences to be recorded when visiting the website. Also they may be used to track your return visits to the website.
            3rd party advertising companies may also use cookies for tracking purposes.
            </Paragraph>
           </Col>
        </Row>
      </div>
  );
}

const mapStateToProps = ({ counter }) => ({
  places: counter.placeList,
  isLoading: counter.loading
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
)((Privacy));