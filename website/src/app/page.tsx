'use client';

import PageWrapper from '@/components/PageWrapper';
import { signOut, signIn, useSession } from 'next-auth/react';
import styled from 'styled-components';

const MainPage = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <PageWrapper>
      <h1> Welcome to Next.js!</h1>

      {session ? (
        <>
          <span>Signed in as {session.user?.email}</span>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <span>You are not signed in </span>
          <button
            onClick={() => {
              signIn();
            }}
          >
            Sign in
          </button>
        </>
      )}
    </PageWrapper>
  );
};

export default MainPage;
