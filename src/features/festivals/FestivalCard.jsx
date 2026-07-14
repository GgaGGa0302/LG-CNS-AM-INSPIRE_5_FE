import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FestivalCard = ({ festival }) => {
  const navigate = useNavigate();
  const { contentId, title, startDate, endDate, imageUrl, addr } = festival; 

  const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return dateString;
    return `${dateString.substring(0, 4)}.${dateString.substring(4, 6)}.${dateString.substring(6, 8)}`;
  };

  return (
     <Card onClick={() => navigate(`/festivals/${contentId}`)}>
      <CardImage $imageUrl={imageUrl}>
        {!imageUrl && '이미지 없음'}
      </CardImage>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardMeta>{addr || '지역 정보 없음'}</CardMeta>
        <CardMeta>
          {formatDate(startDate)} ~ {formatDate(endDate)}
        </CardMeta>
      </CardBody>
    </Card>
  );
};

export default FestivalCard;

// Styles
const Card = styled.article`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  /* 🌟 [치트키 1] 카드의 물리적 가로/세로 크기를 완전히 고정시킵니다! */
  /* 이제 화면이 넓어지든 좁아지든 이 크기 아래위로 절대 변하지 않아요! */
  width: 320px;
  height: 370px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CardImage = styled.div`
  width: 100%;
  
  /* 🌟 [치트키 2] 전체 카드 370px 중 무려 270px을 이미지 영역이 다 먹도록 길게 세팅! */
  /* 아래 쓸데없이 붕 뜨던 흰색 빈 공간이 완전히 사라지고 꽉 차 보입니다. */
  height: 270px; 
  flex-shrink: 0; /* 강제로 찌그러지지 않게 방어 */
  
  background-color: ${({ theme }) => theme.colors.border};
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : 'none'};
    
  background-size: cover; 
  background-position: top; /* 이미지를 위에서부터 표시하도록 변경 */
  background-repeat: no-repeat;
  position: relative;
`;

const CardBody = styled.div`
  /* 패딩을 세밀하게 조정해서 텍스트 밀도를 높입니다. */
  padding: 12px 16px; 
  display: flex;
  flex-direction: column;
  gap: 3px;
  
  /* 🌟 [치트키 3] 나머지 남은 100px은 텍스트 영역이 아주 슬림하고 깔끔하게 씁니다. */
  height: 100px; 
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.surface};
  justify-content: center;
`;

const CardTitle = styled.h3`
  // font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.md}; 
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

const CardMeta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs}; 
  color: ${({ theme }) => theme.colors.textLight};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;