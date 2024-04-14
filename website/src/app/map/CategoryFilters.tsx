import styled from 'styled-components';

const CategoryFilter = styled.ul`
  height: 48px;
  position: absolute;
  left: 464px;
  margin-left: 16px;
  top: 16px;
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
  align-items: center;
`;

const CategoryItem = styled.li`
  height: 32px;
  border-radius: 16px;
  // color: #000;
  background-color: #505050;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  transition: background-color 0.255s ease-in-out;
  &:hover {
    background-color: #606060;
  }
`;

const CATEGORIES = [
  { name: 'Volunteer', ids: [99] },
  // @TODO
  { name: 'Lectures/Education', ids: [] },
  { name: 'Art/Exhibit', ids: [] },
  { name: 'Food', ids: [] },
] as const;

interface CategoryFiltersProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilters = (props: CategoryFiltersProps): JSX.Element => {
  const { search, setSearch } = props;

  return (
    <CategoryFilter>
      {CATEGORIES.map((cat) => (
        <CategoryItem
          key={cat.name}
          onClick={() => {
            setSearch(cat.name);
          }}
        >
          {cat.name}
        </CategoryItem>
      ))}
    </CategoryFilter>
  );
};

export default CategoryFilters;
