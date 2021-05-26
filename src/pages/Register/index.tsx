import React, { useState } from "react";
import Button from "../../components/Form/Button";

import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState("");

  const haneldTransactionTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={() => haneldTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={() => haneldTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionTypes>

          <Select title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};

export default Register;
