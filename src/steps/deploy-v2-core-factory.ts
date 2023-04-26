import PegasysV2Factory from '@pollum-io/v2-core/artifacts/contracts/PegasysV2Factory.sol/PegasysV2Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V2_CORE_FACTORY = createDeployContractStep({
  key: 'v2CoreFactoryAddress',
  artifact: PegasysV2Factory,
})
