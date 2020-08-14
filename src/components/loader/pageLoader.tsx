import { Spin } from "antd";
import * as React from "react";
import styled from "styled-components";

const LoaderStyle = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(255,255,255, 0.5);
`;

const LoaderSpinnerStyle = styled(Spin)`
    position: fixed;
    top: 50%;
    left: 50%;
`;

function PageLoader() {
  return (
      <LoaderStyle>
           <LoaderSpinnerStyle size="large" />
      </LoaderStyle>
  );
}

export default PageLoader;