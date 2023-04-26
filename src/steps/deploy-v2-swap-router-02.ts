import SwapRouter02 from '@pollum-io/swap-router-contracts/artifacts/contracts/SwapRouter02.sol/SwapRouter02.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V2_SWAP_ROUTER_02 = createDeployContractStep({
  key: 'swapRouter02',
  artifact: SwapRouter02,
  computeArguments(state, config) {
    if (state.v2CoreFactoryAddress === undefined) {
      throw new Error('Missing V2 Core Factory')
    }
    if (state.nonfungibleTokenPositionManagerAddress === undefined) {
      throw new Error('Missing NFT manager')
    }

    return [
      config.v1CoreFactoryAddress,
      state.v2CoreFactoryAddress,
      state.nonfungibleTokenPositionManagerAddress,
      config.weth9Address,
    ]
  },
})
