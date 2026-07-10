import styled from 'styled-components';
import { FaRegStar, FaCheck } from 'react-icons/fa'; // 상단 별, 체크 아이콘

const PLACEHOLDER_SUMMARY = [
  '유모차 접근이 용이한 주요 동선이 마련되어 있습니다.',
  '인근 공영주차장 이용 시 도보 5분 거리입니다.',
  '가족 휴게 공간 및 수유실이 축제장 내 운영됩니다.',
];

const AiSummaryBox = ({ summary, loading = false }) => {
  const lines = summary?.length > 0 ? summary : PLACEHOLDER_SUMMARY;

  return (
    <SummaryBox>
  
      <HeaderSection>
        <StarBadge>
          <FaRegStar size={14} />
        </StarBadge>
        <HeaderTitleDocs>
          <h4>AI Family Analysis</h4>
          <p>Based on real-time public data</p>
        </HeaderTitleDocs>
      </HeaderSection>

      <ContentSection>
        {loading ? (
          <LoadingText>AI가 정보를 분석하고 있습니다...</LoadingText>
        ) : (
          <SummaryList>
            {lines.map((line, index) => (
              <SummaryItem key={index}>✨ {line}</SummaryItem>
            ))}
          </SummaryList>
        )}
      </ContentSection>
    </SummaryBox>
  );
};

export default AiSummaryBox;


const SummaryBox = styled.div`
  background: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.lg || '24px'};
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f4ebe1;
`;

const HeaderSection = styled.div`
  background-color: #33231a; /* 사진 속 딥 브라운 색상 */
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const StarBadge = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dfa857; /* 금색 별 색상 */
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const HeaderTitleDocs = styled.div`
  display: flex;
  flex-direction: column;
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  }
  
  p {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    margin: 2px 0 0 0;
  }
`;

const ContentSection = styled.div`
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SummaryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SummaryItem = styled.li`
  font-size: 14px;
  font-weight: 600;
  color: #1e3a2f;
  line-height: 1.5;
  margin: 0;
  // text-align: center; 
`;

const LoadingText = styled.p`
  font-size: 14px;
  color: #8c7e74;
  font-style: italic;
  text-align: center;
  padding: 20px 0;
  margin: 0;
`;