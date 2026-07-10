import { forwardRef } from 'react';
import styled from 'styled-components';

const MemoTextarea = forwardRef(
  ({ value, onChange, placeholder = '커스텀 메모를 입력하세요', readOnly = false }, ref) => (
    <MemoWrapper>
      <MemoLabel>커스텀 메모</MemoLabel>
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
    background-color: transparent;
    border-color: transparent;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    outline: none;
  }
`;
