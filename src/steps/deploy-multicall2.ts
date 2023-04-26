import PegasysInterfaceMulticall from '@pollum-io/v2-periphery/artifacts/contracts/lens/PegasysInterfaceMulticall.sol/PegasysInterfaceMulticall.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_MULTICALL2 = createDeployContractStep({
  key: 'multicall2Address',
  artifact: PegasysInterfaceMulticall,
})
