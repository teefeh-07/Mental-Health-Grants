import React, { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export const ConnectButton = () => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        }
    }, []);

    const handleConnect = () => {
        showConnect({
            appDetails: {
                name: 'Mental Health Grants DAO',
                icon: window.location.origin + '/logo.svg',
            },
            redirectTo: '/',
            onFinish: () => {
                setUserData(userSession.loadUserData());
            },
            userSession,
        });
    };

    const handleDisconnect = () => {
        userSession.signUserOut();
        setUserData(null);
    };

    if (userData) {
        const address = userData.profile.stxAddress.mainnet;
        return (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <button className="glass-button" onClick={handleDisconnect}>
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button className="glass-button" onClick={handleConnect}>
            Connect Wallet
        </button>
    );
};
