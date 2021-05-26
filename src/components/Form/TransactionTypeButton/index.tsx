import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Icon, Title } from "./styles";

interface Props extends RectButtonProps {
  type: "up" | "down";
  title: string;
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

const TransactionTypeButton: React.FC<Props> = ({
  isActive,
  title,
  type,
  ...res
}) => {
  return (
    <Container isActive={isActive} type={type} {...res}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};

export default TransactionTypeButton;
