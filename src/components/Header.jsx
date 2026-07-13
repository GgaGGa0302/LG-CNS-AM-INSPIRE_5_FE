import styled, { css } from 'styled-components'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// 🛠️ 깔끔한 라인 스타일의 웹 아이콘 임포트
import { FiSearch, FiHeart } from 'react-icons/fi';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 📍 현재 어떤 페이지에 있는지 주소 가져오기

  const isLogin = true;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <LogoContainer to="/">
          <LogoIcon>🎡</LogoIcon>
          <LogoText>FestMily</LogoText>
        </LogoContainer>
        <Nav>
          {isLogin ? (
            <>
              {/* 🔍 축제 찾기 */}
              <NavLink $isActive={location.pathname === '/'} to="/">
                <FiSearch className="nav-icon" />
                <span>축제 찾기</span>
              </NavLink>
              
              {/* 🧡 찜 목록 */}
              <NavLink $isActive={location.pathname === '/mypage'} to="/mypage">
                <FiHeart className="nav-icon" />
                <span>찜 목록</span>
                {/* <Badge>3</Badge> */}
              </NavLink>
              
              {/* 🚪 로그아웃 */}
              <NavLink as="button" onClick={handleLogout}>
                <span>로그아웃</span>
              </NavLink>
            </>
          ) : (
            // 🔓 로그인
            <NavLink $isActive={location.pathname === '/login'} to="/login">
              <span>로그인</span>
            </NavLink>
          )}
        </Nav>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;

// Styles
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: ${({ theme }) => theme.layout?.headerHeight || '64px'};
  background-color: ${({ theme }) => theme.colors?.background || '#ffffff'};
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || '#eaeaea'};
  box-shadow: ${({ theme }) => theme.shadows?.sm || '0 2px 4px rgba(0,0,0,0.05)'};
  width: 100%;
`;

/* 🛠️ [레이아웃 수정] 로고와 메뉴를 양끝으로 시원하게 찢어주는 핵심 스타일 */
const HeaderInner = styled.div`
  width: 100%;
  max-width: 100%; /* ❌ 기존 테마 maxWidth(1200px)에 갇히지 않도록 100%로 확장 */
  height: 100%;
  margin: 0 auto;
  padding: 0 40px; /* 📍 좌우 여백을 40px로 넉넉하게 주어 화면 끝에서 살짝 떨어지게 배치 */
  display: flex;
  align-items: center;
  justify-content: space-between; /* 로고는 왼쪽 끝, 메뉴는 오른쪽 끝으로 배치 */
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.sm || '8px'};
  text-decoration: none;
`;

const LogoIcon = styled.span`
  font-size: 1.75rem;
  line-height: 1;
`;

const LogoText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes?.xl || '1.25rem'};
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text || '#333333'};
  letter-spacing: -0.5px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.sm || '8px'};
`;

/* 🎨 피그마 캡처 화면 100% 매핑 스타일 */
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  
  /* 🔲 평소 상태 스타일 */
  padding: 10px 20px;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  color: #666666;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  .nav-icon {
    font-size: 1.15rem;
    stroke: #666666;
    stroke-width: 2.2;
    transition: stroke 0.25s ease-in-out;
  }

  /* 🧡 마우스 호버(Hover) 스타일 */
  &:hover {
    color: #c05c36;
    background-color: #fdf0e9;
    
    .nav-icon {
      stroke: #c05c36;
    }
  }

  /* 🎯 활성화($isActive) 상태 분기 처리 */
  ${({ $isActive }) =>
    $isActive &&
    css`
      color: #c05c36;
      background-color: #fdf0e9;

      .nav-icon {
        stroke: #c05c36;
      }
    `}
`;

/* 🎯 My Festivals 우측의 숫자 뱃지 스타일 */
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #c05c36;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  line-height: 1;
`;