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
    contentId: '1',
    title: '서울 봄꽃 축제',
    region: '11', // 서울
    startDate: '2026-04-01',
    endDate: '2026-04-15',
    content:
      '가족과 함께 즐기기 좋은 서울 봄꽃 축제입니다.\n유모차 동선이 잘 정비되어 있으며, 다양한 체험 프로그램이 마련되어 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop',
    aiInfo: 'AI 분석 정보가 없습니다.',
    isBookmarked: true,
    bookmarkId: null,
  },
  {
    contentId: '2',
    title: '부산 해운대 모래축제',
    region: '26', // 부산
    startDate: '2026-05-10',
    endDate: '2026-05-20',
    content: '해운대 해수욕장에서 펼쳐지는 환상적인 모래 조각 전시를 감상할 수 있는 축제입니다. 다양한 체험 프로그램도 함께 즐겨보세요.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    aiInfo: 'AI 분석 정보가 없습니다.',
    isBookmarked: false,
    bookmarkId: null,
  },
  {
    contentId: '3',
    title: '제주 유채꽃 축제',
    region: '50', // 제주
    startDate: '2026-03-20',
    endDate: '2026-04-10',
    content: '노란 유채꽃이 만발한 제주에서 봄의 정취를 만끽할 수 있는 축제입니다. 아름다운 풍경 속에서 인생 사진을 남겨보세요.',
    imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop',
    aiInfo: 'AI 분석 정보가 없습니다.',
    isBookmarked: false,
    bookmarkId: null,
  },
];

const DetailPage = () => {
  const { festivalId } = useParams();
  const [festival, setFestival] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  const fetchPageData = async () => {
    setIsLoading(true);
    try {
      const response = await getFestivalDetail(festivalId);
      setFestival(response.data.data);
    } catch {
      // console.error('Failed to fetch festival detail');
      const fallbackFestival =
        MOCK_FESTIVALS.find((f) => f.contentId === festivalId)
      setFestival({ ...fallbackFestival, contentId: festivalId });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, [festivalId]);

  const handleBookmarkToggle = async () => {
    if (isToggling || !festival) return;
    setIsToggling(true);
    try {
      if (festival.isBookmarked) {
        await deleteBookmark(festival.bookmarkId);
      } else {
        await createBookmark({
          contentId: festival.contentId,
          title: festival.title,
          region: festival.region,
          imageUrl: festival.imageUrl,
          content: festival.content,
          aiInfo: festival.aiInfo,
        });
      }
      await fetchPageData(); // Re-fetch data to get the latest state
    } catch (err) {
      console.error('Bookmark toggle failed:', err);
    } finally {
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
              <FestivalDetailInfo festival={festival} />
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
                  onToggle={handleBookmarkToggle}
                />
              </BookmarkSection>
            </RightColumn>
          </DetailLayout>
        </PageInner>
      </PageWrapper>
    </>
  );
};

export default DetailPage;

// Styles
const PageWrapper = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PageInner = styled.div`
  max-width: 1100px; /* 전체적인 가로 폭을 줄여 더 집중된 레이아웃으로 조정 */
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

const BookmarkButtonWrapper = styled(BookmarkButton)``; // 스타일링 제거, 구조만 유지
