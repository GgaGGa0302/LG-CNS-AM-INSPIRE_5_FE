import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header.jsx';
import { getFestivalDetail } from '../api/festivalsApi';
import {
  createBookmark,
  deleteBookmark,
} from '../api/bookmarksApi';
import FestivalDetailInfo from '../features/festivals/FestivalDetailInfo.jsx';
import AiSummaryBox from '../features/bookmarks/AiSummaryBox.jsx';
import BookmarkButton from '../features/bookmarks/BookmarkButton.jsx';

const MOCK_FESTIVALS = [
  {
    contentId: '1', title: '서울 봄꽃 축제', region: '11', startDate: '2026-04-01', endDate: '2026-04-15',
    content: '가족과 함께 즐기기 좋은 서울 봄꽃 축제입니다.\n유모차 동선이 잘 정비되어 있으며, 다양한 체험 프로그램이 마련되어 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop',
    aiInfo: 'AI 분석 정보가 없습니다.', isBookmarked: true, bookmarkId: 'b1', addr: '서울특별시 (상세주소)'
  },
  {
    contentId: '2', title: '부산 해운대 모래축제', region: '26', startDate: '2026-05-10', endDate: '2026-05-20',
    content: '해운대 해수욕장에서 펼쳐지는 환상적인 모래 조각 전시를 감상할 수 있는 축제입니다. 다양한 체험 프로그램도 함께 즐겨보세요.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    aiInfo: 'AI 분석 정보가 없습니다.', isBookmarked: false, bookmarkId: null, addr: '부산광역시 (상세주소)'
  },
  {
    contentId: '3', title: '제주 유채꽃 축제', region: '50', startDate: '2026-03-20', endDate: '2026-04-10',
    content: '노란 유채꽃이 만발한 제주에서 봄의 정취를 만끽할 수 있는 축제입니다. 아름다운 풍경 속에서 인생 사진을 남겨보세요.',
    imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop',
    aiInfo: 'AI 분석 정보가 없습니다.', isBookmarked: false, bookmarkId: null, addr: '제주특별자치도 (상세주소)'
  },
];

const DetailPage = () => {
  const { festivalId } = useParams();
  const [festival, setFestival] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  
  // 🌟 모달(팝업창)과 메모를 위한 새로운 상태(State)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memo, setMemo] = useState('');

  const fetchPageData = async () => {
    setIsLoading(true);
    try {
      console.log(festivalId)
      const response = await getFestivalDetail(festivalId);
      setFestival(response.data);
      console.log('Festival detail:', response.data);
    } catch (err) {
      console.error('Failed to fetch festival detail:', err);
      setFestival(null); // API 실패 시 데이터를 null로 설정하여 빈 상태를 유도
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [festivalId]);

  // 🌟 찜하기 버튼을 처음 눌렀을 때 실행되는 함수
  const handleBookmarkClick = async () => {
    if (isToggling || !festival) return;

    if (festival.isBookmarked) {
      // 이미 찜한 상태면 바로 찜 해제 API 호출
      setIsToggling(true);
      try {
        await deleteBookmark(festival.bookmarkId);
        await fetchPageData(); 
      } catch (err) {
        // 백엔드 미연결 시 프론트 임시 성공 처리
        // setFestival((prev) => ({ ...prev, isBookmarked: false }));
      } finally {
        setIsToggling(false);
      }
    } else {
      // 찜하지 않은 상태면 모달창(팝업) 띄우기
      setIsModalOpen(true);
    }
  };

  // 🌟 모달창에서 '저장' 버튼을 눌렀을 때 실행되는 함수
  const handleModalSubmit = async () => {
    setIsToggling(true);
    try {
      await createBookmark({
        contentId: festival.contentId,
        title: festival.title,
        region: festival.region,
        imageUrl: festival.imageUrl,
        content: festival.content,
        aiInfo: festival.aiInfo,
        userMemo: memo, // 🌟 찜하기 시 메모도 함께 전송
        addr: festival.addr || ''
      });
      await fetchPageData();
    } catch (err) {
      // 🌟 찜하기 실패 시 사용자에게 알림을 표시합니다.
      alert('찜하기에 실패했습니다. 입력 내용을 확인하거나 잠시 후 다시 시도해주세요.');
      console.error('찜하기 실패:', err);
    } finally {
      setIsModalOpen(false); // 팝업 닫기
      setMemo(''); // 메모 입력칸 초기화
      setIsToggling(false);
    }
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <PageInner>
          <DetailLayout>
            <LeftColumn> 
              <FestivalDetailInfo festival={festival} loading={isLoading} />
            </LeftColumn>
            <RightColumn>
              <AiSummaryBox
                summary={festival?.aiInfo?.split('\n') || []}
                loading={isLoading}
              />
              <BookmarkSection>
                <BookmarkButtonWrapper
                  isBookmarked={festival?.isBookmarked || false}
                  loading={isToggling}
                  onToggle={handleBookmarkClick} // 🌟 연결 함수 변경
                />
              </BookmarkSection>
            </RightColumn>
          </DetailLayout>
        </PageInner>
      </PageWrapper>

      {/* 🌟 [목표 2] 찜하기 메모 팝업창 UI (isModalOpen이 true일 때만 보임) */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>이 축제가 마음에 드시나요?</h3>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
              마이페이지에 함께 저장될 나만의 여행 계획이나 팁을 자유롭게 남겨보세요!
            </p>
            <MemoInput 
              placeholder="예: 아이들 데리고 토요일 아침 일찍 출발하기" 
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <ButtonGroup>
              <ModalButton onClick={() => setIsModalOpen(false)}>취소</ModalButton>
              <ModalButton $primary onClick={handleModalSubmit}>
                {isToggling ? '저장 중...' : '찜하고 메모 저장하기'}
              </ModalButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default DetailPage;

// Styles (기존 스타일 유지)
const PageWrapper = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PageInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const DetailLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  position: sticky;
  top: calc(${({ theme }) => theme.layout.headerHeight} + ${({ theme }) => theme.spacing.xl});
`;

const BookmarkSection = styled.div` margin-top: auto; `;

const BookmarkButtonWrapper = styled(BookmarkButton)``;

// 🌟 팝업창(Modal)용 새로운 스타일 컴포넌트 추가
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 450px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const MemoInput = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-family: inherit;
  margin-bottom: 20px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #c05c36;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${(props) => (props.$primary ? '#c05c36' : '#f0f0f0')};
  color: ${(props) => (props.$primary ? 'white' : '#333')};

  &:hover {
    background-color: ${(props) => (props.$primary ? '#a04825' : '#e4e4e4')};
  }
`;
