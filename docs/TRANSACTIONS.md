# Transaction Integration Guide

The Mental Health Grants DAO uses `@stacks/connect` and `@stacks/transactions` to interact with the Stacks blockchain.

## Implementation Details
The frontend facilitates two primary on-chain actions:

### 1. Proposal Submission
- **Function:** `create-proposal`
- **Arguments:** `title` (string-ascii), `description` (string-utf8), `amount` (uint), `recipient` (principal)
- **Service:** `submitProposalTx` in `frontend/src/services/contractService.ts`

### 2. Voting
- **Function:** `vote-on-proposal`
- **Arguments:** `proposal-id` (uint), `vote` (bool)
- **Service:** `voteOnProposalTx` in `frontend/src/services/contractService.ts`

## User Experience
Both actions trigger a wallet popup (e.g., Leather, Xverse) for the user to review and sign the transaction. 
Post-conditions are set to `PostConditionMode.Deny` by default to ensure maximum security.
