'use client';

import styled from 'styled-components';
import Navbar from './Navbar';

const PageBase = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
`;

const PageContent = styled.div`
  display: flex;
  padding: 5rem 10rem;
  flex-grow: 1;
`;

const PageContent2 = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PageMain = styled.main`
  width: 100%;
  height: 100%;
`;

interface PageProps {
  children: React.ReactNode;
  padContent?: boolean;
}

const PageWrapper = (props: PageProps): JSX.Element => {
  const { children, padContent = true } = props;
  return (
    <PageBase>
      <Navbar />
      {padContent ? (
        <PageContent>
          <PageMain>{children}</PageMain>
        </PageContent>
      ) : (
        <PageContent2>
          <PageMain>{children}</PageMain>
        </PageContent2>
      )}
    </PageBase>
  );
};

export default PageWrapper;
