import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FestivalCard = ({ festival }) => {
  const navigate = useNavigate();
  const { id, title, location, startDate, endDate, imageUrl } = festival;

  return (
    <Card onClick={() => navigate(`/festivals/${id}`)}>
      <CardImage $imageUrl={imageUrl}>
        {!imageUrl && '이미지 없음'}
      </CardImage>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardMeta>{location}</CardMeta>
        <CardMeta>
          {startDate} ~ {endDate}
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

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CardImage = styled.div`
  width: 100%;
  padding-top: 66.66%; /* 3:2 aspect ratio */
  background-color: ${({ theme }) => theme.colors.border};
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl}; /* 카드 크기에 맞춰 폰트 크기 증가 */
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
