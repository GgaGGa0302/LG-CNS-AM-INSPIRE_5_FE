import { forwardRef } from 'react';
import styled from 'styled-components';

const MemoTextarea = forwardRef(
  ({ value, onChange, placeholder = '개인 메모를 입력하세요', readOnly = false, onClick }, ref) => (
    <MemoWrapper onClick={onClick}>
      <MemoLabel>메모</MemoLabel>
      <MemoInput
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </MemoWrapper>
  ),
);

export default MemoTextarea;

// Styles
const MemoWrapper = styled.div`
  width: 100%;
`;

const MemoLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MemoInput = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  resize: none;
  height: 48px;
  line-height: 1.4;

  &[readOnly] {
    /* 수정 모드가 아닐 때도 박스 형태를 유지하고, 편집 불가능 상태를 시각적으로 표시 */
    background-color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.border};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    outline: none;
  }
`;
