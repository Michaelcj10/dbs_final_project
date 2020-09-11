import * as React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography, Skeleton, List, Avatar, Divider } from "antd";
import { makeGet } from "../../api/apiRequest";
import { Organisation } from "../../domain/interfaces";
import { UserOutlined } from "@ant-design/icons";
import { setViewedOrganisation } from "../../modules/safehub";

const { Title } = Typography;

function Organisations(props: { userProfile: { userId: string; }; setViewedOrganisation: (arg0: Organisation) => void; changePage: (arg0: string) => void; }) {

    const [orgs, setOrgs] = React.useState<Organisation[]|null>(null);
    const userId = props.userProfile ? props.userProfile.userId : "";

    const getOrgs = async () => {
        try {
          const response = await makeGet("organisations");
          setOrgs(response.filter(x => x.userId !== userId));
        } catch (error) {
          setOrgs([]);
        }
      };
    
    React.useEffect( () => {
        async function fetchMyAPI() {
            await getOrgs();
        }
    
        fetchMyAPI();
    },               [] );

    return (
        <div className="layout">
            <Row>
                <Col span={2} lg={6}/>     
                <Col span={20} lg={12}>
                <Title>Organisations</Title>
                <Divider orientation="left" plain={true} >
                    {!orgs ? <Skeleton.Input style={{ width: 100, height: "10px"}} active={true} /> :             
                    <div>
                        {`Organisations total (${orgs?.length ? orgs.length : "0"})`}
                    </div>}
                </Divider>
                {orgs === null  ? <div> {[1, 2, 3, 4].map( (_x, y) => {
                     return <Skeleton key={y} loading={true} active={true} avatar={true} />;
                })} </div> : 
                <List
                    itemLayout="horizontal"
                    dataSource={orgs}
                    renderItem={item => (
                    <List.Item
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            props.setViewedOrganisation(item);
                            props.changePage(`/view-organisation`);
                        }}
                    >
                        <List.Item.Meta
                            avatar={<Avatar style={{backgroundColor: "#1de9b6"}} icon={<UserOutlined />} />}
                            title={item.name}
                            description={item.address}
                        />
                    </List.Item>
                    )}
                />}
            </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = ({ safehub }) => ({
    userProfile: safehub.userProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
      setViewedOrganisation
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((Organisations));