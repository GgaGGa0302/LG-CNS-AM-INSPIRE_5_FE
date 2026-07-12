import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header.jsx';
import { searchFestivals } from '../api/festivalsApi';
import FestivalSearchBar from '../features/festivals/FestivalSearchBar.jsx';
import FestivalGrid from '../features/festivals/FestivalGrid.jsx';

const MOCK_FESTIVALS = [
  {
    id: '1',
    title: '서울 봄꽃 축제',
    location: '서울특별시 강남구',
    startDate: '2026-04-01',
    endDate: '2026-04-15',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop', // 화사한 벚꽃 이미지
    category: 'Culture',
    aiScore: 96,
  },
  {
    id: '2',
    title: '부산 해운대 모래축제',
    location: '부산광역시 해운대구',
    startDate: '2026-05-10',
    endDate: '2026-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', // 시원한 해변 이미지
    category: 'Art',
    aiScore: 92,
  },
  {
    id: '3',
    title: '제주 유채꽃 축제',
    location: '제주특별자치도 서귀포시',
    startDate: '2026-03-20',
    endDate: '2026-04-10',
    imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop', // 아름다운 봄꽃/자연 이미지
    category: 'Nature',
    aiScore: 98,
  },
];

const FILTER_CHIPS = ['Stroller accessible', 'Parking info', 'Family-friendly', 'Indoor', 'Free'];

const MainPage = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (params) => {
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await searchFestivals(params);
      setFestivals(data.festivals || data);
    } catch {
      setFestivals(MOCK_FESTIVALS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <HeroSection>
        <HeroContent>
          <HeroTitle>Find Your Family's Perfect Festival</HeroTitle>
          <HeroSubtitle>우리 가족에게 딱 맞는 축제를 찾아보세요</HeroSubtitle>
          <FestivalSearchBar onSearch={handleSearch} />
        </HeroContent>
      </HeroSection>
      <MainContent>
        <FilterSection>
          {/* <FilterChipList>
            {FILTER_CHIPS.map(chip => (
              <FilterChip key={chip}>{chip}</FilterChip>
            ))}
          </FilterChipList> */}
        </FilterSection>
        <FestivalGrid festivals={searched ? festivals : []} loading={loading} />
      </MainContent>
    </>
  );
};

export default MainPage;

// Styles
const HeroSection = styled.div`
  background: linear-gradient(135deg, #2C6B4F, #1a4030);
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.display};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MainContent = styled.main`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;

const FilterChipList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm}; /* For shadow visibility */
`;

const FilterChip = styled.button`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;
