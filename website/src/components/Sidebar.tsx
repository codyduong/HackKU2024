'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';
import IconButton from './IconButton';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoAdd, IoCloseSharp } from 'react-icons/io5';
import UploadModal from './UploadModal';

const SliderbarSliderItem = styled.li`
  width: 100%;
  height: 48px;
  font-size: 1.5rem;
  padding: 8px 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: background-color 0.225s ease-in-out;
  &:hover {
    background-color: #ffffff30;
  }
`;

const SliderbarSliderMain = styled.div`
  display: flex;
  flex-direction: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 8px;
`;

const LogoWrapper = styled.button`
  cursor: pointer;
  transition: background-color 0.225s ease-in-out;
  width: 50%;
  &:hover {
    background-color: #ffffff30;
  }
`;

// const Logo = styled.img`

// `;

const SliderbarSliderUl = styled.ul`
  flex-grow: 1;
  width: 100%;
`;

const SidebarSliderBase = styled.div`
  height: 100vh;
  width: 320px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 7000;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: #505050;
  transform: translateX(-320px);
  transition: all 0.7s ease-in-out;

  &.open {
    box-shadow: 0px 0px 4px 8px rgba(0, 0, 0, 0.5);
    transform: translateX(0px);
  }
`;

const SliderOverlay = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  background-color: #000;
  z-index: 6000;
  transition: opacity 0.225s ease-in-out;
  opacity: 0;
  &.open {
    opacity: 0.25;
  }
`;

const SliderOverlayClickable = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: inherit;
  z-index: inherit;
`;

const IconButton2 = styled(IconButton)`
  width: 32px;
  height: 32px;
`;

interface SidebarSlider {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarSlider = (props: SidebarSlider): JSX.Element => {
  const { open, setOpen } = props;
  const [isInDOM, setIsInDOM] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  // Manage DOM presence based on isOpen state
  useEffect(() => {
    if (open) {
      clearTimeout(timeoutId);
      setIsInDOM(true);
    }
    if (!open) {
      setTimeoutId((prev) => {
        if (prev) {
          clearTimeout(prev);
        }
        return setTimeout(() => {
          setIsInDOM(false);
        }, 700);
      });
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [open]);

  return (
    <>
      <SliderOverlay className={open ? 'open' : ''}>
        {(isInDOM || open) && (
          <SliderOverlayClickable
            onClick={() => {
              setOpen(false);
            }}
          />
        )}
      </SliderOverlay>

      <SidebarSliderBase
        className={open ? 'open' : ''}
        // onTransitionEnd={handleTransitionEnd}
      >
        {(isInDOM || open) && (
          <SliderbarSliderUl>
            <SliderbarSliderMain>
              <LogoWrapper>
                {/* <Image
                  src="/beacon board.png"
                  alt="Beacon Board Logo"
                  width={96}
                  height={96}
                  priority
                /> */}
              </LogoWrapper>
              <IconButton2
                icon={<IoCloseSharp x={32} y={32} size={32} />}
                onClick={() => setOpen((prev) => !prev)}
              />
            </SliderbarSliderMain>
            <SliderbarSliderItem>
              <Link href="/">Home</Link>
            </SliderbarSliderItem>
            {/* <SliderbarSliderItem>
              <Link href="/events">Events</Link>
            </SliderbarSliderItem> */}
          </SliderbarSliderUl>
        )}
      </SidebarSliderBase>
    </>
  );
};

const SidebarBase = styled.div`
  height: 100vh;
  width: 64px;
  position: absolute;
  background-color: #414141;
  z-index: 5000;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 16px 8px;
  box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.5);
  gap: 16px;
`;

const Sidebar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <UploadModal visible={addOpen} setVisible={setAddOpen} />
      <SidebarSlider open={open} setOpen={setOpen} />
      <SidebarBase>
        <IconButton
          icon={<GiHamburgerMenu x={32} y={32} size={32} />}
          onClick={() => setOpen((prev) => !prev)}
        />
        <IconButton
          icon={<IoAdd x={32} y={32} size={32} />}
          onClick={() => setAddOpen((prev) => !prev)}
        />
      </SidebarBase>
    </>
  );
};

export default Sidebar;
