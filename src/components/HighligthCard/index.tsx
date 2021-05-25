import React from "react";

import {
  Container,
  Header,
  Title,
  Footer,
  Amount,
  LastTransaction,
  Icon,
} from "./styles";

const HighligthCard: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Footer>
        <Amount>R$ 17.400,0</Amount>
        <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
      </Footer>
    </Container>
  );
};

export default HighligthCard;
