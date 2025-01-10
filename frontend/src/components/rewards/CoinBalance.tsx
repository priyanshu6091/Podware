import React from 'react';
import { Coins } from 'lucide-react';

interface CoinBalanceProps {
  balance: number;
}

export function CoinBalance({ balance }: CoinBalanceProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full">
      <Coins className="h-5 w-5 text-purple-600" />
      <span className="font-medium text-purple-900">{balance}</span>
    </div>
  );
}