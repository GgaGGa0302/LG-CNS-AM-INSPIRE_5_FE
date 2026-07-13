import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header.jsx';
// 🌟 아까 확인한 카드 컴포넌트를 불러옵니다!
import BookmarkCard from '../features/bookmarks/BookmarkCard.jsx';

// 🌟 화면을 꾸며줄 가짜 찜 목록 데이터
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // 🌟 내 찜 목록을 관리할 상태(State) 공간
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const isLoggedIn = true; // 프론트 UI 확인을 위한 임시 패스

    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/login'); 
    } else {
      // 🌟 API 통신 대신 임시 데이터를 찜 목록 상태에 집어넣습니다.
      setBookmarks(MOCK_BOOKMARKS);
      setIsLoading(false); 
    }
  }, [navigate]);

  // 🌟 자식(BookmarkCard)에서 메모를 수정하고 '저장'을 눌렀을 때 실행됨
  const handleUpdate = (bookmarkId, updatedData) => {
    setBookmarks((prev) => 
      prev.map((item) => 
        item.bookmarkId === bookmarkId ? { ...item, ...updatedData } : item
      )
    );
  };

  // 🌟 자식(BookmarkCard)에서 '삭제'를 눌렀을 때 실행됨
  const handleDelete = (bookmarkId) => {
    // 삭제된 아이디만 쏙 빼고 나머지 축제들로만 화면을 다시 그립니다.
    setBookmarks((prev) => prev.filter((item) => item.bookmarkId !== bookmarkId));
  };

  if (isLoading) return null; 

  return (
    <>
      <Header />
      <PageWrapper>
        <PageInner>
          <PageTitle>나의 찜 목록 🧡</PageTitle>
          <PageSubtitle>
            내가 찜한 축제와 정성스럽게 남긴 메모들을 한눈에 모아보세요.
          </PageSubtitle>
          
          <ContentArea>
            {bookmarks.length === 0 ? (
              <EmptyState>
                아직 찜한 축제가 없습니다.<br/>
                메인 화면에서 마음에 드는 축제를 찾아 메모를 남겨보세요!
              </EmptyState>
            ) : (
              // 🌟 데이터가 있으면 예쁜 그리드 형태로 카드를 쫘르륵 나열합니다!
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
  background-color: #fcfcfc;
  min-height: calc(100vh - 80px); 
`;

const PageInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 40px;
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

// 🌟 카드들이 바둑판처럼 예쁘게 정렬되도록 도와주는 스타일
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;
