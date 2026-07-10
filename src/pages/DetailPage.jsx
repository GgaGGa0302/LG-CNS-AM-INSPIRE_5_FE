import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header.jsx';
import { getFestivalDetail } from '../api/festivalsApi';
import {
  getBookmarks,
  createBookmark,
  deleteBookmark,
} from '../api/bookmarksApi';
import FestivalDetailInfo from '../features/festivals/FestivalDetailInfo.jsx';
import AiSummaryBox from '../features/bookmarks/AiSummaryBox.jsx';
import BookmarkButton from '../features/bookmarks/BookmarkButton.jsx';

const MOCK_FESTIVAL = {
  contentId: '1',
  title: '서울 봄꽃 축제',
  region: '11',
  startDate: '2026-04-01',
  endDate: '2026-04-15',
  content:
    '가족과 함께 즐기기 좋은 서울 봄꽃 축제입니다.\n유모차 동선이 잘 정비되어 있으며, 다양한 체험 프로그램이 마련되어 있습니다.',
  imageUrl: '',
  aiInfo: 'AI 분석 정보가 없습니다.',
};

const DetailPage = () => {
  const { festivalId } = useParams();
  const [festival, setFestival] = useState(null);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  const fetchPageData = async () => {
    setIsLoading(true);
    try {
      const [festivalResponse, bookmarksResponse] = await Promise.all([
        getFestivalDetail(festivalId),
        getBookmarks(),
      ]);
      setFestival(festivalResponse.data.data);
      setUserBookmarks(bookmarksResponse.data.data || []);
    } catch {
      setFestival({ ...MOCK_FESTIVAL, contentId: festivalId });
      setUserBookmarks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, [festivalId]);

  const currentBookmark = userBookmarks.find(
    (b) => b.contentId === festival?.contentId,
  );
  const isBookmarked = !!currentBookmark;

  const handleBookmarkToggle = async () => {
    if (isToggling || !festival) return;
    setIsToggling(true);
    try {
      if (isBookmarked) {
        await deleteBookmark(currentBookmark.bookmarkId);
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
                  isBookmarked={isBookmarked}
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
