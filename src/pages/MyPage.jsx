import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoMdHeart } from 'react-icons/io';
import Header from '../components/Header.jsx';
import { getBookmarks } from '../api/bookmarksApi';
import BookmarkCard from '../features/bookmarks/BookmarkCard.jsx';

const MOCK_BOOKMARKS = [
  {
    bookmarkId: 'mock-1',
    title: '서울 봄꽃 축제 (Mock)',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop',
    userMemo: '아이들과 함께 가기 좋아요!',
    contentId: '1'
  },
  {
    bookmarkId: 'mock-2',
    title: '부산 해운대 모래축제 (Mock)',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    userMemo: '주차장 미리 확인 필요',
    contentId: '2'
  },
  {
    bookmarkId: 'mock-3',
    title: '제주 유채꽃 축제 (Mock)',
    imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=800&auto=format&fit=crop',
    userMemo: '사진 찍기 좋은 곳. 사람이 많으니 아침 일찍 가는 것을 추천!',
    contentId: '3'
  },
];

const MyPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await getBookmarks();
        setBookmarks(response.data.data || []); 
      } catch {
        setBookmarks(MOCK_BOOKMARKS);
        // alert('찜 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
        // setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleUpdate = (id, updates) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.bookmarkId === id ? { ...b, ...updates } : b)),
    );
  };

  const handleDelete = (id) => {
    setBookmarks((prev) => prev.filter((b) => b.bookmarkId !== id));
  };

  return (
    <>
      <Header />
      <MainContent>
        <PageInner>
  
          <TitleContainer>
            <TitleLeft>
              <SubTitle>YOUR COLLECTION</SubTitle>
              <PageTitle>내가 찜한 축제</PageTitle>
              <TotalDesc>{bookmarks.length} festivals saved · Tap a card to explore details</TotalDesc>
            </TitleLeft>
            
            <CountBadge>
              <IoMdHeart className="heart-icon" size={16} />
              <span className="count-num">{bookmarks.length}</span>
              <span className="count-text">저장됨</span>
            </CountBadge>
          </TitleContainer>

          {loading ? (
            <EmptyMessage>불러오는 중...</EmptyMessage>
          ) : bookmarks.length === 0 ? (
            <EmptyMessage>아직 찜한 축제가 없습니다.</EmptyMessage>
          ) : (
            <BookmarkGrid>
              {bookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.bookmarkId}
                  bookmark={bookmark}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </BookmarkGrid>
          )}
        </PageInner>
      </MainContent>
    </>
  );
};

export default MyPage;


const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PageInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

// 📌 상단 헤더 정렬용 컨테이너 (왼쪽: 타이틀 섹션 / 오른쪽: 뱃지 박스)
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* 아래선 정렬 */
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const TitleLeft = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left; /* 왼쪽 정렬 변경 */
`;

const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  color: #d76d38; /* 아까 추출한 테라코타 포인트 컬러 적용 */
  letter-spacing: 0.05em;
  margin-bottom: 6px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const TotalDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const CountBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #ffffff;
  padding: 8px 16px;
  border-radius: 100px;
  border: 1px solid #e9ded3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  height: fit-content;
  margin-bottom: 6px; /* 설명 글 라인과 균형 맞춤 */

  .heart-icon {
    color: #c92a2a; /* 핑크/레드 하트 컬러 */
  }

  .count-num {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  .count-text {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const BookmarkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textLight};
`;