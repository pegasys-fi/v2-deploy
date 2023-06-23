import PegasysV3Factory from '@pollum-io/v3-core/artifacts/contracts/PegasysV3Factory.sol/PegasysV3Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_CORE_FACTORY = createDeployContractStep({
  key: 'v3CoreFactoryAddress',
  artifact: PegasysV3Factory,
})
