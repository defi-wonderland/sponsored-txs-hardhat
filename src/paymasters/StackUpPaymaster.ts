import { Paymaster } from './Paymaster';
import { PartialUserOperation } from '../types';
import { http } from 'viem';
import { createStackupPaymasterClient } from 'permissionless/clients/stackup';
import { SponsorUserOperationReturnType } from 'permissionless/actions/stackup';
import { StackupPaymasterContext } from 'permissionless/types/stackup';
import { PimlicoBundlerClient } from 'permissionless/clients/pimlico';

export class StackUpPaymaster extends Paymaster {
  public paymasterClient: ReturnType<typeof createStackupPaymasterClient>;

  constructor(endpoint: string) {
    super(endpoint);
    this.paymasterClient = createStackupPaymasterClient({
      transport: http(endpoint),
    });
  }

  public async sponsorUserOperation(
    userOperation: PartialUserOperation,
    entryPoint: `0x${string}`,
    bundlerClient: PimlicoBundlerClient,
  ): Promise<`0x${string}` | SponsorUserOperationReturnType> {
    return await this.paymasterClient.sponsorUserOperation({
      userOperation,
      entryPoint,
      context: {
        type: 'payg',
      } as StackupPaymasterContext,
    });
  }
}
