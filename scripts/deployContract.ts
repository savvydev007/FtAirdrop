import { Address, Cell, toNano } from '@ton/core';
import { FtAirdrop, Distribution } from '../wrappers/FtAirdrop';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils';

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();
    const communityWallet = await ui.input('community wallet address');
    const earlyContributorsWallet = await ui.input('early contributors wallet address');
    const listingAndLiquidityWallet = await ui.input('listing & liquidity wallet address');
    const developmentWallet = await ui.input('development wallet address');
    const projectFundWallet = await ui.input('project fund wallet address');

    const distribute: Distribution = {
        $$type: 'Distribution',
        communityWallet: Address.parse(communityWallet),
        communityPercent: BigInt(7500),
        earlyContributorsWallet: Address.parse(earlyContributorsWallet),
        earlyContributorsPercent: BigInt(500),
        listingAndLiquidityWallet: Address.parse(listingAndLiquidityWallet),
        listingAndLiquidityPercent: BigInt(500),
        developmentWallet: Address.parse(developmentWallet),
        developmentPercent: BigInt(500),
        projectFundWallet: Address.parse(projectFundWallet),
        projectFundPercent: BigInt(500)
    };

    const content: Cell = buildOnchainMetadata({
        name: 'TEST',
        symbol: 'TEST',
        decimals: '9',
        description: 'test',
        image: 'https://ton.org/download/ton_symbol.png'
    });

    const ftAirdrop = provider.open(await FtAirdrop.fromInit(
        provider.sender().address!!,
        content,
        distribute,
        BigInt(200000000000)
    ));

    await ftAirdrop.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(ftAirdrop.address);

    console.log('jetton_data:', await ftAirdrop.getGetJettonData());
}
