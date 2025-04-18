import React from 'react'
import styled, { keyframes } from 'styled-components'

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const GradientBorder = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  padding: 2px;
  border-radius: 32px;
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000);
  background-size: 300% 300%;
  animation: ${gradientAnimation} 5s ease infinite;
`

export const BodyWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 30px;
  padding: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <GradientBorder>
      <BodyWrapper disabled={disabled}>{children}</BodyWrapper>
    </GradientBorder>
  )
}
