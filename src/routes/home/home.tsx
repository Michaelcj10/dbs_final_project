import * as React from "react";
import styled from "styled-components";
import { setList, setCurrentShowing } from "../../modules/counter";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsAuthenticated from "../../components/authentication/isAuthenticated";

const HomeStyle = styled.div`

`;

// tslint:disable-next-line: typedef
function Home(props) {
  // tslint:disable-next-line: no-console
  console.log(props);
  // const [showModal, setModalShowing] = useState(false);
  return (
    <IsAuthenticated>
      <HomeStyle>
                <p 
                  onClick={() => {
                    props.changePage("/auth");
                  }}
                >
                  auth
                </p>
          
      </HomeStyle>
    </IsAuthenticated>
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
)((Home));