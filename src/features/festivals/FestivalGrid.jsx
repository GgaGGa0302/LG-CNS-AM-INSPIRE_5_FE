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
    <Grid>
      {festivals.map((festival) => (
        <FestivalCard key={festival.id} festival={festival} />
      ))}
    </Grid>
  );
};

export default FestivalGrid;

// Styles
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 그리드로 변경하여 카드 크기 확대 */
  gap: ${({ theme }) => theme.spacing.lg};


  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }


`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;
