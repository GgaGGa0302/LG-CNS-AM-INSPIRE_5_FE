import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import { login } from '../../api/authApi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

// 기존 백엔드 연결 로직을 잠시 주석 처리하고, 무조건 메인페이지로 이동하게 수정
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  // === 프론트엔드 UI 테스트용 가짜 성공 로직 (1초 대기 후 이동) ===
  setTimeout(() => {
    setLoading(false);
    navigate('/'); // 메인페이지로 이동!
  }, 1000); 

  /* 
  // 나중에 백엔드 서버 켜지면 이 주석을 풀고 위 코드를 지우세요!
  try {
    const { data } = await login({ email, password });
    setAuth(data.accessToken);
    navigate('/');
  } catch (err) {
    setError(err.response?.data?.message || '로그인에 실패했습니다.');
  } finally {
    setLoading(false);
  }
  */
};

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: '#E74C3C', fontSize: '0.875rem' }}>{error}</p>}
        <Button type="submit" pill fullWidth disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </Button>
      </FormContainer>
      <SignupLinkWrapper>
        아직 계정이 없으신가요?
        <SignupLink as={Link} to="/signup">회원가입</SignupLink>
      </SignupLinkWrapper>
    </>
  );
};

export default LoginForm;

// Styles
const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SignupLinkWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
`;

const SignupLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-left: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
