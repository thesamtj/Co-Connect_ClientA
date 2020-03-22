export interface User {
  userCredentials: {
    website: string;
    handle: string;
    userId: any;
    email: string;
    bio: string;
    imageUrl: any;
    createdAt: any;
    location: string;
  };
  likes: any[];
  notifications: any[];
}
