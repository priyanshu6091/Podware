import { useState, useCallback } from 'react';

const REWARD_ACTIONS = {
  ASK_QUESTION: 5,
  RECEIVE_UPVOTE: 2,
  SHARE_REEL: 10,
  WATCH_COMPLETE: 15,
};

export function useRewards() {
  const [coins, setCoins] = useState(0);

  const awardCoins = useCallback((action: keyof typeof REWARD_ACTIONS) => {
    const reward = REWARD_ACTIONS[action];
    setCoins((current) => current + reward);
  }, []);

  const spendCoins = useCallback((amount: number) => {
    setCoins((current) => Math.max(0, current - amount));
  }, []);

  return {
    coins,
    awardCoins,
    spendCoins,
  };
}