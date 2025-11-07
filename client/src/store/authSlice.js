import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const res = await authService.login(credentials);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, status: 'idle', error: null },
    reducers: {
        logout: state => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;