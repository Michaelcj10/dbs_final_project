import { setList, setCurrentShowing } from "../../modules/counter";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import React from "react";
import PageLoader from "../loader/pageLoader";
import { getCookie } from "../../services/cookie";

// tslint:disable-next-line: typedef
function IsAuthenticated(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {

    const authCookie = getCookie("xauth");

    if (authCookie) {
        setChecked(true);
    } else {
      props.changePage("/auth");
    }
  // tslint:disable-next-line: align
  }, []);

  if (!checked) {
      return <PageLoader />;
  }

  return props.children;
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
)((IsAuthenticated));