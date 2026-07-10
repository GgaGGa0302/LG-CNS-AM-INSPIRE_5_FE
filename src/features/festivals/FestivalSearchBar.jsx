import { useState } from 'react';
import styled from 'styled-components';

const FestivalSearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, areaCode: '', sigunguCode: '' });
  };

  return (
    <SearchBarContainer as="form" onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="지역명을 입력하세요 (예: 서울, 강남구)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchButton type="submit">검색</SearchButton>
    </SearchBarContainer>
  );
};

export default FestivalSearchBar;

// Styles
const SearchBarContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  white-space: nowrap;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c25e2e; /* Darker terracotta */
  }
`;
