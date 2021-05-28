import React, { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { VictoryPie } from 'victory-native';

import Header from '../../components/Header';
import HistoryCard from '../../components/HistoryCard';
import { TransactionProps } from '../../components/TransactionCard';

import { Container, ChartContainer, Content } from './styles';
import { categories } from '../../utils/categories';

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
  const [totalByCategories, setTotalByCategories] = useState<CategoryProps[]>(
    []
  );

  const loadData = async () => {
    const dataKey = '@myFinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (f: TransactionProps) => f.type === 'negative'
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
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header title="Reumo por categoria" />

      <ChartContainer>
        <VictoryPie
          data={totalByCategories}
          colorScale={totalByCategories.map((m) => m.color)}
          style={{
            labels: {
              fontSize: RFValue(14),
              fontWeight: 'bold',
              fill: '#ffff',
            },
          }}
          labelRadius={55}
          x="percentFormatted"
          y="total"
        />
      </ChartContainer>

      <Content>
        {totalByCategories.map((categorie: CategoryProps) => (
          <HistoryCard
            key={categorie.id}
            title={categorie.name}
            amount={categorie.totalFormatted}
            color={categorie.color}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Resume;
