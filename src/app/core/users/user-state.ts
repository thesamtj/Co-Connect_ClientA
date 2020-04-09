import { UserCredentials } from './userCredentials';

export interface UserState {
  authenticated: boolean;
  loading: boolean;
  userCredentials: UserCredentials;
  likes: any[];
  notifications: any[];
}

export const initialState = {
  authenticated: false,
  loading: false,
  userCredentials: {
    website: "",
    handle: "",
    userId: "",
    email: "",
    bio: "",
    imageUrl: "",
    createdAt: "",
    location: ""
  },
  likes: [],
  notifications: []
};
