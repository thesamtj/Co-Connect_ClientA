import { Scream } from "./scream";

export interface ScreamState {
  screams: Scream[];
  scream: Scream;
  loading: boolean;
}

export const initialState = {
  screams: [],
  scream: {
    screamId: "",
    body: "",
    userHandle: "",
    createdAt: "",
    commentCount: 0,
    likeCount: 0,
    userImage: ""
  },
  loading: false
};
