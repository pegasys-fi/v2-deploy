import NonfungiblePositionManager from '@pollum-io/v2-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_NONFUNGIBLE_POSITION_MANAGER = createDeployContractStep({
  key: 'nonfungibleTokenPositionManagerAddress',
  artifact: NonfungiblePositionManager,
  computeArguments(state, config) {
    if (state.v2CoreFactoryAddress === undefined) {
      throw new Error('Missing V2 Core Factory')
    }
    if (state.descriptorProxyAddress === undefined) {
      throw new Error('Missing NonfungibleTokenDescriptorProxyAddress')
    }

    return [state.v2CoreFactoryAddress, config.weth9Address, state.descriptorProxyAddress]
  },
})
