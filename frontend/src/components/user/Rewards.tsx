import React, { useEffect, useState } from 'react';
import { Trophy, Gift, Star } from 'lucide-react';
// import { CoinBalance } from '../rewards/coinbalance';
import axios from 'axios';

export function Rewards() {
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rewards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCoins(response.data.coins);
            } catch (error) {
                console.error('Error fetching rewards:', error);
            }
        };

        fetchRewards();
    }, []);

    return (
        <div>
            <h1>Your Rewards</h1>
            {/* <CoinBalance balance={coins} /> Pass balance here */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Trophy />
                <Gift />
                <Star />
            </div>
        </div>
    );
}
