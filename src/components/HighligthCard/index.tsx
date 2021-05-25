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

interface HighlighProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "down" | "total" | "up";
}

const HighligthCard: React.FC<HighlighProps> = ({
  type,
  title,
  amount,
  lastTransaction,
}) => {
  const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
  };

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};

export default HighligthCard;
