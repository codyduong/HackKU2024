'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Modal from './Modal';
import styled from 'styled-components';
import Button from './Button';
import { LuUserCircle } from 'react-icons/lu';
import { useState } from 'react';

const AccountModalContentHorizontal = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
`;

const AccountModalContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
`;

const AvatarIcon = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  overflow: hidden;
`;

interface AccountModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountModal = (props: AccountModalProps): JSX.Element => {
  const { visible, setVisible } = props;

  const [imgError, setImgError] = useState(false);

  const { data: session } = useSession();
  return (
    <Modal visible={visible} setVisible={setVisible}>
      {session ? (
        <AccountModalContent>
          <AccountModalContentHorizontal>
            {session?.user?.image && !imgError ? (
              <AvatarIcon
                src={session?.user?.image}
                width={32}
                height={32}
                onError={() => {
                  setImgError(true);
                }}
              />
            ) : (
              <LuUserCircle width={32} height={32} size={32} />
            )}
            <AccountModalContent>
              <span>{session.user?.email}</span>
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </Button>
            </AccountModalContent>
          </AccountModalContentHorizontal>
        </AccountModalContent>
      ) : (
        <AccountModalContent>
          <span>You are not signed in</span>
          <Button
            onClick={() => {
              signIn();
            }}
          >
            Sign in
          </Button>
        </AccountModalContent>
      )}
    </Modal>
  );
};

export default AccountModal;
