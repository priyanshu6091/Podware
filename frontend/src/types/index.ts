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

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  host: string;
  thumbnail: string;
  duration: string;
  likes: number;
  chapters: Chapter[];
  isLive: boolean;
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
export interface Podcast {
  id: string;
  title: string;
  host: string;
  thumbnail: string;
  duration: string;
  likes: number;
  description?: string;
  category?: string;
}

// Update the existing PodcastEpisode interface to extend Podcast
export interface PodcastEpisode extends Podcast {
  chapters: Chapter[];
  isLive: boolean;
}