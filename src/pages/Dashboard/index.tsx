import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../hooks/auth';

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
  ContainerLoading,
} from './styles';

export interface DataListProps extends TransactionProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightCards {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightCards, setHighlightCards] = useState<HighlightCards>(
    {} as HighlightCards
  );

  const theme = useTheme();
  const { user, signOut } = useAuth();

  const getLastTransaction = (
    type: 'positive' | 'negative',
    conllection: DataListProps[]
  ) => {
    const collectionFilttered = conllection.filter((f) => f.type === type);

    if (collectionFilttered.length === 0) {
      return 0;
    }

    const lastTransactions = new Date(
      Math.max.apply(
        Math,

        collectionFilttered.map((m) => new Date(m.date).getTime())
      )
    );

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )} às ${lastTransactions.toLocaleString('pt-BR', {
      hour: '2-digit',
    })}:${lastTransactions.toLocaleString('pt-BR', { minute: '2-digit' })}`;
  };

  const loadTransaction = async () => {
    const dataKey = `@myFinance:transactions_user${user.id}`;
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

    const lastTransEntries = getLastTransaction('positive', transactions);
    const lastTransExpensives = getLastTransaction('negative', transactions);
    const lastTransTotal =
      lastTransEntries === 0
        ? 'Não há movimentações'
        : `01 as ${lastTransExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightCards({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTransEntries === 0
            ? 'Não há transações'
            : `Última entrada, dia ${lastTransEntries}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTransExpensives === 0
            ? 'Não há transações'
            : `Última saída, dia ${lastTransExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransTotal,
      },
    });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
      {loading ? (
        <ContainerLoading>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </ContainerLoading>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />

                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighligthsCard>
            <HighligthCard
              type="up"
              title="Entradas"
              amount={highlightCards.entries.amount}
              lastTransaction={highlightCards.entries.lastTransaction}
            />
            <HighligthCard
              type="down"
              title="Saídas"
              amount={highlightCards.expensive.amount}
              lastTransaction={highlightCards.entries.lastTransaction}
            />
            <HighligthCard
              type="total"
              title="Total"
              amount={highlightCards.total.amount}
              lastTransaction={highlightCards.total.lastTransaction}
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
        </>
      )}
    </Container>
  );
};

export default Dashboard;
