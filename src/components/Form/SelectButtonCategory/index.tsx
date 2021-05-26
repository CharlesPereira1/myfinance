import React from "react";

import { Container, Category, Icon } from "./styles";

interface Props {
  title: string;
  onPress: () => void;
}

const SelectButtonCategory: React.FC<Props> = ({ title, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default SelectButtonCategory;
