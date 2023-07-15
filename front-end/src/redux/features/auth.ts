import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    token: string;
    username: string;
    title: string;
};

type InitialStateValues = {
    value: AuthState;
};

const randomTitles = ['Time Traveller', 'Time Lord', 'Time Master'];

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
        logIn: (
            _,
            action: PayloadAction<{ username: string; token: string }>
        ) => {
            return {
                value: {
                    token: action.payload.token,
                    username: action.payload.username,
                    title: randomTitles[
                        Math.floor(Math.random() * randomTitles.length)
                    ],
                },
            };
        },
    },
});

export const { logIn, logOut } = authReducer.actions;
export default authReducer.reducer;
