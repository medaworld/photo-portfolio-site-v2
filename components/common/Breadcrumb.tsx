import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const BreadcrumbNav = styled.nav`
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 14px;
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

const Breadcrumb = ({ paths }) => (
  <BreadcrumbNav aria-label="breadcrumb">
    <BreadcrumbList>
      {paths.map((path, index) => (
        <BreadcrumbItem key={index}>
          {index < paths.length - 1 ? (
            <Link href={path.url}>{path.name}</Link>
          ) : (
            path.name
          )}
        </BreadcrumbItem>
      ))}
    </BreadcrumbList>
  </BreadcrumbNav>
);

export default Breadcrumb;
