import { useState, useEffect } from 'react';
import { callReadOnlyFunction, cvToJSON } from '@stacks/transactions';
import { NETWORK, CONTRACT_ADDRESS, DAO_CONTRACT_NAME } from '../config/stacksConfig';

export const useDAOState = (userAddress?: string) => {
    const [proposalCount, setProposalCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    return { proposalCount, loading };
};
