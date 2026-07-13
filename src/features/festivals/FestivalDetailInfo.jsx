import styled from 'styled-components';
import { getRegionName } from '../../utils/regionMapper.js';

const FestivalDetailInfo = ({ festival }) => {
  if (!festival) return null;

  const { title, region, content, imageUrl } = festival;

  return (
    <div>
      <DetailImage $imageUrl={imageUrl}>
        {!imageUrl && '대표 이미지'}
      </DetailImage>
      <DetailTitle>{title}</DetailTitle>
      <DetailMeta>{getRegionName(region)}</DetailMeta>

      <DescriptionBox>
        <DescriptionTitle>축제 소개</DescriptionTitle>
        <DetailDescription>
          {content || '상세 소개글이 없습니다.'}
        </DetailDescription>
      </DescriptionBox>
    </div>
  );
};

export default FestivalDetailInfo;



const DetailImage = styled.div`
  width: 100%;
  padding-top: 56.25%; /
  background-color: ${({ theme }) => theme.colors.border};
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const DetailTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DetailMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;


const DescriptionBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #f4ebe1;
  border-radius: 24px; 
  padding: 24px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const DescriptionTitle = styled.h2`
  // font-family: ${({ theme }) => theme.fonts.display || 'serif'};
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text || '#1a1a1a'};
  margin: 0;
`;

const DetailDescription = styled.p`
  font-size: 15px;
  color: #4a4a4a;
  line-height: 1.75;
  white-space: pre-wrap;
  margin: 0;
`;