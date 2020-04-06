import { UserCredentials } from './userCredentials';

export interface UserState {
  authenticated: boolean;
  loading: boolean;
  userCredentials: {};
  likes: any[];
  notifications: any[];
}

export const initialState = {
  authenticated: false,
  loading: false,
  userCredentials: {},
  likes: [],
  notifications: []
};
