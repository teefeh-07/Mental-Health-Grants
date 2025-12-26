import { useState, useEffect } from 'react';
import { callReadOnlyFunction, cvToJSON } from '@stacks/transactions';
import { NETWORK, CONTRACT_ADDRESS, DAO_CONTRACT_NAME } from '../config/stacksConfig';

export const useDAOState = (userAddress?: string) => {
    const [proposalCount, setProposalCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProposalCount = async () => {
            try {
                const result = await callReadOnlyFunction({
                    network: NETWORK,
                    contractAddress: CONTRACT_ADDRESS,
                    contractName: DAO_CONTRACT_NAME,
                    functionName: 'get-proposal-count',
                    functionArgs: [],
                    senderAddress: CONTRACT_ADDRESS,
                });
                const count = cvToJSON(result).value;
                setProposalCount(parseInt(count));
            } catch (err) {
                console.error('Error fetching proposal count:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProposalCount();
    }, []);

    return { proposalCount, loading };
};
