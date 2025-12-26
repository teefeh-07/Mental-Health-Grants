# WalletConnect Integration Guide

This document outlines the steps taken to integrate WalletConnect into the Mental Health Grants DAO.

## Installation
The following package was installed to enable WalletConnect support:
```bash
npm install @walletconnect/web3wallet
```

## Configuration
To use WalletConnect, you must obtain a Project ID from the [WalletConnect Cloud](https://cloud.walletconnect.com/).
1. Log in to WalletConnect Cloud.
2. Create a new project.
3. Copy the Project ID.
4. Add it to your `.env` file as `VITE_WALLETCONNECT_PROJECT_ID`.
