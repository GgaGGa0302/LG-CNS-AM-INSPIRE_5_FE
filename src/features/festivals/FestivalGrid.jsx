import styled from 'styled-components';
import FestivalCard from './FestivalCard';

const FestivalGrid = ({ festivals = [], loading = false }) => {
  if (loading) {
    return <EmptyMessage>축제를 검색하고 있습니다...</EmptyMessage>;
  }

  if (festivals.length === 0) {
    return <EmptyMessage>검색 결과가 없습니다. 지역명을 입력해 보세요.</EmptyMessage>;
  }

  return (
    <GridContainer>
      <Grid>
        {festivals.map((festival) => (
          <FestivalCard key={festival.contentId || festival.id} festival={festival} />
        ))}
      </Grid>
    </GridContainer>
  );
};

export default FestivalGrid;

// Styles
const GridContainer = styled.div`
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
  padding: 40px ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;
  display: flex;
  justify-content: center; /* 🌟 결과가 몇 개든 화면 한가운데에 오도록 셋팅! */
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap; /* 🌟 가로 크기가 고정된 카드들이 공간이 부족하면 자연스럽게 아래로 떨어지게 설정 */
  gap: 24px; /* 카드 간의 우아한 여백 */
  justify-content: center; /* 고정된 카드들이 이쁘게 가운데 정렬 */
  width: 100%;
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;