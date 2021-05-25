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
        <HighligthCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de Abril"
        />
        <HighligthCard
          type="down"
          title="Saídas"
          amount="R$ 1.529,90"
          lastTransaction="Última saída dia 03 de Abril"
        />
        <HighligthCard
          type="total"
          title="Total"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de Abril"
        />
      </HighligthsCard>
    </Container>
  );
};

export default Dashboard;
