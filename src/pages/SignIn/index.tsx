import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import SignInSocialButton from '../../components/SignInSocialButton';

import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Não foi possivel conectar à conta Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithApple = async () => {
    try {
      setLoading(true);
      await signInWithApple();
    } catch (error) {
      Alert.alert('Não foi possivel conectar à conta Apple.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            icon={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com Apple"
            icon={AppleSvg}
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 18 }}
            color={theme.colors.primary}
          />
        )}
      </Footer>
    </Container>
  );
};

export default SignIn;
