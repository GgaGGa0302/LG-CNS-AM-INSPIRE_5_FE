import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header.jsx';
import { searchFestivals } from '../api/festivalsApi';
import FestivalSearchBar from '../features/festivals/FestivalSearchBar.jsx';
import FestivalGrid from '../features/festivals/FestivalGrid.jsx';
// 🌟 utils 폴더에서 지역 이름 매핑 객체를 불러옵니다!
import { REGION_CODES } from '../utils/regionMapper.js'; 

const MOCK_FESTIVALS = [
  {
    id: '1', title: '서울 봄꽃 축제', location: '서울특별시 강남구', startDate: '2026-04-01', endDate: '2026-04-15',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop', category: 'Culture', aiScore: 96,
  },
  {
    id: '2', title: '부산 해운대 모래축제', location: '부산광역시 해운대구', startDate: '2026-05-10', endDate: '2026-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', category: 'Art', aiScore: 92,
  },
  {
    id: '3', title: '제주 유채꽃 축제', location: '제주특별자치도 서귀포시', startDate: '2026-03-20', endDate: '2026-04-10',
    imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop', category: 'Nature', aiScore: 98,
  },
  {
    id: '4', title: '여의도 벚꽃 축제', location: '서울특별시 영등포구', startDate: '2026-04-05', endDate: '2026-04-12',
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop', category: 'Nature', aiScore: 95,
  },
  {
    id: '5', title: '가평 자라섬 재즈 페스티벌', location: '경기도 가평군', startDate: '2026-10-01', endDate: '2026-10-05',
    imageUrl: 'https://images.unsplash.com/photo-1533174000220-4ea2d0755938?q=80&w=800&auto=format&fit=crop', category: 'Music', aiScore: 88,
  },
  {
    id: '6', title: '진해 군항제 벚꽃놀이', location: '경상남도 창원시', startDate: '2026-03-25', endDate: '2026-04-05',
    imageUrl: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?q=80&w=800&auto=format&fit=crop', category: 'Culture', aiScore: 99,
  },
  {
    id: '7', title: '강릉 단오제', location: '강원특별자치도 강릉시', startDate: '2026-06-10', endDate: '2026-06-15',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop', category: 'Culture', aiScore: 91,
  },
  {
    id: '8', title: '수원 화성문화제', location: '경기도 수원시', startDate: '2026-09-10', endDate: '2026-09-15',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop', category: 'History', aiScore: 89,
  },
  {
    id: '9', title: '경주 벚꽃 마라톤', location: '경상북도 경주시', startDate: '2026-04-04', endDate: '2026-04-04',
    imageUrl: 'https://images.unsplash.com/photo-1518659103848-185dcbfa551f?q=80&w=800&auto=format&fit=crop', category: 'Sports', aiScore: 94,
  },
  {
    id: '10', title: '속초 바다 축제', location: '강원특별자치도 속초시', startDate: '2026-07-20', endDate: '2026-07-30',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop', category: 'Nature', aiScore: 90,
  }
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
      // 🌟 백엔드 에러 발생 시(아직 API 없을 때) 실행되는 가짜 필터링 로직!
      setTimeout(() => {
        const regionName = REGION_CODES[params.region]; // 예: '1' -> '서울특별시'
        
        if (regionName) {
          // 선택된 지역 이름이 location에 포함된 축제만 쏙쏙 걸러냅니다.
          const filtered = MOCK_FESTIVALS.filter(festival => 
            festival.location.includes(regionName)
          );
          setFestivals(filtered);
        } else {
          // 지역이 없으면 전체를 다 보여줍니다.
          setFestivals(MOCK_FESTIVALS);
        }
        setLoading(false);
      }, 500); // 실제 API 통신처럼 보이게 0.5초 지연 효과
    }
  };

  return (
    <>
      <Header />
      <HeroSection>
        <HeroContent>
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

// Styles (기존 코드와 동일하게 유지)
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