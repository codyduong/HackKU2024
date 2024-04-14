'use client';

import { useEffect, useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { signOut, signIn, useSession } from 'next-auth/react';
import styled from 'styled-components';

const PageContainer = styled.div<{ loaded: `${boolean}` }>`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ loaded }) => (loaded == 'true' ? '1' : '0')};
  transition: opacity 1s ease;
`;

const CenteredContent = styled.div`
  text-align: center;
  margin-top: 250px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 3.5em;
`;

const StyledButton = styled.button`
  background-color: #9cc599;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow:
    0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: #346037;
  }
`;

const MainPage = (): JSX.Element => {
  const { data: session } = useSession();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate fading in effect after component mounts
    setTimeout(() => {
      setLoaded(true);
    }, 1000); // Adjust the delay as needed
  }, []);

  return (
    <PageContainer loaded={`${loaded}`}>
      <PageWrapper>
        <CenteredContent>
          <Heading>Connect, Serve, Illuminate</Heading>

          {session ? (
            <>
              <span>Signed in as {session.user?.email}</span>
              <ButtonContainer>
                <StyledButton
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign out
                </StyledButton>
              </ButtonContainer>
            </>
          ) : (
            <>
              <span>Welcome to Beacon Board </span>
              <ButtonContainer>
                <StyledButton
                  onClick={() => {
                    signIn();
                  }}
                >
                  Sign in
                </StyledButton>
              </ButtonContainer>
            </>
          )}
        </CenteredContent>
      </PageWrapper>
    </PageContainer>
  );
};

export default MainPage;
