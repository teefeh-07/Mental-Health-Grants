import { openContractCall } from '@stacks/connect';
import {
    uintCV,
    stringAsciiCV,
    stringUtf8CV,
    principalCV,
    AnchorMode,
    PostConditionMode,
} from '@stacks/transactions';
import { NETWORK, CONTRACT_ADDRESS, DAO_CONTRACT_NAME } from '../config/stacksConfig';

export const submitProposalTx = async (
    title: string,
    description: string,
    amount: number,
    recipient: string
) => {
    await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: DAO_CONTRACT_NAME,
        functionName: 'create-proposal',
        functionArgs: [
            stringAsciiCV(title),
            stringUtf8CV(description),
            uintCV(amount),
            principalCV(recipient),
        ],
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
            console.log('Transaction broadcasted:', data);
        },
        onCancel: () => {
            console.log('Transaction cancelled');
        },
    });
};
