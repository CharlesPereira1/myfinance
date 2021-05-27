import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  TransactionCard,
  TransactionProps,
} from '../../components/TransactionCard';
import HighligthCard from '../../components/HighligthCard';

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
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataListProps extends TransactionProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}
interface HighlightCards {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightCards, setHighlightCards] = useState<HighlightCards>(
    {} as HighlightCards
  );

  const loadTransaction = async () => {
    const dataKey = '@myFinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    //Cards totais
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        //Cards totais
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        //montando array
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const total = entriesTotal - expensiveTotal;
    setHighlightCards({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
    });
    console.log(transactionsFormatted);
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/54192694?v=4',
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
          amount={highlightCards.entries.amount}
          lastTransaction="Última entrada dia 13 de Abril"
        />
        <HighligthCard
          type="down"
          title="Saídas"
          amount={highlightCards.expensive.amount}
          lastTransaction="Última saída dia 03 de Abril"
        />
        <HighligthCard
          type="total"
          title="Total"
          amount={highlightCards.total.amount}
          lastTransaction="Última entrada dia 13 de Abril"
        />
      </HighligthsCard>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
