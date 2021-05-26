import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";

import {
  TransactionCard,
  TransactionProps,
} from "../../components/TransactionCard";
import HighligthCard from "../../components/HighligthCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  LogoutButton,
  Photo,
  User,
  UserGreeting,
  UserName,
  HighligthsCard,
  Transactions,
  TransactionList,
  Title,
  Icon,
} from "./styles";

export interface DataListProps extends TransactionProps {
  id: string;
}

const Dashboard: React.FC = () => {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/05/2021",
    },
    {
      id: "2",
      type: "negative",
      title: "Desenvolvimento de site",
      amount: "R$ 1.209,10",
      category: { name: "Vendas", icon: "coffee" },
      date: "13/05/2021",
    },
    {
      id: "3",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 2.100,00",
      category: { name: "Vendas", icon: "shopping-bag" },
      date: "13/05/2021",
    },
    {
      id: "4",
      type: "negative",
      title: "Desenvolvimento de site",
      amount: "R$ 59,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/05/2021",
    },
  ];

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

          <LogoutButton>
            <Icon name="power" />
          </LogoutButton>
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

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
