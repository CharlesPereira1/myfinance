import React from "react";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  HighligthsCard,
  Icon,
} from "./styles";

import HighligthCard from "../../components/HighligthCard";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/54192694?v=4",
              }}
            />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Charles</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighligthsCard>
        <HighligthCard />
        <HighligthCard />
        <HighligthCard />
      </HighligthsCard>
    </Container>
  );
};

export default Dashboard;
