'use client';

import styled from 'styled-components';

const SidebarBase = styled.div`
  height: 100vh;
  width: 64px;
  position: absolute;
  background-color: #414141;
  z-index: 1000000;
`;

const Sidebar = (): JSX.Element => {
  return <SidebarBase></SidebarBase>;
};

export default Sidebar;
