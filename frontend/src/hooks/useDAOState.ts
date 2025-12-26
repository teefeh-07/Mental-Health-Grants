import { useState, useEffect } from 'react';
import { callReadOnlyFunction, cvToJSON, principalCV } from '@stacks/transactions';
import { StacksMainnet, StacksMocknet } from '@stacks/network';
import { NETWORK, CONTRACT_ADDRESS, DAO_CONTRACT_NAME } from '../config/stacksConfig';

export const useDAOState = (userAddress?: string) => {
    const [proposalCount, setProposalCount] = useState<number>(0);
    const [userVotingPower, setUserVotingPower] = useState<number>(0);
    const [daoStxBalance, setDaoStxBalance] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countResult = await callReadOnlyFunction({
                    network: NETWORK,
                    contractAddress: CONTRACT_ADDRESS,
                    contractName: DAO_CONTRACT_NAME,
                    functionName: 'get-proposal-count',
                    functionArgs: [],
                    senderAddress: CONTRACT_ADDRESS,
                });
                setProposalCount(parseInt(cvToJSON(countResult).value));

                if (userAddress) {
                    const powerResult = await callReadOnlyFunction({
                        network: NETWORK,
                        contractAddress: CONTRACT_ADDRESS,
                        contractName: DAO_CONTRACT_NAME,
                        functionName: 'get-voting-power',
                        functionArgs: [principalCV(userAddress)],
                        senderAddress: userAddress,
                    });
                    setUserVotingPower(parseInt(cvToJSON(powerResult).value.value));
                }

                // Fetch DAO STX Balance
                const balanceResponse = await fetch(`${NETWORK.getCoreApiUrl()}/extended/v1/address/${CONTRACT_ADDRESS}/stx`);
                const balanceData = await balanceResponse.json();
                setDaoStxBalance(parseInt(balanceData.balance) / 1000000);
            } catch (err) {
                console.error('Error fetching DAO state:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userAddress]);

    return { proposalCount, userVotingPower, daoStxBalance, loading };
};
