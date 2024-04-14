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

export const CATEGORIES = [
  { name: 'Volunteer', ids: [99] },
  // @TODO
  { name: 'Lectures/Education', ids: [31] },
  { name: 'Art/Exhibit', ids: [2, 5] },
  { name: 'Food', ids: [3, 21] },
  { name: 'Health/Wellness', ids: [15, 17] },
] as const;

interface CategoryFiltersProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  clearSelectedEvents: () => void;
}

const CategoryFilters = (props: CategoryFiltersProps): JSX.Element => {
  const { search, setSearch, clearSelectedEvents } = props;

  return (
    <CategoryFilter>
      {CATEGORIES.map((cat) => (
        <CategoryItem
          key={cat.name}
          onClick={() => {
            setSearch(cat.name);
            clearSelectedEvents();
          }}
        >
          {cat.name}
        </CategoryItem>
      ))}
    </CategoryFilter>
  );
};

export default CategoryFilters;
