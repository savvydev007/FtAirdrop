import { Address, toNano } from '@ton/core';
import { FtAirdrop, Distribution } from '../wrappers/FtAirdrop';
import { JettonDefaultWallet as JettonWallet } from '../wrappers/JettonWallet';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('FtAirdrop address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const ftAirdrop = provider.open(FtAirdrop.fromAddress(address));
    const airdropInfo: Distribution = await ftAirdrop.getDistributinoInfo();

    await ftAirdrop.send(
        provider.sender(),
        {
            value: toNano('0.11'),
            bounce: true
        },
        "Owner: Airdrop"
    );

    // ui.write('Waiting for counter to increase...');

    // let attempt = 1;
    // while (1) {
    //     ui.setActionPrompt(`Attempt ${attempt}`);
    //     await sleep(2000);
    //     try {
    //         const wallet = provider.open(await JettonWallet.fromInit(
    //             Address.parse("EQBy4S561K64GvbOHf_EmZVv2m-ZzgmjqS11mvDnjs_VH0Dv"),
    //             Address.parse("0QBTgsTO3h_zkEfrhknJSGdK6sqy9OrVim1Z8Hcp-j37Uy5m")
    //         ));
    //         const walletData = await wallet.getMsgValue(BigInt("1000000000"));
    //         console.log("walletData:", walletData);
    //         attempt ++;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // ui.clearActionPrompt();
    // ui.write('Counter increased successfully!');
}


// Contract deployed address: EQCoeAKP8lDNWkCvUGQVoA6jZ1liXNoUPaV1oKlfG9vUW8bQ