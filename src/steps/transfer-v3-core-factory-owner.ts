import PegasysV3Factory from '@pollum-io/v3-core/artifacts/contracts/PegasysV3Factory.sol/PegasysV3Factory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

export const TRANSFER_V3_CORE_FACTORY_OWNER: MigrationStep = async (state, { signer, gasPrice, ownerAddress }) => {
  if (state.v3CoreFactoryAddress === undefined) {
    throw new Error('Missing PegasysV3Factory')
  }

  const v3CoreFactory = new Contract(state.v3CoreFactoryAddress, PegasysV3Factory.abi, signer)

  const owner = await v3CoreFactory.owner()
  if (owner === ownerAddress)
    return [
      {
        message: `PegasysV3Factory owned by ${ownerAddress} already`,
      },
    ]

  if (owner !== (await signer.getAddress())) {
    throw new Error('PegasysV3Factory.owner is not signer')
  }

  const tx = await v3CoreFactory.setOwner(ownerAddress, { gasPrice })

  return [
    {
      message: `PegasysV3Factory ownership set to ${ownerAddress}`,
      hash: tx.hash,
    },
  ]
}
