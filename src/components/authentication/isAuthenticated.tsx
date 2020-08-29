import { setUserProfile, setOrganisation } from "../../modules/counter";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import React from "react";
import PageLoader from "../loader/pageLoader";
import { makeGet } from "../../api/apiRequest";

// tslint:disable-next-line: typedef
function IsAuthenticated(props) {
  const [checked, setChecked] = useState(false);

  useEffect( () => {
    async function fetchMyAPI() {
      try {
        const response = await makeGet("me");
        if (!response || !response.user) {
          props.changePage("/auth");
        } else {
          props.setUserProfile(response);
          setChecked(true);      

          try {
            const org = await makeGet(`organisations/${response.userId}`);
            props.setOrganisation(org);         
          } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error);  
          }
        }
      } catch (error) {
        props.changePage("/auth");
      }
    }

    fetchMyAPI();
},           [] );

  if (!checked) {
      return <PageLoader />;
  }

  return props.children;
}

const mapStateToProps = ({ counter }) => ({
  userProfile: counter.userProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: value => push(value),
      setUserProfile,
      setOrganisation
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((IsAuthenticated));