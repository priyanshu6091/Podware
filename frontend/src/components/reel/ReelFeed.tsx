import React from 'react';
import { ChevronUp, ChevronDown, MessageCircle, Share2 } from 'lucide-react';

interface ReelProps {
  title: string;
  description: string;
  thumbnail: string;
  votes: number;
  comments: number;
}

function Reel({ title, description, thumbnail, votes, comments }: ReelProps) {
  return (
    <div className="relative h-[calc(100vh-4rem)] snap-start">
      <img
        src={thumbnail}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-white text-xl font-bold">{title}</h2>
        <p className="text-white/90 mt-2 line-clamp-2">{description}</p>
      </div>
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
        <button className="p-2">
          <ChevronUp className="h-8 w-8 text-white" />
          <span className="text-white text-sm">{votes}</span>
          <ChevronDown className="h-8 w-8 text-white" />
        </button>
        <button className="p-2">
          <MessageCircle className="h-8 w-8 text-white" />
          <span className="text-white text-sm">{comments}</span>
        </button>
        <button className="p-2">
          <Share2 className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}

export function ReelFeed() {
  const reels = [
    {
      title: "The Future of AI in Healthcare",
      description: "Dr. Sarah Johnson discusses the revolutionary impact of artificial intelligence in modern medicine.",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000",
      votes: 1234,
      comments: 89,
    },
    {
      title: "Entrepreneurship 101",
      description: "Key insights from successful startup founders on building sustainable businesses.",
      thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1000",
      votes: 856,
      comments: 45,
    },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory">
      {reels.map((reel, index) => (
        <Reel key={index} {...reel} />
      ))}
    </div>
  );
}