import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoMdHeart } from 'react-icons/io';
import Header from '../components/Header.jsx';
import { getBookmarks } from '../api/bookmarksApi';
import BookmarkCard from '../features/bookmarks/BookmarkCard.jsx';


const MOCK_BOOKMARKS = [
  {
    bookmarkId: 'b1',
    contentId: '1',
    title: '서울 봄꽃 축제',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop',
    userMemo: '아이들 데리고 토요일 아침 일찍 출발하기. 돗자리 챙길 것!',
  },
  {
    bookmarkId: 'b2',
    contentId: '2',
    title: '부산 해운대 모래축제',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    userMemo: '근처 맛집(돼지국밥) 검색해보기',
  }
];

const MyPage = () => {

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
  const fetchBookmarks = async () => {
    try {
      const response = await getBookmarks();
      console.log("북마크 전체 응답 구조:", response);

      if (response.data && response.data.data) {
        setBookmarks(response.data.data);
      } else {
        setBookmarks([]);
      }
      
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
      // setBookmarks(MOCK_BOOKMARKS); 
    } finally {
    }
  };

  fetchBookmarks();
}, []);

  const handleUpdate = (bookmarkId, updatedData) => {
    setBookmarks((prev) => 
      prev.map((item) => 
        item.bookmarkId === bookmarkId ? { ...item, ...updatedData } : item
      )
    );
  };

  const handleDelete = (bookmarkId) => {
    // 삭제된 아이디만 쏙 빼고 나머지 축제들로만 화면을 다시 그립니다.
    setBookmarks((prev) => prev.filter((item) => item.bookmarkId !== bookmarkId));
  };


  return (
    <>
      <Header />
      <PageWrapper>
        <PageInner>
          <TitleContainer>
            <TitleLeft>
              <SubTitle>나의 보관함</SubTitle>
              <PageTitle>내가 찜한 축제</PageTitle>
              <TotalDesc>{bookmarks.length}개의 축제를 보관 중이에요 · 카드를 누르면 상세 페이지로 이동합니다</TotalDesc>
            </TitleLeft>
            
            <CountBadge>
              <IoMdHeart className="heart-icon" size={16} />
              <span className="count-num">{bookmarks.length}</span>
              <span className="count-text">저장됨</span>
            </CountBadge>
          </TitleContainer>
          
          <ContentArea>
            {bookmarks.length === 0 ? (
              <EmptyState>
                아직 찜한 축제가 없습니다.<br/>
                메인 화면에서 마음에 드는 축제를 찾아 메모를 남겨보세요!
              </EmptyState>
            ) : (
              <CardGrid>
                {bookmarks.map((bookmark) => (
                  <BookmarkCard 
                    key={bookmark.bookmarkId} 
                    bookmark={bookmark} 
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </CardGrid>
            )}
          </ContentArea>
        </PageInner>
      </PageWrapper>
    </>
  );
};

export default MyPage;

// --- 스타일 컴포넌트 ---
const PageWrapper = styled.main`
  flex: 1;
  padding: 60px 20px;
  /* background-color: #fcfcfc; */ /* 다른 페이지와 통일성을 위해 제거 */
  min-height: calc(100vh - 80px); 
`;

const PageInner = styled.div`
  max-width: 1000px;
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
  font-size: ${({ theme }) => theme.fontSizes.s};
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

const ContentArea = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  min-height: 400px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #999;
  font-size: 1.1rem;
  line-height: 1.6;
  padding: 60px 0;
  background-color: #f9f9f9;
  border-radius: 12px;
  border: 1px dashed #ddd;
`;


const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;
