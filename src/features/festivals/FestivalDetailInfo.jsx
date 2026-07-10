import styled from 'styled-components';
import { getRegionName } from '../../utils/regionMapper.js';

const FestivalDetailInfo = ({ festival }) => {
  if (!festival) return null;

  // API 명세서에 맞게 데이터 키 이름 변경 (location -> region, description -> content)
  const { title, region, content, imageUrl } = festival;

  return (
    <div>
      <DetailImage $imageUrl={imageUrl}>
        {!imageUrl && '대표 이미지'}
      </DetailImage>
      <DetailTitle>{title}</DetailTitle>
      <DetailMeta>{getRegionName(region)}</DetailMeta>

      <DescriptionBox>
        <DescriptionTitle>About this Festival</DescriptionTitle>
        <DetailDescription>
          {content || '상세 소개글이 없습니다.'}
        </DetailDescription>
      </DescriptionBox>
    </div>
  );
};

export default FestivalDetailInfo;

// ==========================================
// 🎨 Styles (단일 파일 평탄화 완료)
// ==========================================

const DetailImage = styled.div`
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: ${({ theme }) => theme.colors.border};
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md}; /* 상하 여백 축소 */
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const DetailTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.display};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DetailMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// 📦 사진 속 부드러운 크림색 라운드 컨테이너 박스
const DescriptionBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #f4ebe1; /* 은은한 크림 베이지 보더 테두리 */
  border-radius: 24px; /* 사진 속 둥글고 부드러운 반경 */
  padding: 24px; /* 내부 여백 살짝 축소 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// ✒️ 사진 속 우아한 세리프 스타일 타이틀
const DescriptionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display || 'serif'};
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text || '#1a1a1a'};
  margin: 0;
`;

const DetailDescription = styled.p`
  font-size: 15px;
  color: #4a4a4a; /* 너무 무겁지 않은 다크 차콜 계열 컬러 */
  line-height: 1.75; /* 사진 속 가독성 높은 줄간격 */
  white-space: pre-wrap;
  margin: 0;
`;