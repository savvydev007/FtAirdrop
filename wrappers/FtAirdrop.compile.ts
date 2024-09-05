import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/ft_airdrop.tact',
    options: {
        debug: true,
    },
};
