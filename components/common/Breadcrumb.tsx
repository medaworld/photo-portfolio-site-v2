import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const BreadcrumbNav = styled.nav`
  padding: 5px 0 5px 1rem;

  position: fixed;
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 14px;
  background-color: ${(props) => props.theme.tplight};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 3;
`;

const BreadcrumbList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const BreadcrumbItem = styled.li`
  margin-right: 0.5em;

  &:not(:last-child)::after {
    content: '>';
    margin-left: 0.5em;
  }
`;

const BreadcrumbLast = styled.span`
  color: ${(props) => props.theme.color};
`;

const Breadcrumb = ({ paths }) => (
  <BreadcrumbNav aria-label="breadcrumb">
    <BreadcrumbList>
      {paths.map((path, index) => (
        <BreadcrumbItem key={index}>
          {index < paths.length - 1 ? (
            <Link href={path.url}>{path.name}</Link>
          ) : (
            <BreadcrumbLast>{path.name}</BreadcrumbLast>
          )}
        </BreadcrumbItem>
      ))}
    </BreadcrumbList>
  </BreadcrumbNav>
);

export default Breadcrumb;
