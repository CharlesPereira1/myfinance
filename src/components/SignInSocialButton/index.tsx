import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Container, ImageContainer, Description } from './styles';

interface Props extends RectButtonProps {
  title: string;
  icon: React.FC<SvgProps>;
}

const SignInSocialButton: React.FC<Props> = ({
  title,
  icon: Icon,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Icon />
      </ImageContainer>

      <Description>{title}</Description>
    </Container>
  );
};

export default SignInSocialButton;
