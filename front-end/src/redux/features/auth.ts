import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    token: string;
    username: string;
    title: string;
};

type InitialStateValues = {
    value: AuthState;
};

const initialState: InitialStateValues = {
    value: {
        token: '',
        username: '',
        title: '',
    },
};

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<{ username: string }>) => {
            return {
                value: {
                    token: '123',
                    username: action.payload.username,
                    title: 'Time Traveller',
                },
            };
        },
    },
});

export const { logIn, logOut } = authReducer.actions;
export default authReducer.reducer;
