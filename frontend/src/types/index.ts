export interface User {
  _id: any;
  fullname: {
    firstname: string;
    lastname: string;
  };
  metadata: {
    bio: string;
    avatar_url: string;
  };
  podcasts: Podcast[];
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
  _id: string;
  title: string;
  description: string;
  audioUrl: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  categories: string[];
  uploadedBy: User;
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
