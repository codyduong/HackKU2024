import styled from 'styled-components';

const IconButtonWrapper = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  z-index: 1000;
  width: 48px;
  height: 48px;

  cursor: pointer;
  transition: background-color 0.225s ease-in-out;
  &:hover {
    background-color: #ffffff30;
  }
`;

type IconButtonsProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: React.ReactNode;
};

const IconButton = (props: IconButtonsProps): JSX.Element => {
  const { icon, ...rest } = props;
  return <IconButtonWrapper {...rest}>{icon}</IconButtonWrapper>;
};

export default IconButton;
