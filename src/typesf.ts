export interface Mentor {
    id: string;
    name: string;
    email: string;
    expertise: string;
    bio: string;
    available: boolean;
  }
  
  export interface ForumTopic {
    id: string;
    title: string;
    replies: number;
    isActive: boolean;
  }
  
  export interface Event {
    id: string;
    title: string;
    date: string;
    type: 'Online' | 'In-Person';
  }