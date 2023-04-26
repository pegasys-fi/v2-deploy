import V3Migrator from '@pollum-io/v2-periphery/artifacts/contracts/V3Migrator.sol/V3Migrator.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V2_MIGRATOR = createDeployContractStep({
  key: 'v2MigratorAddress',
  artifact: V3Migrator,
  computeArguments(state, config) {
    if (state.v2CoreFactoryAddress === undefined) {
      throw new Error('Missing V2 Core Factory')
    }
    if (state.nonfungibleTokenPositionManagerAddress === undefined) {
      throw new Error('Missing NonfungiblePositionManager')
    }
    return [state.v2CoreFactoryAddress, config.weth9Address, state.nonfungibleTokenPositionManagerAddress]
  },
})
