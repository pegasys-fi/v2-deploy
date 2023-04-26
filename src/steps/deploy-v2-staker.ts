import PegasysV2Staker from '@pollum-io/v2-staker/artifacts/contracts/PegasysV2Staker.sol/PegasysV2Staker.json'
import createDeployContractStep from './meta/createDeployContractStep'

const ONE_MINUTE_SECONDS = 60
const ONE_HOUR_SECONDS = ONE_MINUTE_SECONDS * 60
const ONE_DAY_SECONDS = ONE_HOUR_SECONDS * 24
const ONE_MONTH_SECONDS = ONE_DAY_SECONDS * 30
const ONE_YEAR_SECONDS = ONE_DAY_SECONDS * 365

// 2592000
const MAX_INCENTIVE_START_LEAD_TIME = ONE_MONTH_SECONDS
// 1892160000
const MAX_INCENTIVE_DURATION = ONE_YEAR_SECONDS * 2

export const DEPLOY_V2_STAKER = createDeployContractStep({
  key: 'v2StakerAddress',
  artifact: PegasysV2Staker,
  computeArguments(state) {
    if (state.v2CoreFactoryAddress === undefined) {
      throw new Error('Missing V2 Core Factory')
    }
    if (state.nonfungibleTokenPositionManagerAddress === undefined) {
      throw new Error('Missing NFT contract')
    }
    return [
      state.v2CoreFactoryAddress,
      state.nonfungibleTokenPositionManagerAddress,
      MAX_INCENTIVE_START_LEAD_TIME,
      MAX_INCENTIVE_DURATION,
    ]
  },
})
