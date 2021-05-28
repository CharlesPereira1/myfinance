import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import uuid from 'react-native-uuid';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Header from '../../components/Header';
import HistoryCard from '../../components/HistoryCard';
import { TransactionProps } from '../../components/TransactionCard';

import {
  Container,
  ContainerLoading,
  ChartContainer,
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';
import { categories } from '../../utils/categories';
import { useFocusEffect } from '@react-navigation/core';

interface CategoryProps {
  id: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: number;
  percentFormatted: string;
}

const Resume: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryProps[]>(
    []
  );

  const theme = useTheme();

  const handleDateChange = (action: 'next' | 'prev') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    const dataKey = '@myFinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (f: TransactionProps) =>
        f.type === 'negative' &&
        new Date(f.date).getMonth() === selectedDate.getMonth() &&
        new Date(f.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionProps) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryProps[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = (categorySum / expensivesTotal) * 100;
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          id: String(uuid.v4()),
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
          percentFormatted,
        });
      }
    });

    console.log(totalByCategory);
    setTotalByCategories(totalByCategory);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        loadData();
      }, 1500);
    }, [selectedDate])
  );

  return (
    <Container>
      <Header title="Resumo por categoria" />

      <MonthSelect>
        <MonthSelectButton
          onPress={() => {
            handleDateChange('prev');
          }}
        >
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

        <MonthSelectButton
          onPress={() => {
            handleDateChange('next');
          }}
        >
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      </MonthSelect>

      {loading ? (
        <ContainerLoading>
          <ActivityIndicator color={theme.colors.primary} size="small" />
        </ContainerLoading>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((m) => m.color)}
              x="percentFormatted"
              y="total"
              height={340}
              style={{
                labels: {
                  fontSize: RFValue(14),
                  fontWeight: 'bold',
                  fill: '#ffff',
                },
              }}
              labelRadius={55}
            />
          </ChartContainer>

          {totalByCategories.map((categorie: CategoryProps) => (
            <HistoryCard
              key={categorie.id}
              title={categorie.name}
              amount={categorie.totalFormatted}
              color={categorie.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Resume;
