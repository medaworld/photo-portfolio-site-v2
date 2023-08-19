import Link from 'next/link';
import { styled } from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  text-align: center;
`;

const DisplayText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Code = styled.div`
  font-family: 'Raleway';
  display: inline-block;
  margin: 0 20px 0 0;
  padding-right: 23px;
  font-size: 24px;
  font-weight: 400;
  vertical-align: top;
  border-right: 1px solid ${(props) => props.theme.primary};
`;

const Message = styled.div`
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export default function ErrorPage() {
  return (
    <ErrorContainer>
      <DisplayText>
        <Code>404</Code>
        <Message>This page could not be found.</Message>
      </DisplayText>
      <StyledLink href="/">Go back home</StyledLink>
    </ErrorContainer>
  );
}
