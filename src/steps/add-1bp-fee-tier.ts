import PegasysV2Factory from '@pollum-io/v2-core/artifacts/contracts/PegasysV2Factory.sol/PegasysV2Factory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

const ONE_BP_FEE = 100
const ONE_BP_TICK_SPACING = 1

export const ADD_1BP_FEE_TIER: MigrationStep = async (state, { signer, gasPrice }) => {
  if (state.v2CoreFactoryAddress === undefined) {
    throw new Error('Missing PegasysV2Factory')
  }

  const v2CoreFactory = new Contract(state.v2CoreFactoryAddress, PegasysV2Factory.abi, signer)

  const owner = await v2CoreFactory.owner()
  if (owner !== (await signer.getAddress())) {
    throw new Error('PegasysV2Factory.owner is not signer')
  }
  const tx = await v2CoreFactory.enableFeeAmount(ONE_BP_FEE, ONE_BP_TICK_SPACING, { gasPrice })

  return [
    {
      message: `PegasysV2Factory added a new fee tier ${ONE_BP_FEE / 100} bps with tick spacing ${ONE_BP_TICK_SPACING}`,
      hash: tx.hash,
    },
  ]
}
