import { Scream } from './scream';

export interface ScreamState {
    screams: Scream[];
    scream: {};
    loading: boolean;
}

export const initialState = { 
    screams: [],
    scream: {},
    loading: false
};
