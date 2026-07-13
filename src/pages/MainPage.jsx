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
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop',
    category: 'Culture',
    aiScore: 96,
  },
  {
    id: '2',
    title: '부산 해운대 모래축제',
    location: '부산광역시 해운대구',
    startDate: '2026-05-10',
    endDate: '2026-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    category: 'Art',
    aiScore: 92,
  },
  {
    id: '3',
    title: '제주 유채꽃 축제',
    location: '제주특별자치도 서귀포시',
    startDate: '2026-03-20',
    endDate: '2026-04-10',
    imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop',
    category: 'Nature',
    aiScore: 98,
  },
];

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
          {/* 🎯 피그마 최상단 AI 큐레이션 배지 반영
          <AIBadge>AI-POWERED CURATION</AIBadge> */}

          <HeroTitle>
            <span>Find Your Family's</span>
            <span className="highlight">Perfect Festival</span>
          </HeroTitle>
          
          <HeroSubtitle>
            우리 가족에게 딱 맞는 축제를 찾아보세요
          </HeroSubtitle>
          <FestivalSearchBar onSearch={handleSearch} />
        </HeroContent>
      </HeroSection>
      <MainContent>
        <FestivalGrid festivals={searched ? festivals : []} loading={loading} />
      </MainContent>
    </>
  );
};

export default MainPage;


const HeroSection = styled.div`
  background: linear-gradient(
    105deg, 
    #322219 0%,  
    #2a2c1f 40%, 
    #224430 75%, 
    #25583b 100%   
  );
  padding: 55px 20px;
  text-align: center;
  position: relative;

 
  &::after {
    content: '';
    position: absolute;
    top: -150px;
    right: -150px;
    width: 450px;
    height: 450px;
    background: radial-gradient(
      circle, 
      rgba(59, 133, 96, 0.5) 0%,
      rgba(59, 133, 96, 0.18) 50%,   
      transparent 75%                
    );
    pointer-events: none; 
  }
`;
const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const AIBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #d1a153; /* 피그마 골드 계열 */
  background-color: rgba(209, 161, 83, 0.1);
  border: 1px solid rgba(209, 161, 83, 0.3);
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
`;


const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column; 
  gap: 4px;
  
  color: #ffffff;

  .highlight {
    color: #dfb15b; 
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const MainContent = styled.main`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;