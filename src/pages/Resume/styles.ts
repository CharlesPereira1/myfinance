import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ChartContainer = styled.View`
  align-items: center;
  width: 100%;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { flex: 1, padding: 24 },
})``;
