import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native";
import Button from "../../components/Form/Button";

import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separation,
  Footer,
} from "./styles";

interface CategoryProps {
  key: string;
  name: string;
}

interface Props {
  category?: string;
  setCategory?: (category: CategoryProps) => void;
  closeSelectCategory?: () => void;
}

const CategorySelect: React.FC<Props> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separation />}
      />

      <Footer>
        <Button title="Selecionar" />
      </Footer>
    </Container>
  );
};

export default CategorySelect;
