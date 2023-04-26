import PegasysV2Factory from '@pollum-io/v2-core/artifacts/contracts/PegasysV2Factory.sol/PegasysV2Factory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

export const TRANSFER_V2_CORE_FACTORY_OWNER: MigrationStep = async (state, { signer, gasPrice, ownerAddress }) => {
  if (state.v2CoreFactoryAddress === undefined) {
    throw new Error('Missing PegasysV2Factory')
  }

  const v2CoreFactory = new Contract(state.v2CoreFactoryAddress, PegasysV2Factory.abi, signer)

  const owner = await v2CoreFactory.owner()
  if (owner === ownerAddress)
    return [
      {
        message: `PegasysV2Factory owned by ${ownerAddress} already`,
      },
    ]

  if (owner !== (await signer.getAddress())) {
    throw new Error('PegasysV2Factory.owner is not signer')
  }

  const tx = await v2CoreFactory.setOwner(ownerAddress, { gasPrice })

  return [
    {
      message: `PegasysV2Factory ownership set to ${ownerAddress}`,
      hash: tx.hash,
    },
  ]
}
