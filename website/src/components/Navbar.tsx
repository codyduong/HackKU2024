'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';

const NavbarBase = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 64px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* Subtle shadow to create the drop-off effect */
`;

const NavbarNav = styled.nav`
  max-width: 60%;
  flex-grow: 1;
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
  top: 16px;
  right: 24px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  overflow: hidden;
`;

const Navbar = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <NavbarBase>
      <Avatar>
        <img src={session?.user?.image ?? ''} width={32} height={32} />
      </Avatar>
      <NavbarNav>
        <NavbarUl>
          <NavbarLi>
            <Link href="/">Home</Link>
          </NavbarLi>
          <NavbarLi>
            <Link href="/map">Map</Link>
          </NavbarLi>
          <NavbarLi>
            <Link href="/events">Events</Link>
          </NavbarLi>
        </NavbarUl>
      </NavbarNav>
    </NavbarBase>
  );
};

export default Navbar;
