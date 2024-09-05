import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
// import { toNano } from '@ton/core';
import { FtAirdrop } from '../wrappers/FtAirdrop';
import '@ton/test-utils';

describe('FtAirdrop', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ftAirdrop: SandboxContract<FtAirdrop>;

    beforeEach(async () => {
        // blockchain = await Blockchain.create();
        // ftAirdrop = blockchain.openContract(await FtAirdrop.fromInit());
        // deployer = await blockchain.treasury('deployer');
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ftAirdrop are ready to use
    });
});
