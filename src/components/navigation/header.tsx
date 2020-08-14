import { PageHeader } from "antd";
import * as React from "react";
import styled from "styled-components";
import { setList, setCurrentShowing } from "../../modules/counter";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const HeaderStyle = styled.div`
    border: 1px solid rgb(235, 237, 240);
`;

// tslint:disable-next-line: typedef
function Header(props) {
  // const [showModal, setModalShowing] = useState(false);
  return (
    <HeaderStyle>
        <PageHeader
            className="site-page-header"
            title="Safe Hub"
            subTitle="Organisation Dashboard"
        />
    </HeaderStyle>
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
      setList,
      setCurrentShowing
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((Header));