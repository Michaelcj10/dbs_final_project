import * as React from "react";
import { Typography, Button, Card } from "antd";
import styled from "styled-components";
import { ReactNode } from "react";

const { Title } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 25px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SwitchLink = styled(Button)`
  padding: 0px;
  font-weight: bold;
`;

const WelcomeTitle = styled(Title)`
  font-size: 14px;
`;

interface Props {
    onClick: () => void;
    title: string;
    linkTitle: string;
    icon: ReactNode;
}

function Panel(props: Props) {

  return (
            <StyledCard>
              <Flex>
              <WelcomeTitle style={{fontSize: "14px", marginBottom: "0px"}}>
                {props.icon}
                 {props.title}
              </WelcomeTitle>
              <SwitchLink 
                  onClick={() => {
                    props.onClick();
                  }} 
                  type="link"
              >{props.linkTitle}
              </SwitchLink>
              </Flex>
            </StyledCard>

  );
}

export default Panel;