import React from 'react';
import { Headphones, Clock, Heart, Shield } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

function StatItem({ icon: Icon, label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
      <Icon className="h-6 w-6 text-purple-600 mb-2" />
      <span className="text-2xl font-bold text-purple-900">{value}</span>
      <span className="text-sm text-purple-600">{label}</span>
    </div>
  );
}

export function ProfileStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatItem icon={Headphones} label="Episodes" value={42} />
      <StatItem icon={Clock} label="Hours" value="126" />
      <StatItem icon={Heart} label="Favorites" value={15} />
      <StatItem icon={Shield} label="Role" value="Podcaster" />
    </div>
  );
}
