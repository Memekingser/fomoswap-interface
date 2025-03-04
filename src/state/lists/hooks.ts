import { ChainId, Token } from 'fomoswap-story'
import { TokenInfo, TokenList } from '@uniswap/token-lists'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_TOKEN_LIST_URL } from '../../constants'
import { AppState } from '../index'

/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo
  constructor(tokenInfo: TokenInfo) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name)
    this.tokenInfo = tokenInfo
  }
  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI
  }
}

export type TokenAddressMap = Readonly<{ [chainId in ChainId]: Readonly<{ [tokenAddress: string]: WrappedTokenInfo }> }>

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST: TokenAddressMap = {
  [ChainId.KOVAN]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.GÖRLI]: {},
  [ChainId.MAINNET]: {},
  [ChainId.Artio]: {},
  [ChainId.STORYTestnet]: {},
  [ChainId.STORY]: {
    '0xDEE4CDFC91827022d311d8E14b6b8ef9762F0F2E': new WrappedTokenInfo({
      chainId: ChainId.STORY,
      address: '0xDEE4CDFC91827022d311d8E14b6b8ef9762F0F2E',
      decimals: 18,
      symbol: 'SDog',
      name: 'Story DOg',
      logoURI: 'https://mrpopper.netlify.app/sdog.png'
    })
  },
  [ChainId.BERA]: {
    '0x6969696969696969696969696969696969696969': new WrappedTokenInfo({
      chainId: ChainId.BERA,
      address: '0x6969696969696969696969696969696969696969',
      decimals: 18,
      symbol: 'WBERA',
      name: 'Wrapped BERA',
      logoURI: 'https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/bera.png'
    }),
    '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590': new WrappedTokenInfo({
      chainId: ChainId.BERA,
      address: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
      decimals: 18,
      symbol: 'WETH',
      name: 'Wrapped ETH',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
    }),
    '0x9c68f621a6D8751Ff1e7AAE39721E9E40Ba4e49c': new WrappedTokenInfo({
      chainId: ChainId.BERA,
      address: '0x9c68f621a6D8751Ff1e7AAE39721E9E40Ba4e49c',
      decimals: 18,
      symbol: 'BBDog',
      name: 'BBDog',
      logoURI: 'https://mrpopper.netlify.app/bera.png'
    })
  },
  [ChainId.UniChain]: {
    '0x4200000000000000000000000000000000000006': new WrappedTokenInfo({
      chainId: ChainId.UniChain,
      address: '0x4200000000000000000000000000000000000006',
      decimals: 18,
      symbol: 'WETH',
      name: 'Wrapped ETH',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
    }),
    '0xAA0A210662Ad11a29563e9154D5e934b1ecDBF8e': new WrappedTokenInfo({
      chainId: ChainId.UniChain,
      address: '0xAA0A210662Ad11a29563e9154D5e934b1ecDBF8e',
      decimals: 18,
      symbol: 'FOMO',
      name: 'FOMO',
      logoURI: 'https://mrpopper.netlify.app/fomoswap.png'
    })
  },
  [ChainId.Sepolia]: {
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8': new WrappedTokenInfo({
      chainId: ChainId.Sepolia,
      address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
      decimals: 18,
      symbol: 'WETH',
      name: 'Wrapped ETH',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
    }),
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d': new WrappedTokenInfo({
      chainId: ChainId.Sepolia,
      address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
      decimals: 18,
      symbol: 'USDC',
      name: 'USD Coin',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png'
    }),
    '0x12453addC1D27EB0FC14C7B076C4920cd180A6bb': new WrappedTokenInfo({
      chainId: ChainId.Sepolia,
      address: '0x12453addC1D27EB0FC14C7B076C4920cd180A6bb',
      decimals: 18,
      symbol: 'TEST',
      name: 'Test Coin',
      logoURI: 'https://mrpopper.netlify.app/fomoswap.png'
    })
    
  }
}

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  'WeakMap' in window ? new WeakMap<TokenList, TokenAddressMap>() : null

export function listToTokenMap(list: TokenList): TokenAddressMap {
  const result = listCache?.get(list)
  if (result) return result

  const map = list.tokens.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      const token = new WrappedTokenInfo(tokenInfo)
      if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.')
      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: token
        }
      }
    },
    { ...EMPTY_LIST }
  )
  listCache?.set(list, map)
  return map
}

export function useTokenList(url: string): TokenAddressMap {
  const lists = useSelector<AppState, AppState['lists']['byUrl']>(state => state.lists.byUrl)
  return useMemo(() => {
    const current = lists[url]?.current
    if (!current) return EMPTY_LIST
    return listToTokenMap(current)
  }, [lists, url])
}

export function useDefaultTokenList(): TokenAddressMap {
  return useTokenList(DEFAULT_TOKEN_LIST_URL)
}

// returns all downloaded current lists
export function useAllLists(): TokenList[] {
  const lists = useSelector<AppState, AppState['lists']['byUrl']>(state => state.lists.byUrl)

  return useMemo(
    () =>
      Object.keys(lists)
        .map(url => lists[url].current)
        .filter((l): l is TokenList => Boolean(l)),
    [lists]
  )
}
