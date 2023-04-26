import { Signer } from '@ethersproject/abstract-signer'
import { BigNumber } from '@ethersproject/bignumber'
import { migrate } from './migrate'
import { MigrationState, MigrationStep, StepOutput } from './migrations'
import { ADD_1BP_FEE_TIER } from './steps/add-1bp-fee-tier'
import { DEPLOY_MULTICALL2 } from './steps/deploy-multicall2'
import { DEPLOY_NFT_DESCRIPTOR_LIBRARY_V1_3_0 } from './steps/deploy-nft-descriptor-library'
import { DEPLOY_NFT_POSITION_DESCRIPTOR_V1_3_0 } from './steps/deploy-nft-position-descriptor'
import { DEPLOY_NONFUNGIBLE_POSITION_MANAGER } from './steps/deploy-nonfungible-position-manager'
import { DEPLOY_PROXY_ADMIN } from './steps/deploy-proxy-admin'
import { DEPLOY_QUOTER_V2 } from './steps/deploy-quoter-v2'
import { DEPLOY_TICK_LENS } from './steps/deploy-tick-lens'
import { DEPLOY_TRANSPARENT_PROXY_DESCRIPTOR } from './steps/deploy-transparent-proxy-descriptor'
import { DEPLOY_V2_CORE_FACTORY } from './steps/deploy-v2-core-factory'
import { DEPLOY_V2_MIGRATOR } from './steps/deploy-v2-migrator'
import { DEPLOY_V2_STAKER } from './steps/deploy-v2-staker'
import { DEPLOY_V2_SWAP_ROUTER_02 } from './steps/deploy-v2-swap-router-02'
import { TRANSFER_PROXY_ADMIN } from './steps/transfer-proxy-admin'
import { TRANSFER_V2_CORE_FACTORY_OWNER } from './steps/transfer-v2-core-factory-owner'

const MIGRATION_STEPS: MigrationStep[] = [
  // must come first, for address calculations
  DEPLOY_V2_CORE_FACTORY,
  ADD_1BP_FEE_TIER,
  DEPLOY_MULTICALL2,
  DEPLOY_PROXY_ADMIN,
  DEPLOY_TICK_LENS,
  DEPLOY_NFT_DESCRIPTOR_LIBRARY_V1_3_0,
  DEPLOY_NFT_POSITION_DESCRIPTOR_V1_3_0,
  DEPLOY_TRANSPARENT_PROXY_DESCRIPTOR,
  DEPLOY_NONFUNGIBLE_POSITION_MANAGER,
  DEPLOY_V2_MIGRATOR,
  TRANSFER_V2_CORE_FACTORY_OWNER,
  DEPLOY_V2_STAKER,
  DEPLOY_QUOTER_V2,
  DEPLOY_V2_SWAP_ROUTER_02,
  TRANSFER_PROXY_ADMIN,
]

export default function deploy({
  signer,
  gasPrice: numberGasPrice,
  initialState,
  onStateChange,
  weth9Address,
  nativeCurrencyLabelBytes,
  v1CoreFactoryAddress,
  ownerAddress,
}: {
  signer: Signer
  gasPrice: number | undefined
  weth9Address: string
  nativeCurrencyLabelBytes: string
  v1CoreFactoryAddress: string
  ownerAddress: string
  initialState: MigrationState
  onStateChange: (newState: MigrationState) => Promise<void>
}): AsyncGenerator<StepOutput[], void, void> {
  const gasPrice =
    typeof numberGasPrice === 'number' ? BigNumber.from(numberGasPrice).mul(BigNumber.from(10).pow(9)) : undefined // convert to wei

  return migrate({
    steps: MIGRATION_STEPS,
    config: { gasPrice, signer, weth9Address, nativeCurrencyLabelBytes, v1CoreFactoryAddress, ownerAddress },
    initialState,
    onStateChange,
  })
}
