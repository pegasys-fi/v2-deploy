import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

import PegasysV2Factory from '@pollum-io/v2-core/artifacts/contracts/PegasysV2Factory.sol/PegasysV2Factory.json'
import { expect } from 'chai'
import { DEPLOY_V2_CORE_FACTORY } from '../src/steps/deploy-v2-core-factory'
import { asciiStringToBytes32 } from '../src/util/asciiStringToBytes32'

const DUMMY_ADDRESS = '0x9999999999999999999999999999999999999999'

const ganache = require('ganache-cli')

describe('deploy-v2-core-factory', () => {
  let provider: Web3Provider
  let signer: JsonRpcSigner

  before('create provider', () => {
    provider = new Web3Provider(ganache.provider())
    signer = provider.getSigner()
  })

  function singleElem<T>(v: T[]): T {
    return v[0]
  }

  describe('DEPLOY_V2_CORE_FACTORY', () => {
    it('deploys the v2 core factory contract', async () => {
      const result = singleElem(
        await DEPLOY_V2_CORE_FACTORY(
          {},
          {
            signer,
            gasPrice: BigNumber.from(1),
            ownerAddress: DUMMY_ADDRESS,
            v1CoreFactoryAddress: DUMMY_ADDRESS,
            weth9Address: DUMMY_ADDRESS,
            nativeCurrencyLabelBytes: asciiStringToBytes32('ETH'),
          }
        )
      )
      expect(result.message).to.eq('Contract PegasysV2Factory deployed')
    })

    it('does not deploy if already deployed', async () => {
      const result = singleElem(
        await DEPLOY_V2_CORE_FACTORY(
          { v2CoreFactoryAddress: DUMMY_ADDRESS },
          {
            signer,
            gasPrice: BigNumber.from(1),
            ownerAddress: DUMMY_ADDRESS,
            v1CoreFactoryAddress: DUMMY_ADDRESS,
            weth9Address: DUMMY_ADDRESS,
            nativeCurrencyLabelBytes: asciiStringToBytes32('ETH'),
          }
        )
      )
      expect(result.message).to.eq('Contract PegasysV2Factory was already deployed')
      expect(result.address).to.eq(DUMMY_ADDRESS)
    })

    describe('test contract functions', () => {
      let v2CoreFactory: Contract
      beforeEach(async () => {
        const result = singleElem(
          await DEPLOY_V2_CORE_FACTORY(
            {},
            {
              signer,
              gasPrice: BigNumber.from(1),
              ownerAddress: DUMMY_ADDRESS,
              v1CoreFactoryAddress: DUMMY_ADDRESS,
              weth9Address: DUMMY_ADDRESS,
              nativeCurrencyLabelBytes: asciiStringToBytes32('ETH'),
            }
          )
        )
        v2CoreFactory = new Contract(result.address!, PegasysV2Factory.abi, provider)
      })

      it('points to signer address', async () => {
        expect(await v2CoreFactory.owner()).to.eq(await signer.getAddress())
      })
    })
  })
})
