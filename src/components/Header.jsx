import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from './Button.jsx';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <LogoContainer as={Link} to="/">
          <LogoIcon>🎡</LogoIcon>
          <LogoText>FestMily</LogoText>
        </LogoContainer>
        <Nav>
          {isAuthenticated ? (
            <>
              <NavLink as={Link} to="/">
                축제 검색
              </NavLink>
              <NavLink as={Link} to="/mypage">
                마이페이지
              </NavLink>
              <Button size="sm" variant="secondary" onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <NavLink as={Link} to="/login">
              로그인
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
  height: ${({ theme }) => theme.layout.headerHeight};
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const HeaderInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl} 0 10px; 
  display: flex;
  align-items: center;
  justify-content: space-between; 
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LogoIcon = styled.span`
  font-size: 1.75rem;
  line-height: 1;
`;

const LogoText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.5px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }
`;
