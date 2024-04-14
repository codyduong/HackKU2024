'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from './Modal';
import AccountModal from './AccountModal';
import { LuUserCircle } from 'react-icons/lu';

const NavbarBase = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 64px;
  z-index: 1000;
  position: sticky;
  box-shadow: 0 4px 16px #9cc599;
  /* ${(props) =>
    props.map
      ? css`
          position: absolute;
        `
      : css`
          position: sticky;
          box-shadow: 0 4px 16px rgba(197, 255, 207, 0.116);
        `} */
`;

const NavbarNav = styled.nav`
  max-width: 60%;
  flex-grow: 1;
  /* background-color: #232323;
  border-radius: 0 0 32px 32px; */
`;

const NavbarUl = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 1rem 4rem;
`;

const NavbarLi = styled.li`
  font-size: 1.5rem;
`;

const Avatar = styled.div`
  position: absolute;
  top: 8px;
  right: 20px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #ffffff30;
  }
`;

const AvatarIcon = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  overflow: hidden;
`;

interface NavbarProps {
  map: boolean;
}

const Navbar = (props: NavbarProps): JSX.Element => {
  const { map } = props;
  const { data: session } = useSession();
  const [showProfile, setShowProfile] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <Avatar
        onClick={() => {
          setShowProfile((prev) => !prev);
        }}
      >
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
      </Avatar>
      <AccountModal visible={showProfile} setVisible={setShowProfile} />
      {!map && (
        <NavbarBase>
          <NavbarNav>
            <NavbarUl>
              <NavbarLi>
                <Link href="/">Home</Link>
              </NavbarLi>
              <NavbarLi>
                <Link href="/map">Map</Link>
              </NavbarLi>
              {/* <NavbarLi>
                <Link href="/events">Events</Link>
              </NavbarLi> */}
            </NavbarUl>
          </NavbarNav>
        </NavbarBase>
      )}
    </>
  );
};

export default Navbar;
