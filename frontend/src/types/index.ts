export interface User {
  id: string;
  name: string;
  avatar?: string;
  coins: number;
  isCreator: boolean;
}

export interface Question {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  votes: number;
  response?: {
    content: string;
    type: 'text' | 'audio';
    timestamp: string;
  };
}

export interface Podcast {
  videoUrl: any;
  audioUrl: any;
  categories: any;
  id: string;
  title: string;
  host: string;
  thumbnail: string;
  duration: string;
  likes: number;
  description?: string;
  category?: string;
}

// Updated PodcastEpisode to extend Podcast
export interface PodcastEpisode extends Podcast {
  chapters: Chapter[];
  isLive: boolean;
  videoUrl: string;
}

export interface Chapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
}

export interface Reel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  votes: number;
  comments: number;
  episodeId: string;
  timestamp: number;
  tags: string[];
}
