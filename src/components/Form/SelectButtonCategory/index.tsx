import React from "react";
import { TextInput } from "react-native";

import { Container, Category, Icon } from "./styles";

interface Props {
  title: string;
}

const SelectButtonCategory: React.FC<Props> = ({ title }) => {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default SelectButtonCategory;
