import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import { styled } from 'styled-components';

const BackLinkContainer = styled(Link)`
  align-items: center;
  font-size: 16px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export default function BackLink({ href, text }) {
  return (
    <BackLinkContainer href={href}>
      <MdArrowBack />
      <span>{text}</span>
    </BackLinkContainer>
  );
}
