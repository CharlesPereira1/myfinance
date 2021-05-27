import React, { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';
import HistoryCard from '../../components/HistoryCard';
import { TransactionProps } from '../../components/TransactionCard';

import { Container, Content } from './styles';
import { categories } from '../../utils/categories';

interface CategoryProps {
  id: string;
  name: string;
  total: string;
  color: string;
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

    const totalByCategory: CategoryProps[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        totalByCategory.push({
          id: String(uuid.v4()),
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header title="Reumo por categoria" />

      <Content>
        {totalByCategories.map((categorie: CategoryProps) => (
          <HistoryCard
            key={categorie.id}
            title={categorie.name}
            amount={categorie.total}
            color={categorie.color}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Resume;
