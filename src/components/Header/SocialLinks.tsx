import React from 'react'
import styled from 'styled-components'
import { Twitter, Send } from 'react-feather'

const SocialLinksWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`

const SocialLink = styled.a`
  color: ${({ theme }) => theme.text1};
  padding: 0.35rem 0.6rem;
  border-radius: 12px;
  text-decoration: none;
  background: ${({ theme }) => `linear-gradient(to right, ${theme.bg3}, ${theme.bg4})`};
  margin-right: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid transparent;
  
  :hover {
    color: ${({ theme }) => theme.text2};
    cursor: pointer;
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.primary1};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  :last-child {
    margin-right: 0;
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  :hover svg {
    transform: scale(1.1);
  }
`

export default function SocialLinks() {
  return (
    <SocialLinksWrapper>
      <SocialLink href="https://x.com/storyswapio" target="_blank" rel="noopener noreferrer">
        <Twitter />
      </SocialLink>
      <SocialLink href="https://t.me/storyswapio" target="_blank" rel="noopener noreferrer">
        <Send />
      </SocialLink>
    </SocialLinksWrapper>
  )
}