import styled from 'styled-components';

const SearchInputBase = styled.input`
  height: 48px;
  border-radius: 32px;
  padding: 8px;
  margin: 16px 24px;
  font: inherit;
`;

interface SearchInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  foo?: undefined;
}

const SearchInput = (props: SearchInputProps): JSX.Element => {
  const { ...rest } = props;

  return <SearchInputBase {...rest} />;
};

export default SearchInput;
